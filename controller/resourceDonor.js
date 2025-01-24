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
      createdBy: req.User._id,
    });
    return res
      .status(201)
      .json({ status: "Created Successfully", message: user._id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const handleGetAllResources = async (req, res) => {
  try {
    const resources = await Donor.find({});
    return res.status(200).send({ resources: resources });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

const handlegetResourceById = async (req, res) => {
  try {
    const id = req.params.id;
    const resource = await Donor.findById({ _id: id });
    if (!resource) return res.json({ message: "resource not found !" });
    return res.status(200).send({ resource: resource });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const handleUpdateResource = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await Donor.findByIdAndUpdate(
      { _id: id },
      { $set: updateData }
    );
    if (result.markModified === 0) {
      return res.json({ status: "Event doesn't found" });
    }
    res.status(200).json({
      status: "Resource Update sucessfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: `failure due to some issues ${err.message}`,
    });
  }
};
const handleDeleteResource = async (req, res) => {
  try {
    const id = req.params.id;
    await Donor.findByIdAndDelete({ _id: id });
    return res.status(200).json({ status: "Resource Deleted succesfully" });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: `failure due to some issues ${err.message}`,
    });
  }
};

module.exports = {
  handleCreateResource,
  handleGetAllResources,
  handlegetResourceById,
  handleUpdateResource,
  handleDeleteResource,
};
