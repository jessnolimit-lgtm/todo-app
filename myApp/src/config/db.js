const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",            // same as Workbench
  password: "root123", // same as Workbench
  database: "todo_db",
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected!");
});

module.exports = db;
