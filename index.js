import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import authRoutes from './routers/auth.js';
import myInfoRoutes from "./routers/user.js"
import addRequest from "./routers/loanRequest.js"
import sendResponse from './helpers/sendResponse.js';
import cors from 'cors';
import { authenticateUser } from './middleware/middleware.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())



app.get('/', (req, res) => {
  sendResponse(res, 200, null, false, "Server is running");
});
app.use('/auth' , authRoutes)
app.use('/user' , authenticateUser , myInfoRoutes)
app.use('/addRequest' ,  addRequest)


mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log("Err Mongo db", err))


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});