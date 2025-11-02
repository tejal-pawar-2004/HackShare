const Hackathon = require("../models/hackathon");

module.exports.allHackathons = async (req, res) => {
  const allHackathons = await Hackathon.find({});
  res.render("listings/hackathons", { allHackathons });
};

module.exports.showHackathon = async (req, res) => {
  let { id } = req.params;
  const hackathon = await Hackathon.findById(id);
  res.render("listings/showHacks", { hackathon });
};
