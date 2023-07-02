

//import db for the database connection
import db from '../db/database.js';

// import jwt for the token 
import jwt from 'jsonwebtoken';


/*
    -----------------------User Login---------------------------------
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
        // if error happens with the database query 
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


/* 
    -----------------------show All Users---------------------------------
    this function is for the admin who can borrow devices for other users
    we will get all the users from the database and send them to the app
*/
export const showAllUser=(req,res) => {                  
    // run the query to select all users fullname from the database and sort them by asc
    db.all("SELECT fullname FROM chip_user ORDER BY fullname ASC",(err, results) => {
         // if error happens with the database query 
        if(err) {
            console.log("Error with the showAllUser Function\n Error: "  + err);
            res.status(500).send({ message: "Error with Server while fetching all Users" });   ;   
        }
        else {
            // send all users fullname back to the app
            res.status(200).send(results);
        }
    } )
}

/* 
    -----------------------create a User---------------------------------
    this function is for the admin who can borrow devices for other users
    we will get all the users from the database and send them to the app
*/
export const createUser=(req, res) => {
    // get the required properties
    const username = req.body.username;
    const fullname = req.body.fullname;
    // if is_admin is true, it returns 1, else 2 
    const is_admin = req.body.is_admin === true ? 1 : 2;

    // run the query to insert the data in the database 
    db.run("INSERT INTO chip_user (username, fullname, is_admin) VALUES (?, ?, ?)", username, fullname, is_admin ,(err, results) => {
        // if error happens with the database query 
        if(err) {
            console.log("Error with the createUser Function\n Error: "  + err);
            res.status(500).send({ message: "Error with Server while creating the User" });   ;   
        }
        // else send that the user is created successfully
        else {
            res.status(200).send({ message: "User created successfully"});
        }
    }
    )
}



