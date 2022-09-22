import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
  const { waiting, isLoading, questions, index, correct, error } =
    useGlobalContext();
  return <main>quizz app</main>;
}

export default App;
