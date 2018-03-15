// DEPENDENCIES
const router = require("express").Router();
const completeRequest = require("../util/routing.js").completeRequest;
const postLogic = require("../logic/post.js");
const userRef = require("../logic/user.js").ref;

// ROUTES
router.get("/posts", function(req, res) {
  completeRequest(req, res, postLogic.getAll);
});

router.get("/posts/:id", function(req, res) {
  req.checkParams("id", "no id present").notEmpty();
  req.checkParams("id", "post id does not exist").isValidId(postLogic.ref);
  completeRequest(req, res, function(params) {
    return postLogic.getById(params.id);
  });
});

router.get("/posts/:id", function(req, res) {
  req.checkParams("id", "no id present").notEmpty();
  req.checkParams("id", "post id does not exist").isValidId(postLogic.ref);
  completeRequest(req, res, function(params) {
    return postLogic.getById(params.id);
  });
});

router.patch("/posts/:id/imageUrl", function(req, res) {
  req.checkParams("id", "no id present").notEmpty();
  req.checkParams("id", "post id does not exist").isValidId(postLogic.ref);
  req.checkBody("imageUrl", "imageUrl does not exist").notEmpty();
  req.checkBody("imageUrl", "imageUrl is not valid url").isValidUrl();
  completeRequest(req, res, function(params) {
    return postLogic.updatePost(params.id);
  });
});

router.post("/posts", function(req, res) {
  req.checkBody("text", "no text passed").notEmpty();
  req.checkBody("description", "no description passed").notEmpty();
  req.checkBody("date", "no date passed").notEmpty();
  req.checkBody("latitude", "no latitude passed").notEmpty();
  req.checkBody("longitude", "no longitude passed").notEmpty();
  req.checkBody("poster", "no poster passed").notEmpty();
  req.checkBody("posterId", "no postId passed").notEmpty();
  req.checkBody("posterId", "posterId does not exist").isValidId(userRef);
  console.log("about to createByAutoId");
  completeRequest(req, res, postLogic.createByAutoId);
});

// EXPORTS
module.exports = router;
