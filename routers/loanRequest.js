import express from 'express'
import Request from '../models/loanRequest.js';
import sendResponse from '../helpers/sendResponse.js';
import Loan from '../models/loanRequest.js';

const router = express.Router()



router.post("/", async (req, res) => {
  const { email, nic } = req.body;

  try {
    // Check if email already exists
    const existingEmail = await Loan.findOne({ email });
    if (existingEmail) {
      return sendResponse(res, 400, null, true, "Email already in use");
    }

    // Check if NIC already exists
    const existingNIC = await Loan.findOne({ nic });
    if (existingNIC) {
      return sendResponse(res, 400, null, true, "NIC already in use");
    }

    const loan = new Loan(req.body);
    await loan.save();
    sendResponse(res, 200, loan, false, "Request added successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, null, true, "Something went wrong");
  }
});


router.get("/", async (req, res) => {
  try {
    const loans = await Loan.find();
    sendResponse(res, 200, loans, false, "All loan requests retrieved successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, null, true, "Failed to retrieve loan requests");
  }
});


export default router