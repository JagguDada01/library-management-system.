import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

async function seedAdmin() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set"
    );
  }

  if (password.length < 12) {
    throw new Error(
      "Administrator password must contain at least 12 characters"
    );
  }

  await connectDB();

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  let user = await User.findOne({ email: normalizedEmail });

  if (user) {
    user.name = name.trim();
    user.passwordHash = passwordHash;
    user.role = "admin";
    await user.save();
  } else {
    user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: "admin"
    });
  }

  console.log("Administrator account provisioned:", normalizedEmail);
}

seedAdmin()
  .catch((error) => {
    console.error("Administrator setup failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
