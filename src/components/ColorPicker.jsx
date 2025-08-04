import React from 'react';

function ColorPicker({ selectedColor, onColorChange }) {
  const colors = [
    '#e74c3c', // قرمز
    '#3498db', // آبی
    '#f39c12', // نارنجی
    '#2ecc71', // سبز
    '#9b59b6', // بنفش
    '#e67e22', // نارنجی تیره
    '#1abc9c', // فیروزه‌ای
    '#34495e', // خاکستری تیره
    '#f1c40f', // زرد
    '#e91e63', // صورتی
  ];

  return (
    <div className="color-picker">
      <h4>انتخاب رنگ</h4>
      <div className="color-grid">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-button ${selectedColor === color ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker; 