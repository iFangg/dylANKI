"use client";

import Image from "next/image";
import { useState } from "react";

export function AddFlashcardButton() {
  const [face, setData] = useState(0);

  const handleClick = async () => {
    setData(face ^ 1);
  };

  return (
  <button className="add-flashcard-button" onClick={handleClick}>
    Front Text
  </button>
  );
}