
//import connection
import db from '../db/database.js';


// Query the device_owner table to check if the device exists and get its status
function getDeviceStatus(deviceId) {
    return new Promise((resolve, reject) => {
        // order by desc damit wir den neusten eintrag haben 
      db.get('SELECT * FROM device_owner WHERE device_id = ? ORDER BY id DESC', deviceId, (err, results) => {
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
                  const status = await getDeviceStatus(device.id);
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


/*
    this function is for the borrowing/returning Process 
    we extract the required properties from the request body for
    the database entry then we find for the newstatus 

*/
export const setDeviceAsBorrowed=(req, res) =>  {
    // 
    const username = req.body.username;
    const deviceid = req.body.deviceid;
    const newstatus = req.body.newstatus;
    const date = req.body.date;

    if(newstatus === 'borrowing' ) {
        db.run("INSERT INTO device_owner (device_id, name, receive_date) VALUES (?, ?, ?)", deviceid , username, date, (err, results) => {
            if(err) {
                console.log("Error with the setDeviceasBorrowed Function\n Error: "  , err);
                res.status(500).send({ message: "Error with Server while setting the Device status " });     
            }

            res.status(200).send({ message: "Device successfully borrowed "}); 
        }) 
    }

    else {
        db.run("UPDATE device_owner SET return_date = ?  WHERE device_id = ?", date, deviceid , (err, results) => {
            if(err) {
                console.log("Error with the setDeviceasBorrowed Function\n Error: "  , err);
                res.status(500).send({ message: "Error with Server while setting the Device status " });     
            }
    
            res.status(200).send({ message: "Device successfully returned back "}); 
        }) 
    }
}


// get all borrowed Devices of a user from database
export const showAllBorrowedDevice=(req, res) => {

    const name = req.params.user;
    db.all(`SELECT do.*, d.name, d.image FROM device_owner do 
            JOIN device d ON do.device_id = d.id
            WHERE do.name = ? AND do.return_date IS NULL` , name, async (err, results) => {
        if(err) {
            console.log("Error with the showAllBorrowedDevice Function\n Error: "  , err);
            res.status(500).send({ message: "Error with Server while fetching all borrowed Devices" });     
        }
        else {
            const devicesWithStatus = await Promise.all(
                results.map(async device => {
                  const status = await getDeviceStatus(device.device_id);
                  return { ...device, status };
                })
            );
            res.status(200).send(devicesWithStatus);
        }
    })
}





