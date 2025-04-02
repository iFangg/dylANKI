"use client";

import { useRouter } from "next/navigation";
import "../../css/deckList.css"
import { useEffect, useState } from "react";
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

export function DeckList(props) {
  const [decks, setDecks] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0 instead of window.innerWidth
  const router = useRouter();

  const [name, setName] = useState("Deck Name");
  const [id, setId] = useState("-1");

  const [tempDeckTitle, setTempDeckTitle] = useState(name);
  const [tempDeckNo, setTempDeckNo] = useState("232");

  const getDecks = async () => {
    try {
      const response = await fetch("api/decks");
      const res = await response.json();
      console.log("deck list getting data: ", res);
      setDecks(res);
    } catch (err) {
      console.log("Error getting Decks: ", err);
    }
  }

  useEffect(() => {
    getDecks();
  }, []);

  const handleItemClick = (id) => {
    router.push(`/allDecks/deck?deckId=${id}`);
  }

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
      getDecks();

      return data;
    } catch (err) {
      console.log(`Error adding deck: ${err}`);
    }
  }

  let addButton = props.page == "home" ? <></> : (
  <div className="relative">
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
  );

  const [activeBreakpoint, setActiveBreakpoint] = useState('');
  // Determine which breakpoint is active
  useEffect(() => {
    // Function to update width and determine breakpoint
    const updateWidth = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        
        // Check which breakpoint is active based on Tailwind's default breakpoints
        if (width >= 1920) {
          setActiveBreakpoint('4xl');
        } else if (width >= 1710) {
          setActiveBreakpoint('3xl');
        } else if (width >= 1536) {
          setActiveBreakpoint('2xl');
        } else if (width >= 1280) {
          setActiveBreakpoint('xl');
        } else if (width >= 1024) {
          setActiveBreakpoint('lg');
        } else if (width >= 768) {
          setActiveBreakpoint('md');
        } else if (width >= 640) {
          setActiveBreakpoint('sm');
        } else {
          setActiveBreakpoint('default (xs)');
        }
        
        console.log(`Window width: ${width}px, Active breakpoint: ${
        width >= 1536 ? '2xl' : 
        width >= 1280 ? 'xl' : 
        width >= 1024 ? 'lg' : 
        width >= 768 ? 'md' : 
        width >= 640 ? 'sm' : 
        'default (xs)'
        }`);
    };
    
    // Only add the event listener client-side
    if (typeof window !== 'undefined') {
      // Initial call
      updateWidth();
      
      // Add event listener
      window.addEventListener('resize', updateWidth);
      
      // Cleanup
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  return (
    <div className="flex flex-col items-start gap-6 p-8 w-auto">
        <div>
            Deck List
        </div>
        <div className="flex flex-row items-end gap-6">
          <ul
            className="responsive-list"
            role="menu"
            data-popover="menu"
            data-popover-placement="bottom"
            style={{width: props.width, height: props.height}}
          >
            {decks.length > 0 ? (
              decks.map((deck, index) => (
                <li
                key={deck["ID"] || index}
                className="list-item p-0"
                onClick={() => handleItemClick(deck["ID"])}>
                  {deck["ID"]} - {deck["Name"]}
                </li>
              ))
            ) : (
              <li className="text-black-500 p-2">No decks available!</li>
            )}
            <div className="text-sm text-gray-600 mt-2">
                Window width: {windowWidth}px | Active breakpoint: {activeBreakpoint}
            </div>
          </ul>
          {addButton}
        </div>
    </div>
  );
}