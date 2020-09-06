import express from "express";
import cors from "cors";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
// db connectiion
const mongodbUrl = config.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("db connected"))
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
