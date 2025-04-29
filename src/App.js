import React, { useState , useEffect } from "react";
import "./styles.css";
import PlayerSelector from "./PlayerSelector";
import DisguisePlayer from "./DisguisePlayer";
import PasswordPage from "./PasswordPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Results from './components/Results';
export default function App() {
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [showDisguisePlayer, setShowDisguisePlayer] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
  const [wantsEncryption, setWantsEncryption] = useState(null);
  const [showPasswordPage, setShowPasswordPage] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [showGuessPage, setShowGuessPage] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [gameResult, setGameResult] = useState(null);
   const [showComparePlayers, setShowComparePlayers] = useState(false);
   const [sliderValue, setSliderValue] = useState(50); // Assuming a default value of 50
   const [doppelgangerImages, setDoppelgangerImages] = useState([]);
   const [initialPlayer, setInitialPlayer] = useState(null);
   const players = [
  { name: "Player 1", src: "/images/cherry_picked_pics/0_0_0_0_0.png" },
  { name: "Pl]ayer 2", src: "/images/cherry_picked_pics/1_0_1_0_0.png" },
  { name: "Player 3", src: "/images/cherry_picked_pics/1_0_1_0_0.png" },
  { name: "Player 4", src: "/images/cherry_picked_pics/17_1_1_2_1.png" },
  { name: "Player 5", src: "/images/cherry_picked_pics/1_0_1_2_4.png" },
  { name: "Player 6", src: "/images/cherry_picked_pics/2_0_2_0_4.png" },
];
const imageDir = "/images/cherry_picked_pics/"; // Adjust this path as needed

  const handleSelection = (selectedPlayers) => {
    setSelectedPlayers(selectedPlayers);
    setCurrentPlayer(selectedPlayers[0]);
    setShowDisguisePlayer(true);
    setShowPlayerSelector(false);
  };
  const handleDisguise = (disguisedImage) => {
    console.log('Disguised Image:', disguisedImage);
    // Implement the logic for handling the disguised image
  };
  const handleStartGame=() =>{
    setGameStarted(true);
    // Randomly select an initial player
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setInitialPlayer(randomPlayer);
   //setDisguisedPlayer(null);  // Reset disguisedPlayer
  
    setAttemptsLeft(3);
    setGameResult(null);
    setShowDisguisePlayer(true);  // Show the disguise player screen first
  };
  
  const handleStartClick = () => {
    setShowPlayerSelector(true);
  };

  const handleWantsEncryption = (value) => {
    setShowDisguisePlayer(false);
    if (value) {
      setShowPasswordPage(true);
    } else {
      setShowGuessPage(true);
    }
  };

  const handlePasswordSubmit = (password) => {
    setUserPassword(password);
    console.log("Password entered:", password);       //  Save password in state
    setShowPasswordPage(false);      //  Hide password page
    setShowGuessPage(true);          //  Show guess page next (or any next step)
  };
  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
    if (currentPlayer) {
      const newImages = getDoppelgangerImages(imageDir, value, currentPlayer.src);
      setDoppelgangerImages(newImages);
    }
  };
  useEffect(() => {
    // Initialize doppelganger images on load
    if (currentPlayer) {
      const initialImages = getDoppelgangerImages(imageDir, sliderValue, currentPlayer.src);
      console.log("Doppelganger images:", initialImages);
      setDoppelgangerImages(initialImages);
    }
  }, [sliderValue, currentPlayer]);

  const getDoppelgangerImages = (directory, value, chosenPlayerSrc) => {
    if (!chosenPlayerSrc) {
      console.error("chosenPlayerSrc is undefined");
       return [];
       }
    let chosenInfo = chosenPlayerSrc;
    let chosenId = chosenInfo.substring(chosenInfo.length - 14, chosenInfo.length - 12);
    if (chosenId.substring(0, 1) === "/") {
      chosenId = chosenId.substring(1, 2);
    }
  
    let gender = -1;
    let genderOffset = -1;




  
  
    // Determine gender based on chosenId
    if (chosenId < 12) {
      gender = '0';
      genderOffset = 0;
    } else {
      gender = '1';
      genderOffset = 12;
    }
  
    const imagesToReturn = [];
  
    // Extract race, background, and costume from chosenInfo
    const race = chosenInfo.substring(chosenInfo.length - 9, chosenInfo.length - 8);
    const background = chosenInfo.substring(chosenInfo.length - 7, chosenInfo.length - 6);
    const costume = chosenInfo.substring(chosenInfo.length - 5, chosenInfo.length - 4);
  
    const idsToSkip = [];
    let file = "";
  
    let firstIdToSkip;
    do {
      firstIdToSkip = (getRandomInt(11) + genderOffset).toString(); // Pick a random identity of the given gender
    } while (firstIdToSkip === chosenId);
    idsToSkip.push(firstIdToSkip);
  
    if (gender === '0') {
      idsToSkip.push('4'); // There is no male Identity 4
    } else {
      let secondIdToSkip;
      do {
        secondIdToSkip = (getRandomInt(11) + genderOffset).toString(); // Skip one more if the agent is female
      } while (secondIdToSkip === chosenId || secondIdToSkip === firstIdToSkip);
      idsToSkip.push(secondIdToSkip);
    }
  
    // Create similar images based on slider value
    for (let i = genderOffset; i < (12 + genderOffset); i++) {
      if (i.toString() === chosenId || idsToSkip.includes(i.toString())) {
        continue;
      }
  
      if (value === 2) {
        do {
          file = `${i}_${gender}_${race}_element_${getRandomInt(2)}_${getRandomInt(9)}`;
        } while (!fileExists(file));
      }
  
      if (value === 3) {
        do {
          file = `${i}_${gender}_${race}_${background}_${getRandomInt(9)}`;
        } while (!fileExists(file));
      }
  
      if (value === 4) {
        do {
          file = `${i}_${gender}_${race}_${background}_${costume}`;
          if (!fileExists(file)) {
            file = `${i}_${gender}_${race}_${background}_${getRandomInt(9)}`;
          }
        } while (!fileExists(file));
      }
  
      // imagesToReturn.push(`${directory}/${file}.png`);
      // When adding images to imagesToReturn, use absolute paths

    }
    imagesToReturn.push(`/images/doppelganger/${file}.png`);
  // For the chosen player's image
  imagesToReturn.push(`/images/doppelganger/${chosenId}_${gender}_${race}_${background}_${costume}.png`);
    // imagesToReturn.push(`${directory}/${chosenId}_${gender}_${race}_${background}_${costume}.png`);
  
    return shuffle(imagesToReturn);
  };

  return (
    <div className="App">
      <header className="App-header">
       <Router>
 {!gameStarted ? (
   <StartScreen onStart={handleStartGame} />
 ) : (
  
    <Routes>
{/*  <Route path="/" element={<Game />} /> */}
<Route path="/" element={                showDisguisePlayer ? (
                  <DisguisePlayer
                  player={initialPlayer} // Add this line
                    onDisguise={handleDisguise}
                    onEncryptionDecision={handleWantsEncryption}
                  />
                ) : 
                  showDisguisePlayer ? (
                  <Game 
                    initialPlayer={initialPlayer}
                  //  disguisedPlayer={disguisedPlayer}
                    onSelection={handleSelection}
                    attemptsLeft={attemptsLeft}
                  />
                
              ): (
                <div>Loading...</div>
              )
            
                } />
                <Route path="/results" element={<Results gameResult={gameResult}/>} />
 </Routes>
 )}
 </Router>
      {!showPlayerSelector && !showDisguisePlayer && !showPasswordPage && !showGuessPage && (
    <>
      <h1>Player Selector and Disguise</h1>
      <h3>Disguise Your Agent</h3>
      <button onClick={handleStartClick}>Start</button>
    </>
  )}  
        
        {showPlayerSelector && !showDisguisePlayer && (
          <PlayerSelector players={players} onSelection={handleSelection} />
        )}

        {showDisguisePlayer && currentPlayer && (
          <DisguisePlayer
            player={currentPlayer}
            onDisguise={() => {}}
            onEncryptionDecision={handleWantsEncryption}
          />
        )}

{showPasswordPage && (
  <PasswordPage onPasswordSubmit={handlePasswordSubmit} />
)}
 {showComparePlayers && currentPlayer && (
 <ComparePlayers
 originalPlayer={currentPlayer}
 disguisedPlayer={currentPlayer} // Assuming the disguised player is the same as the current player for now
 />
)}


      </header>
    </div>
  );
}
