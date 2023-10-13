import mongoose from "mongoose";
import { Department } from "../models/departmentModel.js";

export const addDepartement = async(req,res,next) =>{
 
    const {name,description} = req.body;
    let department;
    try {
        department = await Department({
            name:name,
            description:description,
        })
        department = await department.save();
    } catch (error) {
        console.log(error)
    }

    if(!department){
        return res.status(500).json({message:"cannot create department"})
    }

    return res.status(201).json(department)
}

export const viewDepartement = async(req,res,next) =>{
    let departement;
    try {
        departement = await Department.find();
    } catch (error) {
        console.log(error)
    }
    if(!departement){
        return res.status(404).json({message:"dept not found"})
    }

    return res.status(200).json(departement);
}