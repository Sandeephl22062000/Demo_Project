const express = require("express");
const Trainer = require("../../Model/Trainer/trianerModel");
const User = require("../../Model/UserModel");
const AppError = require("../../Error-Handling/error");

const getTrainerById = async (req, res) => {
  console.log(req.params.id);
  const trainer = await User.findById({ _id: req.params.id }).populate("posts");
  console.log(trainer);
  if (trainer) {
    res.json({
      message: "Successful",
      data: trainer,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};
const getAlltrainer = async (req, res, next) => {
  const keyword = req.params.trainer
    ? {
        $or: [
          { name: { $regex: req.params.trainer, $options: "i" } },
          { email: { $regex: req.params.trainer, $options: "i" } },
        ],
      }
    : {};

  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const users = await User.find(keyword);
  console.log(users);
  const trainers = users.filter((user) => user.role === 1);
  console.log(trainers);
  const paginatedTrainers = trainers.slice(skip, skip + limit);
  const totalPages = Math.ceil(trainers.length / limit);
  console.log("gbdrtgbrtgbr", totalPages);
  if (paginatedTrainers) {
    res.json({
      message: "Successfully registered",
      data: paginatedTrainers,
      totalPages: totalPages,
      currentPage: page,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const getTrainers = async (req, res, next) => {
  console.log("pagees", req.params);
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const count = await User.countDocuments({ role: 1 });
  const trainers = await User.find({ role: 1 })
    .skip((page - 1) * limit)
    .limit(limit);
  console.log("dsfbgtv ", trainers);
  if (trainers) {
    res.json({
      message: "Successfully registered",
      data: trainers,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const getTrainerByfilter = async (req, res, next) => {
  console.log("pagees", req.params);
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const count = await User.countDocuments({ role: 1 });
  const { specialization, experienceLevel } = req.params;
  console.log(specialization, experienceLevel);
  const trainers = await User.find({
    role: 1,
    specialization,
    experiences: experienceLevel,
  })
    .skip((page - 1) * limit)
    .limit(limit);
  console.log("dsfbgtv ", trainers);
  if (trainers) {
    res.json({  
      message: "success",
      data: trainers,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const approveRequest = async (req, res, next) => {
  console.log("Vfvdzrvzdrvz");
  const trainers = await User.findByIdAndUpdate(
    req.body.id,
    { isApproved: true },
    { new: true }
  );

  console.log(trainers);
  if (trainers) {
    res.json({
      message: "Success",
      data: trainers,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const TrainerToApprove = async (req, res, next) => {
  console.log("Vfvdzrvzdrvz");
  const trainers = await User.find({ isApproved: false });

  console.log(trainers);
  if (trainers) {
    res.json({
      message: "Success",
      data: trainers,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const virtualTrainer = async (req, res) => {
  console.log(OPENAI_API_KEY);
  try {
    const contentForSearch = req.body.content;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `${contentForSearch} for this content give me the shortest reply`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error making API request:", error);
  }
};

module.exports = {
  virtualTrainer,
  TrainerToApprove,
  getAlltrainer,
  getTrainers,
  getTrainerById,
  approveRequest,
  getTrainerByfilter,
};
