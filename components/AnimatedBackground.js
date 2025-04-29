import React, { useState, useEffect } from 'react';

const AnimatedBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex >= 119) return 1;
        return prevIndex + 1;
      });
    }, 100); // Change image every 100ms

    return () => clearInterval(interval);
  }, []);

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.5, // Adjust opacity as needed
    zIndex: -1,
  };

  return (
    <img 
      src={`/images/Source/source (${currentImageIndex}).png`}
      alt="Background"
      style={imageStyle}
    />
  );
};

export default AnimatedBackground;