 import React, { useState , useEffect } from "react";
     import "./styles.css";
     import PlayerSelector from "./PlayerSelector";
     import DisguisePlayer from "./DisguisePlayer";
     import PasswordPage from "./PasswordPage";
     import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
     import StartScreen from './components/StartScreen';
     import Game from './components/Game';
     import Results from './components/Results';
     
     
     function shuffle(array) {
       let currentIndex = array.length,  randomIndex;
     
       // While there remain elements to shuffle...
       while (currentIndex != 0) {
     
         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex--;
     
         // And swap it with the current element.
         [array[currentIndex], array[randomIndex]] = [
           array[randomIndex], array[currentIndex]];
       }
     
       return array;
     }
     // Add this function near the top of your file
     function getRandomInt(max) {
       return Math.floor(Math.random() * Math.floor(max));
     }
     
     function fileExists(file) {
       // This is a placeholder. In a real application, you'd need to implement
       // actual file checking logic here, which might involve server-side checks
       // or maintaining a list of valid files.
       return true;
     }
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
     const [comparisonResult, setComparisonResult] = useState(null);
     const [player1Disguised, setPlayer1Disguised] = useState(false);''
     const [backgroundEffectList, setBackgroundEffectList] = useState([]);
     const [onloadLock, setOnloadLock] = useState(0);
     
     const [currentImageIndex, setCurrentImageIndex] = useState([0]);
     //const [areImagesSame, setAreImagesSame] = useState(false);
     const [player1Image, setPlayer1Image] = useState(null);
     const [player2Image, setPlayer2Image] = useState(null);
     const [loadedImages, setLoadedImages] = useState([]);
     const [imageLoading, setImageLoading] = useState(false);
        const players = [
       { name: "Player 1", src: "/images/cherry_picked_pics/0_0_0_0_0.png" },
       { name: "Pl]ayer 2", src: "/images/cherry_picked_pics/1_0_1_0_0.png" },
       { name: "Player 3", src: "/images/cherry_picked_pics/1_0_1_0_0.png" },
       { name: "Player 4", src: "/images/cherry_picked_pics/1_1_1_2_1.png" },
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
         // Implement the logic for handling the disguised image
         // Implement the logic for handling the disguised image
         // Implement the logic for handling the disguised image
     
     setPlayer1Disguised(true);
     
     
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
     
       const loadImages = () => {
         let currentIndex = 1;
       const totalImages = 20;
     
       const loadNextImage = () => {
         if (currentIndex <= totalImages) {
           const img = new Image();
           img.src = `images/Source/source (${currentIndex}).png`;
           img.onload = () => {
             setLoadedImages(prev => [...prev, img.src]);
             setOnloadLock(currentIndex);
             currentIndex++;
             loadNextImage();
           };
           img.onerror = () => {
             console.error(`Failed to load image: source (${currentIndex}).png`);
             currentIndex++;
             loadNextImage();
           };
         }
         };
     
         loadNextImage();
       };
     
       useEffect(() => {
         if (loadedImages.length === 20) {
           const interval = setInterval(() => {
             setCurrentImageIndex(prevIndex => (prevIndex + 1) % 20);
           }, 3000); // Change image every 3 seconds
       
           return () => clearInterval(interval);
         }
       }, [loadedImages]);
       useEffect(() => {
         // Initialize doppelganger images on load
         loadImages();
     
           //new info here after loadiamges
         if (currentPlayer) {
           const initialImages = getDoppelgangerImages(imageDir, sliderValue, currentPlayer.src);
           console.log("Doppelganger images:", initialImages);
           setDoppelgangerImages(initialImages);
     
     
         }
       
     
       }, [sliderValue, currentPlayer]);
       // const getRandomImages = (directory, count) => {
       //   // Placeholder for your logic to get random imagesreturn Array(count)
       //     .fill(null)
       //     .map((_, index) => `${directory}/image${index}.png`);
       // };
     
       //const imageSets = getRandomImages('imageDir150', 10);
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
           firstIdToSkip = (getRandomInt(12) + genderOffset).toString(); // Pick a random identity of the given gender
         } while (firstIdToSkip === chosenId);
         idsToSkip.push(firstIdToSkip);
       
         if (gender === '0') {
           idsToSkip.push('4'); // There is no male Identity 4
         } else {
           let secondIdToSkip;
           do {
             secondIdToSkip = (getRandomInt(12) + genderOffset).toString(); // Skip one more if the agent is female
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
     
       const compareImages = async (image1, image2) => {
         setImageLoading(true);
         try {
           const areSame = await areImagesSame(image1, image2);
         //  setAreImagesSame(areSame);
           setComparisonResult(areSame ? "Images are the same thus the agent picked is correect, you won the game, restart the game to play again " : " Agent picked is different than the first one that was made , please try again , you have max 3 tries to guess");
         } finally {
           setImageLoading(false);
         }
       };
     
       // Placeholder for image comparison logic (replace with actual implementation)
       const areImagesSame = async (img1Src, img2Src) => {
         return new Promise((resolve) => {
           const img1 = new Image();
           const img2 = new Image();
           let loadedCount = 0;
       
           const compareImages = () => {
             const canvas1 = document.createElement('canvas');
             const canvas2 = document.createElement('canvas');
             canvas1.width = img1.width;
             canvas1.height = img1.height;
             canvas2.width = img2.width;
             canvas2.height = img2.height;
       
             const ctx1 = canvas1.getContext('2d');
             const ctx2 = canvas2.getContext('2d');
             ctx1.drawImage(img1, 0, 0);
             ctx2.drawImage(img2, 0, 0);
       
             const imageData1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
             const imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
       
             if (imageData1.width !== imageData2.width || imageData1.height !== imageData2.height) {
               resolve(false);
               return;
             }
       
             const pixelCount = imageData1.data.length;
             let diffCount = 0;
             const threshold = 5; // Adjust this value to change sensitivity
       
             for (let i = 0; i < pixelCount; i += 4) {
               if (
                 Math.abs(imageData1.data[i] - imageData2.data[i]) > threshold ||
                 Math.abs(imageData1.data[i + 1] - imageData2.data[i + 1]) > threshold ||
                 Math.abs(imageData1.data[i + 2] - imageData2.data[i + 2]) > threshold
               ) {
                 diffCount++;
               }
             }
       
             const percentDiff = (diffCount / (pixelCount / 4)) * 100;
             resolve(percentDiff < 1); // Consider images the same if less than 1% different
           };
       
           img1.onload = img2.onload = () => {
             loadedCount++;
             if (loadedCount === 2) {
               compareImages();
             }
           };
       
           img1.src = img1Src;
           img2.src = img2Src;
         });
       };
       return (
         <div className="App">
           <header className="App-header">
            <Router>
       <div><h1>Image Loader</h1><p>Images Loaded: {onloadLock}</p></div>
     
      {!gameStarted ? (
     
     
        <StartScreen onStart={handleStartGame}
        
     
      />
       
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
      </Router>    <div className="background-images">
       {loadedImages.map((src, index) => (
         <img 
           key={index} 
           src={src} 
           alt={`Background ${index + 1}`} 
           style={{display: index === currentImageIndex ? 'block' : 'none'}}
         />
       ))}
     </div>
           {!showPlayerSelector && !showDisguisePlayer && !showPasswordPage && !showGuessPage && (
         <>
         <div className="background-images">
       {loadedImages.map((src, index) => (
         <img 
           key={index} 
           src={src} 
           alt={`Background ${index + 1}`} 
           style={{display: index === currentImageIndex ? 'block' : 'none'}}
         />
       ))}
     </div>
     
           <h1>Player Selector and Disguise</h1>
           <h3>Disguise Your Agent</h3>
           <button onClick={handleStartClick}>Start</button>
         </>
       )}  
         </header>
       {!player1Disguised &&(
         <>
              <h3>Player 1</h3>
             {/* {showPlayerSelector && !showDisguisePlayer && (
               <PlayerSelector players={players} onSelection={handleSelection} />
             )} */}
        <PlayerSelector players={players} onSelection={(selectedPlayers) => {
       handleSelection(selectedPlayers);
       setPlayer1Image(selectedPlayers[0].src);
     }} />
      
             {showDisguisePlayer && currentPlayer && (
               <DisguisePlayer
                 player={currentPlayer}
                // onDisguise={() => {}}
                 onDisguise={handleDisguise}
                 onEncryptionDecision={handleWantsEncryption}
               />
             )}
             </>
           )}
     
           {player1Disguised && (
           <>
           <h3>Player 2</h3>
           {/* <PlayerSelector players={players} onSelection={handleSelection} /> */}
     
           <PlayerSelector players={players} onSelection={(selectedPlayers) => {
       handleSelection(selectedPlayers);
       setPlayer2Image(selectedPlayers[0].src);
           
     }} />
           {/* {image Loading && <p>Comparing images...</p>}
           {!imageLoading && comparisonResult && <p>Comparison Result: {comparisonResult}</p>} */}
     
     {player1Image && player2Image && (
           <button onClick={() => compareImages(player1Image, player2Image)}>Compare Images</button>
     )}
     </>
           )}
     {imageLoading && <p>Comparing images...</p>}
     {!imageLoading && comparisonResult && <p>Comparison Result: {comparisonResult}</p>}
           
     {showPasswordPage && (
       <PasswordPage onPasswordSubmit={handlePasswordSubmit} />
     )}
      {/* {showComparePlayers && currentPlayer && (
      <ComparePlayers
      originalPlayer={currentPlayer}
      disguisedPlayer={currentPlayer} // Assuming the disguised player is the same as the current player for now
      />
     )} */}
       {showComparePlayers && currentPlayer && disguisedImage && (
           <ComparePlayers
           originalPlayer={currentPlayer}
           disguisedPlayer={{...currentPlayer, src: disguisedImage}}// Assuming the disguised player is the same as the current player for now
           onSelection={handleSelection}
          />
          
         )}
        {/* Add this section for the slider and doppelganger images */}
        {currentPlayer && (  //&& !showPasswordPage &&
            <div className="doppelganger-section">
              <input
                type="range"
                min="0"
                max="4"
                value={sliderValue}
                onChange={handleSliderChange}
                className="slider"
              />
              <div className="doppelganger-images">
                {doppelgangerImages.map((image, index) => (
                  <img key={index} src={image} alt={`Doppelganger ${index + 1}`} 
                 
                  onError={(e) => {
                    console.error(`Failed to load image: ${image}`);
                    e.target.src = '/images/placeholder.png'; // Replace with a placeholder image
                  }}
                  />
                ))}
                 {/* <img src={require("public/images/doppelganger/0_0_0_0_0.png")} /> */}
                 <img src="/images/doppelganger/0_0_0_0_0.png" alt="Doppelganger" />
              </div>
            </div>
          )}
     
     {showPlayerSelector && !showDisguisePlayer && (
                    <PlayerSelector players={players} onSelection={handleSelection} />
                  )}
          
                  {/* {showDisguisePlayer && currentPlayer && (
                    <DisguisePlayer
                      player={currentPlayer}
                      onDisguise={handleDisguise}
          
                      onEncryptionDecision={handleWantsEncryption}
                    />
                  )} */}
          
          {showPasswordPage && (
            <PasswordPage onPasswordSubmit={handlePasswordSubmit} />
          )}
         </div>
       );
     }
