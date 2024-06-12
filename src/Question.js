import React, { useState, useEffect } from 'react';

const Question = ({ question, options, answer, onNextQuestion }) => {
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
      {options.map((option, index) => (
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
