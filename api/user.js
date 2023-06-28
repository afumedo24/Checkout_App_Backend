

//import connection
import db from '../db/database.js';

import jwt from 'jsonwebtoken';

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

// for user login
export const userLogin=(req,res) => {
    var userid = req.body.id;                     //req.params.id;
    db.get("SELECT * FROM system_users WHERE id = ?", [userid], (err, results) => {
        if(err) {
            console.log("Error with the userLogin Function\n Error: "  + err);
            res.status(500).send({ message: "Error with Server while finding the User " });   ;   
        }
        
        if(!results){
            res.status(400).send({ message: "User does not exist" + results });
        }
        else {
            const token = jwt.sign(results, "secret")

            res.cookie('jwt', token, { 
                httpOnly: true,
                maxAge: 30 * 1000, //1hr
            })
            res.status(200).send({ 
                message: "Success" , 
                token: token,
                user: results
            });
        }
    })
}

// for user login
export const authUserLogin=(req,res) => {
    const cookie = req.cookies['jwt'];

    const claims = jwt.verify(cookie, 'secret');

    if(!claims){
        res.status(401).send({message: "unauthenticated"});
    }

    db.get("SELECT * FROM system_users WHERE id = ?", [claims.id], (err, results) => {
        if(err) {
            console.log("Error with the authUserLogin Function\n Error: "  + err);
            res.status(500).send({ message: "Error with Server while finding the User " });   ;   
        }
        res.status(200).send({ 
            message: "Success" , 
            user: results
        });
    } )
    //res.send(claims);
}

// for user login
export const userLogout=(req,res) => {
    res.cookie('jwt', ''  ,{maxAge: 0});
    res.status(200).send({ message: "Cookie removed" });
}



