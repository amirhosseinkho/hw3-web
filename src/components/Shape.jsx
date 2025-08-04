import React from 'react';

function Shape({ type, x, y, color, size, onDoubleClick, onDragStart, onDragEnd, isDragging }) {
  const getShapeStyle = () => {
    const baseStyle = {
      left: `${x}px`,
      top: `${y}px`,
      backgroundColor: color,
      borderColor: color,
      opacity: isDragging ? 0.5 : 1,
      cursor: isDragging ? 'grabbing' : 'grab'
    };

    switch (type) {
      case 'circle':
        return {
          ...baseStyle,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%'
        };
      case 'square':
        return {
          ...baseStyle,
          width: `${size}px`,
          height: `${size}px`
        };
      case 'triangle':
        return {
          ...baseStyle,
          width: 0,
          height: 0,
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size * 0.866}px solid ${color}`,
          backgroundColor: 'transparent'
        };
      case 'star':
        return {
          ...baseStyle,
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='50,10 61,35 90,35 68,57 78,82 50,65 22,82 32,57 10,35 39,35' fill='${color.replace('#', '%23')}'/%3E%3C/svg%3E")`,
          backgroundColor: 'transparent'
        };
      case 'heart':
        return {
          ...baseStyle,
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50,85 C50,85 20,65 20,45 C20,25 40,25 50,35 C60,25 80,25 80,45 C80,65 50,85 50,85 Z' fill='${color.replace('#', '%23')}'/%3E%3C/svg%3E")`,
          backgroundColor: 'transparent'
        };
      case 'diamond':
        return {
          ...baseStyle,
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='50,20 80,50 50,80 20,50' fill='${color.replace('#', '%23')}'/%3E%3C/svg%3E")`,
          backgroundColor: 'transparent'
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      className={`shape ${type}`}
      style={getShapeStyle()}
      onDoubleClick={onDoubleClick}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      draggable={true}
    />
  );
}

export default Shape; 