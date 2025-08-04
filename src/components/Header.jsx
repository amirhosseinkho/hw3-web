import React, { useState } from 'react';
import UndoRedo from './UndoRedo';
import apiService from '../services/api';

function Header({ 
  title, 
  onTitleChange, 
  onExport, 
  onImport, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onSave,
  onLoad,
  onLogout,
  currentUser,
  isSaving,
  isLoading
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = onImport;
    input.click();
  };

  const handleLogout = () => {
    apiService.clearToken();
    onLogout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="عنوان نقاشی را وارد کنید..."
        />
        <UndoRedo 
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>
      
      <div className="header-center">
        <button 
          onClick={onSave} 
          disabled={isSaving}
          className="save-button"
        >
          {isSaving ? 'در حال ذخیره...' : 'ذخیره در سرور'}
        </button>
        <button 
          onClick={onLoad} 
          disabled={isLoading}
          className="load-button"
        >
          {isLoading ? 'در حال بارگذاری...' : 'بارگذاری از سرور'}
        </button>
      </div>
      
      <div className="header-right">
        <button onClick={handleImportClick} className="import-button">
          وارد کردن
        </button>
        <button onClick={onExport} className="export-button">
          خروجی گرفتن
        </button>
        
        <div className="user-menu">
          <button 
            className="user-button"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {currentUser?.username || 'کاربر'}
          </button>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <strong>کاربر:</strong> {currentUser?.username}
              </div>
              <button onClick={handleLogout} className="logout-button">
                خروج
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 