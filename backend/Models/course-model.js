import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subTitle:{
        type: String,
        trim:true
    },
    description: {
        type: String,
        trim: true
    },
    category:{
        type: String,
        required: true
    },
    courseLevel:{
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    coursePrice:{
        type:Number
    },

    courseImage:{
        type: String
    },
    courseVideo:{
        type: String
    },
    enrolledStudents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    lectures:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture'
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isPublished:{
        type:Boolean,
        default:false
    }

    
   
},{timestamps:true});

 export const Course = mongoose.model('Course', courseSchema);


