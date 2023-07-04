const Services = require("../Model/ServicesModel");

const createServices = async (req, res) => {
  try {
    const { service } = req.body;
    console.log(service);
    const newservice = await Services.create({
      trainer: req.user._id,
      duration: service.duration,
      description: service.description,
      charges: service.charges,
    });
    console.log(newservice);
    res.status(201).json({ service: newservice, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateServices = async (req, res) => {
  try {
    const { services } = req.body;

    if (services.length !== 4) {
      return res.status(400).json({ message: "Please provide 4 services" });
    }

    const newServices = await Services.create({
      servicesOffered: services,
      trainer: req?.user?._id,
    });
    console.log(newServices);

    res.status(201).json({ message: "Services created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getServicesOfTrainer = async (req, res, next) => {
  const services = await Services.find({ trainer: req?.params?.trainerID });
  console.log(services);
  res.status(200).json({
    message: "success",
    services,
  });
};

module.exports = { createServices, getServicesOfTrainer, updateServices };
