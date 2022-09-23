import axios from 'axios';
import React, { useState, useContext } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });
  const [showModal, setShowModal] = useState(false);

  const fetchQestions = async (url) => {
    setIsLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err.message));
    if (response) {
      const { results } = response.data;
      if (results.length > 0) {
        setQuestions(results);
        setWaiting(false);
        setIsLoading(false);
        setError(false);
      } else {
        setError(true);
        setWaiting(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1;

      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect((presValue) => presValue + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setWaiting(true);
    setCorrect(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;

    fetchQestions(url);
  };

  const handleChange = (target) => {
    const { name, value } = target;
    setQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        isLoading,
        questions,
        index,
        correct,
        error,
        showModal,
        quiz,
        handleChange,
        handleSubmit,
        nextQuestion,
        checkAnswer,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
