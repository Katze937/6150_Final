const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
dotenv.config();  

const app = express();
const port = 3000; //原本連線到5000現在被占用所以改3000
const cors = require('cors');
app.use(cors());  // 允許所有域名的請求

mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());  

app.get('/', (req, res) => {
  res.send('Hello, this is the Simple Blog API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 檢查是否已經註冊過
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // 創建新用戶
      const newUser = new User({ email, password });
      await newUser.save();
  
      // 生成 JWT Token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'Registration Successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });

  // 登入 API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      // 驗證密碼
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'wrong password' });
      }
  
      // 生成 JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Registration Successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  
  // 登出 API
app.post('/api/logout', (req, res) => {
    res.json({ message: 'Logout Successful' });
  });

// 忘記密碼 API
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      
      res.json({ message: 'The link to set the password has been sent to your e-mail address.' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  
  // 驗證 JWT 的中間件
const protect = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Failure to provide authentication tokens' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();  
    } catch (error) {
      res.status(400).json({ message: 'Invalid Authentication Token' });
    }
  };
  
  
  app.get('/api/profile', protect, async (req, res) => {
    console.log('Profile route accessed');
    try {
      const user = await User.findById(req.user.id); 
      res.json(user); 
    } catch (err) {
      res.status(500).json({ message: 'Server Error', err });
    }
  });
  