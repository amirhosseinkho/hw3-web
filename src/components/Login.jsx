import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user, data.token);
      } else {
        setError(data.error || 'خطا در ورود به سیستم');
      }
    } catch (error) {
      setError('خطا در اتصال به سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>ورود به سیستم نقاشی</h2>
          <p>برای استفاده از برنامه نقاشی، لطفاً وارد شوید</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">نام کاربری:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری خود را وارد کنید"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">رمز عبور:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
        
        <div className="demo-accounts">
          <h4>حساب‌های آزمایشی:</h4>
          <div className="account-list">
            <div className="account-item">
              <strong>نام کاربری:</strong> user1 | <strong>رمز عبور:</strong> password123
            </div>
            <div className="account-item">
              <strong>نام کاربری:</strong> user2 | <strong>رمز عبور:</strong> password123
            </div>
            <div className="account-item">
              <strong>نام کاربری:</strong> user3 | <strong>رمز عبور:</strong> password123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 