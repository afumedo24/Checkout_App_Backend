//import express
import express from  "express";

//import cors
import cors from  "cors";

//import routes
import Router from  "./routes/routes.js";


// init express app
const app = express();

// use express json
app.use(express.json());

// use cors
app.use(cors({ credentials: true , origins: ["http://localhost:8100"] }));

// use router 
app.use(Router);

// PORT 
app.listen(8300, ()=> {
    console.log("Server is listening on PORT 8300" );
})