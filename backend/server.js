import express from "express";
import cors from "cors";
import config from "./config";
import dotenv, { parse } from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).
  then(console.log("db connected"))
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

// app.get("/api/product/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find((x) => x._id === +productId);

//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ msg: "Product Not Found" });
//   }
// });

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
