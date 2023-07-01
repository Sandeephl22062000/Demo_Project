const axios = require("axios");
const catchAsync = require("../../utils/catchAync");
const Food = require("../../Model/CalorieCountingModel");
const AppError = "../../Error-Handling";
const saveUserDetails = async (req, res, next) => {
  const { weight, height, gender, age, activity } = req.body;
  console.log("req.user._id", req.user?._id);

  if (gender.toLowerCase() === "male") {
    bmr = 88.362 + 13.397 * +weight + 4.799 * +height - 5.677 * +age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
  console.log("bmr", bmr);
  if (activity.toLowerCase() === "sedentary") {
    activtyFactor = 1.2;
  } else if (activity.toLowerCase() === "light") {
    activtyFactor = 1.375;
  } else if (activity.toLowerCase() === "moderate") {
    activtyFactor = 1.55;
  } else if (activity.toLowerCase() === "veryactive") {
    activtyFactor = 1.725;
  } else if (activity.toLowerCase() === "light") {
    activtyFactor = 1.9;
  }
  console.log(activity, typeof activity);
  const maintenanceCalories = bmr * activtyFactor;
  const maintainceCalory = +maintenanceCalories.toFixed(2);
  const userInfo = await Food.create({
    weight,
    height,
    gender,
    age,
    activity,
    user: req.user?._id,
    requireProtein: null,
    requireCalories: maintainceCalory,
    requireCarbs: null,
  });
  if (maintainceCalory) {
    res.status(201).json({
      message: "Data Saved",
      data: maintainceCalory,
    });
  }
};
const calorieCounting = (req, res, next) => {
  const { weight, height, age, gender, activityFactors } = req.body;
  console.log(req.body);
  let bmr;

  if (gender.toLowerCase() === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  const maintenanceCalories = bmr * activityFactors;

  if (maintenanceCalories) {
    res.json({
      message: "Success",
      data: maintenanceCalories,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const CaloriesPerFood = catchAsync(async (req, res, next) => {
  // Function to fetch nutritional information for a given food
  console.log(req.params.food);

  const response = await axios.get(
    "https://api.api-ninjas.com/v1/nutrition?query=" + req.params.food,
    {
      headers: {
        "X-Api-Key": "GfUSyr5CqEOlf5KAfwxC7A==my5GQmnsj0pUQKgU",
      },
    }
  );
  console.log(response.data[0].calories);
  if (response.data[0].calories) {
    res.json({
      message: "Success",
      data: response.data,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});
const updatecalories = async (req, res, next) => {
  const userId = req.user.id;
  const food = await Food.find({ user: userId });
  if (food) {
    res.json({
      message: "Success",
      data: food,
    });
  } else {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateNutrients = async (req, res) => {
  const userId = req.user.id;
  const { requireProtein, requireCalories, requireCarbs } = req.body;
  const UserData = await Food.find({ user: userId });

  const updatedvalue = await Food.findByIdAndUpdate(
    UserData._id,
    {
      requireProtein: requireProtein,
      requireCalories: requireCalories,
      requireCarbs: requireCarbs,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    updatedvalue,
  });
};

const getMaintainceCalory = async (req, res, next) => {
  const UserID = req?.user?._id;
  const Data = await Food.find({ user: UserID }).sort({ createdAt: -1 });
  res.json({
    maintainceCalory: Data[0]?.requireCalories,
  });
};
// Call the function and pass the food name as an argument

module.exports = {
  calorieCounting,
  CaloriesPerFood,
  saveUserDetails,
  updatecalories,
  updateNutrients,
  getMaintainceCalory,
};

// For men:
// BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)

// For women:
// BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)
