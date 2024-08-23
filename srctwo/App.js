// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Complaints from './Complaints';
import CommentsPage from './CommentsPage'; // Adiciona a importação do novo componente
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Adiciona o cabeçalho fora das rotas */}
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/comments/:id" element={<CommentsPage />} /> {/* Nova rota para a página de comentários */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
