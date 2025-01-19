import mongoose from "mongoose";
const DeviceSchema = new mongoose.Schema(
  {
    Did: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    waterFlow: [Number],
    pressure: [Number],
    temperature: [Number],
  },
  {
    timestamps: true,
  }
);

export const DeviceModel = mongoose.model("Device", DeviceSchema);
