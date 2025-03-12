"use client";

import "../../css/deckView.css"
import { useEffect, useState } from "react";
import { Arrow_button } from "./arrow-button";

export function DeckView() {
  const [message, setMessage] = useState('Click on either button');
  const [decks, setDecks] = useState([]);
  const [flashcards, setCards] = useState([]);
  const [front, setFront] = useState(true);
  const side = front ? "front" : "back";

  let deckIdx = 0;
  let cardIdx = 0;

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("api/decks");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const gotDecks = await response.json();
        console.log("Decks: ", gotDecks);
        setDecks(gotDecks);
        console.log("it is set: ", decks);
      
        let deck_id = 0;

        if (gotDecks.length > 0) {
          console.log("there are decks.");
          deck_id = gotDecks[deckIdx]["ID"];
        }
      
        response = await fetch(`/api/flashcards?deckId=${deck_id}`);
        const res = await response.json();
        console.log(`cards in deck ${deckIdx + 1}: ${res}`);
        setCards(res);
      } catch (err) {
        console.log("Error getting flashcards from deck ", deckIdx + 1);
        console.log(err);
      }
    }
  
    getData();
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
    setFront(!front);
    setMessage(`we are viewing the ${side} of the card`);
  };

  let hasCards = (
    <div className="absolute text-white w-32 h-32 flex items-center justify-center text-lg cursor-pointer">
      No flashcards in deck!
    </div>
  )
  if (flashcards.length > 0) {
    // console.log(`flashcards: ${JSON.stringify()}`)
    const content = JSON.parse(flashcards[cardIdx]["Content"]);
    hasCards = (
      <div className="text-white w-32 h-32 flex items-center justify-center text-lg transition-colors cursor-pointer">
        {content[side]}
      </div>
    )
  }

  // console.log(`we have ${decks.length} decks:`)
  let hasDeckView = (<></>)
  if (decks.length > 0) {
    // console.log(`${JSON.stringify(decks[0]["Name"])}`);
    hasDeckView = (
      <div className="flex flex-col items-start gap-6 p-8 w-auto">
      <div>
        Deck: {decks[deckIdx]["Name"]}
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
        {/* <button
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
        </button> */}
        <div>
          {hasCards}
        </div>
      </div>
      
      <div className="flex text-lg font-medium gap-24 self-center">
        <Arrow_button img="/left.svg" clickBehvaiour={() => {
          console.log("hey");
        }}/>
        {message}
        <Arrow_button img="/right.svg" clickBehvaiour={() => {
          console.log("hi there!");
        }}/>
      </div>
    </div>
    )
  }
  

  return (
    <>
      {decks.length > 0 ? (
        <div>
          {hasDeckView}
        </div>
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
