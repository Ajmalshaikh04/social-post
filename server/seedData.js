// seedData.js
const connectDB = require("./connection/dbconnection");
const Post = require("./models/post");
const dummyData = require("./dummyData.json");

async function seedData() {
  try {
    await connectDB();
    await Post.insertMany(dummyData);
    console.log("Dummy data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding dummy data:", error);
    process.exit(1);
  }
}

seedData();
