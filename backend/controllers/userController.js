import { User}  from "../Models/User-Model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";


export const register = async (req, res) => {
  try {
  
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

                  // Remove the password from the user object before further use
        const userWithoutPassword = { ...user._doc }; // Spread the user document
        delete userWithoutPassword.password; // Remove the password property

                 generateToken(res,user,`Welcome back ${user.name}`);
                


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error logging in user",
            });
            
    }
}


export const logout = async (req,res)=>{
try {
  return res.status(200).cookie('token','',{maxAge:0}).json({
    message:"Logged out successfully",
    success:true
  })
} catch (error) {
  console.log(error);
  return res.status(500).json({
    message:"Failed to logout",
    success:false
  })
  
}

}

export const getUserProfile = async (req,res)=>{
  try {
   
    return res.status(200).json({
      success:true,
      message:"User profile retrieved successfully",
      user : req.user
    });

   
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Failed to load user",
      success:false
    })
    
  }
  
  }


  export const updateUserProfile = async (req,res)=>{
    try {
     
      const {name} = req.body;
      const profilePhoto = req.file;
      console.log("files : ",req.file);

      const user = await User.findById(req.user._id);
      if(!user){
        return res.status(404).json({
          success:false,
          message:"User not found"
      });
    }

    if(user.photoUrl){
      const publicId = user.photoUrl.split('/').pop().split(".")[0]; // extract public id from the profileUrl
      await deleteMedia(publicId);
    }

    // upload profile picture to cloudinary
    const result = await uploadMedia(profilePhoto.path);
    const profileUrl = result.secure_url;



      user.name = name || user.name;
      user.photoUrl = profileUrl ;
      await user.save();
      return res.status(200).json({
        success:true,
        message:"User updated successfully",
        user : user
      });

      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:"Failed to update user",
        success:false
      })
      
    }
  }