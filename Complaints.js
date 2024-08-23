// src/Complaints.js

import React, { useState } from 'react';
import './Complaints.css';
import CommentsPage from './CommentsPage';

function Complaints() {
  const initialComplaints = [
    {
      id: 1,
      title: 'Falta de papel toalha no banheiro da DID 5',
      description: 'O banheiro da DID 5 está sem papel toalha.',
      image: 'https://via.placeholder.com/150?text=Papel+Toalha',
      likes: 0,
      comments: [],
      status: 'Em análise' // Status da reclamação
    },
    {
      id: 2,
      title: 'Teto quebrado na sala 105 da DID 6',
      description: 'O teto na sala 105 da DID 6 está quebrado.',
      image: 'https://via.placeholder.com/150?text=Teto+Quebrado',
      likes: 0,
      comments: [],
      status: 'Em aberto' // Status da reclamação
    },
    {
      id: 3,
      title: 'RESUN fazendo calor',
      description: 'O ambiente da RESUN está muito quente.',
      image: 'https://via.placeholder.com/150?text=RESUN+Calor',
      likes: 0,
      comments: [],
      status: 'Solucionada' // Status da reclamação
    }
  ];

  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  const handleLike = (id) => {
    setComplaints(complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, likes: complaint.likes + 1 } : complaint
    ));
  };

  const handleOpenComments = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseComments = () => {
    setSelectedComplaint(null);
  };

  const handleToggleDescription = (id) => {
    setExpandedComplaint(expandedComplaint === id ? null : id);
  };

  return (
    <div className="complaints-container">
      <div className="title-card">
        <h2>Lista de Reclamações</h2>
      </div>
      <div className="complaints-list">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-card">
            <img src={complaint.image} alt={complaint.title} />
            <h3>{complaint.title}</h3>
            <div className="complaint-status">
              <span className={`status ${complaint.status.toLowerCase().replace(/\s/g, '-')}`}>
                {complaint.status}
              </span>
            </div>
            <button className="toggle-description" onClick={() => handleToggleDescription(complaint.id)}>
              {expandedComplaint === complaint.id ? 'Ocultar descrição' : 'Mostrar descrição'}
            </button>
            {expandedComplaint === complaint.id && (
              <p>{complaint.description}</p>
            )}
            <div className="complaint-actions">
              <button onClick={() => handleLike(complaint.id)}>👍 {complaint.likes}</button>
              <button onClick={() => handleOpenComments(complaint)}>Comentar</button>
            </div>
            {selectedComplaint && selectedComplaint.id === complaint.id && (
              <CommentsPage complaint={selectedComplaint} onClose={handleCloseComments} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaints;
