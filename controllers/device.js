//import functions from Device model
import {
    getallDevices,
    getDeviceByID,
    updateDevice,
} from "../models/DeviceModel.js";

//get all Devices
export const showDevices= (req, res) => {
    getallDevices( (err,results) => {
        if(err) {
            res.status(500).send(err);
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
export const updateDeviceStatus=(req,res) => {
    const data = req.body;
    const id = req.params.id;
    updateDevice(data, id, (err, results) => {
        if(err) {
            res.send(err);
        }
        else {
            res.json(results);  
        }
    });
}