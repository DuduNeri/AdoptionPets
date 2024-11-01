import express from 'express';
import cors from 'cors'; 
import multer from 'multer';
import pool from './connection.js';

const app = express();
const port = 8000;

app.use(cors()); 
app.use(express.json());

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/; 
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas imagens JPEG, PNG e GIF são aceitas.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, description, age, gender } = req.body;
    const image = req.file.buffer; 

    const query = `
      INSERT INTO pets (title, description, age, gender, image, mime_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [title, description, age, gender, image, req.file.mimetype]; 

    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Imagem e dados salvos com sucesso!', pet: result.rows[0] });
  } catch (error) {
    console.error('Erro ao fazer upload:', error); 
    res.status(500).json({ error: 'Erro ao fazer upload' });
  }
});

app.get('/pets', async (req, res) => {
  try {
    const query = 'SELECT id, title, description, age, gender FROM pets';
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao obter pets:', error);
    res.status(500).json({ error: 'Erro ao obter pets' });
  }
});

app.get('/pets/:id/image', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT image, mime_type FROM pets WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      const { image, mime_type } = result.rows[0];
      res.set('Content-Type', mime_type);
      res.send(image); 
    } else {
      res.status(404).json({ error: 'Imagem não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    res.status(500).json({ error: 'Erro ao buscar imagem' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
