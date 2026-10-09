> Persian version: [README.fa.md](README.fa.md)

# Drawing app with server-side save and load

An interactive drawing tool that can save drawings to a server and load them back.

## Features

- **Shapes**: circle, square, triangle, star, heart, diamond
- **Colors**: a full color palette for the shapes
- **Size**: a slider to change the shape size
- **Undo/Redo**: undo and repeat operations
- **User authentication**: login with username and password
- **Save and load**: save a drawing to the server and load it back
- **Persian interface**: all UI text is in Persian
- **Responsive design**: works on all devices

## Installation

### Prerequisites

- Node.js (version 14 or newer)
- npm or yarn

### Steps

1. **Clone the project**:
   ```bash
   git clone https://github.com/amirhosseinkho/hw3-web.git
   cd hw3-web
   ```

2. **Install the front-end dependencies**:
   ```bash
   npm install
   ```

3. **Install the server dependencies**:
   ```bash
   cd server
   npm install
   ```

4. **Start the server**:
   ```bash
   # in the server folder
   npm start
   ```
   The server runs on port 5000.

5. **Start the front end**:
   ```bash
   # in the project root
   npm start
   ```
   The app runs on port 3000.

## Test accounts

Use these accounts to try the app:

| Username | Password |
|----------|----------|
| user1    | password123 |
| user2    | password123 |
| user3    | password123 |

## Usage

The interface is in Persian; button names are given below with their English meaning.

### Logging in

1. Open the app.
2. Enter one of the test accounts.
3. Click "ورود" (Log in).

### Drawing shapes

1. Choose a shape type in the sidebar.
2. Set the color and size.
3. Click on the page to draw the shape.
4. Double-click a shape to delete it.

### Saving and loading

- **Save to server**: click "ذخیره در سرور" (Save to server).
- **Load from server**: click "بارگذاری از سرور" (Load from server).
- **Export**: click "خروجی گرفتن" (Export) to download a JSON file.
- **Import**: click "وارد کردن" (Import) to load a JSON file.

### Undo/Redo

- Use the undo and redo buttons in the header,
- or the keyboard shortcuts Ctrl+Z and Ctrl+Y.

## Project structure

```
hw3-web/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # login page
│   │   ├── Header.jsx         # main header
│   │   ├── Sidebar.jsx        # sidebar
│   │   ├── Canvas.jsx         # drawing area
│   │   └── ...
│   ├── services/
│   │   └── api.js             # API services
│   └── App.jsx                # main component
├── server/
│   ├── server.js              # Express server
│   └── package.json           # server dependencies
└── package.json               # front-end dependencies
```

## API endpoints

### Authentication

- `POST /api/login`: user login

### Drawings

- `GET /api/drawing`: get the user's drawing
- `POST /api/drawing`: save the user's drawing

### Other

- `GET /api/users`: list users
- `GET /api/health`: server status

## Technologies

### Front end

- React.js
- CSS3
- HTML5 Canvas

### Back end

- Node.js
- Express.js
- SQLite
- JWT for authentication
- bcrypt for password hashing

## Notes

1. **Database**: the SQLite database is created automatically in the `server` folder.
2. **Token**: authentication tokens are stored in `localStorage`.
3. **Security**: passwords are hashed with bcrypt.
4. **CORS**: the server is configured for cross-origin requests.

## Troubleshooting

### Cannot connect to the server

- Make sure the server is running on port 5000.
- Check that the firewall is not blocking port 5000.

### Database problems

- Delete `database.sqlite` from the `server` folder.
- Restart the server.

### Authentication problems

- Clear `localStorage`.
- Refresh the page.

## How the server and the system work

The code excerpts below keep the app's Persian error and UI messages as they appear in the code; comments are translated.

### Server architecture

The server is built with Node.js and Express.js. It consists of the following parts.

#### server.js

```javascript
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Create the database
const db = new sqlite3.Database('database.sqlite');
```

#### Database schema

The SQLite database has two main tables:

1. **users**: stores user accounts
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

2. **drawings**: stores users' drawings
```sql
CREATE TABLE drawings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    drawing_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

### Authentication and login

#### Login flow

1. **Login request**: the user enters a username and password.
2. **Database lookup**: the server looks up the username in the `users` table.
3. **Password check**: the password is verified with bcrypt.
4. **Token creation**: on success, a JWT is created.
5. **Response**: the token and the user information are sent to the front end.

```javascript
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'خطا در سرور' });
        }
        
        if (!user) {
            return res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه است' });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه است' });
        }
        
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
        res.json({ token, user: { id: user.id, username: user.username } });
    });
});
```

#### Authentication middleware

Sensitive endpoints are protected by an authentication middleware:

```javascript
const authenticateToken = (req, res, next) => {
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
};
```

### Saving and loading drawings

#### Saving a drawing to the server

Saving a drawing works as follows:

1. **Receive the drawing**: the front end sends the drawing data as JSON.
2. **Authenticate**: the server checks the user's token.
3. **Store**: the drawing data is stored in the `drawings` table.
4. **Update**: if the user already has a drawing, it is updated.

```javascript
app.post('/api/drawing', authenticateToken, (req, res) => {
    const { drawingData } = req.body;
    const userId = req.user.userId;
    
    db.get('SELECT * FROM drawings WHERE user_id = ?', [userId], (err, existingDrawing) => {
        if (err) {
            return res.status(500).json({ error: 'خطا در سرور' });
        }
        
        if (existingDrawing) {
            // Update the existing drawing
            db.run('UPDATE drawings SET drawing_data = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', 
                [drawingData, userId], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'خطا در ذخیره نقاشی' });
                }
                res.json({ message: 'نقاشی با موفقیت به‌روزرسانی شد' });
            });
        } else {
            // Create a new drawing
            db.run('INSERT INTO drawings (user_id, drawing_data) VALUES (?, ?)', 
                [userId, drawingData], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'خطا در ذخیره نقاشی' });
                }
                res.json({ message: 'نقاشی با موفقیت ذخیره شد' });
            });
        }
    });
});
```

#### Loading a drawing from the server

Loading a drawing works as follows:

1. **Load request**: the front end requests the drawing.
2. **Authenticate**: the server checks the user's token.
3. **Look up**: the user's drawing is read from the `drawings` table.
4. **Send**: the drawing data is sent to the front end.

```javascript
app.get('/api/drawing', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    
    db.get('SELECT drawing_data FROM drawings WHERE user_id = ?', [userId], (err, drawing) => {
        if (err) {
            return res.status(500).json({ error: 'خطا در سرور' });
        }
        
        if (!drawing) {
            return res.status(404).json({ error: 'نقاشی یافت نشد' });
        }
        
        res.json({ drawingData: drawing.drawing_data });
    });
});
```

### Front end

#### API service (api.js)

The front end talks to the server through `api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('token');
    }
    
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }
    
    async login(username, password) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (!response.ok) {
            throw new Error('خطا در ورود');
        }
        
        const data = await response.json();
        this.setToken(data.token);
        return data;
    }
    
    async saveDrawing(drawingData) {
        const response = await fetch(`${API_BASE_URL}/drawing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ drawingData })
        });
        
        if (!response.ok) {
            throw new Error('خطا در ذخیره نقاشی');
        }
        
        return response.json();
    }
    
    async loadDrawing() {
        const response = await fetch(`${API_BASE_URL}/drawing`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('خطا در بارگذاری نقاشی');
        }
        
        return response.json();
    }
}
```

#### Login component

The `Login` component handles user login:

```javascript
const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const data = await apiService.login(username, password);
            onLogin(data.user);
        } catch (err) {
            setError('نام کاربری یا رمز عبور اشتباه است');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="نام کاربری"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'در حال ورود...' : 'ورود'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};
```

### State management and local storage

#### Local storage with localStorage

The app uses `localStorage` to store data temporarily:

```javascript
// Save the drawing to localStorage
const saveToLocalStorage = (drawingData) => {
    localStorage.setItem('drawingData', JSON.stringify(drawingData));
};

// Load the drawing from localStorage
const loadFromLocalStorage = () => {
    const data = localStorage.getItem('drawingData');
    return data ? JSON.parse(data) : null;
};

// Save the operation history
const saveHistory = (history) => {
    localStorage.setItem('drawingHistory', JSON.stringify(history));
};

// Load the operation history
const loadHistory = () => {
    const data = localStorage.getItem('drawingHistory');
    return data ? JSON.parse(data) : [];
};
```

#### Undo/Redo

Undo/redo is implemented with an array of drawing states:

```javascript
const [history, setHistory] = useState([]);
const [currentIndex, setCurrentIndex] = useState(-1);

const addToHistory = (newState) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    saveHistory(newHistory);
};

const undo = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setShapes(history[currentIndex - 1]);
    }
};

const redo = () => {
    if (currentIndex < history.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShapes(history[currentIndex + 1]);
    }
};
```

### Security and good practices

#### Password hashing

All passwords are hashed with bcrypt:

```javascript
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
```

#### Token handling

JWTs are used for authentication and stored in `localStorage`:

```javascript
// Check whether the token is valid
const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.exp > Date.now() / 1000;
    } catch {
        return false;
    }
};
```

#### CORS

The server is configured for cross-origin requests:

```javascript
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

### Troubleshooting and maintenance

#### Logging

The server logs requests for troubleshooting:

```javascript
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
```

#### Error handling

All endpoints include error handling:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'خطای داخلی سرور' });
});
```

#### Database backup

The SQLite database is stored automatically in `database.sqlite` and can be backed up easily.

This system is built with modern web technologies and includes the features needed for an interactive drawing app. The server architecture is simple but effective and easy to extend. Authentication is secure, and saving and loading are reliable.

#### Use of AI

To write this report, detailed explanations and the code were given to GPT-4o, which was used to make the text more precise and better organized. AI models were also used in parts of the code for optimization and better performance.
