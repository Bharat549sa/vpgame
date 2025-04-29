
import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';

const StartScreen = ({ onStart }) => {

  // const AnimatedBackground = () => {
  //   const [currentImageIndex, setCurrentImageIndex] = useState(1);
  
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentImageIndex((prevIndex) => {
  //         if (prevIndex >= 119) return 1;
  //         return prevIndex + 1;
  //       });
  //     }, 100); // Change image every 100ms
  
  //     return () => clearInterval(interval);
  //   }, []);
  return (
    <div className="start-screen">
  <AnimatedBackground />
      <h1 style={{ zIndex: 1, color: 'white' }}>Visual Privacy Game</h1>
      <p style={{ zIndex: 1, color: 'white' }}>Click the button below to start the game!</p>
      <button onClick={onStart} style={{ zIndex: 1 }}>Start Game</button>
    </div>
  );
};export default StartScreen;