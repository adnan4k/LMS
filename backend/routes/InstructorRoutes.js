import express from "express"
import { allTeacher, getSchedules, instructorProfile, login, signup, updateProfile } from "../controllers/InstructorController.js";


const instructorRoutes = express.Router();
instructorRoutes.post('/signup',signup)
instructorRoutes.post('/login',login)
instructorRoutes.post('/update-profile',updateProfile);
instructorRoutes.get('/getSchedules/:id',getSchedules);
instructorRoutes.get('/all',allTeacher);
instructorRoutes.get('/profile/:id',instructorProfile);

export default instructorRoutes;
