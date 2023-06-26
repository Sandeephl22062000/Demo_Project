const catchAsync = require("../../utils/catchAync");
const AppError = require("../../Error-Handling/error");
// const Like = require("../../Model/likeModel");
const Like = require("../../Model/PostModel/likePost");
const Dislike = require("../../Model/PostModel/DislikeTrainer");
const Trainer = require("../../Model/Trainer/trianerModel");
const Post = require("../../Model/PostModel/PostModel");
// const DislikeTrainer = require("../../Model/Trainer/DislikeTrainer");

// adds like on product by id

const likePost = catchAsync(async (req, res, next) => {
  const id = req.params.postID;
  console.log(id);
  const post = await Post.findById(id);
  if (!post) return next(new AppError("No trainer found", 404));

  console.log(post.id, req.user.id);
  const existingLike = await Like.findOne({
    userID: req.user.id,
    postID: post.id,
  });

  if (existingLike) {
    return next(new AppError("You have already liked the Trainer", 400));
  }

  const addLike = await Like.create({
    userID: req.user.id,
    postID: post.id,
  });

  const showLike = await Like.find({
    userID: req.user.id,
    postID: post.id,
  }).populate({ path: "userID", select: "name" });

  if (addLike) {
    // deleting dislike
    await Dislike.findOneAndDelete({
      userID: req.user.id,
      postID: post.id,
    });

    res.json({
      message: "U have successfully like the product",
      data: showLike,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const disLikedTrainer = catchAsync(async (req, res, next) => {
  const id = req.params.trainerID;
  const trainer = await Trainer.findById(id);
  console.log(trainer);
  if (!trainer) return next(new AppError("Trainer does not exists", 404));
  console.log(trainer.id);
  console.log(req.user.id);
  const existingDisLike = await Dislike.findOne({
    userID: req.user.id,
    trainerID: trainer.id,
  });
  console.log("existingDisLike", existingDisLike);

  if (existingDisLike) {
    return next(new AppError("You have already Disliked the Trainer", 400));
  }

  const addDisLike = await Dislike.create({
    userID: req.user.id,
    trainerID: trainer.id,
  });

  const showDisLike = await Dislike.find({
    userID: req.user.id,
    trainerID: trainer.id,
  })
    .populate({ path: "trainerID", select: "name" })
    .populate({ path: "userID", select: "name" });

  if (addDisLike) {
    // deleting dislike
    await Like.findOneAndDelete({
      userID: req.user.id,
      trainerID: trainer.id,
    });

    res.json({
      message: "U have successfully Dislike the product",
      data: showDisLike,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const getUsersLike = async (req, res, next) => {
  const data = await Like.find({ trainerID: req.params.trainerID }).populate({
    path: "userID",
    select: "name",
  });
  console.log(data.length);
  if (data) {
    res.json({
      message: "All The Likes",
      data: data,
      totalLikes: data.length,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const getUserLikePost = async (req, res, next) => {
  const getLike = await Like.findOne({
    userID: req.user._id,
    postID: req.params.postID,
  });
  console.log(getLike);
  if (getLike) {
    res.json({
      message: "like for this post",
      data: getLike,    
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};
// const mostLikedProducts = async (req, res, next) => {
//   const maxValue = await Like.aggregate([
//     {
//       $group: {
//         _id: "$productID",
//         count: { $sum: 1 }, // counting no. of documents pass
//       },
//     },
//     {
//       $sort: { count: -1 },
//     },
//     {
//       $limit: 1,
//     },
//   ]).exec();

//   const id = maxValue[0];
//   const MostLiked = await Product.findById(id);
//   res.json({
//     message: "Most Liked Product is --",
//     data: MostLiked,
//   });
// };

// const showlike = async (req, res) => {
//   const id = req.params.id;
//   const Show = await Like.find({ _id: id });
//   // const count = await Like.aggregate([{ count: { $sum: 1 } }]);
//   console.log(count);
//   res.json({
//     data: Show,
//   });
// };
module.exports = {
  likePost,
  disLikedTrainer,
  getUsersLike,
  getUserLikePost
  // disLikedProduct,
  // showlike,
};
