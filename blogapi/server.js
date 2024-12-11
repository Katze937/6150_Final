const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
dotenv.config();  

const app = express();
const port = 3000; //原本連線到5000現在被占用所以改3000
const cors = require('cors');
const path = require('path');
app.use(cors());  // 允許所有域名的請求
app.use(express.static(path.join(__dirname, 'dist/your-angular-app')));
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());  

app.get('/', (req, res) => {
  res.send('Hello, this is the Simple Blog API!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/your-angular-app/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = new User({ email, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'Registration Successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'wrong password' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Registration Successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  

app.post('/api/logout', (req, res) => {
    res.json({ message: 'Logout Successful' });
  });

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
  
  
  // 1. 獲取單篇帖子的詳細信息
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// 2. 刪除帖子
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// 3. 添加評論
app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // 創建新評論
    const newComment = {
      body: req.body.body,
      parentCommentId: req.body.parentCommentId || null,
    };

    post.comments.push(newComment); 
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// 4. 點贊帖子
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes = (post.likes || 0) + 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// 5. 搜索帖子
app.get('/api/posts/search', async (req, res) => {
  try {
    const query = req.query.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { body: { $regex: query, $options: 'i' } },
        { tags: { $in: [query] } }
      ]
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});
