"use client";

import "../../css/deckView.css"
import { useState } from "react";

export function DeckView() {
  const [message, setMessage] = useState('Click on either button');

    // Inner button click handler
  const handleInnerClick = (e) => {
    e.stopPropagation();
    setMessage('Inner button clicked!');
  };

  // Outer button click handler
  const handleOuterClick = () => {
    setMessage('Outer button clicked!');
  };

  return (
    <div className="flex flex-col items-start gap-6 p-8 w-auto">
      <div>
        Deck: TEST DECK
      </div>
      {/* Outer button container */}
      <div 
        onClick={handleOuterClick}
        className="flashcard text-white font-medium rounded-lg h-64 flex justify-center items-center cursor-pointer"
        role="button"
        // tabIndex={0}
        aria-label="Outer button"
        style={{width: "748px", height: "384px"}}
      >
        
        {/* Inner button */}
        <div 
          onClick={handleInnerClick}
          className="absolute bg-red-500 hover:bg-red-600 text-white w-32 h-32 flex items-center justify-center text-lg transition-colors cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Inner button"
        >
          <u>
            Inner Button
          </u>
        </div>
      </div>
      
      {/* Display message about which button was clicked */}
      <div className="text-lg font-medium">
        {message}
      </div>
    </div>
  );
}
