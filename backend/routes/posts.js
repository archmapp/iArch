const router = require("express").Router();

const PostController = require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, PostController.createPost);

router.put("/:_id", checkAuth, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:_id", PostController.getPost);

router.delete("/:_id", checkAuth, PostController.deletePost);

module.exports = router;
