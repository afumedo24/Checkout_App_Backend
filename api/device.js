
//import connection
import db from '../db/database.js';


//get all Devices
export const showAllDevices=(req, res) => {
    db.all("SELECT * FROM device" , (err, results) =>{
        if(err){
            console.log("Error with the showAllDevices Function\n Error: "  , err);
            res.status(500).send({ message: "Error with Server while getting all Devices" });   
        }
        else {
            res.status(200).send(results);
        }
    })
}

//get single device 
export const showSingleDeviceByID=(req,res) => {
    const deviceid = req.params.id; //req.params.id;
    db.get("SELECT * FROM device WHERE id = ?", [deviceid], (err, results) => {
        if(err) {
            console.log("Error with the showSingleDeviceByID Function\n Error: "  , err);
            res.status(500).send({ message: "Error with Server while getting the Device " });   ;   
        }
        
        if(!results){
            res.status(400).send({ message: "Device does not exist" });
        }
        else {
            res.status(200).send(results);
        }
    } )
}

//update device status 
export const updateDeviceStatusByID=(req,res) => {
    const devicestatus = req.body.status;
    const deviceid  = req.params.id;

    db.run("UPDATE device SET status = ? WHERE id = ? ", devicestatus, deviceid , (err, results) => {
        if(err) {
            console.log("Error with the updateDeviceStatusByID Function\n Error: "  , err);
            res.status(500).send({ message: "Error with Server while updating the Device status " });     
        }
        
        res.status(200).send({ message: "Device Status updated successfully "}); 
    })
}



