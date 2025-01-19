import mongoose from "mongoose";
const Warehouseschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    Deviceid: {
      type: String,
      default: "default-avatar-url.jpg",
    },
    admin: {
      type: String,
      required: true,
    },
    assigned_user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Warehousemodel = mongoose.model("warehouse", Warehouseschema);
