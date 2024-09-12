import React, { useState, useEffect } from 'react';
import './CommentsPage.css';

interface Comment {
  complaintId: number;
  text: string;
  date: string;
  likes: number;
}

interface CommentsPageProps {
  complaint: {
    id: number;
    title: string;
  };
  onClose: () => void;
}

function CommentsPage({ complaint, onClose }: CommentsPageProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Recupera comentários do localStorage
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      const allComments: Comment[] = JSON.parse(storedComments);
      setComments(allComments.filter(comment => comment.complaintId === complaint.id));
    }
  }, [complaint.id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const now = new Date();
      const formattedDate = `${now.getDate()} de ${now.toLocaleString('pt-BR', { month: 'long' })} de ${now.getFullYear()}`;
      const newCommentObj: Comment = { complaintId: complaint.id, text: newComment, date: formattedDate, likes: 0 };

      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);

      // Salva os comentários no localStorage
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      setNewComment('');
    }
  };

  const handleLike = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1; // Incrementa o número de likes do comentário

    setComments(updatedComments);

    // Salva os comentários atualizados no localStorage
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  return (
    <div className="comments-page-container">
      {/* Cabeçalho que contém o contador de comentários, botão de ordenação e o botão de fechar */}
      <div className="comments-page-header">
        <div className="comments-count">
          {comments.length} {comments.length === 1 ? 'COMENTÁRIO' : 'COMENTÁRIOS'}
        </div>
        <button className="most-liked-button">
          MAIS CURTIDOS <span className="icon">v</span> {/* Seta para baixo */}
        </button>
        <button className="close-button" onClick={onClose}>X</button>
      </div>

      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-header">
              <div className="profile-circle"></div>
              <div className="comment-user">Novo Usuário</div> {/* Nome fictício do usuário */}
            </div>
            <p className="comment-text">{comment.text}</p>
            <div className="comment-date">{comment.date}</div>
            <div className="comment-actions">
              <button className="like-button" onClick={() => handleLike(index)}>❤️ {comment.likes}</button>
            </div>
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
