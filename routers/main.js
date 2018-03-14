// DEPENDENCIES
const router = require("express").Router();
const userRouter = require("./user.js");
const postRouter = require("./post.js");

// ROUTES
router.use(userRouter);
router.use(postRouter);

// EXPORTS
module.exports = router;
