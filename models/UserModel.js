
//import connection
import db from '../db/database.js';

//get user 
export const getUserByID=(id, result) => { 
    db.get("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
        if(err) {
            console.log("Error with the getUserByID Modal: "  , err);
            result(err, null);   
        }
        else {
            result(null, results);
        }
    } )
}