import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICounter extends Document {
  name: string;
  sequence: number;
}

const CounterSchema = new Schema<ICounter>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    sequence: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Counter: Model<ICounter> =
  mongoose.models.Counter || mongoose.model<ICounter>("Counter", CounterSchema);

export default Counter;
