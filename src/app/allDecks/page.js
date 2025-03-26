import { AddDeckButton } from "@/components/ui/AddDeck";
import { DeckList } from "@/components/ui/DeckList";
import Image from "next/image";

export default function allDecks() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-h-[calc(100vh-159px)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 w-full">
        <div className="flex items-end">
          <div className="relative">
            <DeckList width="1400px" height="575px"/>
          </div>
          <div className="ml-4 mb-[31px]">
            <AddDeckButton />
          </div>
        </div>
      </main> 
    </div>
  );
}
