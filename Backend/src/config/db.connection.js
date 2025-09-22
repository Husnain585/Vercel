import "dotenv/config";
import { Sequelize } from "sequelize";

// Validate environment variable
if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing environment variable: DATABASE_URL");
}

// Initialize Sequelize using DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // set to console.log for debugging
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
})();

// Graceful shutdown
const shutdown = async () => {
  await sequelize.close();
  console.log("🔌 Database connection closed.");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default sequelize;
