// const mariadb = require('mariadb');
// const pool = mariadb.createPool({
//     host: `${process.env.DB_HOSTNAME}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PWD}`,
//     database: `${process.env.DB_NAME}`,
//     connectionLimit: 5
// });

// console.log('is this called ?');

// export const getFlashcards = async () => {
//   const query = 'SHOW TABLES;'
//   try {
//     const results = await pool.query(query);
//     console.log(results);
//     return results;
//   } catch (err) {
//     console.log(err)
//     return;
//   }
// }

// export const addFlashcard = (name, content, tags=null) => {
//   const query = 'INSERT INTO Flashcards SET name = ?, email = ?, tags=?';
//   try {
//     const results = pool.query(query);
//     return { id: results.id, name, content, tags}
//   } catch (err) {
//     throw new Error(`Error creating flashcard: ${err}`)
//   }
// }

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     let conn;
//     try {

//       conn = await pool.getConnection();
//       const rows = await conn.query("show tables;");
//       // rows: [ {val: 1}, meta: ... ]

//     //   const rowsData = await conn.query('SELECT 1 + 1 AS solution');
//       console.log('tables: ', rows);
//     //   res.status(200).json(rowsData);

//       // const dbResponse = await conn.query(`INSERT INTO myTable value (?, ?)`, [1, "mariadb"]);
//       // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//       // res.status(200).json(dbResponse);

//     } catch (err) {
//       console.log('error here : ', err);
//       throw err;
//     } finally {
//       if (conn) {
//         conn.release(); //release to pool
//       }
//     }
//   }
// }

// (async () => {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ Connected to MariaDB database');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Failed to connect to MariaDB:', error.message);
//   }
// })();
