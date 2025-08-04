const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Database setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

// Initialize database tables
function initDatabase() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Drawings table
  db.run(`CREATE TABLE IF NOT EXISTS drawings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    shapes TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Insert default users
  const defaultUsers = [
    { username: 'user1', password: 'password123' },
    { username: 'user2', password: 'password123' },
    { username: 'user3', password: 'password123' }
  ];

  defaultUsers.forEach(user => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    db.run(
      'INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
      [user.username, hashedPassword],
      (err) => {
        if (err) {
          console.error('Error inserting default user:', err);
        }
      }
    );
  });
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'توکن احراز هویت ارائه نشده است' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'توکن نامعتبر است' });
    }
    req.user = user;
    next();
  });
}

// Routes

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'نام کاربری و رمز عبور الزامی است' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'خطا در سرور' });
    }

    if (!user) {
      return res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه است' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه است' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, username: user.username } });
  });
});

// Get user's drawing
app.get('/api/drawing', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.get('SELECT * FROM drawings WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1', [userId], (err, drawing) => {
    if (err) {
      return res.status(500).json({ error: 'خطا در سرور' });
    }

    if (!drawing) {
      return res.json({ drawing: null });
    }

    try {
      const shapes = JSON.parse(drawing.shapes);
      res.json({
        drawing: {
          id: drawing.id,
          title: drawing.title,
          shapes: shapes,
          created_at: drawing.created_at,
          updated_at: drawing.updated_at
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'خطا در پردازش داده‌ها' });
    }
  });
});

// Save user's drawing
app.post('/api/drawing', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { title, shapes } = req.body;

  if (!title || !shapes) {
    return res.status(400).json({ error: 'عنوان و شکل‌ها الزامی است' });
  }

  const shapesJson = JSON.stringify(shapes);

  // Check if user already has a drawing
  db.get('SELECT id FROM drawings WHERE user_id = ?', [userId], (err, existingDrawing) => {
    if (err) {
      return res.status(500).json({ error: 'خطا در سرور' });
    }

    if (existingDrawing) {
      // Update existing drawing
      db.run(
        'UPDATE drawings SET title = ?, shapes = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
        [title, shapesJson, userId],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'خطا در ذخیره نقاشی' });
          }
          res.json({ message: 'نقاشی با موفقیت به‌روزرسانی شد', drawingId: existingDrawing.id });
        }
      );
    } else {
      // Create new drawing
      db.run(
        'INSERT INTO drawings (user_id, title, shapes) VALUES (?, ?, ?)',
        [userId, title, shapesJson],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'خطا در ذخیره نقاشی' });
          }
          res.json({ message: 'نقاشی با موفقیت ذخیره شد', drawingId: this.lastID });
        }
      );
    }
  });
});

// Get all users (for demo purposes)
app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, created_at FROM users', (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'خطا در سرور' });
    }
    res.json({ users });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'سرور فعال است' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 