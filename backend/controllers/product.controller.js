import mongoose from "mongoose";
import Product from "../../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log("Error in fetching products", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error...Failed to fetch products",
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; //user will send the product data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log("Error in creating product", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error...Failed to create product",
      message: "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product id",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("Product not found...", error.message);
    res.status(400).json({
      success: false,
      message: "Product not found...Failed to update product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product id",
    });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Product not found...", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error...Failed to delete product",
    });
  }
};
