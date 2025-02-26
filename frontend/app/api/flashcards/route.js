import { NextResponse } from "next/server";
import mariadb from "mariadb"
import '../../../db/queries'

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
    const results = await conn.query("SHOW TABLES;");
    console.log(results)
    conn.release();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { action = null, deckID, name, content } = await req.json();
    const conn = await pool.getConnection();
    result = await conn.query(
      "INSERT INTO Flashcards (name, content) VALUES (?, ?)",
      [name, content]
    );  
    await conn.query(
      "INSERT INTO CardInDeck (FlashcardID, DeckID) VALUES (?, ?)",
      [result.ID, deckID]
    )
    conn.release();
    return NextResponse.json({ message: "Flashcard added" });
  } catch (error) {
    console.error("DB Insert error: ", error);
    return NextResponse.json({ error: "Flashcard Insertion failed" }, { status: 500 });
  }
}
