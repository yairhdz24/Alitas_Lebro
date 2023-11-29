// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Pedidos  from './pages/Pedidos';
import Clientes from './pages/Clientes';
import HistorialPedidos from './pages/HistorialPedidos'

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/HistorialPedidos" element={<HistorialPedidos />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
