const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        this.setToken(data.token);
        return { success: true, data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'خطا در اتصال به سرور' };
    }
  }

  async getDrawing() {
    try {
      const response = await fetch(`${API_BASE_URL}/drawing`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'خطا در دریافت نقاشی' };
    }
  }

  async saveDrawing(title, shapes) {
    try {
      const response = await fetch(`${API_BASE_URL}/drawing`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ title, shapes }),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'خطا در ذخیره نقاشی' };
    }
  }

  async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'خطا در دریافت لیست کاربران' };
    }
  }

  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'سرور در دسترس نیست' };
    }
  }
}

export default new ApiService(); 