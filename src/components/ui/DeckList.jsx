"use client";

import { useRouter } from "next/navigation";
import "../../css/deckList.css"
import { useEffect, useState } from "react";
import styled from "styled-components"; 
{/* <ul
className={`decks-list min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl focus:outline-none divide-y divide-black 4xl:w-[${props.width}] 4xl:h-[${props.height}]`}
role="menu"
data-popover="menu"
data-popover-placement="bottom"
style={{width: `${props.width}`, height: `${props.height}`}}
>
</ul> */}

// const ResponsiveList = styled.ul`
//   width: ${props => props.width};
//   height: ${props => props.height};
//   min-width: 180px;
//   overflow: auto;
//   border-radius: 0.5rem;
//   border: 1px solid #000000;
//   background-color: #9c9c9c;
//   padding: 0.375rem;
//   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     width: calc(100% - 20px);
//     height: auto;
//     max-height: 300px;
//   }
  
//   @media (max-width: 480px) {
//     width: 100%;
//     height: 250px;
//   }
// `;

// const ListItem = styled.li`
//   padding: 0.75rem 0.5rem;
//   border-bottom: 1px solid #000000;
//   cursor: pointer;
//   transition: all 0.2s ease; /* Smooth transition for hover effects */
  
//   &:last-child {
//     border-bottom: none;
//   }
  
//   /* Hover effect */
//   &:hover {
//     background-color: #ffffff; /* Light blue-gray background on hover */
//     padding-left: 0.75rem;     /* Slight indent effect */
//     box-shadow: inset 3px 0 0 #000000; /* Left border accent */
//     color: #000000; /* Darker text on hover */
//   }
  
//   /* Active/click effect */
//   &:active {
//     background-color: #e6f0fb;
//   }
// `;

export function DeckList(props) {
  const [decks, setDecks] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0 instead of window.innerWidth
  const router = useRouter();

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
                {deck["Name"]}
              </li>
            ))
          ) : (
            <li className="text-black-500 p-2">No decks available!</li>
          )}
          <div className="text-sm text-gray-600 mt-2">
              Window width: {windowWidth}px | Active breakpoint: {activeBreakpoint}
          </div>
        </ul>
    </div>
  );
}