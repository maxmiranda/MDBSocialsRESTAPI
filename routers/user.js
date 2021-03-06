// DEPENDENCIES
const router = require("express").Router();
const completeRequest = require("../util/routing.js").completeRequest;
const userLogic = require("../logic/user.js");
const postRef = require("../logic/post.js").ref;

// ROUTES
router.get("/users/:id", function(req, res) {
  req.checkParams("id", "no id present").notEmpty();
  req.checkParams("id", "user id does not exist").isValidId(userLogic.ref);
  completeRequest(req, res, function(params) {
    return userLogic.getById(params.id);
  });
});

router.post("/users/:id", function(req, res) {
  req.checkParams("id", "no id present").notEmpty();
  req.checkBody("name", "no name present").notEmpty();
  req.checkBody("email", "no email present").notEmpty();
  req.checkBody("username", "no username present").notEmpty();
  req.checkBody("imageUrl", "no imageUrl present").notEmpty();
  req.checkBody("imageUrl", "imageUrl is not a url").isValidUrl();
  completeRequest(req, res, function(params) {
    return userLogic.createByManualId(params.id, params);
  });
});

router.patch("/users/:id/favorites", function(req, res) {
  req.checkParams("id", "no id present").notEmpty();
  req.checkParams("id", "user id does not exist").isValidId(userLogic.ref);
  req.checkBody("postId", "no postId present").notEmpty();
  req.checkBody("postId", "post id does not exist").isValidId(postRef);
  var fn;
  if (req.body.favorite) {
    fn = userLogic.favorite;
  } else {
    fn = userLogic.unFavorite;
  }
  completeRequest(req, res, function(params) {
    return fn(req.params.id, req.body.postId);
  });
});

// EXPORTS
module.exports = router;
