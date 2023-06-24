//import Express
import express from "express";

//import functions from api
import { showUserByID } from '../api/user.js'
import { showAllDevices, showSingleDeviceByID, updateDeviceStatusByID}  from "../api/device.js"

//init express router
const router = express.Router();

//get all Devices
router.get("/api/devices", showAllDevices );

//get singel Devices by Id
router.get("/api/devices/:id", showSingleDeviceByID );

//update the Device status
router.put("/api/devices/:id", updateDeviceStatusByID );

//get user by id
router.get("/api/users/:id", showUserByID );


//export default router
export default router;