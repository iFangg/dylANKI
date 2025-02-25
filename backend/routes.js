const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: `${process.env.DB_HOSTNAME}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PWD}`,
    connectionLimit: 2
});
console.log('is this called ?');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let conn;
    try {

      conn = await pool.getConnection();
      const rows = await conn.query("show tables;");
      // rows: [ {val: 1}, meta: ... ]

    //   const rowsData = await conn.query('SELECT 1 + 1 AS solution');
      console.log('tables: ', rows);
    //   res.status(200).json(rowsData);

      // const dbResponse = await conn.query(`INSERT INTO myTable value (?, ?)`, [1, "mariadb"]);
      // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
      // res.status(200).json(dbResponse);

    } catch (err) {
      console.log('error here : ', err);
      throw err;
    } finally {
      if (conn) {
        conn.release(); //release to pool
      }
    }
  }
}