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
  "/getacceptedrequest",
  protectingRoutes,
  RequestController.getAcceptedNoatifcation
);


router.get(
  "/getrejectedrequest",
  protectingRoutes,
  RequestController.getRejectedNoatifcation
);

router.get(
  "/readedmessage",
  protectingRoutes,
  RequestController.unReadMessages
);

router.get(
  "/pendingRequest",
  protectingRoutes,
  RequestController.isPendingRequest
);

router.post(
  "/acceptRequest/:requestID",
  protectingRoutes,
  RequestController.acceptRequest
);

router.get(
  "/rejectRequest/:requestID",
  protectingRoutes,
  RequestController.rejectRequest
);
module.exports = router;
