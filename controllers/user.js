//import functions from User model
import {
    getUserByID,

} from "../models/UserModel.js";

//get user
export const showUserByID=(req,res) => {
    var userid = req.params.id; //req.params.id;
    // console.log(req.params.id);
    getUserByID( userid , (err, results) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(results);  
            
        }
    });
}