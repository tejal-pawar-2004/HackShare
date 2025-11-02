const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const experienceController = require("../controller/experienceController");

//All Experiance
router.get("/", wrapAsync(experienceController.allExperiance));

//New Route
router.get("/shareExp", isLoggedIn, experienceController.newExperiance);

//Create Route
router.post("/", isLoggedIn, wrapAsync(experienceController.createExperiance));

//Show Experiance Route
router.get("/:id", wrapAsync(experienceController.showExperiance));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(experienceController.editExperiance)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  wrapAsync(experienceController.updateExperiance)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(experienceController.deleteExperiance)
);

module.exports = router;
