const Hackathon = require("../models/hackathon");
const Registration = require("../models/registration");

module.exports.fetchDashboard = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    const registrations = await Registration.find()
      .populate("hackathon", "name")
      .lean();

    // Dashboard summary data
    const totalHackathons = hackathons.length;
    const totalParticipants = registrations.length;
    const activeEvents = hackathons.filter(
      (h) => h.status === "ongoing"
    ).length;
    const engagementRate = totalHackathons
      ? ((activeEvents / totalHackathons) * 100).toFixed(0)
      : 0;

    // Render page with all data
    res.render("admin/adminDashboard", {
      hackathons,
      registrations,
      totalHackathons,
      totalParticipants,
      activeEvents,
      engagementRate,
    });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Error loading dashboard");
  }
};

module.exports.createHackathon = async(req, res) => {
  try {
    const newHackathon = new Hackathon({
      name: req.body.name,
      description: req.body.description,
      organizer: req.body.organizer,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      registrationDeadline: req.body.registrationDeadline,
      location: req.body.location,
      image: req.body.image || "default-hackathon.jpg",
      tags: req.body.tags?.split(",").map((tag) => tag.trim()),
      createdBy: req.user ? req.user._id : null, // only if using login system
    });
    await newHackathon.save();
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating hackathon");
  }
};

module.exports.editHackathon = async (req, res) => {
  try {
    await Hackathon.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      organizer: req.body.organizer,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      registrationDeadline: req.body.registrationDeadline,
      location: req.body.location,
      registrationLink: req.body.registrationLink,
      image: req.body.image,
      tags: req.body.tags?.split(",").map((tag) => tag.trim()),
      status: req.body.status,
    });
    res.redirect("/admin");
  } catch (err) {
    console.error("Error updating hackathon:", err);
    res.status(500).send("Error updating hackathon");
  }
};

module.exports.deleteHackathon = async (req, res) => {
  try {
    await Hackathon.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting hackathon:", err);
    res.status(500).send("Error deleting hackathon");
  }
};
