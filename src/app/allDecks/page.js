"use client"

import { AddDeckButton } from "@/components/ui/AddDeck";
import { DeckList } from "@/components/ui/DeckList";
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

export default function allDecks() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-h-[calc(100vh-159px)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 w-full">
        <div className="flex items-end">
          <div className="relative">
            <DeckList width="1400px" height="575px"/>
          </div>
          <div className="ml-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="add-deck-button shadow-lg" variant="outline">
                    <Image
                        src="/plus.svg"
                        width = {50}
                        height = {50}
                        alt="Add Deck"
                    />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Deck Title" className="text-right">
                                Deck Title
                            </Label>
                            <Input id="name" value="Deck Name" className="col-span-3" onChange={() => {}}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
        </div>
      </main> 
    </div>
  );
}
