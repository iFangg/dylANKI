// import Navigation from "../../ui/navigation";
// import { Button } from "../../ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
// import { Menu } from "lucide-react";
// import LaunchUI from "../../logos/launch-ui";
// import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
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
  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      {/* <div
        className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div> */}
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            {/* <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <LaunchUI />
              Launch UI
            </a>
            <Navigation /> */}
             {/* <Link href="/decklist" legacyBehavior passHref>
              <a className={navigationMenuTriggerStyle({ className: '' })}>
                Deck List
              </a>
            </Link> */}
            {/* fix hover issue (goes away after one click)*/}
            <Link href="/decklist" className={navigationMenuTriggerStyle()}>
              Deck List
            </Link>
          </NavbarLeft>
          <NavbarCenter>
            <Link href="/" legacyBehavior passHref>
              <a className={navigationMenuTriggerStyle()}>
                <div className="flex flex-col">
                  <Image
                    className="dark:invert"
                    src="/home.svg"
                    alt="Next.js logo"
                    width={90}
                    height={17}
                    style={{width: "50px", height:"50px"}}
                    priority
                  />
                  <div>
                    Home
                  </div>
                </div>
              </a>
            </Link>
         </NavbarCenter>
          <NavbarRight>
            <Link href="/quiz" legacyBehavior passHref>
              <a className={navigationMenuTriggerStyle()}>
                Quizzing
              </a>
            </Link>
            {/* <Button variant="default" asChild>
              <a href="/">Get Started</a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a href="/" className="flex items-center gap-2 text-xl font-bold">
                    <span>Launch UI</span>
                  </a>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Getting Started
                  </a>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Components
                  </a>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </a>
                </nav>
              </SheetContent>
            </Sheet> */}
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
