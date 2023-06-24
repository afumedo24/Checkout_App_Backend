

//import connection
import db from '../db/database.js';

//get user
export const showUserByID=(req,res) => {
    var userid = req.params.id;                     //req.params.id;
    
    db.get("SELECT * FROM system_users WHERE id = ?", [userid], (err, results) => {
        if(err) {
            console.log("Error with the showUserByID Function\n Error: "  + err);
            res.status(500).send({ message: "Error with Server while finding the User " });   ;   
        }
        
        if(!results){
            res.status(400).send({ message: "User does not exist" });
        }
        else {
            res.status(200).send(results);
        }
    } )
}


