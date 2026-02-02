import mongoose, { Schema, model, models } from 'mongoose';

export interface IWishlist {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | string;
  productIds: (mongoose.Types.ObjectId | string)[];
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
