// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Complaints from './Complaints';
import CommentsPage from './CommentsPage';
import Footer from './Footer';
import './App.css';

const CommentsPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const complaintId = id ? parseInt(id, 10) : 0; // Fornece um valor padrão se id for undefined

  const complaint = { id: complaintId, title: 'Exemplo de Reclamação' }; 
  const userName = 'Nome Fictício'; // Define o nome fictício do usuário

  const handleClose = () => console.log('Fechar clicado');

  return <CommentsPage complaint={complaint} onClose={handleClose} userName={userName} />;
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
            <Route path="/comments/:id" element={<CommentsPageWrapper />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
