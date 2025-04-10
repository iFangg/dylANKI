import { DeckView } from "@/components/ui/DeckView";
import { DeckList } from "@/components/ui/DeckList";

export default function Home() {
  return (
    <div className="pt-[128px] flex items-center justify-center h-screen">
      <main className="flex flex-col items-start w-full max-h-[calc(100vh-159px)] px-8 sm:px-20">
        <div className="main-page flex flex-row sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 2xl:gap-18 3xl:gap-24 4xl:gap-[200px] items-center ml-4 sm:ml-8 lg:ml-16">
          <section className="curr-Deck-view flex flex-row w-full sm:w-auto">
            <DeckView width="946px" height="546px" page="home" />
          </section>
          <section className="deck-list flex flex-row w-full sm:w-auto mb-[74px]">
            <DeckList width="362px" height="546px" page="home" />
          </section>
        </div>
      </main>
    </div>
  );
}
