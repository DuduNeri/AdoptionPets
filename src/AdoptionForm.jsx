import React, { useState } from 'react';
import './AdoptionForm.css'; 

const AdoptionForm = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Oi, vim pelo aplicativo Patinhas Felizes, e estou muito interessado em adotar um dos filhotes. Pode me mandar foto? Meu nome é ${name}, meu telefone é ${phone} e meu email é ${email}.`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, '_blank');

    setName('');
    setPhone('');
    setEmail('');
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="form-title">Formulário de Adoção</h2>
        <button className="modal-close" onClick={onClose}>✖</button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
