// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Complaints from './Complaints';
import CommentsPage from './CommentsPage';
import Footer from './Footer'; // Importe o componente Footer
import './App.css';

// Componente que obtém o ID da URL e fornece o ComplaintsPage com props apropriadas
const CommentsPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const complaintId = id ? parseInt(id, 10) : 0; // Fornece um valor padrão se id for undefined

  const complaint = { id: complaintId, title: 'Exemplo de Reclamação' }; // Ajuste conforme necessário

  // Função para fechar a página de comentários
  const handleClose = () => console.log('Fechar clicado');

  return <CommentsPage complaint={complaint} onClose={handleClose} />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/comments/:id" element={<CommentsPageWrapper />} /> {/* Passa o componente wrapper para incluir a lógica de props */}
          </Routes>
        </main>
        <Footer /> {/* Adicione o Footer */}
      </div>
    </Router>
  );
}

export default App;
