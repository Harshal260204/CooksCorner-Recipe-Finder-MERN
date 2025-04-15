import express from 'express'
import { dashboard, deleteUser, getAllUsers, makeAdmin, updateUser } from '../controllers/adminControllers.js';
import { createRecipe, deleteRecipe, updateRecipe } from '../controllers/adminControllers.js';
import { isAdmin } from '../middlewere/authMiddlewere.js';

const adminRouter = express.Router()

// User Related Routes: 
adminRouter.get("/all-users", isAdmin, getAllUsers);
adminRouter.put("/update-user/:id", isAdmin, updateUser);
adminRouter.delete("/delete-user/:id", isAdmin, deleteUser);
adminRouter.delete("/make-admin/:id", isAdmin, makeAdmin);
adminRouter.delete("/dashboard", isAdmin, dashboard);

// Recipes Related Routes:
adminRouter.post("/", isAdmin, createRecipe);
adminRouter.put("/:id", isAdmin, updateRecipe);
adminRouter.delete("/:id", isAdmin, deleteRecipe);

export default adminRouter;