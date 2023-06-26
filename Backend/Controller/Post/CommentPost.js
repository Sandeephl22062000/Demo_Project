const catchAsync = require("../../utils/catchAync");
const AppError = require("../../Error-Handling/error");
const Comment = require("../../Model/PostModel/CommentPost");
const Post = require("../../Model/PostModel/PostModel");

const comment = catchAsync(async (req, res, next) => {
  const id = req.params.postID;
  const post = await Post.findById(id);

  if (!post) {
    return next(new AppError("Post does not exists", 403));
  }

  const addComment = await Comment.create({
    userID: req.user.id,
    postID: post.id,
    comment: req.body.comment,
  });

  // trainer.comments.push(addComment._id);
  // await trainer.save();

  const showComment = await Comment.findOne({
    userID: req.user.id,
    postID: post.id,
    comment: req.body.comment,
  })
    .populate({ path: "postID", select: "name" })
    .populate({ path: "userID", select: "name" });

  if (showComment) {
    res.json({
      message: "Comment Added Successfully",
      data: showComment,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = { comment };
