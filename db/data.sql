CREATE DATABASE IF NOT EXISTS dylanki;
USE dylanki;

CREATE TABLE IF NOT EXISTS dylanki.Flashcards (
	ID INT auto_increment NOT NULL,
	Name varchar(100) NOT NULL,
	Content LONGTEXT NULL,
	Tags LONGTEXT NULL,
	DateCreated DATETIME NOT NULL,
	DateLastModified DATETIME NOT NULL,
	CONSTRAINT Flashcard_ID PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS dylanki.Decks (
	ID INT auto_increment NOT NULL,
	Name varchar(100) NOT NULL,
	DateCreated DATETIME NOT NULL,
	DateLastModified DATETIME NOT NULL,
	CONSTRAINT Deck_ID PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS dylanki.CardInDeck (
	FlashcardID INT NOT NULL,
	DeckID INT NOT NULL,
	CONSTRAINT Flashcard_ID FOREIGN KEY (FlashcardID) REFERENCES dylanki.Flashcards(ID),
	CONSTRAINT Deck_ID FOREIGN KEY (DeckID) REFERENCES dylanki.Decks(ID)
);

CREATE TABLE dylanki.DeckInDeck (
	DeckID INT NOT NULL,
	SuperDeckID INT NOT NULL,
	CONSTRAINT fk_Deck_ID FOREIGN KEY (DeckID) REFERENCES dylanki.Decks(ID),
	CONSTRAINT fk_Super_Deck_ID FOREIGN KEY (SuperDeckID) REFERENCES dylanki.Decks(ID)
);
