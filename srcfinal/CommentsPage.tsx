// src/CommentsPage.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommentsPage.css';

// Defina o tipo para as props que CommentsPage espera
interface CommentsPageProps {
  complaint: {
    id: number;
    title: string;
  };
  onClose: () => void;
}

function CommentsPage({ complaint, onClose }: CommentsPageProps) {
  const [comments, setComments] = useState([
    { complaintId: 1, text: 'Precisamos de uma solução rápida!' },
    { complaintId: 2, text: 'Já fizemos uma reclamação similar.' },
    { complaintId: 3, text: 'Poderiam verificar o ar condicionado?' }
  ].filter(comment => comment.complaintId === complaint.id));
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { complaintId: complaint.id, text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="comments-page-container">
      <div className="comments-page-header">
        <h2>Comentários para: {complaint.title}</h2>
        <button onClick={onClose}>Fechar</button>
      </div>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Digite seu comentário"
        />
        <button onClick={handleAddComment}>Adicionar</button>
      </div>
    </div>
  );
}

export default CommentsPage;
