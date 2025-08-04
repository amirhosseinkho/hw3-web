import React from 'react';
import ShapeButton from './ShapeButton';
import ColorPicker from './ColorPicker';
import SizeSlider from './SizeSlider';

function Sidebar({ selectedTool, onToolSelect, selectedColor, onColorChange, size, onSizeChange, onShapeDragStart }) {
  const shapes = [
    { type: 'circle', label: 'دایره' },
    { type: 'square', label: 'مربع' },
    { type: 'triangle', label: 'مثلث' },
    { type: 'star', label: 'ستاره' },
    { type: 'heart', label: 'قلب' },
    { type: 'diamond', label: 'لوزی' }
  ];

  return (
    <aside className="sidebar">
      <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: '#2c3e50' }}>
        ابزارها
      </h3>
      
      <div className="tools-section">
        <h4>اشکال</h4>
        {shapes.map((shape) => (
          <ShapeButton
            key={shape.type}
            shape={shape.type}
            label={shape.label}
            isActive={selectedTool === shape.type}
            onClick={() => onToolSelect(shape.type)}
            onDragStart={(e) => onShapeDragStart(e, shape.type)}
            draggable={true}
          />
        ))}
      </div>

      <div className="tools-section">
        <ColorPicker 
          selectedColor={selectedColor}
          onColorChange={onColorChange}
        />
      </div>

      <div className="tools-section">
        <SizeSlider 
          size={size}
          onSizeChange={onSizeChange}
        />
      </div>
    </aside>
  );
}

export default Sidebar; 