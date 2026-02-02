import mongoose, { Schema, model, models } from 'mongoose';

export interface IProduct {
  _id?: mongoose.Types.ObjectId;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: mongoose.Types.ObjectId | string;
  brandId: mongoose.Types.ObjectId | string;
  price: number;
  mrp: number;
  discount: number;
  stock: number;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  specifications: Record<string, string>;
  highlights: string[];
  warranty: string;
  rating: {
    average: number;
    count: number;
  };
  badges: string[];
  inStock: boolean;
  createdBy?: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
      ref: 'Category',
    },
    brandId: {
      type: String,
      required: true,
      ref: 'Brand',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    highlights: [{ type: String }],
    warranty: {
      type: String,
      default: '',
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    badges: [{ type: String }],
    inStock: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: Record<string, unknown>) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
ProductSchema.index({ slug: 1 });
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ brandId: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
