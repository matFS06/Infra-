// src/App.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import CommentsPage from './CommentsPage';

// Mock do componente CommentsPage
jest.mock('./CommentsPage', () => (props: any) => (
  <div>
    <h2>Comentários para {props.complaint.title}</h2>
    <button onClick={props.onClose}>Fechar</button>
  </div>
));

test('renders the app and routes correctly', () => {
  render(
    <MemoryRouter initialEntries={['/comments/1']}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/comments/:id" element={<CommentsPage complaint={{ id: 1, title: 'Exemplo de Reclamação' }} onClose={() => console.log('Fechar clicado')} />} />
      </Routes>
    </MemoryRouter>
  );

  // Verifica se o título correto é renderizado
  expect(screen.getByText('Comentários para Exemplo de Reclamação')).toBeInTheDocument();
});
