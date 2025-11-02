const mongoose = require("mongoose")
const initData = require("./data");
const Experiance = require("../models/experiance");
const Hackathon = require("../models/hackathon");
const initHack = require("./hackathons");

const MONGO_URL = "mongodb://127.0.0.1:27017/hackshare";

main()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Experiance.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6900b2687a7d1e16a74ccc60"}));
    await Experiance.insertMany(initData.data);
    console.log("data was initialized");
};

const initHackathons = async () => {
    await Hackathon.deleteMany({});
    await Hackathon.insertMany(initHack.data);
    console.log("data was initialized");
};

initDB();
// initHackathons();