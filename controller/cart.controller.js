import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

export const addProducts = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        items: [],
      });
    }

    const existingItemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: productId, quantity: quantity });
    }

    await cart.save();
    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    let userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (existingItemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cart.items.splice(existingItemIndex, 1);
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
