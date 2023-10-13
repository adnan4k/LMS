import mongoose, { mongo } from "mongoose";
import { Admin } from "../models/adminModel.js";
import { Course } from "../models/courseModel.js";
import { Instructor } from "../models/instructorModel.js";
import { Schedule } from "../models/scheduleModel.js";
import { Student } from "../models/studentModel.js";
import { Department } from "../models/departmentModel.js";
import { StudentCourse } from "../models/studentCourseModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
//signup
export const signup = async (req, res, next) => {
  const {name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  try {
    const admin = new Admin({
      name: name,
      password: hash,
      email: email,
    });
    const savedAdmin = await admin.save();
    if (!savedAdmin) {
      return res
        .status(500)
        .json({ message: "cannot create there is some error" });
    }

    return res.status(201).json({ savedAdmin });
  } catch (error) {
    console.log(error);
  }
};
//login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(404).json({ message: 'No admin with this email' });
    }

    const isCorrectPassword =  bcrypt.compareSync(password, existingAdmin.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ message: 'Incorrect credentials' });
    }

    const token = jwt.sign({ id: existingAdmin._id }, 'your-secret-key', { expiresIn: '1d' });

    return res.status(200).json({ message: 'Login successful', id: existingAdmin._id, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


//create course

export const createCourse = async (req, res, next) => {
  //course = req.body

  const { coursename, credithour, c_code } = req.body;
  if (!coursename || !credithour || !c_code) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const course = new Course({
      coursename: coursename,
      credithour: credithour,
      c_code: c_code,
    });
    const savedCourse = await course.save();
    if (!savedCourse) {
      return res.status(400).json({ message: "cannot be created " });
    }
    return res.status(201).json({ savedCourse });
  } catch (error) {
    console.log(error);
  }
};

//assing course

export const assignCourse = async (req, res, next) => {
  // console.log(req.body)
  const { teacher, course } = req.body;
  if (!teacher || !course) {
    return res.status(400).json({ message: "enter data first" });
  }
  try {
    const existingTeacher = await Instructor.findOne({ name: teacher });
    const existingCourse = await Course.findOne({ coursename: course });

    if (!existingCourse || !existingTeacher) {
      return res
        .status(404)
        .json({ message: "either teacher or course not found" });
    }

    if (existingCourse.instructors.includes(existingTeacher._id)) {
      return res.status(400).json({ message: "already assigned" });
    }

    existingCourse.instructors.push(existingTeacher._id);
    //push to studentCourse model
    const studentCourse = await StudentCourse({
      course: existingCourse._id,
      instructor: existingTeacher._id,
    });

    await existingCourse.save();
    await studentCourse.save();

    return res.status(200).json({ message: "course assigned successfully" });
  } catch (error) {
    console.log(error);
  }
};

//assign shedule
export const assignSchedule = async (req, res, next) => {
  const { courseId, instructorsId, schedules } = req.body;

  if (!courseId || !instructorsId || !schedules) {
    return res.status(400).json({ message: "enter full information" });
  }

  let schedule;
  let instructor;
  let course;

  try {
    schedule = await Schedule({
      time: schedules,
    });

    course = await Course.findOne({coursename:courseId});
    instructor = await Instructor.findOne({name:instructorsId});

    course.schedule.push(schedule._id);
    instructor.schedule.push(schedule._id);

    await course.save();
    await instructor.save();
    await schedule.save();
  } catch (error) {
    console.log(error);
  }

  if (!schedule) {
    return res.status(500).json({ message: "schedule is not assigned" });
  }
  return res.status(200).json({
    schedule: schedule,
    scheduledInstructor: instructor.schedule|| '',
    scheduledCourse: course.schedule,

  });
};

//view all
export const viewAll = async (req, res, next) => {
  let studentCourse;

  try {
    studentCourse = await StudentCourse.find();
  } catch (error) {
    console.log(error);
  }

  if(!studentCourse){
    return res.status(404).json({message:"no information found"});
}

return res.status(200).json(studentCourse);
};

export const getInfo = async(req,res,next) =>{
  const {id} = req.params;
  let admin;
  if(!id){
    return res.status(400).json({message:"provide an id"})
  }
  try {
    admin = await Admin.findById(id);
  } catch (error) {
    console.log(error)
  }

  if(!admin){
    return res.status(400).json({message:"unable to get "})
  }
  return res.status(200).json(admin);
}

export const updateAdminProfile = async(req,res,next) =>{
  const {email,password,name} = req.body;
}