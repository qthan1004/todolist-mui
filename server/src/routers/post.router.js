const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const postController = require("../controllers/post.controller");

//ALL access Private

//@route GET api/posts + @desc Get posts
router.get("/", verifyToken, postController.getPosts);

//@route POST api/posts + @desc Create post
router.post("/", verifyToken, postController.createPost);

//@route PUT api/posts + @desc Put posts
router.put("/:id", verifyToken, postController.editPost);

//@route DELETE api/posts + @desc Delete posts
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;
