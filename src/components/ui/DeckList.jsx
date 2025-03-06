"use client";

import "../../css/deckList.css"
import { useState } from "react";

export function DeckList() {
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

  return (
    <div className="flex flex-col items-start gap-6 p-8">
        <u>
            Deck List
        </u>
        <ul
        role="menu"
        data-popover="menu"
        data-popover-placement="bottom"
        className="deck-list absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none divide-y divide-slate-950"
        >
            <li>
                Deck 1
            </li>
            <li>
                Deck 2
            </li>
        </ul>
    </div>
  );
}
