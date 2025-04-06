import { DeckView } from "@/components/ui/DeckView";

export default function Home() {
  // console.log(process.env.PWD)
  return (
    <div className="pt-[128px] flex items-center justify-center h-screen">
      <main className="flex flex-col items-center justify-center w-full max-h-[calc(100vh-165px)] px-8 sm:px-20">
        <div className="main-page flex flex-row sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 2xl:gap-18 3xl:gap-24 4xl:gap-[200px] items-center ml-4 sm:ml-8 lg:ml-16">
          <DeckView width="946px" height="546px" page="deckv" />
        </div>
      </main>
    </div>
  );
}
