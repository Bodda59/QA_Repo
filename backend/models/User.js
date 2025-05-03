import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  karma: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const User = mongoose.model('User', userSchema);

export default User ;