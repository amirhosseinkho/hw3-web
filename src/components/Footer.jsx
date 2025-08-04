import React from 'react';
import ShapeCount from './ShapeCount';

function Footer({ shapeCounts }) {
  const shapes = [
    { type: 'circle', label: 'دایره' },
    { type: 'square', label: 'مربع' },
    { type: 'triangle', label: 'مثلث' },
    { type: 'star', label: 'ستاره' },
    { type: 'heart', label: 'قلب' },
    { type: 'diamond', label: 'لوزی' }
  ];

  return (
    <footer className="footer">
      {shapes.map((shape) => (
        <ShapeCount
          key={shape.type}
          type={shape.type}
          label={shape.label}
          count={shapeCounts[shape.type]}
        />
      ))}
    </footer>
  );
}

export default Footer; 