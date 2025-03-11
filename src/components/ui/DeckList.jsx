"use client";

import "../../css/deckList.css"
import { useEffect, useState } from "react";

export function DeckList() {
  const [data, setData] = useState(null);
  const [tables, setTables] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [activeBreakpoint, setActiveBreakpoint] = useState('');

//   // Determine which breakpoint is active
//   useEffect(() => {
//     // Function to update width and determine breakpoint
//     const updateWidth = () => {
//         const width = window.innerWidth;
//         setWindowWidth(width);
        
//         // Check which breakpoint is active based on Tailwind's default breakpoints
//         if (width >= 2560) {
//           setActiveBreakpoint('4xl');
//         } else if (width >= 1710) {
//         setActiveBreakpoint('3xl');
//         } else if (width >= 1536) {
//         setActiveBreakpoint('2xl');
//         } else if (width >= 1280) {
//         setActiveBreakpoint('xl');
//         } else if (width >= 1024) {
//         setActiveBreakpoint('lg');
//         } else if (width >= 768) {
//         setActiveBreakpoint('md');
//         } else if (width >= 640) {
//         setActiveBreakpoint('sm');
//         } else {
//         setActiveBreakpoint('default (xs)');
//         }
        
//         console.log(`Window width: ${width}px, Active breakpoint: ${
//         width >= 1536 ? '2xl' : 
//         width >= 1280 ? 'xl' : 
//         width >= 1024 ? 'lg' : 
//         width >= 768 ? 'md' : 
//         width >= 640 ? 'sm' : 
//         'default (xs)'
//         }`);
//     };
    
//     // Initial call
//     updateWidth();
    
//     // Add event listener
//     window.addEventListener('resize', updateWidth);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', updateWidth);
//   }, []);

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
    <div className="flex flex-col items-start gap-6 p-8 w-auto">
        <div>
            Deck List
        </div>
        <ul
        className="decks-list min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm focus:outline-none divide-y divide-slate-950"
        role="menu"
        data-popover="menu"
        data-popover-placement="bottom"
        style={{width: "362px", height: "546px"}}
        >
            {/* make this a loop after website is finished (sql query to get all main decks) */}
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
        {/* <div className="text-sm text-gray-600 mt-2">
            Window width: {windowWidth}px | Active breakpoint: {activeBreakpoint}
        </div> */}
    </div>
  );
}
