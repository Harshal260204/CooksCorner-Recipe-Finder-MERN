import user from "../models/userModel.js";
import jwt from 'jsonwebtoken'

// Verify Token For User :

const protect = async (req, res, next) => {

    try {
        // Extracting Token From The User :
        const token = req.headers.authorization?.split(" ")[1];

        // Error Handling For No Token : 
        if (!token) {
            res.status(400).json({ message: "Unauthorized Access" })
            console.log("Unauthorize Access");
        }

        // Decoding The Token : 
        const decoded = jwt.verify(token, process.env.SECRETKEY)

        // See If User Exists In the Database : 
        req.user = await user.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(400).json({ message: "Unauthorized Access , User Not Found" })
        }

        next()
    } catch (error) {
        console.error("JWT Verification Error : ", error)
        return res.status(400).json({ message: "Invalid Token" })
    }

}

const isAdmin = (req, res, next) => {

    // if User Is Admin Or Not : 
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Access Denied , Admin Only" })
    }
}

export { protect, isAdmin };