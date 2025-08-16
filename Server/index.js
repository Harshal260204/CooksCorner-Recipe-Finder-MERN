import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/Database.js";
import userRouter from "./src/routes/userRoutes.js";
import cors from "cors";
import recipeRouter from "./src/routes/recipeRoutes.js";
import topRecipeRouter from "./src/routes/topRecipesRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// User Related Routes
app.use("/users", userRouter);

// Recipes Related Routes
app.use("/recipes", recipeRouter);

// Admin Routes :
app.use("/admin", adminRouter);

// Top Recipes Related Routes
app.use("/top-recipes", topRecipeRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

// DB CONNECTION
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App Is Running On PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
