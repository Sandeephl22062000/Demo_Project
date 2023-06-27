const Request = require("../Model/RequestModel");

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
module.exports = { createRequest };
