const Hackathon = require("../models/hackathon");
const Registration = require("../models/registration");

module.exports.showRegistrationForm = async (req, res) => {
  const { id } = req.params;
  const hackathon = await Hackathon.findById(id);

  if (!hackathon) {
    return res.status(404).render("error", { message: "Hackathon not found!" });
  }

  res.render("listings/register", { hackathon });
};

module.exports.submitRegistrationForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName, hackathon, teamMembers } = req.body;

    const registration = new Registration({
      teamName,
      teamMembers,
      hackathon: id,
    });

    await registration.save();
    res.render("listings/success");
  } catch (err) {
    console.error("Error registering team:", err);
    res.status(400).send("Error registering team: " + err.message);
  }
};
