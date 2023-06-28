
//import connection
import db from '../db/database.js';


// get all device with the status fom the database
export const showAllDeviceswithStatus=(req, res) => {
   
    db.all("SELECT * FROM device" , async (err, results) =>{
        if(err){
            console.log("Error with the showAllDevices Function\n Error: "  , err);
            res.status(500).send({ message: "Error with Server while getting all Devices" });   
        }
        else {
            const devicesWithStatus = await Promise.all(
                results.map(async device => {
                  //console.log(device.id);
                  const status = await getDeviceStatus(device.id);
                  //console.log(newstatus);
                  return { ...device, status };
                })
            );
            //console.log(devicesWithStatus);
            res.status(200).send(devicesWithStatus);
        }
    })
}


// get a single device with status by the id
export const showSingleDeviceByID=(req,res) => {
    const deviceid = req.params.id; 
    db.get("SELECT * FROM device WHERE id = ?", deviceid, async (err, results) => {
        
        // if a error happens with the database query
        if(err) {
            console.log("Error with the showSingleDeviceByID Function\n Error: "  , err);
            res.status(500).send({ message: "Error with Server while fetching the Device " });   ;   
        }

        // if the device is not in the database
        else if(!results){
            res.status(400).send({ message: "Device does not exist" });
        }

        /*  
            if device is found then
            ->  get the device status with the getDeviceStatus() function 
                and append a new key(status) with the value(from the function)
                to the returned object(device)
        */
        try {
            results.status =  await getDeviceStatus(results.id);
            res.status(200).send(results);
        } catch (err) {
            console.error('Error fetching single device with status: ', err);
            res.sendStatus(500);
        }        
    })
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

/*

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



//update device status 
export const mapDeviceStatus=(req,res) => {

    // Modify the API response from Step 2 to include the device status
    db.all('SELECT * FROM devices', async (err, rows) => {
      if (err) {
        console.error('Error fetching devices:', err);
        res.sendStatus(500);
      } else {
        // Iterate over the devices and determine their statuses
        const devicesWithStatus = await Promise.all(
          rows.map(async device => {
            console.log(rows);
            const status = await getDeviceStatus(device.id);
            return { ...device, status };
          })
        );
          console.log(devicesWithStatus);
        res.status(200).json(rows);
      }
    });
};
*/

// Query the device_owner table to check if the device exists and get its status
function getDeviceStatus(deviceId) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM device_owner WHERE device_id = ?', deviceId, (err, results) => {
        if (err) {
          reject(err);
        } else if (!results) {
          resolve('Available'); // Device not found in device_owner table, so it's available
        } else if (results.return_date === null) {
          resolve('Borrowed'); // Device found in device_owner table, but return_date is null, so it's unavailable
        } else {
          resolve('Available'); // Device found in device_owner table and return_date is not null, so it's available
        }
      });
    });
  }
  




