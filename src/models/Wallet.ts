import mongoose, { Schema, model, models } from 'mongoose';

export interface IWalletTransaction {
  transactionId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  orderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
}

export interface IWallet {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | string;
  balance: number;
  transactions: IWalletTransaction[];
  lifetimeEarnings: number;
  lifetimeSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      ref: 'User',
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    transactions: [
      {
        transactionId: { type: String, required: true },
        type: { type: String, enum: ['credit', 'debit'], required: true },
        amount: { type: Number, required: true, min: 0 },
        description: { type: String, required: true },
        orderId: { type: String },
        razorpayPaymentId: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    lifetimeEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    lifetimeSpent: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

WalletSchema.index({ userId: 1 });

const Wallet = models.Wallet || model<IWallet>('Wallet', WalletSchema);

export default Wallet;
