const express = require("express");
const Trainer = require("../../Model/Trainer/trianerModel");
const User = require("../../Model/UserModel");
const AppError = require("../../Error-Handling/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTrainerById = async (req, res) => {
  console.log(req.params.id);
  const trainer = await User.findById({ _id: req.params.id });
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
  const users = await User.find(keyword);
  console.log(users);
  const trainers = users.filter((user) => user.role === 1);
  console.log(trainers);
  if (trainers) {
    res.json({
      message: "Successfully register",
      data: trainers,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const getTrainers = async (req, res, next) => {
  const trainers = await User.find({ role: 1 });

  if (trainers) {
    res.json({
      message: "Successfully register",
      data: trainers,
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

module.exports = {
  TrainerToApprove,
  getAlltrainer,
  getTrainers,
  getTrainerById,
  approveRequest,
};
