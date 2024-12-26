import express from 'express';
import {getUserProfile, login, logout, register, updateUserProfile} from '../controllers/userController.js'
import  isAuthenticated  from '../middlewares/isAuthenticated.js'
const router = express.Router();
import upload from '../utils/multer.js'


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(isAuthenticated, getUserProfile)
router.route('/profile/update').put(isAuthenticated,upload.single('photoUrl'), updateUserProfile)

router.route('/logout').get(logout)


export default router;