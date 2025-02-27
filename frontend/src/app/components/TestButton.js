"use client";

import { useState } from "react";

export function TestButton() {
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

  return <button className="test-button" onClick={handleClick}>Test</button>;
}