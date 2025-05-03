import mongoose from "mongoose";
const {Schema} = mongoose;
  const voteSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
      required: true
    },
    voteType: {
      type: String,
      enum: ['up', 'down'],
      required: true
    }
  });

const Votes = mongoose.model('Votes', voteSchema);

export default Votes ;