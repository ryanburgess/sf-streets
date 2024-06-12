import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Question = ({ question, options, answer, onAnswer, onNextQuestion }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    const allOptions = [...options, answer];
    setShuffledOptions(shuffleArray(allOptions));
  }, [question, options, answer]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null);
    setShowCorrectAnswer(false);
  }, [question]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowCorrectAnswer(true);
    onAnswer(option); // Call onAnswer with the selected option
  };

  const getOptionClass = (option) => {
    if (!showCorrectAnswer) return '';
    if (option === selectedOption && option !== answer) return 'wrong';
    if (option === answer) return 'correct';
    return '';
  };

  return (
    <div className="question-container">
      <h2>{question}</h2>
      {shuffledOptions.map((option, index) => (
        <button
          key={index}
          className={`option-button ${getOptionClass(option)}`}
          onClick={() => handleOptionClick(option)}
          disabled={showCorrectAnswer}
        >
          {option}
        </button>
      ))}
      {showCorrectAnswer && (
        <button className="next-button" onClick={onNextQuestion}>Next</button>
      )}
    </div>
  );
};

export default Question;
