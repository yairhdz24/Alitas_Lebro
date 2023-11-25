// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Pedidos  from './pages/Pedidos';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
