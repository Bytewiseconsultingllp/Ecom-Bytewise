import mongoose, { Schema, model, models } from 'mongoose';

export interface IBrand {
  _id?: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    logo: {
      type: String,
      required: true,
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

BrandSchema.index({ slug: 1 });

const Brand = models.Brand || model<IBrand>('Brand', BrandSchema);

export default Brand;
