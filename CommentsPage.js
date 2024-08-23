import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommentsPage.css';

function CommentsPage() {
  const { id } = useParams();
  const [comments, setComments] = useState([
    { complaintId: 1, text: 'Precisamos de uma solução rápida!' },
    { complaintId: 2, text: 'Já fizemos uma reclamação similar.' },
    { complaintId: 3, text: 'Poderiam verificar o ar condicionado?' }
  ].filter(comment => comment.complaintId === parseInt(id, 10)));
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="comments-page-container">
      <h2>Comentários</h2>
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
