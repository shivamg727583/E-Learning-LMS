import {Course} from "../Models/course-model.js";

export const createCourse = async(req,res)=>{
try {
    const {title,category}=req.body;
    if(!title || !category){
        return res.status(400).json({msg:"Course Title and category is required",success:false})
    }

    const course = await Course.create({
        title,
        category,
        creator:req.user._id
    })
    return res.status(201).json({msg:"Course created successfully",course,success:true})

    
} catch (error) {
    console.log(error)
    return res.status(500).json({msg:error.message,success:false})
}
}