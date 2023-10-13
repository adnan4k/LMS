import express from "express"
import { listOfCourses, login, registerForCourse, signup, updateProfile, viewProfile, viewSchedule } from "../controllers/StudentController.js";


const studentRoutes = express.Router();
studentRoutes.post('/signup',signup);
studentRoutes.post('/login',login);
studentRoutes.post('/register',registerForCourse);
studentRoutes.get('/getcourses/:id',listOfCourses);
studentRoutes.get('/viewSchedule',viewSchedule);
studentRoutes.get('/profile/:id',viewProfile);
studentRoutes.post('/update/:id',updateProfile);



export default studentRoutes;
