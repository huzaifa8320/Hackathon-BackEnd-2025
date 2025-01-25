import jwt from "jsonwebtoken"
import 'dotenv/config'
import sendResponse from "../helpers/sendResponse.js";

 export const authenticateUser = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process?.env?.JWT_SECRET);
      req.user = decoded; // Attach user data to the request object
      
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      res.status(403).json({ message: "Invalid or Expired Token" });
    }
  };



 export const checkAdmin = (req, res, next) => {
  console.log('req', req.user.user.role);
  
    if ( req?.user?.user?.role !== "admin") {
        return sendResponse(res, 403, null, true, "Access Denied: Admins Only");
    }
    next(); // Proceed to the next middleware or route handler
};
