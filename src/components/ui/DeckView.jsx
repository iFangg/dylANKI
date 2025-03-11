"use client";

import "../../css/deckView.css"
import { useEffect, useState } from "react";
import { Arrow_button } from "./arrow-button";

export function DeckView() {
  const [message, setMessage] = useState('Click on either button');
  const [deck, setDeck] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeBreakpoint, setActiveBreakpoint] = useState('');

  // Determine which breakpoint is active
  useEffect(() => {
    // Function to update width and determine breakpoint
    const updateWidth = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        
        // Check which breakpoint is active based on Tailwind's default breakpoints
        if (width >= 1536) {
        setActiveBreakpoint('2xl');
        } else if (width >= 1280) {
        setActiveBreakpoint('xl');
        } else if (width >= 1024) {
        setActiveBreakpoint('lg');
        } else if (width >= 768) {
        setActiveBreakpoint('md');
        } else if (width >= 640) {
        setActiveBreakpoint('sm');
        } else {
        setActiveBreakpoint('default (xs)');
        }
        
        console.log(`Window width: ${width}px, Active breakpoint: ${
        width >= 1536 ? '2xl' : 
        width >= 1280 ? 'xl' : 
        width >= 1024 ? 'lg' : 
        width >= 768 ? 'md' : 
        width >= 640 ? 'sm' : 
        'default (xs)'
        }`);
    };
    
    // Initial call
    updateWidth();
    
    // Add event listener
    window.addEventListener('resize', updateWidth);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

    /*
    Inner button click handler
    to change flashcard text
    disabled for home page
    */
  const handleInnerClick = () => {
    setMessage('Inner button clicked!');
  };

  /*
  Outer button click handler
  To flip flashcard over
  */
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
        onKeyDown={(e) => {
            if (e.key === ' ') {
                handleOuterClick();
            }
        }}
        className="flashcard text-white font-medium rounded-lg h-64 flex justify-center items-center cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Outer button"
        style={{width: "946px", height: "546px"}}
      >
        
        {/* Inner button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleInnerClick();}
          }
          className="absolute bg-red-500 hover:bg-red-600 text-white w-32 h-32 flex items-center justify-center text-lg transition-colors cursor-pointer"
          tabIndex={0}
          aria-label="Inner button"
        >
          <u>
            Inner Button
          </u>
        </button>
      </div>

      <div className="text-sm text-gray-600 mt-2">
        Window width: {windowWidth}px | Active breakpoint: {activeBreakpoint}
      </div>
      
      {/* Display message about which button was clicked */}
      <div className="flex text-lg font-medium gap-24">
        <Arrow_button img="/left.svg" />
        {message}
        <Arrow_button img="/right.svg" />
      </div>
    </div>
  );
}
