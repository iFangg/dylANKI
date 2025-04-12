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

// console.log(`connecting to ${process.env.DB_HOSTNAME} as user ${process.env.DB_USER}`);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('deckId');

    if (!id) {
      return Response.json({ error: "No deck ID provided" }, { status: 400 });
    }

    const conn = await pool.getConnection();
    const results = await conn.query("SELECT * FROM Flashcards f JOIN CardInDeck c ON f.ID = c.FlashcardID WHERE c.DeckID = ?;", [id]);
    // console.log(`results are: ${results}`)
    conn.release();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { deckID, name, content } = await req.json();
    const conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO Flashcards (Content, dateCreated, dateLastModified) VALUES (?, (SELECT NOW()), (SELECT NOW()));",
      [content]
    );

    await conn.query(
      "INSERT INTO CardInDeck (FlashcardID, DeckID) VALUES (?, ?);",
      [parseInt(result.insertId), deckID]
    );

    conn.release();
    return NextResponse.json({ message: "Flashcard added" });
  } catch (error) {
    console.error("DB Insert error: ", error);
    return NextResponse.json({ error: "Flashcard Insertion failed" }, { status: 500 });
  }
}

// TODO: Implement
export async function UPDATE(req) {
  try {
    const { flashcardID, name, content } = await req.json();
    const conn = await pool.getConnection();
    result = await conn.query(
      "UPDATE Flashcards SET Name = ?, Content = ? WHERE ID = ?;",
      [name, content, flashcardID]
    );

    conn.release();
    return NextResponse.json({ message: "Flashcard updated" });
  } catch (error) {
    console.error("Flashcard update error: ", error);
    return NextResponse.json({ error: "Flashcard update failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { flashcardID } = await req.json();
    const conn = await pool.getConnection();

    await conn.query(
      "DELETE FROM CardInDeck WHERE FlashcardID = ?;",
      [flashcardID]
    );

    await conn.query(
      "DELETE FROM Flashcards WHERE ID = ?;",
      [flashcardID]
    );

    return NextResponse.json({ message: "Flashcard deleted" });
  } catch (error) {
    console.error("Flashcard delete error: ", error);
    return NextResponse.json({ error: "Flashcard deletion failed" }, { status: 500 });
  }
}