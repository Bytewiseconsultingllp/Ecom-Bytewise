import mongoose, { Schema, model, models } from 'mongoose';

export interface ISession {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create TTL index to automatically delete expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = models.Session || model<ISession>('Session', SessionSchema);

export default Session;
