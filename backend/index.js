import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import authRoutes from './routes/Authentication.js';
import questionRoutes from './routes/QuestionCRUD.js'
import answersRoute from './routes/AnswersCRUD.js'
import cors from 'cors';

const app = express();
const mongoURI = 'mongodb://localhost:27017/QA'; // Change this if using a cloud database like MongoDB Atlas
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
import dotenv from "dotenv";
dotenv.config();
// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // <- This should match your React dev server's URL
  credentials: true                // <- This allows cookies/session to be sent
}));
app.use(session({
    secret: 'super-secret-key',            // used to sign the session ID cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7       // 7 days
    }
  }));


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes);
app.use('/',questionRoutes);
app.use('/',answersRoute);
app.listen(3000,()=>{
    console.log("running on port 3000")
})
