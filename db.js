// db.js
const sql = require("mssql");

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_NAME,
//   options: {
//     encrypt: true, // Use this if you're on Windows Azure
//     trustServerCertificate: true, // Change to true for local dev / self-signed certs
//   },
// };

const config = {
  user: "ptt-admin",
  password: "PT12345!",
  server: "ptt-test-server.database.windows.net", // You can use 'localhost\\instance' to connect to named instance
  database: "pttdatabase",
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
  },
};

let pool;

async function getConnection() {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log("SQL Database Connection is success");
    } catch (err) {
      console.error("SQL Database Connection Failed!", err);
      throw err;
    }
  }
  return pool;
}

module.exports = {
  sql,
  getConnection,
};
