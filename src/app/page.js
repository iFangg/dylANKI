import Image from "next/image";
import { DeckView } from "@/components/ui/DeckView";
import { DeckList } from "@/components/ui/DeckList";

export default function Home() {
  return (
    // change this to later fit underneath the navbar
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start justify-center w-full h-full">
        {/* <div className="main-page flex gap-[200px] items-center ml-8 sm:ml-16"> */}
        <div className="main-page flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-[200px] items-center ml-4 sm:ml-8 lg:ml-16">
          <section className="curr-Deck-view w-full sm:w-auto">
            <DeckView />
          </section>
          <section className="deck-list w-full sm:w-auto">
            <DeckList />
          </section>
        </div>
      </main>
    </div>
  );
}
