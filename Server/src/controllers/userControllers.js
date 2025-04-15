import { isAdmin } from "../middlewere/authMiddlewere.js";
import generateToken from '../utils/generateToken.js'
import user from "../models/userModel.js";
import bcrypt from "bcrypt";

// Sample Route
export const sampleRoute = async (req, res) => {
  try {
    res.status(200).json({ message: "Router Hit" });
  } catch (error) {
    console.log(error);
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    // Check If Credentials Are Properly ENtered
    if (!name || !email || !number || !password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Checks If User Already Exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const User = new user({ name, email, number, password: hashedPassword });
    await User.save();

    res.status(201).json({ message: "User Registered Succesfully" });

  } catch (error) {

    res.status(500).json({ message: "Server Error" });
    
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await user.findOne({ email: email });

    if (userExist && (await bcrypt.compare(password, user.password))) {
      res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) })
    } else {
      res.status(401).json({ message: "Invalid Credentials" })
    }

    if (!userExist) {
      res.status(400).json({ message: "User Not Found" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

};



