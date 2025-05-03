import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const karma = 0 ;
    const newUser = new User({ username, password: hashedPassword, karma  });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in register-user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    let account = await User.findOne({ username });
    
    if (!account) return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Store in session
    req.session.userId = account._id;
    req.session.karma = account.karma;
    

    res.json({ message: "Logged in successfully" });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔒 Logout (destroys session)
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    res.json({ message: "Logged out successfully" });
  });
});



export default router;