const axios = require("axios");
const fetchExercises = async (req, res, next) => {
  var muscle = req.query.muscle;
  var difficulty = req.query.difficulty;
  console.log(req.query);
  const exercises = await axios.get(
    `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}`,
    {
      headers: {
        "X-Api-Key": "GfUSyr5CqEOlf5KAfwxC7A==my5GQmnsj0pUQKgU",
      },
    }
  );
  console.log(exercises);
  const fetchData = exercises.data;
  if (exercises) {
    res.status(200).json({
      exercises: fetchData,
      status: "Success",
    });
  } else {
    return next(new AppError("Something went wrong", 000));
  }
};

const exercise = async (req, res) => {
  const exercises = await axios.get(
    `https://api.api-ninjas.com/v1/exercises?chest`,
    {
      headers: {
        "X-Api-Key": "GfUSyr5CqEOlf5KAfwxC7A==my5GQmnsj0pUQKgU",
      },
    }
  );
  const fetchData = exercises.data;
  if (exercises) {
    res.status(200).json({
      exercises: fetchData,
      status: "Success",
    });
  } else {
    return next(new AppError("Something went wrong", 000));
  }
};
module.exports = {
  fetchExercises,
  exercise,
};
