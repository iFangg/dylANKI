import { AddFlashcardButton } from "@/components/ui/AddFlashcard";
import { DeckView } from "@/components/ui/DeckView";
import Image from "next/image";

export default function Home() {
  console.log(process.env.PWD)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-h-[calc(100vh-159px)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        we should be looking at deck with ID UNSPECIFIED
      </div>
      <div className="flex items-end">
          <div className="relative">
            <DeckView width="946px" height="546px" page="deckv" />
          </div>
          <div className="ml-4 mb-4">
            <AddFlashcardButton />
          </div>
        </div>
      
    </div>
  );
}
