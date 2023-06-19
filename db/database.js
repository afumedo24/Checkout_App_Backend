


import sqlite3 from "sqlite3";
// Create a new database instance
const db = new sqlite3.Database('./database.db');

// Test the database connection
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS devices (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
  console.log('Connected to SQLite database.');
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});

export default db;