"use client";

import "../../css/deckView.css"
import { useEffect, useState } from "react";
import { Arrow_button } from "./arrow-button";

export function DeckView() {
  const [message, setMessage] = useState('Click on either button');
  const [decks, setDeck] = useState([]);
  const [deckIdx, setIdx] = useState(0);

  useEffect(() => {
    const getDecks = async () => {
      try {
        const response = await fetch("api/decks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        console.log("Decks: ", res);
        return res;
      } catch (err) {
        console.log("Error getting decks: ", err);
      }
    }
  
    setDeck(getDecks);
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

  const hasDeckView = (
    <div>
      <div>
        Deck: {decks[deckIdx]}
      </div>
      {/* Outer button container */}
      <div
        onClick={handleOuterClick}
        onKeyDown={(e) => {
            if (e.key === ' ') {
                handleOuterClick();
            }
        }}
        className="flashcard text-white font-medium rounded-lg h-64 flex justify-center items-center cursor-pointer shadow-2xl"
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
      
      <div className="flex text-lg font-medium gap-24 self-center">
        <Arrow_button img="/left.svg" />
        {message}
        <Arrow_button img="/right.svg" />
      </div>
    </div>
  )

  return (
    <>
      {decks.length > 0 ? (
        {hasDeckView}
      ) : (
        <div className="flex flex-col items-start gap-6 p-8 w-auto">
          <div>
            No decks available :(
          </div>
          <div
            onClick={handleOuterClick}
            onKeyDown={(e) => {
                if (e.key === ' ') {
                    handleOuterClick();
                }
            }}
            className="flashcard text-white font-medium rounded-lg h-64 flex justify-center items-center cursor-pointer shadow-2xl"
            role="button"
            tabIndex={0}
            aria-label="Outer button"
            style={{width: "946px", height: "546px"}}
          >
            <div>
              Make one <a href="/"><u>here</u></a>!
            </div>
          </div>
        </div>
      )}
    </>
  );
}
