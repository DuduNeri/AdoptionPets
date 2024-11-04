import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>História</h2> {/* Título "História" adicionado */}
        <p>{description}</p>
        <button className="modal-close" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
