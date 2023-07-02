//import Express
import express from "express";

//import functions from api
import { 
    showAllUser, 
    userLogin, 
    createUser 
} from '../api/user.js'

import { 
    showAllDeviceswithStatus, 
    showSingleDeviceByID, 
    setDeviceAsBorrowed, 
    showAllBorrowedDevice
}  from "../api/device.js"



// init express router
const router = express.Router();



/*       User Routes        */

// the route to log in a user with jwt token
router.post("/api/users/login" , userLogin );

// the route to get all users (admin rights)
router.get("/api/users", showAllUser );

// the route to create a user (admin rights)
router.post("/api/users/create", createUser)


/*       Devices Routes        */

// the route to get all Devices with status 
router.get("/api/devices", showAllDeviceswithStatus );

// the route to get a single Device by id with status 
router.get("/api/devices/:id", showSingleDeviceByID );

// the route to borrow/return a Device 
router.post("/api/device/borrow", setDeviceAsBorrowed)

// the route to get all currently borrowed devices by a user
router.get("/api/users/borrowed/:user", showAllBorrowedDevice)



//export default router
export default router;