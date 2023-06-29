//import db for the database connection
import db from '../db/database.js';

/*
    this function is for the borrowing/returning Process 
    we extract the required properties (from the request body)
    needed for the database entry then we differ for the newstatus 

*/
export const setDeviceAsBorrowed=(req, res) =>  {
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

  /*
    so here, there are two version of the code, you can change it for your case
    Version 1(which is not )
  */
    /* 
  else {
    db.run("UPDATE device_owner SET return_date = ?  WHERE device_id = ?", date, deviceid , (err, results) => {
        if(err) {
            console.log("Error with the setDeviceasBorrowed Function\n Error: "  , err);
            res.status(500).send({ message: "Error with Server while setting the Device status " });     
        }

        res.status(200).send({ message: "Device successfully returned back "}); 
    }) 
}

    else {
        db.run("UPDATE device_owner SET return_date = ?  WHERE device_id = ? AND name= ?", date, deviceid, username , (err, results) => {
            if(err) {
                console.log("Error with the setDeviceasBorrowed Function\n Error: "  , err);
                res.status(500).send({ message: "Error with Server while setting the Device status " });     
            }

            res.status(200).send({ message: "Device successfully returned back "}); 
        }) 
    }]
*/
