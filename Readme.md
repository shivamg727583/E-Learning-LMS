# E-Learning Management System

## Project Overview
The **E-Learning Management System** is a full-stack web application developed using the **MERN stack** (MongoDB, Express, React, and Node.js). This platform allows students to purchase and enroll in courses, track progress, and mark lessons as complete. Administrators have the ability to create and manage courses. The application supports **Cloudinary** for image uploads and **Stripe** for secure payments. A **day & night theme toggle** enhances the user experience.

## Features
### Student Features:
- Browse and purchase courses
- View course content and track progress
- Mark lessons as complete
- Responsive UI with day & night mode

### Admin Features:
- Secure admin panel for managing courses
- Upload courses with images stored on **Cloudinary**
- Manage enrolled students

### Additional Features:
- **Stripe Integration** for payment processing
- **Cloudinary** for image uploads
- **JWT Authentication** for secure login
- **Role-based access control** (Admin & Student)

## Technologies Used
### Frontend:
- React.js (with React Router & Redux for state management)
- Tailwind CSS / Material UI for styling
- Axios for API requests

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose ORM
- JWT Authentication
- Cloudinary API for image uploads
- Stripe API for payment processing

### Deployment:
- Frontend: Vercel / Netlify
- Backend: Render / AWS / DigitalOcean
- Database: MongoDB Atlas

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/shivamg727583/E-Learning-LMS.git
   cd e-learning-platform
   ```

2. **Setup Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   JWT_SECRET=your_jwt_secret
   ```

3. **Install dependencies:**
   ```sh
   npm install  # Install backend dependencies
   cd client && npm install  # Install frontend dependencies
   ```

4. **Run the project:**
   ```sh
   npm run dev  # Runs both frontend and backend concurrently
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/courses` | Get all courses |
| POST | `/api/courses` | Create a new course (Admin) |
| POST | `/api/payment` | Handle course payment via Stripe |

## Future Enhancements
- Implement **course search and filtering**
- Add **discussion forums** for students
- Develop **mobile app version** using React Native

## Contributing
Feel free to fork the repository and submit pull requests with new features or bug fixes.

## License
This project is licensed under the MIT License.

