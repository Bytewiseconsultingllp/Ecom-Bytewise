import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface ICartItem {
  productId: string;
  quantity: number;
  price: number;
  addedAt: Date;
}

export interface ICart extends Document {
  _id: string;
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      ref: 'User',
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

CartSchema.index({ userId: 1 });

const Cart = models.Cart || model<ICart>('Cart', CartSchema);

export default Cart;
