import recipe from "../models/recipeModel.js";
import toprecipe from "../models/topRecipes.js";
import user from "../models/userModel.js";
import bcrypt from 'bcrypt';

// Admin Login : 
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find User By Email:
        const adminExist = await user.findOne({ email })

        if (!adminExist || adminExist.isAdmin) {
            res.status(401).json({ message: "Access Denied , Admin Credentials Required" })
        }

        // Verify Password Using Bycrypt :
        const isPassword = await bcrypt.compare(password, adminExist.password);
        if (!isPassword) {
            return res.status(401).json({ message: "Access Denied , Invalid Credentials" })
        }

        // Generate JWT Token : 
        const token = jwt.sign(
            { id: adminExist._id, email: adminExist.email, isAdmin: true },
            process.env.SECRETKEY,
            { expiresIn: "1hr" }
        )

        res.status(200).json({ message: "Admin Logged In Succesfully", token })
    } catch (error) {
        res.status(401).json({ message: "Admin Login Error : ", error })
    }

}

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
        res.status(400).jspn({ message: "Data Not Found" });
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
        res.status(500).json({ error });
        console.log(error);
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
                .json({ message: "Enter The Ingredients Of The Recipe" });
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

        const newRecipe = new recipe({
            name,
            description,
            category,
            type,
            ingredients,
            instructions,
            cookingTime,
        });

        await newRecipe.save();
        return res.status(201).json({ message: "Recipe Created Successfully" });
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
            res.status(400).json({ message: "Recipe Does Not Exist" });
        }

        const updatedRecipe = await recipe.findByIdAndUpdate(
            id,
            {
                name,
                description,
                category,
                type,
                ingredients,
                instructions,
                cookingTime,
            },
            { new: true }
        );

        if (!updatedRecipe) {
            res.status(400).json({ message: "Recipe Not Updated" });
        }

        res.status(200).json({ message: "Recipe Updated Successfully" });
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
            res.status(400).json({ message: "Recipe Not Found" });
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
        const user = await user.findById(req.params.id);

        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        user.isAdmin = true;
        await user.save();
    } catch (error) {

    }
}