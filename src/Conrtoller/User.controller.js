import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../Model/User.js";
import { DeviceModel } from "../Model/Devices.js";
import ApiResponse from "../Utils/Apiresponse.js";
import { Warehousemodel } from "../Model/Warehouse.js";
// const check = async (req, res) => {
//   try {
//     res.status(200).json({
//       message: "done",
//       data: "done manually",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: `Having error while creating collaboration request: ${error.message}`,
//     });
//   }
// };

const RegisterUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    console.log(username, email, password);
    const user = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (user) {
      return res.status(404).json({ message: "User exists already ,do login" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = await UserModel.create({
      username,
      email,
      password: hashpassword,
      isadmin: isAdmin,
    });
    const createduser = await UserModel.findById(newuser._id);
    if (!createduser) {
      return res
        .status(404)
        .json({ message: "Server issue while creating user" });
    }
    res
      .status(200)
      .json(new ApiResponse(200, createduser, "User registered successfully"));
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Having error in the registering user ${error}` });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    $or: [{ email }],
  });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User is not exists in the database , do register " });
  }
  const ispasscorrect = await bcrypt.compare(password, user.password);
  console.log(ispasscorrect);
  if (!ispasscorrect) {
    return res.status(404).json({ message: "wrong password " });
  }
  const jsonewbestoken = jwt.sign(
    { email: user.email, _id: user.id },
    process.env.Authentication_for_jsonwebtoken,
    { expiresIn: "24h" }
  );
  res.status(200).json({
    message: "User login successfully",
    success: "true",
    user: user,
    jwttoken: jsonewbestoken,
  });
};
const Authoftokens = async (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, "Token Verifeid successfully"));
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Having error in the verifying user ${error}` });
  }
};

const isuseradmin = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const user = await UserModel.findById(id);
    console.log(user);
    console.log(user.isadmin);
    if (!id) return res.status(404).json({ message: `User not registered` });
    return res.status(200).json({
      message: user.isadmin,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Having error in the verifying user ${error}` });
  }
};

const all_email = async (req, res) => {
  try {
    const emails = await UserModel.find({}, "email");
    const emailList = emails.map((user) => user.email);
    res.status(200).json(emailList);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ message: "Error fetching emails." });
  }
};

const all_ardinoid = async (req, res) => {
  try {
    const arduinoIds = await DeviceModel.find({}, "Did");
    console.log(arduinoIds);
    const deviceIdList = arduinoIds.map((device) => device.Did);
    res.status(200).json(deviceIdList);
  } catch (error) {
    console.error("Error fetching Arduino IDs:", error);
    res.status(500).json({ message: "Error fetching Arduino IDs." });
  }
};

const create_warehouse = async (req, res) => {
  const { name, location, Deviceid, Assigned_user, admin } = req.body;
  if (!name || !location || !Deviceid || !Assigned_user || !admin) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const warehouse = await Warehousemodel.create({
      name,
      location,
      Deviceid,
      assigned_user: Assigned_user,
      admin,
    });
    return res.status(201).json({
      message: "Warehouse created successfully",
      data: warehouse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create warehouse",
      error: error.message,
    });
  }
};
const get_allwarehouse = async (req, res) => {
  try {
    const warehouses = await Warehousemodel.find({});

    return res.status(200).json({
      message: "All warehouses fetched successfully",
      data: warehouses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch warehouses",
      error: error.message,
    });
  }
};

const warehouseaddedbyadmin = async (req, res) => {
  try {
    const {} = req.body;

    return res.status(200).json({
      message: "All warehouses fetched successfully",
      data: warehouses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch warehouses",
      error: error.message,
    });
  }
};
const getting_device = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const device = await DeviceModel.find({ Did: id });
    console.log(device);
    return res.status(200).json({
      message:"huss",
      data:device
    })
  } catch (error) {
    return res.status(400).json({
      message:`failed in fetching device ${error}`,
    })
  }
};
export {
  LoginUser,
  RegisterUser,
  Authoftokens,
  isuseradmin,
  all_ardinoid,
  all_email,
  create_warehouse,
  get_allwarehouse,
  warehouseaddedbyadmin,
  getting_device
};
