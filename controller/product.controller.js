import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    // Extract product information from the request body
    const { name, description, price, quantity } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Return the newly created product as the response
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const viewAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(201).json({
      success: true,
      message: "Fetch all product details successfully.",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
