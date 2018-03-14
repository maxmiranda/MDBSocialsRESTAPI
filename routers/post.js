// DEPENDENCIES
const router = require("express").Router();
const completeRequest = require("../util/routing.js").completeRequest;
const postLogic = require("../logic/post.js");
const userRef = require("../logic/user.js").ref;

// ROUTES
router.get("/Posts", function(req, res) {
  completeRequest(req, res, postLogic.getAll);
});

router.get("/Posts/:id", function(req, res) {
  req.checkParams("id", "no id present").notEmpty();
  req.checkParams("id", "post id does not exist").isValidId(postLogic.ref);
  completeRequest(req, res, function(params) {
    return postLogic.getById(params.id);
  });
});

router.post("/Posts", function(req, res) {
  req.checkBody("imageUrl", "no imageUrl passed").notEmpty();
  req.checkBody("imageUrl", "imageUrl is not a url").isValidUrl();
  req.checkBody("posterId", "no posterId passed").notEmpty();
  req.checkBody("posterId", "posterId does not exist").isValidId(userRef);
  completeRequest(req, res, postLogic.createByAutoId);
});

// EXPORTS
module.exports = router;
