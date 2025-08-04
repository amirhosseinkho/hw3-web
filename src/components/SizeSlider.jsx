import React from 'react';

function SizeSlider({ size, onSizeChange }) {
  return (
    <div className="size-slider">
      <h4>اندازه شکل</h4>
      <div className="slider-container">
        <input
          type="range"
          min="20"
          max="100"
          value={size}
          onChange={(e) => onSizeChange(parseInt(e.target.value))}
          className="size-range"
        />
        <span className="size-value">{size}px</span>
      </div>
    </div>
  );
}

export default SizeSlider; 