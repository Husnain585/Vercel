import "dotenv/config";

const config = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  apiBaseUrl: "http://localhost:3000/api",
};

export default config;
