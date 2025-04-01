"use client"

import { AddDeckButton } from "@/components/ui/AddDeck";
import { DeckList } from "@/components/ui/DeckList";
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
import Image from "next/image";
import { useState } from "react";

export default function allDecks() {
  const [name, setName] = useState("Deck Name");
  const [id, setId] = useState("-1");

  const [tempDeckTitle, setTempDeckTitle] = useState(name);
  const [tempDeckNo, setTempDeckNo] = useState("232");

  const handleOpenChange = (open) => {
    if (open) {
      setTempDeckTitle(deckTitle);
      setTempDeckNo(deckNo);
    }
  };
  
  const addDeck = async (name, deckId = -1) => {
    setName(tempDeckTitle);
    setId(tempDeckNo);
    if (deckId == -1)
      deckId = null;
    
    console.log("entered deck is ", deckId)
    try {
      const response = await fetch(`api/decks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, deckId}),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.error || "Failed to add deck");
      }

      console.log(`added data successfully: ${data.message}`)

      return data;
    } catch (err) {
      console.log(`Error adding deck: ${err}`);
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-h-[calc(100vh-159px)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 w-full">
        <div className="flex items-end">
          <div className="relative">
            <DeckList width="1400px" height="575px"/>
          </div>
          <div className="ml-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="add-deck-button shadow-lg" variant="outline">
                    <Image
                        src="/plus.svg"
                        width = {50}
                        height = {50}
                        alt="Add Deck"
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
          </div>
        </div>
      </main> 
    </div>
  );
}
