
First, let's add new state variables for difficulty and number of players:
const [difficulty, setDifficulty] = useState(1);
const [numberOfPlayers, setNumberOfPlayers] = useState(6);
Apply
2.
Now, let's create a function to handle the difficulty change:
const handleDifficultyChange = (event) => {
  const newDifficulty = parseInt(event.target.value);
  setDifficulty(newDifficulty);
  
  // Adjust number of players based on difficulty
  if (newDifficulty === 1) {
    setNumberOfPlayers(6);
  } else if (newDifficulty === 2) {
    setNumberOfPlayers(14);
  } else {
    setNumberOfPlayers(20);
  }
};
Apply
3.
Next, let's modify the players array to accommodate more players:
const allPlayers = [
  { name: "Player 1", src: "/images/cherry_picked_pics/0_0_0_0_0.png" },
  { name: "Player 2", src: "/images/cherry_picked_pics/1_0_1_0_0.png" },
  { name: "Player 3", src: "/images/cherry_picked_pics/1_0_1_0_0.png" },
  { name: "Player 4", src: "/images/cherry_picked_pics/1_1_1_2_1.png" },
  { name: "Player 5", src: "/images/cherry_picked_pics/1_0_1_2_4.png" },
  { name: "Player 6", src: "/images/cherry_picked_pics/2_0_2_0_4.png" },
  // Add more players here, up to 20
  { name: "Player 20", src: "/images/cherry_picked_pics/2_0_2_0_5.png" },
];

const [players, setPlayers] = useState(allPlayers.slice(0, 6));
Apply
4.
Update the players when the difficulty changes:
useEffect(() => {
  setPlayers(allPlayers.slice(0, numberOfPlayers));
}, [numberOfPlayers]);
Apply
5.
Now, let's add the difficulty selector to the start screen. Modify the JSX in your return statement:
{!gameStarted ? (
  <div>
    <StartScreen onStart={handleStartGame} />
    <div className="difficulty-selector">
      <h3>Select Difficulty</h3>
      <input
        type="range"
        min="1"
        max="3"
        value={difficulty}
        onChange={handleDifficultyChange}
        className="slider"
      />
      <p>Difficulty: {difficulty} (Players: {numberOfPlayers})</p>
    </div>
  </div>
) : (
  // ... rest of your game components
)}
Apply
6.
Finally, let's update the handleStartGame function to use the selected number of players:
const handleStartGame = () => {
  setGameStarted(true);
  const randomPlayer = players[Math.floor(Math.random() * players.length)];
  setInitialPlayer(randomPlayer);
  setAttemptsLeft(3);
  setGameResult(null);
  setShowDisguisePlayer(true);
};
Apply
These changes will add a difficulty selector at the beginning of the game, which will adjust the number of players based on the chosen difficulty level. The difficulty slider will be visible before the game starts, allowing the player to choose the difficulty before clicking the "Start" button.
Remember to style the new elements appropriately in your CSS file. You might want to add something like this:
.difficulty-selector {
  margin: 20px 0;
  text-align: center;
}

.difficulty-selector .slider {
  width: 200px;
}
Apply
This will create a more engaging and customizable experience for the players, allowing them to adjust the game's difficulty to their preference.
