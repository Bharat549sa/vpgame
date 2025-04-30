Add a new state to track whether Player 1 has been disguised:
const [player1Disguised, setPlayer1Disguised] = useState(false);
Apply
2.
Modify the handleDisguise function to set this new state:
const handleDisguise = (disguisedImage) => {
  console.log('Disguised Image:', disguisedImage);
  setPlayer1Disguised(true);
};
Apply
3.
Update the JSX to conditionally render Player 2 selection and the submit button:
<div className="App">
  <header className="App-header">
    <Router>
      {/* ... existing Router code ... */}
    </Router>
    
    {/* Background images */}
    <div className="background-images">
      {/* ... existing background images code ... */}
    </div>

    <h1>Player Selector and Disguise</h1>
    
    {!player1Disguised && (
      <>
        <h3>Player 1</h3>
        <PlayerSelector 
          players={players} 
          onSelection={(selectedPlayers) => {
            handleSelection(selectedPlayers);
            setPlayer1Image(selectedPlayers[0].src);
          }} 
        />
        {showDisguisePlayer && currentPlayer && (
          <DisguisePlayer
            player={currentPlayer}
            onDisguise={handleDisguise}
            onEncryptionDecision={handleWantsEncryption}
          />
        )}
      </>
    )}

    {player1Disguised && (
      <>
        <h3>Player 2</h3>
        <PlayerSelector 
          players={players} 
          onSelection={(selectedPlayers) => {
            handleSelection(selectedPlayers);
            setPlayer2Image(selectedPlayers[0].src);
          }} 
        />
        {player1Image && player2Image && (
          <button onClick={() => compareImages(player1Image, player2Image)}>
            Submit and Compare Images
          </button>
        )}
      </>Add a new state to track whether Player 1 has been disguised:
const [player1Disguised, setPlayer1Disguised] = useState(false);
Apply
2.
Modify the handleDisguise function to set this new state:
const handleDisguise = (disguisedImage) => {
  console.log('Disguised Image:', disguisedImage);
  setPlayer1Disguised(true);
};
Apply
3.
Update the JSX to conditionally render Player 2 selection and the submit button:
<div className="App">
  <header className="App-header">
    <Router>
      {/* ... existing Router code ... */}
    </Router>
    
    {/* Background images */}
    <div className="background-images">
      {/* ... existing background images code ... */}
    </div>

    <h1>Player Selector and Disguise</h1>
    
    {!player1Disguised && (
      <>
        <h3>Player 1</h3>
        <PlayerSelector 
          players={players} 
          onSelection={(selectedPlayers) => {
            handleSelection(selectedPlayers);
            setPlayer1Image(selectedPlayers[0].src);
          }} 
        />
        {showDisguisePlayer && currentPlayer && (
          <DisguisePlayer
            player={currentPlayer}
            onDisguise={handleDisguise}
            onEncryptionDecision={handleWantsEncryption}
          />
        )}
      </>
    )}

    {player1Disguised && (
      <>
        <h3>Player 2</h3>
        <PlayerSelector 
          players={players} 
          onSelection={(selectedPlayers) => {
            handleSelection(selectedPlayers);
            setPlayer2Image(selectedPlayers[0].src);
          }} 
        />
        {player1Image && player2Image && (
          <button onClick={() => compareImages(player1Image, player2Image)}>
            Submit and Compare Images
          </button>
        )}
      </>
    )}

    {imageLoading && <p>Comparing images...</p>}
    {!imageLoading && comparisonResult && <p>Comparison Result: {comparisonResult}</p>}

    {/* ... rest of your component ... */}
  </header>
</div>
Apply
This structure will:
1.
Show only Player 1 selection and disguise options initially.
2.
After Player 1 has been disguised (when handleDisguise is called), it will set player1Disguised to true.
3.
Once player1Disguised is true, it will show the Player 2 selection and the submit button.
4.
The submit button will only appear when both Player 1 and Player 2 images have been selected.
    )}

    {imageLoading && <p>Comparing images...</p>}
    {!imageLoading && comparisonResult && <p>Comparison Result: {comparisonResult}</p>}

    {/* ... rest of your component ... */}
  </header>
</div>
Apply
This structure will:
1.
Show only Player 1 selection and disguise options initially.
2.
After Player 1 has been disguised (when handleDisguise is called), it will set player1Disguised to true.
3.
Once player1Disguised is true, it will show the Player 2 selection and the submit button.
4.
The submit button will only appear when both Player 1 and Player 2 images have been selected.
