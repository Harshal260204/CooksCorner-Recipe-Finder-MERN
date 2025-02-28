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
  const { email, password } = req.body;
  const userExist = await user.findOne({ email: email });
  if (!userExist) {
    res.status(400).json({ message: "User Not Found" });
  }

  const passMatch = await bcrypt.compare(password, userExist.password);
  if (!passMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  res.status(200).json({ message: "Login Succesfull" });
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
