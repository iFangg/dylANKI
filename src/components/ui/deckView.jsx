"use client";

import { useState } from "react";

export function DeckView() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
        const response = await fetch("/api/flashcards");
        const res = await response.json();
        setData(data);
        console.log(res);
    } catch (err) {
        console.log("Error getting flashcards: ", err);
    }
  };

  return <div className="flashcard gap-6 p-8">
    <button onClick={handleClick}>
        <div>
            <button className="text-to-change">
                Front Text
            </button>
        </div>
    </button>
  </div>
}