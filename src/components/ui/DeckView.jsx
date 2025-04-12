"use client";

import "../../css/deckView.css"
import { useEffect, useState } from "react";
import { ArrowButton } from "./arrowButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { DeckPopup } from "./DeckPopup";
import { DeleteButton } from "./DeleteItem"

export function DeckView({ width, height, page}) {
  const [message, setMessage] = useState('we are viewing the front of the card');
  const [decks, setDecks] = useState([]);

  const [arrayDeckIdx, setArrayDeckIdx] = useState(0);
  const [dbDeckIdx, setDbDeckIdx] = useState(1);
  const [flashcards, setFlashcards] = useState([]);
  const [cardId, setCardId] = useState(1);

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
      // console.log("Decks: ", gotDecks);
      setDecks(gotDecks);
      // console.log("it is set: ", decks);

      if (gotDecks.length > 0) {
        // console.log("there are decks.");
        // console.log(gotDecks[arrayDeckIdx]["ID"]);
        setDbDeckIdx(gotDecks[arrayDeckIdx]["ID"]);
      }
      
      return gotDecks;
    } catch (err) {
      console.log("Error Decks", arrayDeckIdx + 1);
      console.log(err);
    }
  }

  const getFlashcards = async (idx) => {
    try {
      // console.log("deck id in db is ", idx);
      const response = await fetch(`/api/flashcards?deckId=${idx}`);
      const res = await response.json();
      // console.log(`cards in deck ${idx}: ${JSON.stringify(res)}`);
      if (res.length != 0) {
        const content = JSON.parse(res[res.length - 1]["Content"]);
        // console.log(content);
        setCardId(res[res.length - 1]["ID"]);
        setFlashcards(res);
        setCard(content);
        setFront(true);
        setSide("front");
      } else {
        setFlashcards([]);
        setCard(defaultCard);
      }

      return res;
    } catch (err) {
      console.log("Error getting flashcards");
      console.log(err);
    }
  }

  useEffect(() => {
    getDecks();
  }, []);

  useEffect(() => {
    // Only run this if decks is populated
    if (decks && decks.length > 0) {
      // console.log(`db deck index: ${dbDeckIdx}`);
      getFlashcards(dbDeckIdx);
    }
  }, [decks, dbDeckIdx]);
  
  // console.log(`flashcards found: ${flashcards.map((f) => JSON.stringify(f))}`)

  const addButton = page == "home" ? <></> : (
    <div className="flex flex-col gap-4">
      <DeckPopup item="flashcard" getItem={getFlashcards} curr_deckId={dbDeckIdx} />
      <DeleteButton item="flashcard" getItem={getFlashcards} curr_itemId={cardId} />
    </div>
  );
  /*
  TODO: IMPLEMENT text change
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
    // console.log(`should NOT be facing ${front} side`)
  };
  
  const innerButton = page == "deckv" ? (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleInnerClick();}
      }
      className="absolute text-white w-32 h-32 flex items-center justify-center text-lg transition-colors cursor-pointer"
      tabIndex={0}
      aria-label="Inner button"
      >
        {/* make text changable */}
      <u>
        {card[side]}
      </u>
    </button>
  ) : (
    <div>
      {card[side]}
    </div>
  );

  const hasCards = flashcards.length <= 0 ? (
    <div className="text-white w-32 h-32 flex items-center justify-center text-lg cursor-pointer">
      No flashcards in deck!
    </div>
  ) : (
      <div className="text-white w-32 h-32 flex items-center justify-center text-lg transition-colors cursor-pointer">
        {innerButton}
      </div>
  );

  const card_buttons = (
    // fix mis-indexing after adding a card
    // fix first click doesn't do anything
    <div className="flex text-lg font-medium gap-[200px] self-center ">
        <ArrowButton img="/left.svg" clickBehvaiour={() => {
          if (flashcards.length  == 0) {
            setNoCardsAlert(true);
            setTimeout(() => setNoCardsAlert(false), 3000);
          } else {
            let idx = cardIdx- 1;
            if (cardIdx <= 0) 
              idx = flashcards.length - 1;
  
            // console.log(`new card is ${flashcards[idx]["Content"]}, idx ${idx}`)
            setFront(true);
            setSide("front");
            setMessage("viewing front");
            setCard(JSON.parse(flashcards[idx]["Content"]));
            setCardIdx(idx);
            setCardId(flashcards[idx]["ID"]);
          }
        }}/>

        {/* {message} */}

        <ArrowButton img="/right.svg" clickBehvaiour={() => {
          if (flashcards.length  == 0) {
            setNoCardsAlert(true);
            setTimeout(() => setNoCardsAlert(false), 3000);
          } else {
            // console.log(`prev idx is ${cardIdx}`)
            let idx = cardIdx + 1;
            if (cardIdx >= flashcards.length - 1)
              idx = 0;

            // console.log(`new card is ${flashcards[idx]["Content"]}, idx ${idx}`)
            setFront(true);
            setSide("front");
            setMessage("viewing front");
            setCard(JSON.parse(flashcards[idx]["Content"]));
            setCardIdx(idx);
            setCardId(flashcards[idx]["ID"]);
          }
        }}/>
      </div>
  )

  // console.log(`we have ${decks.length} decks:`)
  let hasDeckView = decks.length <= 0 ? (<></>) : (
    <div className="flex flex-col items-start gap-6 p-8 w-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Deck: {decks[arrayDeckIdx]["Name"]}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <DropdownMenuLabel>Decks</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            {decks.map((d, idx) => {
              // console.log(`deck ${idx}, ${d}`);
              if (idx != arrayDeckIdx) {
                return (
                  <DropdownMenuItem
                    key={idx}
                    onSelect={() => {
                      setArrayDeckIdx(idx);
                      getFlashcards(decks[idx]["ID"]);
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
    <div className="flex flex-row items-end">
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
          {hasCards}
        </div>
      </div>
      <div className="ml-4">
        {addButton}
      </div>
    </div>
    
    <div className="flex text-lg font-medium gap-24 self-center justify-center">
      {card_buttons}
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
  );
  

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
              Make one <a href="/allDecks"><u>here</u></a>!
            </div>
          </div>
          <div className="self-center">
            {card_buttons}
          </div>
        </div>
      )}
    </>
  );
}
