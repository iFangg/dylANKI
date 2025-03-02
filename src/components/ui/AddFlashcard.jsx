"use client";

import Image from "next/image";
import { useState } from "react";

export function AddFlashcardButton() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
        const response = await fetch("/api/flashcards",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    action: null,
                    deckID: 1,
                    name: "Test card",
                    content: {
                        front: "This is the front",
                        back:"This is the back"
                    },
                    tags: null
                })
            }
        );
        const res = await response.json();
        setData(data);
        console.log(res);
    } catch (err) {
        console.log("Error getting flashcards: ", err);
    }
  };

  return <button className="add-flashcard-button" onClick={handleClick}>
    <Image
        src="plus.svg"
        width = {50}
        height = {50}
        alt="Add Flashcard"
        style={{ width: "50px", height: "50px" }}
    />
  </button>;
}