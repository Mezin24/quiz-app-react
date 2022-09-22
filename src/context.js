import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const url = '';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const fetchQestions = async () => {
    setIsLoading(true);
    setWaiting(false);
    const response = await axios(tempUrl).catch((err) =>
      console.log(err.message)
    );
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

  useEffect(() => {
    fetchQestions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        isLoading,
        questions,
        index,
        correct,
        error,
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
