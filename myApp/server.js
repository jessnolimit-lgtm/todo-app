
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const mysql = require('mysql2');
const tasksRoutes = require("./src/routes/tasks");

const app = express();
app.use(bodyParser.json());

// Session setup
app.use(session({
  secret: 'todo_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Serve static files from views
app.use(express.static(__dirname + '/src/views'));

// MySQL connection for login (uses Railway or local env variables)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "root123",
  database: process.env.MYSQLDATABASE || "todo_db",
  port: process.env.MYSQLPORT || 3306
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });
    if (results && results.length > 0) {
      req.session.user = username;
      return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  });
});

// Auth middleware
function requireLogin(req, res, next) {
  if (req.session && req.session.user) return next();
  res.redirect('/login.html');
}

// Protect main app
app.get("/", requireLogin, (req, res) => {
  res.sendFile(__dirname + "/src/views/index.html");
});

app.use("/tasks", requireLogin, tasksRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log("🚀 Server running on http://0.0.0.0:3000 (LAN access enabled)");
});
