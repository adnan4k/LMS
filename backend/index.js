import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors"
import adminRoutes from "./routes/AdminRoutes.js";
import studentRoutes from "./routes/StudentRoutes.js";
import instructorRoutes from "./routes/InstructorRoutes.js";
import { Instructor } from "./models/instructorModel.js";
import departmentRoutes from "./routes/DepartmenRoutes.js";


const app = express();
app.use(cors());
app.use(session({
   secret: 'your-secret-key',
   resave: false,
   saveUninitialized: true,
 }));
 
app.use(express.json());
dotenv.config();

//routes
app.use('/admin',adminRoutes);  
app.use('/student',studentRoutes); 
app.use('/instructor',instructorRoutes); 
app.use('/departement',departmentRoutes)

const port = process.env.PORT || 3001;
const key = process.env.KEY;

mongoose.connect(key, )
.then(()=>{
   app.listen(port,()=>{
    console.log("app is listining",port)
   })
})
    
