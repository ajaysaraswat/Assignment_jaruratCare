const Donor = require("../model/resourceDonor");

const handleCreateResource = async (req, res) => {
  try {
    const body = req.body;
    if (!body) return res.status(400).send({ message: "invalid body" });
    const donor = await Donor.create({
      name: body.name,
      email: body.email,
      donationAmount: body.donationAmount,
      message: body.message,
    });
    return res
      .status(201)
      .json({ status: "Created Successfully", message: user._id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const handleGetAllResources = (req, res) => {};
const handlegetResourceById = (req, res) => {};
const handleUpdateResource = (req, res) => {};
const handleDeleteResource = (req, res) => {};

module.exports = {
  handleCreateResource,
  handleGetAllResources,
  handlegetResourceById,
  handleUpdateResource,
  handleDeleteResource,
};
