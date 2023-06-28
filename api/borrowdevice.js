//import connection
import db from '../db/database.js';


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

  //  db.run("UPDATE device SET status = ? WHERE id = ? ", devicestatus, deviceid ,
    else {
        db.run("UPDATE device_owner SET return_date = ?  WHERE device_id = ? AND name= ?", date, deviceid, username , (err, results) => {
            if(err) {
                console.log("Error with the setDeviceasBorrowed Function\n Error: "  , err);
                res.status(500).send({ message: "Error with Server while setting the Device status " });     
            }

            res.status(200).send({ message: "Device successfully returned back "}); 
        }) 
    }
}
