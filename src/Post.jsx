import React, { useState } from 'react';
import './Post.css';
import Modal from './Modal';
import AdoptionForm from './AdoptionForm'

const Post = ({ imageUrl, title, age, gender, description }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

  const handleSobreClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAdoptionClick = () => {
    setShowAdoptionForm(true);
  };

  const handleCloseAdoptionForm = () => {
    setShowAdoptionForm(false);
  };

  return (
    <div className="post">
      <h2 className="post-header">Adote um amigo</h2>
      <img src={imageUrl} alt={title} className="post-image" />
      <h3 className="post-title">{title}</h3>
      <div className="post-buttons">
        <div className="button-info">
          <span className="post-label">Idade</span>
          <span className="post-age">{age}</span>
          <button className="btn-sobre" onClick={handleSobreClick}>Sobre</button>
        </div>
        <div className="button-info">
          <span className="post-label">Sexo</span>
          <span className={`post-gender ${gender === 'Fêmea' ? 'femea' : 'macho'}`}>
            {gender}
          </span>
          <button className="btn-adocao" onClick={handleAdoptionClick}>Adotar</button>
        </div>
      </div>

      {/* Modal para "Sobre" */}
      <Modal isOpen={showModal} onClose={handleCloseModal} description={description} />

      {/* Modal para Adoção */}
      <AdoptionForm isOpen={showAdoptionForm} onClose={handleCloseAdoptionForm} />
    </div>
  );
};

export default Post;
