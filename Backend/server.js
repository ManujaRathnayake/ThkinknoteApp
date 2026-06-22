import express from 'express';
import notesRoutes from './Routes/notesRoutes.js';
import router from './Routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/ratelimiter.js';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const _dirname = path.resolve()


if(process.env.NODE_ENV !== "production"){
    app.use(
       app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
})));
}

//middleware to parse JSON bodies
app.use(express.json());
app.use(rateLimiter)


//our custom middleware for logging requests
// app.use((req, res, next) => {
//     console.log(`Method: ${req.method}, URL: ${req.url}`);
//     next();
// })


app.use("/api/notes" , router);
app.use(express.static(path.join(_dirname,'Frountend/dist')))


if(process.env.NODE_ENV === "Production"){
        
app.get("*" , (req,res)=>{
    res.sendFile(path.join(_dirname,"../Frountend" , "dist" , "index.html"));
})

}

connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

});

//mongodb+srv://blueskynetworks1_db_user:jKTNDVn8prCTsuOO@cluster0.l75rbjt.mongodb.net/?appName=Cluster0