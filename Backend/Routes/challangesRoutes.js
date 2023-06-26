const { protectingRoutes } = require("../Controller/AuthController");
const {
  createChallenge,
  getChallenges,
} = require("../Controller/ChallengeController");
const express = require("express");

const router = express();

router.route("/").post(protectingRoutes, createChallenge);

router.route("/").get(protectingRoutes, getChallenges);

module.exports = router;
