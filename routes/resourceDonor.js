const express = require("express");
const {
  handleCreateResource,
  handleDeleteResource,
  handleGetAllResources,
  handleUpdateResource,
  handlegetResourceById,
} = require("../controller/resourceDonor");
const router = express.Router();

//we take Resource as a Donor

router.post("/create", handleCreateResource);
router.get("/all", handleGetAllResources);
router.get("/byId/:id", handlegetResourceById);
router.put("/update/:id", handleUpdateResource);
router.delete("/delete/:id", handleDeleteResource);

module.exports = router;
