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
  "/getrequest",
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

router.get(
  "/acceptRequest/:requestID",
  protectingRoutes,
  RequestController.acceptRequest
);

router.get(
  "/rejectRequest/:requestID",
  protectingRoutes,
  RequestController.acceptRequest
);
module.exports = router;
