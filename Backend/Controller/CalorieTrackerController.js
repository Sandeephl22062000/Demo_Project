const CalorieTracker = require("../Model/TrackCalorie");
const asyncHandler = require("express-async-handler");

const saveTrackedCalories = asyncHandler(async (req, res, next) => {
  const { items, sumCalorie, sumFat, sumCarbs, sumProtein, name } = req.body;

  // Create a new food instance
  const data = await CalorieTracker.create({
    name,
    items,
    sumCalorie,
    sumCarbs,
    sumProtein,
    sumFat,
    user: req.user._id,
  });

  return res
    .status(200)
    .json({ data: data, message: "Food item saved successfully" });
});

const getCaloriesRecordByID = asyncHandler(async (req, res, next) => {
  console.log("cobficfcfbufb ibviw");
  const data = await CalorieTracker.find({ user: req.user._id });

  res.status(200).json({ message: "success", data });
});

module.exports = { saveTrackedCalories, getCaloriesRecordByID };
