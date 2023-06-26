const Challenge = require("../Model/ChallengeModel");

const createChallenge = async (req, res, next) => {
  const { receiver, challengeName, challengeDescription } = req.body;
  const newChallenge = await Challenge.create({
    sender: req.user._id,
    receiver,
    challengeName,
    challengeDescription,
  });
  console.log(newChallenge);
  res.status(201).json({
    message: "Success",
    body: newChallenge,
  });
};

const getChallenges = async (req, res, next) => {
  const { receiver, challengeName, challengeDescription } = req.body;
  const Challenges = await Challenge.find()
    .populate("receiver", "name photo")
    .populate("sender", "name photo");
  console.log(Challenges);
  res.status(201).json({
    message: "Success",
    body: Challenges,
  });
};
module.exports = { createChallenge, getChallenges };
