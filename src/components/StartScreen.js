import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Visual Privacy Game</h1>
      <p>Click the button below to start the game!</p>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};export default StartScreen;
