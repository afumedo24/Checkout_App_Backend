

//import db for the database connection
import db from '../db/database.js';

// import jwt for the token 
import jwt from 'jsonwebtoken';


// for user login
/*
    we read the chipID from the frontend and pass it in the body of 
    the request sent to the server, we extract that and run the db query 
    to search for the username(chipID), if we find the user object, we will 
    delete the username(chipID) from it because it will be stored in the
    localstorage of the used device, because it is sensitive information
    after that we create a jsonwebtoken with the user obejct and a secret key,
    then we send a object which contains user obeject, token and a message
*/
export const userLogin=(req,res) => {
    
    // extract the chipID from request body
    const chipID = req.body.chipID;  

    // run the query to select the user via username(chipID)
    db.get("SELECT * FROM chip_user WHERE username = ?", [chipID], (err, results) => {
        // if error happens with the database query it gives back this part
        if(err) {
            console.log("Error with the userLogin Function\n Error: "  + err);
            res.status(500).send({ message: "Error with Server while finding the User " });   ;   
        }
        // when the username isnt found in the database
        if(!results){
            res.status(400).send({ message: "User does not exist" });
        }
        // if the user is found in the database
        else {
            // delete the username from the user object
            delete results.username;

            // create the jsonwebtoken with the user object and the secret key in it
            const token = jwt.sign(results, "secret")

            // send back a object containing the user object, token, and a message success
            res.status(200).send({ 
                message: "Success" , 
                token: token,
                user: results
            });
        }
    })
}


//get all user
export const showAllUser=(req,res) => {                  
    
    db.all("SELECT * FROM chip_user ORDER BY fullname ASC",(err, results) => {
        if(err) {
            console.log("Error with the showAllUser Function\n Error: "  + err);
            res.status(500).send({ message: "Error with Server while getching all Users" });   ;   
        }
        /*
        if(!results){
            res.status(400).send({ message: "" });
        }*/
        else {
            delete results.username;
            delete results.is_admin;
            res.status(200).send(results);
        }
    } )
}



