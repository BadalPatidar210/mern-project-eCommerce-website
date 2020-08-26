import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";
import bodyParser from "body-parser";

const router = express.Router();
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    author: req.body.author,
    rating: req.body.rating,
    price: req.body.price,
    numReviews: req.body.numReviews,
    countInStock: req.body.countInStock,
    description: req.body.description,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(200)
      .send({ message: "New Product Created.", data: newProduct });
  }
  return res.status(500).send({ message: "Error in Creating Product." });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.category = req.body.category;
    product.image = req.body.image;
    product.author = req.body.author;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.rating = req.body.rating;
    product.numReviews = req.body.numReviews;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated.", data: updatedProduct });
    }
    return res.status(500).send({ message: "Error in Updating Product." });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion");
  }
});
export default router;
