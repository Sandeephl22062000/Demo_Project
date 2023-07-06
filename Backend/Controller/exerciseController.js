const axios = require("axios");
const fetchExercises = async (req, res, next) => {
  const muscle = req.query.muscle;
  const difficulty = req.query.difficulty;
  const page = req.query.page || 1;
  const limit = req.query.limit || 4;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const exercises = await axios.get(
    `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}`,
    {
      headers: {
        "X-Api-Key": "GfUSyr5CqEOlf5KAfwxC7A==my5GQmnsj0pUQKgU",
      },
    }
  );

  const fetchData = exercises.data;
  const paginatedData = fetchData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(fetchData.length / limit);

  if (exercises) {
    res.status(200).json({
      exercises: paginatedData,
      totalPages,
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
