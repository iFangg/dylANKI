"use client"

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
import Image from "next/image";

export function DeckPopup({ item, getItem, curr_deckId }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("-1");

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [content, setContent] = useState({"front": front, "back": back});
  
  const addItem = item == "deck" ? async (deckId = -1, name) => {
    setOpen(false);
    if (name == "")
      return;

    setName(name);

    if (deckId == -1)
      deckId = null;
    setId(deckId);
    
    console.log("entered deck is ", deckId)
    try {
      const response = await fetch(`/api/decks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({deckId, name}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add deck");
      }

      console.log(`added data successfully: ${data.message}`)
      getItem();
      return data;
    } catch (err) {
      console.log(`Error adding deck: ${err}`);
    }
  } : async (id) => {
    setOpen(false);
    console.log(`f||b: ${front} || ${back}`)
    if (!front || !back)
      return;

    try {
      const content = {"front": front, "back": back}
      setContent(content);
      
      console.log("entered deck is ", id)
      const response = await fetch(`/api/flashcards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({deckID: id, content: content}),
      });
      console.log("message is: ", JSON.stringify(response));
      
      // const data = await response.json();
      // console.log(JSON.stringify(data));

      if (!response.ok) {
        throw new Error("Failed to add flashcard");
      }

      console.log(`added data successfully: ${response.message}`);

      await new Promise(resolve => setTimeout(resolve, 500));

      await getItem(id);
      
      return response;
    } catch (err) {
      console.log(`Error adding flashcard: ${err}`);
    }
  };

  const itemButton = item == "deck" ? (
    <Button type="submit" onClick={() => addItem(parseInt(id), name)}>Save changes</Button>
  ) : (
    <Button type="submit" onClick={() => addItem(curr_deckId)}>Save changes</Button>
  );

  const formText = item == "deck" ? (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="Deck Title" className="text-right">
          Deck Title
        </Label>
        <Input id="name" placeholder="Deck Name" className="col-span-3" onChange={e => setName(e.target.value)} />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="Deck Contained In" className="text-right">
          Deck No.
        </Label>
        <Input id="name" placeholder="232" className="col-span-3" onChange={e => setId(e.target.value)} />
      </div>
    </div>
  ) : (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="Front Text" className="text-right">
          Front Content
        </Label>
        <Input id="name" placeholder="Front Text" className="col-span-3" onChange={e => setFront(e.target.value)} />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="Back Text" className="text-right">
          Back Content
        </Label>
        <Input id="name" placeholder="Front Text" className="col-span-3" onChange={e => setBack(e.target.value)} />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
        className="add-item-button shadow-lgp-0 aspect-square w-16 h-16 flex items-center justify-center" 
        variant="outline"
        >
          <Image
            src={"/plus.svg"}
            width={50}
            height={50}
            alt="Add Deck"
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
        {formText}
        <DialogFooter>
          {itemButton}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}