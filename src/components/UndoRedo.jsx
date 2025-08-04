import React from 'react';

function UndoRedo({ onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div className="undo-redo">
      <button 
        onClick={onUndo} 
        disabled={!canUndo}
        className="undo-redo-btn"
        title="بازگشت"
      >
        ↶
      </button>
      <button 
        onClick={onRedo} 
        disabled={!canRedo}
        className="undo-redo-btn"
        title="تکرار"
      >
        ↷
      </button>
    </div>
  );
}

export default UndoRedo; 