import user from "../models/userModel.js";
import jwt from 'jsonwebtoken'

// Verify Token For User :
const protect = async (req, res, next) => {
    try {
        // Extracting Token From The User :
        const token = req.headers.authorization?.split(" ")[1];

        // Error Handling For No Token : 
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Access - No token provided" });
        }

        // Decoding The Token : 
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // See If User Exists In the Database : 
        req.user = await user.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access - User not found" });
        }

        next();
    } catch (error) {
        console.error("JWT Verification Error : ", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(500).json({ message: "Authentication error" });
    }
};

const isAdmin = (req, res, next) => {
    // if User Is Admin Or Not : 
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied - Admin Only" });
    }
};

export { protect, isAdmin };