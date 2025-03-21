"use client";

import "../../css/deckView.css"
import { useEffect, useState } from "react";
import { Arrow_button } from "./arrow-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export function DeckView({ width, height}) {
  const [message, setMessage] = useState('we are viewing the front of the card');
  const [decks, setDecks] = useState([]);
  const [deckIdx, setDeckIdx] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState(true);
  const [side, setSide] = useState("front");
  const defaultCard = {"front": "No flashcards in deck!", "back": "No cards in deck!"}
  const [card, setCard] = useState(defaultCard);
  const [cardIdx, setCardIdx] = useState(0);
  const [showNoCardsAlert, setNoCardsAlert] = useState(false);
  
  const getDecks = async () => {
    try {
      let response = await fetch("/api/decks");

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
    
    } catch (err) {
      console.log("Error Decks", deckIdx + 1);
      console.log(err);
    }
  }

  const getFlashcards = async (idx) => {
    try {
      console.log("index is ", idx);
      const response = await fetch(`/api/flashcards?deckId=${idx + 1}`);
      const res = await response.json();
      console.log(`flashcards: ${res.length}`);
      if (res.length != 0) {
        const content = JSON.parse(res[idx]["Content"]);
        console.log(`cards in deck ${idx + 1}: ${JSON.stringify(res)}`);
        console.log(content);
        setFlashcards(res);
        setCard(content);
        setFront(true);
        setSide("front");
      } else {
        setFlashcards([]);
        setCard(defaultCard);
      }
    } catch (err) {
      console.log("Error getting flashcards");
      console.log(err);
    }
  }

  useEffect(() => {
    getDecks();
    getFlashcards(deckIdx);
  }, []);

  console.log(`flashcards found: ${flashcards.map((f) => JSON.stringify(f))}`)
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
    if (front) {
      setSide("back");
    } else
      setSide("front");

    setMessage(`we are NOT viewing the ${side} of the card`);
    console.log(`should NOT be facing ${front} side`)
  };
  

  let hasCards = (
    <div className="text-white w-32 h-32 flex items-center justify-center text-lg cursor-pointer">
      No flashcards in deck!
    </div>
  )

  if (flashcards.length > 0) {
    // console.log(`flashcards: ${JSON.stringify()}`)
    hasCards = (
      <div className="text-white w-32 h-32 flex items-center justify-center text-lg transition-colors cursor-pointer">
        {card[side]}
      </div>
    )
  }

  // console.log(`we have ${decks.length} decks:`)
  let hasDeckView = (<></>)
  if (decks.length > 0) {
    // console.log(`${JSON.stringify(decks[0]["Name"])}`);
    hasDeckView = (
      <div className="flex flex-col items-start gap-6 p-8 w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Deck: {decks[deckIdx]["Name"]}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto">
            <DropdownMenuLabel>Decks</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
              {decks.map((d, idx) => {
                // console.log(`deck ${idx}, ${d}`);
                if (idx != deckIdx) {
                  return (
                    <DropdownMenuItem
                      key={idx}
                      onSelect={() => {
                        setDeckIdx(idx);
                        getFlashcards(idx);
                      }}
                    >
                      {d["Name"]}
                    </DropdownMenuItem>
                  );
                }
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      {/* Outer button container */}
      <div
        onClick={handleOuterClick}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            handleOuterClick();
          }
        }}
        className="responsive-deck text-white font-medium rounded-lg h-64 flex justify-center items-center cursor-pointer shadow-2xl"
        role="button"
        tabIndex={0}
        aria-label="Outer button"
        style={{width: width, height: height}}
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
          if (flashcards.length  == 0) {
            setNoCardsAlert(true);
            setTimeout(() => setNoCardsAlert(false), 3000);
          } else {
            let idx = cardIdx- 1;
            if (cardIdx <= 0) 
              idx = flashcards.length - 1;
  
            console.log(`new card is ${flashcards[idx]["Content"]}, idx ${idx}`)
            setFront(true);
            setSide("front");
            setMessage("viewing front");
            setCard(JSON.parse(flashcards[idx]["Content"]));
            setCardIdx(idx);
          }
        }}/>

        {message}

        <Arrow_button img="/right.svg" clickBehvaiour={() => {
          if (flashcards.length  == 0) {
            setNoCardsAlert(true);
            setTimeout(() => setNoCardsAlert(false), 3000);
          } else {
            console.log(`prev idx is ${cardIdx}`)
            let idx = cardIdx + 1;
            if (cardIdx >= flashcards.length - 1)
              idx = 0;

            console.log(`new card is ${flashcards[idx]["Content"]}, idx ${idx}`)
            setFront(true);
            setSide("front");
            setMessage("viewing front");
            setCard(JSON.parse(flashcards[idx]["Content"]));
            setCardIdx(idx);
          }
        }}/>
      </div>

      {showNoCardsAlert && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          pointerEvents: 'none' // This makes the container not block interactions
        }}>
          <div className="popup-alert flex p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 shadow-xl border border-red-300" 
              role="alert"
              style={{ pointerEvents: 'auto' }}> {/* This makes the alert itself clickable */}
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">No Flashcards in Deck!</span> Add a flashcard and try again.
            </div>
          </div>
        </div>
      )}
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
            className="responsive-deck text-white font-medium rounded-lg h-64 flex justify-center items-center cursor-pointer shadow-2xl"
            role="button"
            tabIndex={0}
            aria-label="Outer button"
            style={{width: width, height: height}}
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
