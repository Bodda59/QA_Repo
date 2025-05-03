import mongoose from "mongoose";
const { Schema } = mongoose;
// Answer Schema
const answerSchema = new Schema({
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    }
  });
  
  
const Answers = mongoose.model('Answers', answerSchema);

export default Answers ;