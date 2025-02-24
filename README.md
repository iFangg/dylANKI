# dylANKI
Happy Birthday Dylan :)

## This is a flashcard app
Figma is [here](https://www.figma.com/design/PRTrejREzkCT7fXRqwnA1U/DylANKI?node-id=10-254&p=f&t=Wxq4HUnu1sg5uzG5-0)

### F/E - react, tailwind css/shadecn
- flashcard management
- flashcard viewing
- flashcard editing
- flashcard printing
- deck management
- AI flashcard making?!?!
- Digital quizzing using flashcards
- Add feature to hide certain aspects/words of flashcards
- Feature to create shapes which conseal parts of image (can be clicked to reveal hidden parts)
- Feature to screen capture and port directly into a flashcard

### B/E - mysql/mariadb, next.js
(considering this is a single user platform)

in db:
- flashcard table (id, name, content, tags, deckID, date created, date last modified)
    - f.id: flashcard ID, used for reference in db
    - f.name: name of flashcard
    - f.content: front and back of flashcard, (stored in json format, each element in json array is a side of the flashcard) 
    - f.tags: flags to assosciate flashcard with content topics
    - f.deckID: the deck that the current flashcard is associated to
    - f.dateCreated: date of flashcard creation
    - f.dateLastModified: date of last modification to flashcard

<br>

- decks table (id, name, flashcards contained, decks contained, date created, date last modified)
    - d.id: deck ID
    - d.name: deck name
    - d.flashcards: flashcards contained within the deck
    - d.decks: nested decks contained within this deck
    - d.dateCreated: date of deck creation
    - d.dateLastModified: date of last modification to deck


#### Flashcards
- editing is done by clicking the flashcard
- changes are saved by clicking outside of the flashcard

#### Decks
- Collections of different flashcard sets
- Can review entire deck of flashcards or jsut a select few from within
- Can nest decks within decks
- In the deck list, decks can be moved around to change nesting order
- quiz will be in flashcard form
  - given one side of the flashcard, type out
  - points system for test score

