import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import 'dotenv/config'
import sendResponse from "../helpers/sendResponse.js";
import Users from "../models/users.js";


const router = express.Router()

const jwtSecret = process.env.JWT_SECRET;


// SIGNUP Route
router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
  
    try {
      // Check if user with the same Email already exists
      const existingUserByEmail = await Users.findOne({ email });
      if (existingUserByEmail) {
        return sendResponse(res, 400, null, true, "User with this Email is already registered");
      }
    
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
    
      // Create new user
      const newUser = new Users({
        fullName,
        email,
        password: hashedPassword,
      });
    
      await newUser.save();
      
      // Send success response
      sendResponse(res, 201, newUser, false, "User registered successfully");
    
    } catch (err) {
      sendResponse(res, 500, null, true, err.message);
    }    
  });


// LOGIN Route
router.post("/login", async (req, res) => {

  const { password, email } = req.body;

  try {
    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
    return sendResponse(res, 404, null, true, "User not found");
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return sendResponse(res, 401, null, true, "Invalid Password");
    }

    // Generate JWT token
    const token = jwt.sign({user}, jwtSecret , { expiresIn: '24h' });

    sendResponse(res, 200, { user, token }, false, "Login successful");

  } catch (err) {
    sendResponse(res, 500, null, true, err.message);
  }
});


export default router;