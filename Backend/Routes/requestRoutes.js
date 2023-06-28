const express = require("express");
const { protectingRoutes } = require("../Controller/AuthController");
const RequestController = require("../Controller/RequestController");
const router = express.Router();

router.get(
  "/getallrequestofuser",
  protectingRoutes,
  RequestController.getAllRequestOFUser
);
router.post(
  "/createrequest/:trainerID",
  protectingRoutes,
  RequestController.createRequest
);

router.get(
  "/getrequest/:trainerID",
  protectingRoutes,
  RequestController.getAllRequestOfTrainer
);

router.get(
  "/getAcceptedNoatifcation",
  protectingRoutes,
  RequestController.getAcceptedNoatifcation
);

router.get(
  "/readedmessage",
  protectingRoutes,
  RequestController.unReadMessages
);
module.exports = router;
