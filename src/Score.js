import React from 'react';

const Score = ({ score, total, onStartOver }) => {
  return (
    <div className="score-container">
      <h2>Your Score: {score} / {total}</h2>
      <button onClick={onStartOver}>Start Over</button>
    </div>
  );
};

export default Score;
