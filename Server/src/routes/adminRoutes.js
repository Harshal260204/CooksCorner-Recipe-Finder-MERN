import express from 'express'
import { adminLogin, dashboard, deleteUser, getAllUsers, makeAdmin, updateUser } from '../controllers/adminControllers.js';
import { createRecipe, deleteRecipe, updateRecipe } from '../controllers/adminControllers.js';
import { isAdmin } from '../middlewere/authMiddlewere.js';
import upload from '../config/multer.js';

const adminRouter = express.Router()

// Admin Authentication Routes:
adminRouter.post("/login", adminLogin);

// Dashboard Route:
adminRouter.get("/dashboard", isAdmin, dashboard);

// User Management Routes:
adminRouter.get("/all-users", isAdmin, getAllUsers);
adminRouter.put("/update-user/:id", isAdmin, updateUser);
adminRouter.delete("/delete-user/:id", isAdmin, deleteUser);
adminRouter.put("/make-admin/:id", isAdmin, makeAdmin);

// Recipe Management Routes:
adminRouter.post("/recipes", isAdmin, upload.single('image'), createRecipe);
adminRouter.put("/recipes/:id", isAdmin, upload.single('image'), updateRecipe);
adminRouter.delete("/recipes/:id", isAdmin, deleteRecipe);

export default adminRouter;