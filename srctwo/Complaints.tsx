import React, { useState } from 'react';
import './Complaints.css';
import CommentsPage from './CommentsPage.tsx';
import { FaSearch, FaComment, FaShare, FaBookmark, FaArrowUp } from 'react-icons/fa';

interface Complaint {
  id: number;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: Array<{ text: string; date: string; likes: number }>;
  status: string;
  date: string;
}

function Complaints() {
  const initialComplaints: Complaint[] = [
    {
      id: 1,
      title: 'Falta de papel toalha no banheiro da DID 5',
      description: 'O banheiro da DID 5 está sem papel toalha.',
      image: 'https://via.placeholder.com/150?text=Papel+Toalha',
      likes: 0,
      comments: [],
      status: 'Em análise Técnica',
      date: '25 de Agosto de 2024'
    },
    {
      id: 2,
      title: 'Teto quebrado na sala 105 da DID 6',
      description: 'O teto na sala 105 da DID 6 está quebrado.',
      image: 'https://via.placeholder.com/150?text=Teto+Quebrado',
      likes: 0,
      comments: [],
      status: 'Em aberto',
      date: '24 de Agosto de 2024'
    },
    {
      id: 3,
      title: 'RESUN fazendo calor',
      description: 'O ambiente da RESUN está muito quente.',
      image: 'https://via.placeholder.com/150?text=RESUN+Calor',
      likes: 0,
      comments: [],
      status: 'Solucionada',
      date: '23 de Agosto de 2024'
    }
  ];

  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [expandedComplaint, setExpandedComplaint] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [arrowUpCounts, setArrowUpCounts] = useState<{ [key: number]: number }>({});

  const handleLike = (id: number) => {
    setComplaints(complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, likes: complaint.likes + 1 } : complaint
    ));
  };

  const handleArrowUpClick = (id: number) => {
    setArrowUpCounts({
      ...arrowUpCounts,
      [id]: (arrowUpCounts[id] || 0) + 1,
    });
  };

  const handleOpenComments = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseComments = () => {
    setSelectedComplaint(null);
  };

  const handleToggleDescription = (id: number) => {
    setExpandedComplaint(expandedComplaint === id ? null : id);
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="complaints-container">
      <div className="title-card">
        <h2>Lista de Reclamações</h2>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquise um problema"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div className="complaints-list">
        {filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="complaint-card">
            <div className="profile-info">
              <div className="profile-pic"></div>
              <div className="profile-details">
                <div className="profile-name">Nome do Usuário</div>
                <div className="profile-role">Cargo</div>
              </div>
              <div className="profile-date">{complaint.date}</div>
            </div>
            <img src={complaint.image} alt={complaint.title} />
            <h3>{complaint.title}</h3>
            <div className="complaint-status">
              <span className={`status ${complaint.status.toLowerCase().replace(/\s/g, '-')}`}>
                {complaint.status}
              </span>
            </div>
            <div
              className="description-toggle"
              onClick={() => handleToggleDescription(complaint.id)}
            >
              {expandedComplaint === complaint.id ? 'Ocultar descrição' : 'Mostrar descrição'}
            </div>
            {expandedComplaint === complaint.id && (
              <p className="description-text">{complaint.description}</p>
            )}
            <div className="complaint-actions">
              <button className="arrow-up-button" onClick={() => handleArrowUpClick(complaint.id)}>
                <FaArrowUp />
                <span>{arrowUpCounts[complaint.id] || 0}</span>
              </button>
              <div className="comment-icon" onClick={() => handleOpenComments(complaint)}>
                <FaComment />
                <span>{complaint.comments.length}</span>
              </div>
              <a href="https://www.instagram.com/sharer/sharer.php?u=https://your-website-url.com" className="share-button" target="_blank" rel="noopener noreferrer">
                <FaShare />
              </a>
              <button className="save-button">
                <FaBookmark />
              </button>
            </div>
            {selectedComplaint && selectedComplaint.id === complaint.id && (
              <CommentsPage
                complaint={selectedComplaint}
                onClose={handleCloseComments}
                userName="Novo Usuário"
                onCommentAdded={(newComment) => {
                  setComplaints(complaints.map((c) =>
                    c.id === selectedComplaint.id
                      ? { ...c, comments: [...c.comments, newComment] }
                      : c
                  ));
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaints;
