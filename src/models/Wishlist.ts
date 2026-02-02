import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IWishlist extends Document {
  _id: string;
  userId: string;
  productIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      ref: 'User',
    },
    productIds: [
      {
        type: String,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

WishlistSchema.index({ userId: 1 });

const Wishlist = models.Wishlist || model<IWishlist>('Wishlist', WishlistSchema);

export default Wishlist;
