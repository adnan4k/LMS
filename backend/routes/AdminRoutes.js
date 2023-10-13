import express from "express"
import { assignCourse, assignSchedule, createCourse, getInfo, login, signup, viewAll } from "../controllers/AdminController.js";


const adminRoutes = express.Router();
adminRoutes.post('/signup',signup);
adminRoutes.post('/login',login);
adminRoutes.post('/createcourse',createCourse);
adminRoutes.post('/assigncourse',assignCourse);
adminRoutes.post('/assignSchedule',assignSchedule);
adminRoutes.get('/viewAll',viewAll);
adminRoutes.get('/getadmin/:id',getInfo);

export default adminRoutes;
