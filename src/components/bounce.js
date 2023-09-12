import React, { useState } from "react";
import "../App"; // Import your CSS file

function BounceElement() {
  const [isBouncing, setIsBouncing] = useState(false);

  const handlePress = () => {
    setIsBouncing(true);

    // Remove the bounce class after the animation is complete
    setTimeout(() => {
      setIsBouncing(false);
    }, 600); // 0.6 seconds, which matches the animation duration
  };

  return (
    <div
      className={`element ${isBouncing ? "bounce" : ""}`}
      onClick={handlePress}
    >
      Press me to bounce
    </div>
  );
}

export default BounceElement;
