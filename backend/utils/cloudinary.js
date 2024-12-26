import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({});


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadMedia = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });

        return result;
    } catch (error) {
        console.log(error);
    }
}


export const deleteMedia = async (public_id) => {
    try {
  await cloudinary.uploader.destroy(public_id);
       
    } catch (error) {
        console.log(error);
    }
}

export const deleteVideoFromCloudinary = async (public_id) => {
    try {

        await cloudinary.uploader.destroy(public_id, {
            resource_type: "video",
        });
        
    } catch (error) {
        console.log(error);
        
    }
}