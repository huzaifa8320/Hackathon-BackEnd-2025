import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import authRoutes from './routers/auth.js';
import sendResponse from './helpers/sendResponse.js';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {
  sendResponse(res, 200, null, false, "Server is running");
});
app.use('/auth' , authRoutes)


mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log("Err Mongo db", err))


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});