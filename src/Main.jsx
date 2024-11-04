import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './Feed.jsx';
import { IoIosAddCircleOutline } from "react-icons/io"; 
<IoIosAddCircleOutline />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
