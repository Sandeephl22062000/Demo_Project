const Post = require("../../Model/PostModel/PostModel");
const User = require("../../Model/UserModel");
const catchAsync = require("../../utils/catchAync");
const ErrorHandler = require("../../Error-Handling/error");
// const deleteFile = require("../utils/deleteFile");
const mongoose = require("mongoose");

// Create New Post
exports.newPost = catchAsync(async (req, res, next) => {
  try {
    const postData = {
      caption: req.body.caption,
      image: req.body.image,
      postedBy: req.user._id,
    };

    const post = await Post.create(postData);
    const user = await User.findById(req.user._id);
    console.log(post, user, "vadfdv", postData, "tbhrtgsrtd");
    user.posts.push(post._id);
    console.log("post created");
    await user.save();

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
});

// Like or Unlike Post
exports.likeUnlikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);

    post.likes.splice(index, 1);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Unliked",
    });
  } else {
    post.likes.push(req.user._id);

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Liked",
    });
  }
});

// Delete Post
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  //   await deleteFile("posts/", post.image);

  await post.remove();

  const user = await User.findById(req.user._id);

  const index = user.posts.indexOf(req.params.id);
  user.posts.splice(index, 1);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Post Deleted",
  });
});

// Update Caption
exports.updateCaption = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  post.caption = req.body.caption;

  await post.save();

  res.status(200).json({
    success: true,
    message: "Post Updated",
  });
});

// Add Comment
exports.newComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }
  console.log(post);
  if (post.comments.includes(req.user._id)) {
    return next(new ErrorHandler("Already Commented", 500));
  }

  post.comments.push({
    user: req.user._id,
    comment: req.body.comment,
  });

  await post.save();

  return res.status(200).json({
    success: post,
    message: "Comment Added",
  });
});

exports.getPostPerById = async (req, res, next) => {
  const data = await User.findById(req.user._id);
  const Posts = data.posts;
  console.log(Posts);

  const postToshow = await Promise.all(
    Posts.map(async (post) => {
      const id = post.toString();
      console.log("id", id);
      const data = await Post.findById(id);
      console.log("data", data);
      return data;
    })
  );
  console.log("bsgvfgbf", postToshow);
  return res.status(200).json({
    postToshow,
    message: "Like Added",
  });
  // return res.status(200).json({
  //  postToshow,
  //   message: "Like Added",
  // });
};
exports.newLike = catchAsync(async (req, res, next) => {
  console.log("user", req.user._id);
  const post = await Post.findById(req.params.postID);

  console.log(post);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }
  console.log("post.likes", post.likes);
  console.log(post.likes.includes(req.user._id));
  if (post.likes.includes(req.user._id)) {
    return next(new ErrorHandler("Already Liked", 500));
  }
  post.likes.push(req.user._id);

  await post.save();
  console.log(post);

  return res.status(200).json({
    success: post,
    message: "Like Added",
  });
});

// Posts of Following
exports.getPostsOfFollowing = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const currentPage = Number(req.query.page) || 1;

  const skipPosts = 4 * (currentPage - 1);

  const totalPosts = await Post.find({
    postedBy: {
      $in: user.following,
    },
  }).countDocuments();

  const posts = await Post.find({
    postedBy: {
      $in: user.following,
    },
  })
    .populate("postedBy likes")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .sort({ $natural: -1 })
    .limit(4)
    .skip(skipPosts);

  return res.status(200).json({
    success: true,
    posts: posts,
    totalPosts,
  });
});

// Save or Unsave Post
exports.saveUnsavePost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (user.saved.includes(post._id.toString())) {
    user.saved = user.saved.filter((p) => p.toString() !== post._id.toString());
    post.savedBy = post.savedBy.filter(
      (p) => p.toString() !== req.user._id.toString()
    );
    await user.save();
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Unsaved",
    });
  } else {
    user.saved.push(post._id);
    post.savedBy.push(req.user._id);

    await user.save();
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Saved",
    });
  }
});

// Get Post Details
exports.getPostDetails = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate("postedBy likes")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// Get All Posts
exports.allPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .populate("postedBy likes")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    posts,
  });
});
