import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Login from './components/Login';
import apiService from './services/api';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [title, setTitle] = useState('نقاشی جدید');
  const [selectedTool, setSelectedTool] = useState('circle');
  const [selectedColor, setSelectedColor] = useState('#e74c3c');
  const [size, setSize] = useState(60);
  const [shapes, setShapes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Undo/Redo functionality
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedoAction = useRef(false);

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        setIsAuthenticated(true);
        apiService.setToken(token);
      } catch (error) {
        console.error('Error parsing user data:', error);
        handleLogout();
      }
    }
  }, []);

  const addToHistory = useCallback((newShapes) => {
    if (!isUndoRedoAction.current) {
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(newShapes);
        return newHistory;
      });
      setHistoryIndex(prev => prev + 1);
    }
    isUndoRedoAction.current = false;
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      setHistoryIndex(prev => prev - 1);
      setShapes(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      setHistoryIndex(prev => prev + 1);
      setShapes(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const handleCanvasClick = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - size/2; // Center the shape
    const y = event.clientY - rect.top - size/2;
    
    const newShape = {
      type: selectedTool,
      x: x,
      y: y,
      color: selectedColor,
      size: size,
      id: Date.now() + Math.random()
    };
    
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    addToHistory(newShapes);
  }, [selectedTool, selectedColor, size, shapes, addToHistory]);

  const removeShape = useCallback((shapeId) => {
    const newShapes = shapes.filter(shape => shape.id !== shapeId);
    setShapes(newShapes);
    addToHistory(newShapes);
  }, [shapes, addToHistory]);

  const handleShapeMove = useCallback((shapeId, newX, newY) => {
    const newShapes = shapes.map(shape => 
      shape.id === shapeId 
        ? { ...shape, x: Math.max(0, newX), y: Math.max(0, newY) }
        : shape
    );
    setShapes(newShapes);
  }, [shapes]);

  const handleShapeDragStart = useCallback((event, shapeType) => {
    event.dataTransfer.setData('text/plain', shapeType);
  }, []);

  const handleShapeDrop = useCallback((shapeType, x, y) => {
    const newShape = {
      type: shapeType,
      x: x - size/2, // Center the shape
      y: y - size/2,
      color: selectedColor,
      size: size,
      id: Date.now() + Math.random()
    };
    
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    addToHistory(newShapes);
  }, [shapes, selectedColor, size, addToHistory]);

  const handleExport = () => {
    const data = {
      title: title,
      shapes: shapes
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'drawing'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setTitle(data.title || 'نقاشی وارد شده');
          const importedShapes = data.shapes || [];
          setShapes(importedShapes);
          addToHistory(importedShapes);
        } catch (error) {
          alert('خطا در خواندن فایل: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleLogin = (user, token) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    apiService.setToken(token);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setShapes([]);
    setTitle('نقاشی جدید');
    setHistory([[]]);
    setHistoryIndex(0);
    apiService.clearToken();
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      alert('لطفاً ابتدا وارد شوید');
      return;
    }

    setIsSaving(true);
    try {
      const result = await apiService.saveDrawing(title, shapes);
      if (result.success) {
        alert('نقاشی با موفقیت ذخیره شد');
      } else {
        alert('خطا در ذخیره نقاشی: ' + result.error);
      }
    } catch (error) {
      alert('خطا در ذخیره نقاشی');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = async () => {
    if (!isAuthenticated) {
      alert('لطفاً ابتدا وارد شوید');
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiService.getDrawing();
      if (result.success) {
        if (result.data.drawing) {
          setTitle(result.data.drawing.title);
          setShapes(result.data.drawing.shapes);
          addToHistory(result.data.drawing.shapes);
          alert('نقاشی با موفقیت بارگذاری شد');
        } else {
          alert('نقاشی‌ای برای این کاربر یافت نشد');
        }
      } else {
        alert('خطا در بارگذاری نقاشی: ' + result.error);
      }
    } catch (error) {
      alert('خطا در بارگذاری نقاشی');
    } finally {
      setIsLoading(false);
    }
  };

  const shapeCounts = useMemo(() => ({
    circle: shapes.filter(shape => shape.type === 'circle').length,
    square: shapes.filter(shape => shape.type === 'square').length,
    triangle: shapes.filter(shape => shape.type === 'triangle').length,
    star: shapes.filter(shape => shape.type === 'star').length,
    heart: shapes.filter(shape => shape.type === 'heart').length,
    diamond: shapes.filter(shape => shape.type === 'diamond').length
  }), [shapes]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Header 
        title={title}
        onTitleChange={setTitle}
        onExport={handleExport}
        onImport={handleImport}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onSave={handleSave}
        onLoad={handleLoad}
        onLogout={handleLogout}
        currentUser={currentUser}
        isSaving={isSaving}
        isLoading={isLoading}
      />
      <div className="main-content">
        <Sidebar 
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          size={size}
          onSizeChange={setSize}
          onShapeDragStart={handleShapeDragStart}
        />
        <Canvas 
          shapes={shapes}
          onCanvasClick={handleCanvasClick}
          onShapeDoubleClick={removeShape}
          onShapeMove={handleShapeMove}
          onShapeDrop={handleShapeDrop}
        />
      </div>
      <Footer shapeCounts={shapeCounts} />
    </div>
  );
}

export default App; 