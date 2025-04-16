// import Pacman from "react-pacman";
// import { useEffect, useState } from "react";
// import "./styles.css";
// import PlayerSelector from './PlayerSelector'; import DisguisePlayer from './DisguisePlayer';
// export default function App() {
// /*   const [gameKey, setGameKey] = useState(0); // Unique key to remount the Pacman component
//   const [isGameOver, setIsGameOver] = useState(false); // State to track if the game is over

//   // Function to reset the game
//   const resetGame = () => {
//     setIsGameOver(false);
//     setGameKey((prevKey) => prevKey + 1); // Change key to remount component
//   }; */
//   const [showPlayerSelector, setShowPlayerSelector] = useState(false);
//   const [selectedPlayers, setSelectedPlayers] = useState([]);
//   const [currentPlayer, setCurrentPlayer] = useState(null);
//   const [showDisguisePlayer, setShowDisguisePlayer] = useState(false);
//   const players = [ { name: 'Player 1', src: '/images/personel/1.jpg'},
//      { name: 'Player 2', src: '/images/personel/1 (2).jpg' },
//       { name: 'Player 3', src: '/images/personel/2 (2).jpg' },
//        { name: 'Player 4', src: '/images/personel/3.jpg' },
//        { name: 'Player 5', src: '/images/personel/4.jpg' },
//        { name: 'Player 6', src: '/images/personel/4 (2).jpg' } ];
//         const handleSelection = (selectedPlayers) => {
//           setSelectedPlayers(selectedPlayers);
//           setCurrentPlayer(selectedPlayers[0]);
//            setShowDisguisePlayer(true);
//         };
//         const handleDisguise = (disguisedImage) => { console.log('Disguised Image:', disguisedImage);
//            // You can handle the disguised image as needed };
//         const handleStartClick = () => {
//           setShowPlayerSelector(true);

//          };
//   // This useEffect would simulate game over; you can replace this with your actual logic
//   /* useEffect(() => {
//     if (isGameOver) {
//       const timer = setTimeout(() => {
//         resetGame();
//       }, 1000); // Delay before restarting the game
//       return () => clearTimeout(timer);
//     }
//   }, [isGameOver]);

//   // Function to simulate game ending
//   const handleSimulateGameEnd = () => {
//     setIsGameOver(true); // Set game as over
//   }; */
//         };
//   return (
//     <div className="App">
//       <header className="App-header"> <h1>Player Selector and Disguise</h1>
//        {!showPlayerSelector && (
//          <button onClick={handleStartClick}>
//         Start</button> )}
//         {showPlayerSelector && !showDisguisePlayer && ( <PlayerSelector players={players} onSelection={handleSelection} /> )}
//          {showDisguisePlayer && currentPlayer && ( <DisguisePlayer player={currentPlayer} onDisguise={handleDisguise} /> )}
//       </header>
//     {/*   <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <h1>Pac-Man</h1>
//       <div className="pac-man-container">
//         <Pacman key={gameKey} />
//       </div>
//       {isGameOver && <div className="game-over">Game Over! Restarting...</div>}
//       {/* Button to simulate game end for demonstration */}
//       {/* <button onClick={handleSimulateGameEnd}>End Game (Simulate)</button> */}
//     </div>
//   );
// }

/* function applyGaussianBlur(ctx, width, height) { const imageData = ctx.getImageData(0, 0, width, height); 
  const data = imageData.data; const kernel = [ [1, 4, 7, 4, 1], [4, 16, 26, 16, 4], [7, 26, 41, 26, 7], [4, 16, 26, 16, 4], [1, 4, 7, 4, 1] ];
   const kernelSize = 5; const kernelSum = 273; const applyKernel = (x, y) => { let r = 0, g = 0, b = 0; for (let ky = 0; ky < kernelSize; ky++) { for (let kx = 0; kx < kernelSize; kx++) { const px = (x + kx - 2) * 4; const py = (y + ky - 2) * width * 4; 
    const weight = kernel[ky][kx]; r += data[px + py] * weight; g += data[px + py + 1] * weight; b += data[px + py + 2] * weight; } } 
    
    return [r / kernelSum, g / kernelSum, b / kernelSum]; }; for (let y = 2; y < height - 2; y++) { for (let x = 2; x < width - 2; x++) { const [r, g, b] = applyKernel(x, y); const index = (x + y * width) * 4; data[index] = r; data[index + 1] = g; data[index + 2] = b; } }
     ctx.putImageData(imageData, 0, 0); }
 */

import React, { useState } from "react";
import "./styles.css";
import PlayerSelector from "./PlayerSelector";
import DisguisePlayer from "./DisguisePlayer";
import PasswordPage from "./PasswordPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Results from './components/Results';


import ComparePlayers from "./ComparePlayers";

export default function App() {
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [showDisguisePlayer, setShowDisguisePlayer] = useState(false);

  const [wantsEncryption, setWantsEncryption] = useState(null);
  const [showPasswordPage, setShowPasswordPage] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [showGuessPage, setShowGuessPage] = useState(false);
const [gameStarted, setGameStarted] = useState(false);

const [sliderValue, setSliderValue] = useState(0);
const [doppelgangerImages, setDoppelgangerImages] = useState([]);
const imageDir = 'public/images';
const [showComparePlayers, setShowComparePlayers] = useState(false);



useEffect(() => {
  // Initialize doppelganger images on load
   const initialImages = getDoppelgangerImages(imageDir, sliderValue);
    setDoppelgangerImages(initialImages);
  }, [sliderValue]);
 
  const handleSliderChange = (event) => {
  const value = event.target.value;
  setSliderValue(value);
  const newImages = getDoppelgangerImages(imageDir, value);
   setDoppelgangerImages(newImages);
  };
// Helper function to get a random integer
const getRandomInt = (max) => Math.floor(Math.random() * max);

// Helper function to check if a file exists
const fileExists = (file) => {
  // Implementation of file existence check (mocked or actual logic)
  return true;
};

// Helper function to shuffle an array
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const handleStartGame=() =>{
  setGameStarted(true);
};



  const players = [
    { name: "Player 1", src: "/images/personel/1.jpg" },
    { name: "Pl]ayer 2", src: "/images/personel/1 (2).jpg" },
    { name: "Player 3", src: "/images/personel/2 (2).jpg" },
    { name: "Player 4", src: "/images/personel/3.jpg" },
    { name: "Player 5", src: "/images/personel/4.jpg" },
    { name: "Player 6", src: "/images/personel/4 (2).jpg" },
  ];

  const handleSelection = (selectedPlayers) => {
    setSelectedPlayers(selectedPlayers);
    setCurrentPlayer(selectedPlayers[0]);
    setShowDisguisePlayer(true);
    setShowPlayerSelector(false);
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


     setShowComparePlayers(true);

  };
  
  const getDoppelgangerImages = (directory, value, chosenPlayerSrc) => {
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
  
      imagesToReturn.push(`${directory}/${file}.png`);
    }
  
    imagesToReturn.push(`${directory}/${chosenId}_${gender}_${race}_${background}_${costume}.png`);
  
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
            <Route path="/" element={<Game />} />
            <Route path="/results" element={<Results />} />
          </Routes>
         )}
         </Router>  
      {!showPlayerSelector && !showDisguisePlayer && !showPasswordPage && !showGuessPage && (
    <>
      <h1>Player elector and Disguise</h1>
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

      <div className="slider-container">
 <input
 type="range"
 min="0"
 max="4"
 value={sliderValue}
 className="slider"
 onChange={handleSliderChange}
 />
 <div className="image-container">
 {doppelgangerImages.map((image, index) => (
 <img key={index} src={process.env.PUBLIC_URL + '/' + image} alt="Doppelganger" />
 ))}

</div></div>    
    </div>
  
  );
}
// function getDoppelgangerImages(directory,value){
// //f"{id}_{gender}_{race}_{background}_{costume}"
// let chosenInfo=chosenPlayer.src
// let chosenId=chosenInfo.substring(chosenInfo.length-14, chosenInfo.length-12)
// if (chosenId.substring(0,1)==="/"){
//     chosenId=chosenId.substring(1,2)
// }
// let gender=-1
// let genderOffset=-1
// //Thie first 12 identies are men, the next 12 are women. We
// if (chosenId<12){
//     gender='0'
//     genderOffset=0
// }
// else{
//     gender='1'
//     genderOffset=12
// }

// let imagesToReturn=[]

// // We can determine race, background type of image, and costume type based on numbers in the agent image filename
// let race = chosenInfo.substring(chosenInfo.length-9, chosenInfo.length-8)
// let background = chosenInfo.substring(chosenInfo.length-7, chosenInfo.length-6)
// let costume = chosenInfo.substring(chosenInfo.length-5, chosenInfo.length-4)
// const ids=[]
// let idsToSkip=[]
// let file=""

// do {
//     firstIdToSkip = (getRandomInt(11) + genderOffset).toString() //pick a random identity of the given gender
// } while (firstIdToSkip == chosenId)
// idsToSkip.push(firstIdToSkip)

// if(gender==0){
//     idsToSkip.push('4') //There is no male Identity 4
// }else{
//     do { //There is only space to show the user 10 dopplegangers so we will ned to skip 1 if the agent is female
//         secondIdToSkip = (getRandomInt(11) + genderOffset).toString()
//     } while (secondIdToSkip == chosenId || secondIdToSkip == firstIdToSkip)
//     idsToSkip.push(secondIdToSkip)
// }
// //chose more or less similiar images based on the value of the slider
// for (let i = genderOffset; i < (12+genderOffset); i++) {
//     if (i.toString()===chosenId || idsToSkip.includes(i.toString())){
//         continue
//     }
//     if(value==2){ //if slider is value 
//         do{
//             file=i+'_'+gender+'_'+race_is_element_id_is_pos[i]+'_'+getRandomInt(2)+'_'+getRandomInt(9);
//         } while(!fileExists(file))
//     }
//     if(value==3){
//         do{
//             file=i+'_'+gender+'_'+race_is_element_id_is_pos[i]+'_'+background+'_'+getRandomInt(9);
//         } while(!fileExists(file))
//     }
//     if(value==4){
//         do{
//             file=i+'_'+gender+'_'+race_is_element_id_is_pos[i]+'_'+background+'_'+costume;
//             if(!fileExists(file)){
//                 file=i+'_'+gender+'_'+race_is_element_id_is_pos[i]+'_'+background+'_'+getRandomInt(9);
//             }
//         } while(!fileExists(file))
//     }

//     imagesToReturn.push(directory+'/'+file+'.png')
// }
// imagesToReturn.push(directory+'/'+chosenId+'_'+gender+'_'+race+'_'+background+'_'+costume+'.png')


// return shuffle(imagesToReturn);
// }


// function that acutally changes the doppleganger images based on slider value
// function updateDoppelgangers(value){
//   if ((lastSliderVal < value && value > 2) || (lastSliderVal > value && value > 1)){
//       editLimit = editLimit - (value - lastSliderVal)
//   }

//   if(editLimit<0){
//       swal({
//           title: "Can't add more effects", icon: "warning"
//       });
//       let slider = document.getElementById("doppelgangerSlider").querySelector(".slider");
//       slider.value = lastSliderVal;
//       editLimit=editLimit+(value-lastSliderVal)
//       return
//   }
//   document.getElementById("effectCount").innerHTML = "Effect Left: " + editLimit;
//   if (value == 1){

//       finalAgentChoices=originalImageLocs
//   }
//   else{
//       finalAgentChoices=doppelgangerSets[value-2]
//   }
//   for (var i = 0; i < doppelgangerElements.length; i++) {
//       doppelgangerElements[i].src=finalAgentChoices[i]
//   }
//   lastSliderVal=value
// }
//export default App;