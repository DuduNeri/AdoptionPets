import React, { useState, useEffect } from 'react';
import Post from './Post';
import './Feed.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    age: '',
    gender: '',
    description: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const loadPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pets'); 
      const pets = response.data.map(pet => ({
        ...pet,
        imageUrl: `http://localhost:8000/pets/${pet.id}/image`,
      }));
      setPosts(pets); 
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  useEffect(() => {
    loadPosts(); 
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const response = await axios.post('http://localhost:8000/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const petWithImage = {
        ...response.data.pet,
        imageUrl: `http://localhost:8000/pets/${response.data.pet.id}/image`,
      };

      const updatedPosts = [...posts, petWithImage]; 
      setPosts(updatedPosts); 

      setShowForm(false); 
      setPreview(null); 
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
  };

  return (
    <div className="feed">
      <IoIosAddCircleOutline className='add-post' onClick={() => setShowForm(true)} />
      
      {showForm && (
        <form onSubmit={handleSubmit} className="upload-form">
          <h2 className='close-add-post' onClick={() => setShowForm(false)}>x</h2>
          <input type="text" name="title" placeholder="Título" onChange={handleInputChange} required />
          <input type="text" name="age" placeholder="Idade" onChange={handleInputChange} required />
          <input type="text" name="gender" placeholder="Gênero" onChange={handleInputChange} required />
          <textarea name="description" placeholder="Sobre..." onChange={handleInputChange} required></textarea>
          
          {/* Pré-visualização da imagem */}
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
          
          <label htmlFor="file-upload" className="image-upload-label">
            Selecione uma imagem
          </label>
          <input
            id="file-upload"
            className="image-selected"
            type="file"
            name="image"
            accept="image/jpeg"
            onChange={handleFileChange}
            required
            style={{ display: "none" }} 
          />
          
          <button type="submit">Enviar</button>
        </form>
      )}
  
      {posts.slice().reverse().map(post => (
        <Post 
          key={post.id} 
          imageUrl={post.imageUrl} 
          title={post.title} 
          age={post.age} 
          gender={post.gender} 
          description={post.description} 
        />
      ))}
    </div>
  );
};

export default Feed;
