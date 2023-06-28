//import Express
import express from "express";

//import functions from api
import { showUserByID, userLogin, authUserLogin, userLogout } from '../api/user.js'
import { showAllDeviceswithStatus, showSingleDeviceByID, updateDeviceStatusByID}  from "../api/device.js"
import { setDeviceAsBorrowed } from "../api/borrowdevice.js"



//init express router
const router = express.Router();

// the route to get all Devices with status 
router.get("/api/devices", showAllDeviceswithStatus );

// the route to get a single Device by id with status 
router.get("/api/devices/:id", showSingleDeviceByID );




//update the Device status
router.put("/api/devices/:id", updateDeviceStatusByID );

//get user by id
router.get("/api/users/:id", showUserByID );



// login user with jwt
router.post("/api/users/login" , userLogin );

// egt onfo about user with jwt
router.get("/api/user" , authUserLogin );

// logout delete the jwt cookie from storeage ??????
router.post("/api/users/logout", userLogout);


// new path fro form 
router.post("/api/device/borrow", setDeviceAsBorrowed)
//export default router
export default router;