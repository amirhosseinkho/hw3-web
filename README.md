# برنامه نقاشی با قابلیت ذخیره و بازیابی از سرور

این برنامه یک ابزار نقاشی تعاملی است که امکان ذخیره و بازیابی نقاشی‌ها را از سرور فراهم می‌کند.

## ویژگی‌ها

- **رسم شکل‌های مختلف**: دایره، مربع، مثلث، ستاره، قلب، الماس
- **انتخاب رنگ**: پالت رنگی کامل برای انتخاب رنگ شکل‌ها
- **تنظیم اندازه**: اسلایدر برای تغییر اندازه شکل‌ها
- **عملیات Undo/Redo**: بازگشت و تکرار عملیات
- **احراز هویت کاربر**: سیستم ورود با نام کاربری و رمز عبور
- **ذخیره و بازیابی**: ذخیره نقاشی در سرور و بازیابی آن
- **رابط کاربری فارسی**: تمام متن‌ها به زبان فارسی
- **طراحی ریسپانسیو**: سازگار با تمام دستگاه‌ها

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js (نسخه 14 یا بالاتر)
- npm یا yarn

### مراحل نصب

1. **کلون کردن پروژه**:
   ```bash
   git clone <repository-url>
   cd web-hw2
   ```

2. **نصب وابستگی‌های فرانت‌اند**:
   ```bash
   npm install
   ```

3. **نصب وابستگی‌های سرور**:
   ```bash
   cd server
   npm install
   ```

4. **راه‌اندازی سرور**:
   ```bash
   # در پوشه server
   npm start
   ```
   سرور روی پورت 5000 اجرا می‌شود.

5. **راه‌اندازی فرانت‌اند**:
   ```bash
   # در پوشه اصلی پروژه
   npm start
   ```
   برنامه روی پورت 3000 اجرا می‌شود.

## حساب‌های آزمایشی

برای تست برنامه، از حساب‌های زیر استفاده کنید:

| نام کاربری | رمز عبور |
|------------|----------|
| user1      | password123 |
| user2      | password123 |
| user3      | password123 |

## نحوه استفاده

### ورود به سیستم
1. برنامه را باز کنید
2. یکی از حساب‌های آزمایشی را وارد کنید
3. روی دکمه "ورود" کلیک کنید

### رسم شکل‌ها
1. از نوار کناری، نوع شکل مورد نظر را انتخاب کنید
2. رنگ و اندازه شکل را تنظیم کنید
3. روی صفحه کلیک کنید تا شکل رسم شود
4. برای حذف شکل، روی آن دوبار کلیک کنید

### ذخیره و بازیابی
- **ذخیره در سرور**: روی دکمه "ذخیره در سرور" کلیک کنید
- **بارگذاری از سرور**: روی دکمه "بارگذاری از سرور" کلیک کنید
- **خروجی گرفتن**: روی دکمه "خروجی گرفتن" کلیک کنید تا فایل JSON دانلود شود
- **وارد کردن**: روی دکمه "وارد کردن" کلیک کنید تا فایل JSON بارگذاری شود

### عملیات Undo/Redo
- از دکمه‌های بازگشت و تکرار در هدر استفاده کنید
- یا از کلیدهای میانبر Ctrl+Z و Ctrl+Y استفاده کنید

## ساختار پروژه

```
web-hw2/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # صفحه ورود
│   │   ├── Header.jsx         # هدر اصلی
│   │   ├── Sidebar.jsx        # نوار کناری
│   │   ├── Canvas.jsx         # صفحه نقاشی
│   │   └── ...
│   ├── services/
│   │   └── api.js             # سرویس‌های API
│   └── App.jsx                # کامپوننت اصلی
├── server/
│   ├── server.js              # سرور Express
│   └── package.json           # وابستگی‌های سرور
└── package.json               # وابستگی‌های فرانت‌اند
```

## API Endpoints

### احراز هویت
- `POST /api/login` - ورود کاربر

### نقاشی‌ها
- `GET /api/drawing` - دریافت نقاشی کاربر
- `POST /api/drawing` - ذخیره نقاشی کاربر

### سایر
- `GET /api/users` - لیست کاربران
- `GET /api/health` - وضعیت سرور

## تکنولوژی‌های استفاده شده

### فرانت‌اند
- React.js
- CSS3
- HTML5 Canvas

### بک‌اند
- Node.js
- Express.js
- SQLite
- JWT برای احراز هویت
- bcrypt برای رمزنگاری

## نکات مهم

1. **پایگاه داده**: SQLite به صورت خودکار در پوشه `server` ایجاد می‌شود
2. **توکن**: توکن‌های احراز هویت در localStorage ذخیره می‌شوند
3. **امنیت**: رمزهای عبور با bcrypt رمزنگاری می‌شوند
4. **CORS**: سرور برای درخواست‌های cross-origin پیکربندی شده است

## عیب‌یابی

### مشکل اتصال به سرور
- مطمئن شوید سرور روی پورت 5000 اجرا می‌شود
- بررسی کنید که firewall پورت 5000 را مسدود نکرده باشد

### مشکل پایگاه داده
- فایل `database.sqlite` را از پوشه `server` حذف کنید
- سرور را مجدداً راه‌اندازی کنید

### مشکل احراز هویت
- localStorage را پاک کنید
- صفحه را refresh کنید

## توضیحات تفصیلی سرور و عملکرد سیستم

### معماری سرور

سرور این برنامه با استفاده از Node.js و Express.js پیاده‌سازی شده است. ساختار سرور شامل موارد زیر است:

#### فایل server.js
```javascript
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key';

// میدلورها
app.use(cors());
app.use(express.json());

// ایجاد پایگاه داده
const db = new sqlite3.Database('database.sqlite');
```

#### ساختار پایگاه داده
پایگاه داده SQLite شامل دو جدول اصلی است:

1. **جدول users**: برای ذخیره اطلاعات کاربران
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

2. **جدول drawings**: برای ذخیره نقاشی‌های کاربران
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

### سیستم احراز هویت و ورود

#### فرآیند ورود کاربر
1. **درخواست ورود**: کاربر نام کاربری و رمز عبور را وارد می‌کند
2. **بررسی در پایگاه داده**: سرور نام کاربری را در جدول users جستجو می‌کند
3. **تأیید رمز عبور**: با استفاده از bcrypt رمز عبور بررسی می‌شود
4. **تولید توکن**: در صورت موفقیت، JWT token تولید می‌شود
5. **ارسال پاسخ**: توکن و اطلاعات کاربر به فرانت‌اند ارسال می‌شود

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

#### میدلور احراز هویت
برای محافظت از endpoint های حساس، میدلور احراز هویت استفاده می‌شود:

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

### سیستم ذخیره و بازیابی نقاشی

#### ذخیره نقاشی در سرور
فرآیند ذخیره نقاشی شامل مراحل زیر است:

1. **دریافت داده نقاشی**: فرانت‌اند داده نقاشی را به صورت JSON ارسال می‌کند
2. **احراز هویت**: سرور توکن کاربر را بررسی می‌کند
3. **ذخیره در پایگاه داده**: داده نقاشی در جدول drawings ذخیره می‌شود
4. **به‌روزرسانی**: اگر نقاشی قبلی وجود داشته باشد، آن به‌روزرسانی می‌شود

```javascript
app.post('/api/drawing', authenticateToken, (req, res) => {
    const { drawingData } = req.body;
    const userId = req.user.userId;
    
    db.get('SELECT * FROM drawings WHERE user_id = ?', [userId], (err, existingDrawing) => {
        if (err) {
            return res.status(500).json({ error: 'خطا در سرور' });
        }
        
        if (existingDrawing) {
            // به‌روزرسانی نقاشی موجود
            db.run('UPDATE drawings SET drawing_data = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', 
                [drawingData, userId], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'خطا در ذخیره نقاشی' });
                }
                res.json({ message: 'نقاشی با موفقیت به‌روزرسانی شد' });
            });
        } else {
            // ایجاد نقاشی جدید
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

#### بازیابی نقاشی از سرور
فرآیند بازیابی نقاشی شامل مراحل زیر است:

1. **درخواست بازیابی**: فرانت‌اند درخواست بازیابی نقاشی را ارسال می‌کند
2. **احراز هویت**: سرور توکن کاربر را بررسی می‌کند
3. **جستجو در پایگاه داده**: نقاشی کاربر از جدول drawings بازیابی می‌شود
4. **ارسال داده**: داده نقاشی به فرانت‌اند ارسال می‌شود

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

### عملکرد فرانت‌اند

#### سرویس API (api.js)
فرانت‌اند از سرویس api.js برای ارتباط با سرور استفاده می‌کند:

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

#### کامپوننت Login
کامپوننت Login مسئول ورود کاربران است:

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

### مدیریت حالت و ذخیره محلی

#### ذخیره محلی با localStorage
برنامه از localStorage برای ذخیره موقت داده‌ها استفاده می‌کند:

```javascript
// ذخیره نقاشی در localStorage
const saveToLocalStorage = (drawingData) => {
    localStorage.setItem('drawingData', JSON.stringify(drawingData));
};

// بازیابی نقاشی از localStorage
const loadFromLocalStorage = () => {
    const data = localStorage.getItem('drawingData');
    return data ? JSON.parse(data) : null;
};

// ذخیره تاریخچه عملیات
const saveHistory = (history) => {
    localStorage.setItem('drawingHistory', JSON.stringify(history));
};

// بازیابی تاریخچه عملیات
const loadHistory = () => {
    const data = localStorage.getItem('drawingHistory');
    return data ? JSON.parse(data) : [];
};
```

#### مدیریت Undo/Redo
سیستم Undo/Redo با استفاده از آرایه‌ای از حالت‌های نقاشی پیاده‌سازی شده است:

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

### امنیت و بهترین شیوه‌ها

#### رمزنگاری رمزهای عبور
تمام رمزهای عبور با استفاده از bcrypt رمزنگاری می‌شوند:

```javascript
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
```

#### مدیریت توکن‌ها
توکن‌های JWT برای احراز هویت استفاده می‌شوند و در localStorage ذخیره می‌شوند:

```javascript
// بررسی اعتبار توکن
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

#### محافظت از CORS
سرور برای درخواست‌های cross-origin پیکربندی شده است:

```javascript
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

### عیب‌یابی و نگهداری

#### لاگ‌گیری
سرور شامل سیستم لاگ‌گیری برای عیب‌یابی است:

```javascript
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
```

#### مدیریت خطا
تمام endpoint ها شامل مدیریت خطای مناسب هستند:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'خطای داخلی سرور' });
});
```

#### پشتیبان‌گیری از پایگاه داده
پایگاه داده SQLite به صورت خودکار در فایل `database.sqlite` ذخیره می‌شود و می‌تواند به راحتی پشتیبان‌گیری شود.

### نتیجه‌گیری

این سیستم با استفاده از تکنولوژی‌های مدرن وب پیاده‌سازی شده است و شامل تمام ویژگی‌های مورد نیاز برای یک برنامه نقاشی تعاملی است. معماری سرور ساده اما کارآمد است و امکان گسترش آسان را فراهم می‌کند. سیستم احراز هویت امن و سیستم ذخیره و بازیابی قابل اعتماد است.

