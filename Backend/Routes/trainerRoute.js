const express = require("express");
const router = express.Router();
const TrainerController = require("../Controller/TrainerController/trainerController");

// router.route("/").post(TrainerController.RegisterTrainer);
// router.route("/login").post(TrainerController.loginTrainer);
router.route("/approverequest").post(TrainerController.approveRequest);
router.route("/trainertoapprove").get(TrainerController.TrainerToApprove);


// router.route("/login").post(TrainerController.loginRegister);
router.route("/trainerDetail/:id").get(TrainerController.getTrainerById);
router.route("/:trainer/:page").get(TrainerController.getAlltrainer);
router.route("/:page").get(TrainerController.getTrainers);
// router.route("/updatePassword").post(UserController.updatePassword);

module.exports = router;
