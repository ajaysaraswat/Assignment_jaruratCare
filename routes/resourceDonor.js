const express = require("express");
const {
  handleCreateResource,
  handleDeleteResource,
  handleGetAllResources,
  handleUpdateResource,
  handlegetResourceById,
} = require("../controller/resourceDonor");
const { authorizeRole } = require("../middlewares/auth");
const router = express.Router();

//we take Donor as a Resource

router.post("/create", authorizeRole(["Admin"]), handleCreateResource);
router.get("/all", authorizeRole(["Admin", "User"]), handleGetAllResources);
router.get(
  "/byId/:id",
  authorizeRole(["Admin", "User"]),
  handlegetResourceById
);
router.put("/update/:id", authorizeRole(["Admin"]), handleUpdateResource);
router.delete("/delete/:id", authorizeRole(["Admin"]), handleDeleteResource);

module.exports = router;
