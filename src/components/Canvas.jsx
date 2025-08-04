import React, { useState, useRef } from 'react';
import Shape from './Shape';

function Canvas({ shapes, onCanvasClick, onShapeDoubleClick, onShapeMove, onShapeDrop }) {
  const [draggedShape, setDraggedShape] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragOver, setIsDragOver] = useState(false);
  const canvasRef = useRef(null);

  const handleCanvasClick = (event) => {
    // Only trigger if clicking directly on canvas, not on shapes
    if (event.target === event.currentTarget) {
      onCanvasClick(event);
    }
  };

  const handleShapeDragStart = (event, shapeId) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const shape = shapes.find(s => s.id === shapeId);
    if (shape) {
      setDraggedShape(shapeId);
      setDragOffset({
        x: event.clientX - rect.left - shape.x,
        y: event.clientY - rect.top - shape.y
      });
    }
  };

  const handleShapeDragEnd = () => {
    setDraggedShape(null);
  };

  const handleCanvasMouseMove = (event) => {
    if (draggedShape && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = event.clientX - rect.left - dragOffset.x;
      const newY = event.clientY - rect.top - dragOffset.y;
      onShapeMove(draggedShape, newX, newY);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Get the shape type from the dragged data
    const shapeType = event.dataTransfer.getData('text/plain');
    if (shapeType) {
      onShapeDrop(shapeType, x, y);
    }
  };

  return (
    <div 
      ref={canvasRef}
      className={`canvas ${isDragOver ? 'drag-over' : ''}`}
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleShapeDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {shapes.map((shape) => (
        <Shape
          key={shape.id}
          type={shape.type}
          x={shape.x}
          y={shape.y}
          color={shape.color}
          size={shape.size}
          onDoubleClick={() => onShapeDoubleClick(shape.id)}
          onDragStart={(e) => handleShapeDragStart(e, shape.id)}
          onDragEnd={handleShapeDragEnd}
          isDragging={draggedShape === shape.id}
        />
      ))}
    </div>
  );
}

export default Canvas; 