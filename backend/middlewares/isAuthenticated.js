import jwt from 'jsonwebtoken';;
import {User} from '../Models/User-Model.js'



const isAuthenticated = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      
      if (!token) {
        console.log('No token provided in cookies.');
        return res.status(401).json({
          message: 'User not authenticated',
          success: false,
        });
      }
  
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
        console.log('Token verification failed.');
        return res.status(401).json({
          message: 'Invalid token',
          success: false,
        });
      }
  
      const id = decoded.id;
      const user = await User.findById(id).select('-password');
      if (!user) {
        console.log(`No user found with id: ${id}`);
        return res.status(401).json({
          message: 'User not found',
          success: false,
        });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  };


  export default isAuthenticated;
  