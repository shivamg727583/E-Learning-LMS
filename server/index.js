import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url"; // Import fileURLToPath
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();

// Define __dirname manually for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Call database connection
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// Default middleware
app.use(express.static(path.join(__dirname, "../client/dist"))); // Ensure build folder is served
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html")); // Adjust the path for production build
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_API_LINK, // Ensure this is set to your frontend URL
    credentials: true
}));

// API Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
