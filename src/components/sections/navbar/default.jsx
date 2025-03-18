"use client"

import {
  NavbarCenter,
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const route = useRouter();
  const handleDecksClick = () => {
    route.push('/allDecks');
  }

  const handleHomeClick = () => {
    route.push("/");
  }

  const handleQuizClick = () => {
    route.push("/quiz");
  }

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      {/* <div
        className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div> */}
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            {/* fix hover issue (goes away after one click)*/}
            <Link
            href="/allDecks"
            className={navigationMenuTriggerStyle()}
            onClick={handleDecksClick}
            >
              <div className="flex flex-col" id="parent">
                <div id="child1" className="block center">
                  <Image
                    className="dark:invert"
                    src="/decks.svg"
                    alt="Deck List logo"
                    width={50}
                    height={50}
                    style={{width: "50px", height:"50px"}}
                    priority
                  />
                </div>
                <div id="child2" className="block center">  
                  All Decks
                </div>
              </div>
            </Link>
          </NavbarLeft>
          <NavbarCenter>
            <Link href="/" className={navigationMenuTriggerStyle()}>
              <div className="flex flex-col" id="parent">
                <div id="child1" className="flex flex-col center">
                  <Image
                    className="dark:invert"
                    src="/home.svg"
                    alt="Home logo"
                    width={90}
                    height={17}
                    style={{width: "50px", height:"50px"}}
                    priority
                  />
                  <div id="child2" className="block center">
                    Home
                  </div>
                </div>
              </div>
            </Link>
         </NavbarCenter>
          <NavbarRight>
            <Link href="/quiz" className={navigationMenuTriggerStyle()}>
              <div className="flex flex-col" id="parent">
                <div id = "child1" className="flex flex-col center">
                  <Image
                    className="dark:invert"
                    src="/quiz.svg"
                    alt="Quiz logo"
                    width={50}
                    height={50}
                    style={{width: "50px", height:"50px"}}
                    priority
                  />
                </div>
                <div id="child2" className="block center">
                  Quizzing
                </div>
              </div>
            </Link>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
