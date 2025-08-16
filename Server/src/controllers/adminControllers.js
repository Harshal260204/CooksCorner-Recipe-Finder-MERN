import recipe from "../models/recipeModel.js";
import toprecipe from "../models/topRecipes.js";
import user from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import upload from '../config/multer.js';

// Admin Login : 
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Find User By Email:
        const adminExist = await user.findOne({ email })

        if (!adminExist || !adminExist.isAdmin) {
            return res.status(401).json({ message: "Access Denied , Admin Credentials Required" });
        }

        // Verify Password Using Bycrypt :
        const isPassword = await bcrypt.compare(password, adminExist.password);
        if (!isPassword) {
            return res.status(401).json({ message: "Access Denied , Invalid Credentials" });
        }

        // Generate JWT Token : 
        const token = jwt.sign(
            { id: adminExist._id, email: adminExist.email, isAdmin: true },
            process.env.SECRETKEY,
            { expiresIn: "1hr" }
        );

        res.status(200).json({ message: "Admin Logged In Successfully", token });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTheUser = await user.findByIdAndDelete(id);

        if (!deleteTheUser) {
            return res.status(400).json({ message: "User Not Found" });
        }

        res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, number } = req.body;
        const userfound = await user.findById(id);
        if (!userfound) {
            return res.status(400).json({ message: "user not found" });
        }
        const updatedUser = await user.findByIdAndUpdate(
            id,
            { name, email, number },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(400).json({ message: "user not updated" });
        }
        res.status(200).json({ data: updatedUser, message: "user updated" });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Create Recipes :
export const createRecipe = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            type,
            ingredients,
            instructions,
            cookingTime,
        } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: "Enter The Name Of The Recipe" });
        }
        if (!description) {
            return res
                .status(400)
                .json({ message: "Enter The Description Of The Recipe" });
        }
        if (!category) {
            return res
                .status(400)
                .json({ message: "Enter The Category Of The Recipe" });
        }
        if (!type) {
            return res.status(400).json({ message: "Enter The Type Of The Recipe" });
        }
        if (!ingredients) {
            return res
                .status(400)
                .json({8: "Enter The Ingredients Of The Recipe" });
        }
        if (!instructions) {
            return res
                .status(400)
                .json({ message: "Enter The Instructions Of The Recipe" });
        }
        if (!cookingTime) {
            return res
                .status(400)
                .json({ message: "Enter The Cooking Time Of The Recipe" });
        }

        // Process ingredients array if it's a string
        let processedIngredients = ingredients;
        if (typeof ingredients === 'string') {
            processedIngredients = ingredients.split(',').map(item => item.trim());
        }

        // Handle image upload
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newRecipe = new recipe({
            name,
            description,
            category,
            type,
            ingredients: processedIngredients,
            instructions,
            cookingTime: Number(cookingTime),
            imageUrl // Add image URL if available
        });

        await newRecipe.save();
        return res.status(201).json({ message: "Recipe Created Successfully", recipe: newRecipe });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// Update Recipes :
export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            category,
            type,
            ingredients,
            instructions,
            cookingTime,
        } = req.body;

        const recipeExist = await recipe.findById(id);

        if (!recipeExist) {
            return res.status(404).json({ message: "Recipe Does Not Exist" });
        }

        // Process ingredients array if it's a string
        let processedIngredients = ingredients;
        if (typeof ingredients === 'string') {
            processedIngredients = ingredients.split(',').map(item => item.trim());
        }

        // Handle image upload
        let updateData = {
            name,
            description,
            category,
            type,
            ingredients: processedIngredients,
            instructions,
            cookingTime: Number(cookingTime),
        };

        // Add image URL if a new image was uploaded
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedRecipe = await recipe.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(400).json({ message: "Recipe Not Updated" });
        }

        res.status(200).json({ message: "Recipe Updated Successfully", recipe: updatedRecipe });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Recipes :
export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTheRecipe = await recipe.findByIdAndDelete(id);

        if (!deleteTheRecipe) {
            return res.status(404).json({ message: "Recipe Not Found" });
        }

        res.status(200).json({ message: "Recipe Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Dashboard : 
export const dashboard = async (req, res) => {
    try {
        const totalRecipes = await recipe.countDocuments();
        const totalUsers = await user.countDocuments();
        const totalTopRecipes = await toprecipe.countDocuments();

        res.json({ totalRecipes, totalUsers, totalTopRecipes })

    } catch (error) {
        console.error("Error Fetching Dashboard Data : ", error)
        res.status(500).json({ message: "Error Fetching Dashboard Data : ", error })
    }
}

// Make A User Admin :
export const makeAdmin = async (req, res) => {
    try {
        const userToMakeAdmin = await user.findById(req.params.id);

        if (!userToMakeAdmin) {
            return res.status(404).json({ message: "User Not Found" });
        }

        userToMakeAdmin.isAdmin = true;
        await userToMakeAdmin.save();
        
        res.status(200).json({ message: "User successfully made admin" });
    } catch (error) {
        console.error("Make admin error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}