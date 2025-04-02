"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddFlashcardButton() {
  const [data, setData] = useState(null);

  const handleClick = async (deckId, name, content) => {
    try {
        const response = await fetch("/api/flashcards",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    action: null,
                    deckID: deckId,
                    name: name,
                    content: content,
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

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button 
          className="add-deck-button shadow-lgp-0 aspect-square w-16 h-16 flex items-center justify-center" 
          variant="outline"
          >
            <Image
              src={"/plus.svg"}
              width={50}
              height={50}
              alt="Add Card"
              className="w-10 h-10"
            />
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Add a new deck</DialogTitle>
            <DialogDescription>
              Create a new deck, press add when deck details have been filled out
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Deck Title" className="text-right">
                Deck Title
            </Label>
            <Input id="name" value={tempDeckTitle} className="col-span-3" onChange={(e) => setTempDeckTitle(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Deck Contained In" className="text-right">
                Deck No.
            </Label>
            <Input id="name" value={tempDeckNo} className="col-span-3" onChange={(e) => setTempDeckNo(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => addDeck(name, parseInt(id))}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}