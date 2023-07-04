const express = require("express");
const router = express.Router();
const TrainerController = require("../Controller/TrainerController/trainerController");
const serviceController = require("../Controller/servicesController");
const { protectingRoutes } = require("../Controller/AuthController");
// router.route("/").post(TrainerController.RegisterTrainer);
// router.route("/login").post(TrainerController.loginTrainer);
router.route("/approverequest").post(TrainerController.approveRequest);
router.route("/trainertoapprove").get(TrainerController.TrainerToApprove);

router
  .route("/services")
  .post(protectingRoutes, serviceController.createServices);

router
  .route("/getallservice/:trainerID")
  .get(protectingRoutes, serviceController.getServicesOfTrainer);

router
  .route("/editServices/:serviceID")
  .put(protectingRoutes, serviceController.editServices);

  router
  .route("/deleteServices/:serviceID")
  .delete(protectingRoutes, serviceController.deleteServices);

router.route("/trainerDetail/:id").get(TrainerController.getTrainerById);
router.route("/:trainer/:page").get(TrainerController.getAlltrainer);
router.route("/:page").get(TrainerController.getTrainers);
// router.route("/updatePassword").post(UserController.updatePassword);

module.exports = router;
