const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

const db = new sqlite3.Database("./smartoffice.db", (err) => {
  if (err) {
    console.error("SQLite error:", err.message);
  } else {
    console.log("SQLite database connected");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS documents_meta (
    id TEXT PRIMARY KEY,
    status TEXT DEFAULT 'DRAFT',
    locked_by TEXT,
    updated_at INTEGER
  )
`);

const DOC_DIR = path.join(__dirname, "documents");

if (!fs.existsSync(DOC_DIR)) {
  fs.mkdirSync(DOC_DIR);
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/**
 * Save document
 */
app.post("/api/save", (req, res) => {
  const { id, content } = req.body;
  const docId = id || uuidv4();
  const filePath = path.join(DOC_DIR, `${docId}.json`);

  // 1️⃣ Save document content (JSON stays)
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

  // 2️⃣ Save / update metadata in SQLite
  db.run(
    `INSERT OR REPLACE INTO documents_meta
     (id, status, locked_by, updated_at)
     VALUES (?, ?, NULL, ?)`,
    [docId, "DRAFT", Date.now()]
  );

  res.json({ success: true, id: docId });
});

/**
 * Load document
 */
app.get("/api/load/:id", (req, res) => {
  const filePath = path.join(DOC_DIR, `${req.params.id}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Document not found" });
  }

  const data = fs.readFileSync(filePath);
  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log(`Smart Office running at http://localhost:${PORT}`);
});


app.post("/api/lock/:id", (req, res) => {
  const { user } = req.body;

  db.run(
    `UPDATE documents_meta
     SET locked_by = ?
     WHERE id = ? AND locked_by IS NULL`,
    [user, req.params.id],
    function () {
      if (this.changes === 0) {
        return res.status(409).json({ error: "Document already locked" });
      }
      res.json({ success: true });
    }
  );
});
