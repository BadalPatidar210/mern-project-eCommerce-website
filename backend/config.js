import dotenv from "dotenv";
dotenv.config();

export default {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://badal:badal@cluster0.oqqbx.mongodb.net/ecomm?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};
