import { NextResponse } from "next/server";
import mariadb from "mariadb"

const pool = mariadb.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD || "",
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    connectionLimit: 10
});

console.log(`connecting to ${process.env.DB_HOSTNAME} as user ${process.env.DB_USER}`);

export async function GET() {
  try {
    const conn = await pool.getConnection();
    const results = await conn.query("SELECT * FROM Decks;");
    console.log(`(in deck routes) decks found: ${results}`)
    conn.release();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { action = null, deckID = null, name } = await req.json();
    const conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO Decks (name, dateCreated, dateLastModified) VALUES (?, (SELECT NOW()), (SELECT NOW()))",
      [name]
    );
    if (deckID != null) {
        await conn.query(
            "INSERT INTO DeckInDeck (DeckID, SuperDeckID) VALUES (?, ?)",
            [result.ID, deckID]
        );
    }
    conn.release();
    return NextResponse.json({ message: "Deck added" });
  } catch (error) {
    console.error("DB Insert error: ", error);
    return NextResponse.json({ error: "Deck Insertion failed" }, { status: 500 });
  }
}

export async function UPDATE(req) {
  try {
    const { deckID, name } = await req.json();
    const conn = await pool.getConnection();
    result = await conn.query(
      "UPDATE Decks SET Name = ? WHERE ID = ?;",
      [name, deckID]
    );
    conn.release();
    return NextResponse.json({ message: "Deck updated" });
  } catch (error) {
    console.error("Deck update error: ", error);
    return NextResponse.json({ error: "Deck  update failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { deckID } = await req.json();
    const conn = await pool.getConnection();
    result = await conn.query(
      "DELETE FROM Decks WHERE ID = ?;",
      [deckID]
    );

    cardDeletion = await conn.query(
      "DELETE FROM CardInDeck WHERE DeckID = ?;",
      [deckID]
    );

    deckUpdates = await conn.query(
        "UPDATE DeckInDeck SET DeckID = (SELECT DeckID FROM DeckInDeck WHERE SuperDeckID = ?) WHERE DeckID = ?",
        [deckID, deckID]
    );

    deckDeletion = await conn.query(
        "DELETE FROM DeckInDeck WHERE SuperDeckID = ?;"
    );
  } catch (error) {
    console.error("Deck deletion error: ", error);
    return NextResponse.json({ error: "Deck deletion failed" }, { status: 500 });
  }
}