import express from "express"
import { addDepartement, viewDepartement } from "../controllers/DepartmentControllers.js";
import { allCourse } from "../controllers/CourseController.js";

const departmentRoutes = express.Router();
departmentRoutes.post('/addDepartement',addDepartement);
departmentRoutes.get('/viewDepartement',viewDepartement);
departmentRoutes.get('/all',allCourse);

export default departmentRoutes