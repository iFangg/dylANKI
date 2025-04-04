"use client";

import "../../css/deckList.css"
import { useRouter } from "next/navigation";
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
import { DeckPopup } from "./DeckPopup";

export function DeckList(props) {
  const [decks, setDecks] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0 instead of window.innerWidth
  const router = useRouter();

  const getDecks = async () => {
    try {
      const response = await fetch("/api/decks");
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

  let addButton = props.page == "home" ? <></> : (
  <div className="relative">
    <DeckPopup item="deck" getItem={getDecks} />
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