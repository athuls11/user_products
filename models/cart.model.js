import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true }
});

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;
