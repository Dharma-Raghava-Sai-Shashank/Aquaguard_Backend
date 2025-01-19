import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "default-avatar-url.jpg",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("Useragglo", UserSchema);
