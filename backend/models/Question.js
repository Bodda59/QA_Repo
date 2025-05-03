import mongoose from "mongoose";
const { Schema } = mongoose;

// Question Schema
const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
});



// Create models
const Question = mongoose.model('Question', questionSchema);
export default Question;