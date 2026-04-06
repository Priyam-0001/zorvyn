import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { Finance } from "./models/finance.model.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);

  console.log("Connected to DB");

  // Clear existing data
  await User.deleteMany();
  await Finance.deleteMany();

  // 👤 USERS
  const users = [
    {
      name: "Admin User",
      email: "admin@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "ADMIN"
    },
    {
      name: "Analyst User",
      email: "analyst@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "ANALYST"
    },
    {
      name: "Viewer User",
      email: "viewer@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "VIEWER"
    }
  ];

  await User.insertMany(users);

  // 💰 FINANCE DATA GENERATOR
  const categories = [
    "Food",
    "Transport",
    "Rent",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Travel"
  ];

  const financeData = [];

  // Generate data for Jan → April
  for (let month = 0; month < 4; month++) {
    // Salary (monthly income)
    financeData.push({
      amount: 50000 + Math.floor(Math.random() * 5000),
      type: "INCOME",
      category: "Salary",
      date: new Date(2026, month, 1),
      notes: "Monthly salary"
    });

    // Freelance (random)
    financeData.push({
      amount: 5000 + Math.floor(Math.random() * 5000),
      type: "INCOME",
      category: "Freelance",
      date: new Date(2026, month, 10),
      notes: "Freelance work"
    });

    // Expenses (random 8 per month)
    for (let i = 0; i < 8; i++) {
      financeData.push({
        amount: 500 + Math.floor(Math.random() * 5000),
        type: "EXPENSE",
        category: categories[Math.floor(Math.random() * categories.length)],
        date: new Date(2026, month, Math.floor(Math.random() * 28) + 1),
        notes: "Expense"
      });
    }
  }

  await Finance.insertMany(financeData);

  console.log("Seed data inserted successfully");
  console.log(`Inserted ${financeData.length} finance records`);

  process.exit();
};

seed();