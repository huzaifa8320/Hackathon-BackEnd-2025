import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema(
    {
      email:{ type : String , unique: true , required:true},
      password:{ type : String , required:true},
      fullName:{ type : String  , required:true},
      role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student'
      }
    },
    { timestamps: true }
)

const Users = mongoose.model("Users" , usersSchema)

export default Users;