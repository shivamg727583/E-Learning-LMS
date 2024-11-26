import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
        },
        password:{
            type:String,
            required:true
            },
            role:{
                type:String,
                enum:['instructor','student'],
                default:'student'
            },
            enrolledCourses:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'

            }],

            photoUrl:{
                type:String,
                default:''
            }

},{timeStamps:true})

export const User = mongoose.model("User",UserSchema)