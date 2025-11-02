const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const adminController = require("../controller/adminController");

// Fetch dashboard with hackathons + registrations
router.get("/", isLoggedIn, adminController.fetchDashboard);

// Create new hackathon
router.post("/", adminController.createHackathon);

// Edit hackathon
router.post("/:id/edit", adminController.editHackathon);

// Delete hackathon
router.post("/:id/delete", adminController.deleteHackathon);

module.exports = router;
