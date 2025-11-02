const Experiance = require("../models/experiance");

module.exports.allExperiance = async (req, res) => {
  const allExperiance = await Experiance.find({});
  res.render("listings/viewExp", { allExperiance });
};

module.exports.newExperiance = (req, res) => {
  res.render("listings/shareExp");
};

module.exports.createExperiance = async (req, res) => {
  const newExperiance = new Experiance(req.body.experiance);
  newExperiance.owner = req.user._id;
  await newExperiance.save();
  req.flash("success", "You have shared your experiance successfully!");
  res.redirect("/experiance");
};

module.exports.showExperiance = async (req, res) => {
  let { id } = req.params;
  const experiance = await Experiance.findById(id).populate("owner");
  console.log(experiance);
  res.render("listings/showExp", { experiance });
};

module.exports.editExperiance = async (req, res) => {
  let { id } = req.params;
  const experiance = await Experiance.findById(id);
  res.render("listings/editExp", { experiance });
};

module.exports.updateExperiance = async (req, res) => {
  let { id } = req.params;
  await Experiance.findByIdAndUpdate(id, { ...req.body.experiance });
  req.flash("success", "You have updated your experiance successfully!");
  res.redirect(`/experiance/${id}`);
};

module.exports.deleteExperiance = async (req, res) => {
  let { id } = req.params;
  await Experiance.findByIdAndDelete(id);
  req.flash("success", "You have deleted your experiance successfully!");
  res.redirect("/experiance");
};
