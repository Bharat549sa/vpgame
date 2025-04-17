
import React, { useEffect, useRef } from 'react';
import './styles.css';

const ComparePlayers = ({ originalPlayer, disguisedPlayer }) => {
 const originalCanvasRef = useRef(null);
 const disguisedCanvasRef = useRef(null);

 useEffect(() => {
 if (originalPlayer && disguisedPlayer) {
const originalCanvas = originalCanvasRef.current;
 const originalCtx = originalCanvas.getContext('2d');
const originalImg = new Image();
originalImg.src = originalPlayer.src;
originalImg.onload = () => {
originalCanvas.width = originalImg.width;
 originalCanvas.height = originalImg.height;
originalCtx.drawImage(originalImg, 0, 0);
};

 const disguisedCanvas = disguisedCanvasRef.current;
const disguisedCtx = disguisedCanvas.getContext('2d');
const disguisedImg = new Image();
 disguisedImg.src = disguisedPlayer.src;
disguisedImg.onload = () => {
disguisedCanvas.width = disguisedImg.width;
disguisedCanvas.height = disguisedImg.height;
 disguisedCtx.drawImage(disguisedImg, 0, 0);
 };
}
 }, [originalPlayer, disguisedPlayer]);

return (
 <div className="compare-players">
 <div className="player">
<h3>Original Player</h3>
<canvas ref={originalCanvasRef}></canvas>
</div>
 <div className="player">
<h3>Disguised Player</h3>
 <canvas ref={disguisedCanvasRef}></canvas>
</div>
 </div>
  );
};

export default ComparePlayers;
