import mongoose from "mongoose";

const ScheduleSchema = mongoose.Schema({
    time:{
        type:String,
        required:true
    }  
});

export const Schedule =  mongoose.model("Schedule",ScheduleSchema);