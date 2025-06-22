require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("../config/db.js");
const User = require("../models/user.model.js");

const seedUsers = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // or use { force: true }

    const users = [];

    for (let i = 201; i <= 400; i++) {
      users.push({
        firstName: `User${i}`,
        lastName: `Test${i}`,
        email: `user${i}@example.com`,
        password: await bcrypt.hash("12345678", 10),
        role: i % 10 === 0 ? "admin" : "user",
        isEmailVerified: true,
        profileImage: null,
      });
    }

    await User.bulkCreate(users);
    console.log("✅ 100 users inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
