
//import connection
import db from '../db/database.js';

//get all devices
export const getallDevices=(result)=>{
    db.all("SELECT * FROM device" , (err, results) =>{
        if(err){
            console.log("Error with the getallDevices Modal: "  , err);
            result(err, null);   
        }
        else {
            result(null, results);
        }
    })
}

//get single device 
export const getDeviceByID=(id, result) => { 
    db.get("SELECT * FROM device WHERE id = ?", [id], (err, results) => {
        if(err) {
            console.log("Error with the getDeviceByID Modal: "  , err);
            result(err, null);   
        }
        else {
            result(null, results);
        }
    } )
}


//update the device status
export const updateDeviceStatus = ( newstatus, id, result) => { 
    db.run("UPDATE device SET status = ? WHERE id = ? ", newstatus, id , (err, results) => {
        if(err) {
            console.log("Error with the updateDevice Modal: "  , err);
            result(err, null);   
        }
        else {
            result(null, results);
        }
    } )
}


 
