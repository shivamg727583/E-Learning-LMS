import express from 'express';
import { createCourse } from '../controllers/courseController.js'
import  isAuthenticated  from '../middlewares/isAuthenticated.js'
const router = express.Router();
import upload from '../utils/multer.js'


router.route('/').post(isAuthenticated,createCourse);



export default router;