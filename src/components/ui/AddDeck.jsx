"use client";

import Image from "next/image";
import { useState } from "react";

export function AddDeckButton() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
        const response = await fetch("/api/decks",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    action: null,
                    deckID: null,
                    name: "Test deck",
                    DateCreated: Date.now(),
                    DateLastModified: Date.now()
                })
            }
        );
        const res = await response.json();
        setData(data);
        console.log(res);
    } catch (err) {
        console.log("Error adding Deck: ", err);
    }
  };

  return <button className="add-deck-button" onClick={handleClick}>
    <Image
        src="plus.svg"
        width = {50}
        height = {50}
        alt="Add Deck"
        style={{ width: "50px", height: "50px" }}
    />
  </button>;
}