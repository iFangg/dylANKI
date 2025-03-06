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
        className="decks-list relative z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm focus:outline-none divide-y divide-slate-950"
        role="menu"
        data-popover="menu"
        data-popover-placement="bottom"
        >
            <li className="p-0">
                Deck 1
            </li>
            <li>
                Deck 2
            </li>
            <li>
                Deck 3
            </li>
        </ul>
    </div>
  );
}
