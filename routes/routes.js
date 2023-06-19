//import Express
import express from "express";

//import functions from controllers
import { showDevices, showDeviceByID, updateDeviceStatus } from "../controllers/device.js";

//init express router
const router = express.Router();

//get all Devices
router.get("/api/devices", showDevices );

//get singel Devices by Id
router.get("/api/devices/:id", showDeviceByID );

//update the Device status
router.put("/api/devices/:id", updateDeviceStatus );

//export default router

export default router;