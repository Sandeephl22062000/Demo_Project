const axios = require("axios");
const catchAsync = require("../../utils/catchAync");
const Food = require("../../Model/CalorieCountingModel");
const AppError = "../../Error-Handling";
const TargetNutrients = require("../../Model/TargetCalories");
const catchAync = require("../../utils/catchAync");

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
  const userId = req?.user?._id;
  const { requireProtein, requireCalories, requireCarbs } = req.body;
  const UserData = await Food.find({ user: userId });

  console.log(UserData);

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

const targetCalories = async (req, res, next) => {
  const { requireCalories, requireProtein, requireCarbs } = req.body;
  const targetCalories = await TargetNutrients.create({
    user: req?.user?._id,
    requireCalories,
    requireProtein,
    requireCarbs,
  });
  if (targetCalories) {
    res.status(201).json({
      data: targetCalories,
    });
  } else {
    return next(new AppError("Something went wrong", 404));
  }
};

const getTargetNutrients = async (req, res, next) => {
  const targetCalories = await TargetNutrients.find({
    user: req?.user?._id,
  }).sort({ createdAt: -1 });
  if (targetCalories) {
    res.status(201).json({
      data: targetCalories[0],
    });
  } else {
    return next(new AppError("Something went wrong", 404));
  }
};
const getMaintainceCalory = catchAync(async (req, res, next) => {
  const UserID = req?.user?._id;
  const Data = await Food.find({ user: UserID }).sort({ createdAt: -1 });
  res.json({
    maintainceCalory: Data[0]?.requireCalories,
  });
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const makeChatCompletionsRequest = async (req, res) => {
  console.log(OPENAI_API_KEY);
  try {
    const foodtype = req.body.foodType;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `${foodtype} for this content give me the shortest reply`,
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
  calorieCounting,
  CaloriesPerFood,
  saveUserDetails,
  updatecalories,
  updateNutrients,
  getMaintainceCalory,
  makeChatCompletionsRequest,
  targetCalories,
  getTargetNutrients,
};

// For men:
// BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)

// For women:
// BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)

/** but i want it in 5 meals seperated provide as Breakfast, MorningSnacks, Lunch, EveningSnacks and Dinner give output in json format give me atleast 3 item for each meal in output give me only json data in this format for each meal {Item: 'Oatmeal', Calories: 150, Protein: 6, Carbohydrates: 25},without any extra text,dont mention tis type of line Sure, here's a non-vegetarian diet plan divided into 5 meals as per your requirements */
