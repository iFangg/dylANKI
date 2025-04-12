"use client"

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
import { useState } from "react"

export function DeleteButton({ item, getItem, curr_itemId }) {  
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("-1");

  const removeItem = item == "deck" ? async (deckId = -1) => {
    setOpen(false);

    try {
      console.log("entered deck is ", deckId)
      const response = await fetch(`/api/decks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({deckID: deckId}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add deck");
      }

      console.log(`deleted deck successfully: ${data.message}`)
      getItem();

      return data;
    } catch (err) {
      console.log(`Error deleting deck: ${err}`);
    }
  } : async (id) => {
    try {      
      console.log("entered card is ", id)
      const response = await fetch(`/api/flashcards`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({flashcardID: id}),
      });
      // console.log("message is: ", JSON.stringify(response));
      
      // const data = await response.json();
      // console.log(JSON.stringify(data));

      if (!response.ok) {
        throw new Error("Failed to delete flashcard");
      }

      console.log(`deleted flashcard successfully: ${response.message}`);

      await new Promise(resolve => setTimeout(resolve, 500));

      await getItem(id);
      
      return response;
    } catch (err) {
      console.log(`Error deleting flashcard: ${err}`);
    }
  };

  const delete_button = item == "deck" ? (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
        className="add-item-button shadow-lgp-0 aspect-square w-16 h-16 flex items-center justify-center" 
        variant="outline"
        >
          <Image
            src={"/delete.svg"}
            width={50}
            height={50}
            alt="Add Deck"
            className="w-10 h-10"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete a deck</DialogTitle>
          <DialogDescription>
            Type in the deck ID to delete
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Deck Contained In" className="text-right">
              Deck No.
            </Label>
            <Input id="name" placeholder="232" className="col-span-3" onChange={e => setId(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => removeItem(id)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  ) : (
    <Button
    className="remove-item-button shadow-lgp-0 aspect-square w-16 h-16 flex items-center justify-center" 
    variant="outline"
    onClick={() => removeItem(curr_itemId)}
    >
      <Image
        src={"/delete.svg"}
        width={50}
        height={50}
        alt="Add Deck"
        className="w-10 h-10"
      />
    </Button>
  )

  return (
    <div>
      {delete_button}
    </div>
  );
}