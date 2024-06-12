import React, { useState, useEffect } from 'react';
import questionsData from './questions.json';
import Question from './Question';
import Score from './Score';
import ConfettiAnimation from './ConfettiAnimation';
import './App.css';

// Function to shuffle the questions array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...questionsData]).slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion]?.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (score === questions.length) {
        setShowConfetti(true);
      }
    }
  };

  const handleStartOver = () => {
    const shuffledQuestions = shuffleArray([...questionsData]).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowConfetti(false);
  };

  return (
    <div className="app">
      <header>
        <h1>San Francisco Streets Quiz</h1>
      </header>
      {showConfetti && <ConfettiAnimation />}
      {showScore ? (
        <Score score={score} total={questions.length} onStartOver={handleStartOver} />
      ) : (
        questions.length > 0 && questions[currentQuestion] && (
          <Question
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            answer={questions[currentQuestion].answer}
            onNextQuestion={handleNextQuestion}
            onAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
};

export default App;
