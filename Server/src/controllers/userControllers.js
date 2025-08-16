import { isAdmin } from "../middlewere/authMiddlewere.js";
import generateToken from '../utils/generateToken.js'
import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import transporter from '../config/emailConfig.js';
import { generateEmailVerificationToken, generatePasswordResetToken, hashToken } from '../utils/tokenUtils.js';

// Sample Route
export const sampleRoute = async (req, res) => {
  try {
    res.status(200).json({ message: "Router Hit" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    // Check If Credentials Are Properly Entered
    if (!name || !email || !number || !password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Checks If User Already Exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate email verification token
    const emailVerificationToken = generateEmailVerificationToken();
    const hashedToken = hashToken(emailVerificationToken);
    
    const User = new user({ 
      name, 
      email, 
      number, 
      password: hashedPassword,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    
    await User.save();
    
    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${emailVerificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification - CooksCorner',
      html: `
        <h2>Email Verification</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail registration if email fails, just log it
    }

    res.status(201).json({ message: "User Registered Successfully. Please check your email for verification." });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    // Hash the token to match the database
    const hashedToken = hashToken(token);
    
    // Find user with this token and check if it's not expired
    const userToVerify = await user.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });
    
    if (!userToVerify) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }
    
    // Update user as verified
    userToVerify.isVerified = true;
    userToVerify.emailVerificationToken = undefined;
    userToVerify.emailVerificationExpires = undefined;
    
    await userToVerify.save();
    
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userExist = await user.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Check if email is verified
    if (!userExist.isVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    
    if (isPasswordValid) {
      const token = generateToken(userExist._id);
      res.json({ 
        _id: userExist._id, 
        name: userExist.name, 
        email: userExist.email, 
        isAdmin: userExist.isAdmin, 
        token: token 
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await user.findById(req.user._id).select('-password');
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, number } = req.body;
    
    const userToUpdate = await user.findById(req.user._id);
    
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== userToUpdate.email) {
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // If email is changed, require re-verification
      userToUpdate.isVerified = false;
      const emailVerificationToken = generateEmailVerificationToken();
      const hashedToken = hashToken(emailVerificationToken);
      userToUpdate.emailVerificationToken = hashedToken;
      userToUpdate.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
      
      // Send verification email for new email
      const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${emailVerificationToken}`;
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification - CooksCorner',
        html: `
          <h2>Email Verification</h2>
          <p>Please click the link below to verify your new email address:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
        `
      };
      
      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail update if email fails, just log it
      }
    }

    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.number = number || userToUpdate.number;

    const updatedUser = await userToUpdate.save();
    
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      number: updatedUser.number,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Request Password Reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const userToReset = await user.findOne({ email });
    
    if (!userToReset) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({ message: "If your email is registered, you will receive a password reset link" });
    }
    
    // Generate password reset token
    const passwordResetToken = generatePasswordResetToken();
    const hashedToken = hashToken(passwordResetToken);
    
    userToReset.passwordResetToken = hashedToken;
    userToReset.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    
    await userToReset.save();
    
    // Send password reset email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset - CooksCorner',
      html: `
        <h2>Password Reset</h2>
        <p>You have requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail request if email fails, just log it
    }
    
    res.status(200).json({ message: "If your email is registered, you will receive a password reset link" });
  } catch (error) {
    console.error("Password reset request error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    // Hash the token to match the database
    const hashedToken = hashToken(token);
    
    // Find user with this token and check if it's not expired
    const userToReset = await user.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!userToReset) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update user password and clear reset tokens
    userToReset.password = hashedPassword;
    userToReset.passwordResetToken = undefined;
    userToReset.passwordResetExpires = undefined;
    
    await userToReset.save();
    
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
