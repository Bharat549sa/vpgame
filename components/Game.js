// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Game = () => {
//   // ... existing state variables

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Initialize game state, load images, etc.
//     // This effect will run when the component mounts (i.e., when the game starts)
//   }, []);

//   // ... existing game logic

//   const endGame = () => {
//     // Logic to end the game
//     navigate('/results', { state: { score: currentScore } });
//   };

//   return (
//     <div className="game">
//       {/* Game UI components */}
//     </div>
//   );
// };export default Game;











import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ... import other necessary components


const Game = ({ initialPlayer, disguisedPlayer, onSelection, attemptsLeft }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  if (!disguisedPlayer) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    // Load all players (including the initial player)
    const allPlayers = [
      { id: 1, name: 'Player 1', src: 'images/personel/1.jpg' },
      { id: 2, name: 'Player 2', src: 'images/personel/1 (2).jpg' },
      { id: 3, name: 'Player 3', src: 'images/personel/2 (2).jpg' },
      { id: 4, name: 'Player 4', src: 'images/personel/3.jpg' },
      { id: 5, name: 'Player 5', src: 'images/personel/4.jpg' },
      { id: 6, name: 'Player 6', src: 'images/personel/4 (2).jpg' },
    ];
    setPlayers(allPlayers);
  }, []);

  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player);
  };

  const handleSubmitGuess = () => {
    if (!selectedPlayer) {
      alert("Please select a player before submitting your guess.");
      return;
    }
    onSelection(selectedPlayer);
  };


// const Game = () => {
//   // ... existing state variables

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Initialize game state, load images, etc.
//     // This effect will run when the component mounts (i.e., when the game starts)
//   }, []);

//   // ... existing game logic

//   const endGame = () => {
//     // Logic to end the game
//     navigate('/results', { state: { score: currentScore } });
//   };

//   return (
//     <div className="game">
//       {/* Game UI components */}
//     </div>
//   );
// };export default Game;
return (
  <div className="game">
    <h2>Guess the Disguised Agent</h2>
    <p>Attempts left: {attemptsLeft}</p>
    
    <div className="disguised-image">
      <h3>Disguised Agent:</h3>
      <img src={disguisedPlayer.src} alt="Disguised Agent" style={{ width: '200px', height: '200px' }} />
    </div>

    <div className="player-selection">
      <h3>Select the original agent:</h3>
      <PlayerSelector 
        players={players} 
        onSelection={handlePlayerSelection} 
        selectedPlayer={selectedPlayer}
      />
    </div>

    <button onClick={handleSubmitGuess} disabled={!selectedPlayer}>
      Submit Guess
    </button>
  </div>
);
};

export default Game;
