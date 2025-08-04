import React from 'react';

function ShapeCount({ type, label, count }) {
  const renderShapeIcon = () => {
    switch (type) {
      case 'circle':
        return (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        );
      case 'square':
        return (
          <svg viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" fill="currentColor" />
          </svg>
        );
      case 'triangle':
        return (
          <svg viewBox="0 0 100 100">
            <polygon points="50,20 80,80 20,80" fill="currentColor" />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 100 100">
            <polygon points="50,10 61,35 90,35 68,57 78,82 50,65 22,82 32,57 10,35 39,35" fill="currentColor" />
          </svg>
        );
      case 'heart':
        return (
          <svg viewBox="0 0 100 100">
            <path d="M50,85 C50,85 20,65 20,45 C20,25 40,25 50,35 C60,25 80,25 80,45 C80,65 50,85 50,85 Z" fill="currentColor" />
          </svg>
        );
      case 'diamond':
        return (
          <svg viewBox="0 0 100 100">
            <polygon points="50,20 80,50 50,80 20,50" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="shape-count">
      {renderShapeIcon()}
      <span>{label}: {count}</span>
    </div>
  );
}

export default ShapeCount; 