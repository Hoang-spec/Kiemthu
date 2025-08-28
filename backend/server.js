const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("❌ Lỗi kết nối DB:", err.message);
  } else {
    console.log("✅ Đã kết nối SQLite");
  }
});

// // 2️⃣ Tạo bảng nếu chưa có
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE,
//     password TEXT
//   )`);

//   db.run(`CREATE TABLE IF NOT EXISTS products (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     price REAL
//   )`);
// });

// // 3️⃣ API: Đăng ký
// app.post("/api/register", (req, res) => {
//   const { username, password } = req.body;
//   db.run(
//     `INSERT INTO users(username, password) VALUES(?, ?)`,
//     [username, password],
//     function (err) {
//       if (err) {
//         return res.status(400).json({ error: "Username đã tồn tại" });
//       }
//       res.json({ id: this.lastID, username });
//     }
//   );
// });

// // 4️⃣ API: Đăng nhập
// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;
//   db.get(
//     `SELECT * FROM users WHERE username = ? AND password = ?`,
//     [username, password],
//     (err, row) => {
//       if (row) {
//         res.json({ message: "Đăng nhập thành công", user: row });
//       } else {
//         res.status(401).json({ error: "Sai username hoặc password" });
//       }
//     }
//   );
// });

// // 5️⃣ API: Lấy danh sách sản phẩm
// app.get("/api/products", (req, res) => {
//   db.all(`SELECT * FROM products`, [], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// });

// // 6️⃣ API: Thêm sản phẩm
// app.post("/api/products", (req, res) => {
//   const { name, price } = req.body;
//   db.run(
//     `INSERT INTO products(name, price) VALUES(?, ?)`,
//     [name, price],
//     function (err) {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }
//       res.json({ id: this.lastID, name, price });
//     }
//   );
// });

// 7️⃣ Chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
