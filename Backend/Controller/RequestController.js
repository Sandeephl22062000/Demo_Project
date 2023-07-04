const Request = require("../Model/RequestModel");
const User = require("../Model/UserModel");
const createRequest = async (req, res, next) => {
  const trainerID = req.params.trainerID;
  const { message } = req.body;
  const SendRequest = await Request.create({
    user: req.user._id,
    trainer: trainerID,
    message,
  });
  console.log(SendRequest);
  if (SendRequest) {
    res.status(201).json({
      message: "Success",
      request: SendRequest,
    });
  }
};

const getAllRequestOfTrainer = async (req, res, next) => {
  const trainerID = req.params.trainerID;

  const getRequests = await Request.find({
    trainer: trainerID,
  });
  console.log(getRequests);
  if (getRequests) {
    res.status(201).json({
      message: "Success",
      request: getRequests,
    });
  }
};

const getAllRequestOFUser = async (req, res, next) => {
  const userID = req.params.userID;

  const getRequests = await Request.findOne({ user: req?.user?._id }).sort({
    createdAt: -1,
  });
  console.log(getRequests);
  if (getRequests) {
    res.status(201).json({
      message: "Success",
      request: getRequests,
    });
  }
};

const acceptRequest = async (req, res, next) => {
  const requestID = req.params.requestID;

  const getRequest = await Request.findByIdAndUpdate(
    requestID,
    {
      isAccepted: true,
      isPending: false,
      isRejected: false,
    },
    {
      new: true,
    }
  );
  if (getRequest) {
    res.status(201).json({
      message: "Success",
      request: getRequest,
    });
  }
};

const rejectRequest = async (req, res, next) => {
  const requestID = req.params.requestID;

  const getRequests = await Request.findByIdAndUpdate(
    requestID,
    {
      isRejected: true,
      isPending: false,
      isAccepted: false,
    },
    {
      new: true,
    }
  );

  console.log(getRequests);
  if (getRequests) {
    res.status(201).json({
      message: "Success",
      request: getRequests,
    });
  }
};

const getAcceptedNoatifcation = async (req, res, next) => {
  console.log("fsdfsdfsdf", req.user.role === 0);
  let getRequests;
  if (req.user.role === 0) {
    getRequests = await Request.find({
      user: req?.user?._id,
      isAccepted: true,
      isPending: false,
    })
      .sort({ createdAt: -1 })
      .populate("trainer", "name photo");
    console.log("dfvdfvdf", getRequests);
    if (getRequests) {
      res.status(201).json({
        message: "Success",
        request: getRequests,
      });
    }
  } else {
    getRequests = await Request.find({
      trainer: req?.user?._id,
      isAccepted: true,
      isPending: false,
    })
      .sort({ createdAt: -1 })
      .populate("user", "name photo");
    console.log("dfvdfvdf", getRequests);

    if (getRequests) {
      res.status(201).json({
        message: "Success",
        request: getRequests,
      });
    }
  }

  console.log("dfvdfvdf", getRequests);
};

const getRejectedNoatifcation = async (req, res, next) => {
  console.log("fsdfsdfsdf", req.user.role === 0);
  let getRequests;
  if (req.user.role === 0) {
    getRequests = await Request.find({
      user: req?.user?._id,
      isRejected: true,
      isPending: false,
    })
      .sort({ createdAt: -1 })
      .populate("trainer", "name photo");
    console.log("dfvdfvdf", getRequests);
    if (getRequests) {
      res.status(201).json({
        message: "Success",
        request: getRequests,
      });
    }
  } else {
    getRequests = await Request.find({
      trainer: req?.user?._id,
      isRejected: true,
      isPending: false,
    })
      .sort({ createdAt: -1 })
      .populate("user", "name photo");
    console.log("dfvdfvdf", getRequests);

    if (getRequests) {
      res.status(201).json({
        message: "Success",
        request: getRequests,
      });
    }
  }

  console.log("dfvdfvdf", getRequests);
};

const isPendingRequest = async (req, res, next) => {
  let getRequests;
  if (req.user.role === 0) {
    getRequests = await Request.find({
      user: req?.user?._id,
      isPending: true,
    })
      .sort({ createdAt: -1 })
      .populate("trainer", "name photo");
    console.log("dfvdfvdfpeenidng ", getRequests);
    if (getRequests) {
      res.status(201).json({
        message: "Success",
        request: getRequests,
      });
    }
  } else {
    const getRequest = await Request.find({
      trainer: req?.user?._id,
      isPending: true,
    })
      .sort({ createdAt: -1 })
      .populate("user", "name photo");

    console.log("dfvdfvdfhjmhjm", getRequest);

    if (getRequest) {
      res.status(201).json({
        message: "Success",
        request: getRequest,
      });
    }
  }
};
const unReadMessages = async (req, res, next) => {
  let getRequests;
  if (req.user.role === 0) {
    getRequests = await Request.find({
      user: req?.user?._id,
      isPending: false,
    }).sort({ createdAt: -1 });
    console.log("dfvdfvdf", getRequests);
  } else {
    getRequests = await Request.find({
      trainer: req?.user?._id,
      isPending: false,
    }).sort({ createdAt: -1 });
    console.log("dfvdfvdf", getRequests);
  }

  getRequests.forEach(async (request) => {
    request.isRead = true;
    await request.save();
  });

  console.log(getRequests);
  if (getRequests) {
    res.status(201).json({
      message: "Success",
      request: getRequests,
    });
  }
};

module.exports = {
  createRequest,
  getAllRequestOfTrainer,
  getAcceptedNoatifcation,
  isPendingRequest,
  getRejectedNoatifcation,
  getAllRequestOFUser,
  unReadMessages,
  rejectRequest,
  acceptRequest,
};
