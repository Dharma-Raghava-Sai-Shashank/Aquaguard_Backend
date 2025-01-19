import { Router } from "express";
import {
  Authoftokens,
  isuseradmin,
  LoginUser,
  RegisterUser,
  all_ardinoid,
  all_email,
  create_warehouse,
  get_allwarehouse,
  getting_device
} from "../Conrtoller/User.controller.js";
import { authloginmw, authsignupmw } from "../Middleware/Form.middleware.js";
import { authtoken } from "../Middleware/authtoken.middleware.js";
const userrouter = Router();
console.log("aaya hu routes ");
userrouter.route("/Register").post(authsignupmw, RegisterUser);
userrouter.route("/Login").post(authloginmw, LoginUser);
userrouter.route("/checkforauthentication").post(authtoken, Authoftokens);
userrouter.route("/isuseradmin").post(isuseradmin);
userrouter.route("/all_email").get(all_email);
userrouter.route("/all_aid").get(all_ardinoid);
userrouter.route("/createwarehouse").post(create_warehouse);
userrouter.route("/allwarehouse").get(get_allwarehouse);
userrouter.route("/gettingdevice").post(getting_device);
export default userrouter;
