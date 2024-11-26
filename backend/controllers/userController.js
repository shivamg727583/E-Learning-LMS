import { User}  from "../Models/User-Model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";


export const register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
};


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if ( !email || !password) {
            return res.status(400).json({
              success: false,
              message: "Please fill in all fields",
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
                });
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
                });
                }
                 generateToken(res,user,`Welcome back ${user.name}`);
                


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error logging in user",
            });
            
    }
}