import sendResponse from "../helpers/sendResponse.js";
import Users from "../models/users.js";
import express from "express"

const router = express.Router()
// My Info 
router.get("/myInfo", async (req, res) => {
    try {
        console.log('User: in backend', req.user.user.email);
        const user = await Users.findOne({ email: req?.user?.user?.email });


        sendResponse(res, 200, user, false, "User Fetched Successfully")
    }
    catch (err) {
        sendResponse(res, 500, null, true, err.message)
    }
}
)

export default router;