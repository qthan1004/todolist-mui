const Post = require("../models/Post.model");

//@route GET api/posts
//@desc Get posts
//@access Private
module.exports.getPosts = async (req, res) => {
  try {
    //DUNG POPULATE -> GOI LAI FIELD CHỨA USER ID TƯƠNG ỨNG
    const posts = await Post.find({ user: req.userID }).populate(
      "user",
      "username"
    );
    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//@route POST api/posts
//@desc Create post
//@access Private
module.exports.createPost = async (req, res) => {
  const { title, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  try {
    const newPost = new Post({
      title,
      dueDate,
      enable: false,
      user: req.userID,
    });

    await newPost.save();

    res.json({
      success: true,
      message: "Add todo Completed!",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.editPost = async (req, res) => {
  const { title, dueDate, status, enable } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is missing",
    });
  }

  try {
    let updatedPost = {
      title,
      dueDate,
      status: status || "INPROCESS",
      enable,
    };

    const postUpdateConditon = { _id: req.params.id, user: req.userID };

    updatedPost = await Post.findOneAndUpdate(postUpdateConditon, updatedPost, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }

    res.json({
      success: true,
      message: "Update task completed!!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//@route DELETE api/posts
//@desc Delete posts
//@access Private
module.exports.deletePost = async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userID };
    const deletePost = await Post.findByIdAndDelete(postDeleteCondition);

    //User not authorised to update post or post not found
    if (!deletePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }

    //ALL PASS
    res.json({
      success: true,
      message: "Delete post completed!!",
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
