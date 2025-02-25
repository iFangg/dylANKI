const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: `${process.env.DB_HOSTNAME}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PWD}`,
    connectionLimit: 2
});
console.log('is this called ?');

async function asyncFunction() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("show tables;");
      console.log(rows); //[ {val: 1}, meta: ... ]
    //   const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //   console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
  asyncFunction().then(() => {
    pool.end();
  });