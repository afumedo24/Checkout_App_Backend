//import functions from Device model
import {
    getallDevices,
    getDeviceByID,
    updateDeviceStatus,
} from "../models/DeviceModel.js";

//get all Devices
export const showDevices= (req, res) => {
    getallDevices( (err,results) => {
        if(err) {
            res.status(500).send(err);
            console.log("Error with the Controller getallDevices");
        }
        else {
            res.status(200).json(results);  
        }
    });
}

//get single device 
export const showDeviceByID=(req,res) => {
    var deviceid = req.params.id; //req.params.id;
    // console.log(req.params.id);
    getDeviceByID( deviceid , (err, results) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(results);  
            
        }
    });
}

//update device status 
export const updateDeviceStatusByID=(req,res) => {
    const status = req.body.status;
    const id  = req.params.id;
    updateDeviceStatus(status, id, (err, results) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json('Success');  
        }
    });
}