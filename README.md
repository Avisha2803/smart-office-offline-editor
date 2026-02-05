# Smart Office – Offline Document Editor

## Overview

Smart Office is an offline, browser-based document editor designed for secure or restricted environments. It allows users to create, edit, save, and export documents without any internet dependency.

The system runs entirely on a local machine or LAN and focuses on simplicity, reliability, and document standardization.

---

## Features

- Offline-first architecture
- Rich text editor (Google Docs–like)
- Template-based document creation
- Voice typing (speech-to-text)
- Save and load documents locally
- PDF export (client-side)
- SQLite-based metadata storage
- Optional document locking support

---

## Technology Stack

**Frontend**
- HTML
- JavaScript
- Quill.js (rich text editor)

**Backend**
- Node.js
- Express.js

**Storage**
- JSON files for document content
- SQLite for document metadata

---

## Project Structure

smart-office/
├── README.md                 # Project overview and usage instructions
├── DESIGN.md                 # System design and architecture
├── package.json              # Node.js dependencies and scripts
├── server.js                 # Main backend server (Express)
├── smartoffice.db            # SQLite database (document metadata)
├── docs/                     # Documentation (optional)
│   └── api.md                # API endpoint reference
├── public/                   # Static frontend files
│   ├── index.html            # Browser-based editor interface
│   ├── style.css             # (optional) Styling
│   └── script.js             # (optional) Frontend logic
├── documents/                # Document content storage (JSON)
│   └── <document-id>.json
└── src/                      # Backend source code (optional if expanded)
    ├── routes/               # API route handlers
    ├── models/               # Data models
    └── utils/                # Helper functions
---

## How to Run

### Prerequisites
- Node.js (v18+ recommended)

### Steps

1. Install dependencies: npm install
2. Start the server: npm start
3. Open your browser: http://localhost:3000

---

## How Document IDs Work

- When a document is saved, the server generates a unique Document ID
- This ID is shown to the user after saving
- To load a document, paste the same ID when prompted
- The ID corresponds to a JSON file stored in the `documents/` folder

---

## PDF Export

- PDF export is handled entirely in the browser
- Clicking “Export PDF” downloads the document to the user’s system
- No server-side PDF processing is required

---

## Design Decisions

- Used Quill.js to avoid building a custom editor
- Used file-based storage for document content to keep data transparent
- Used SQLite for metadata to support locking and workflow features
- Chose REST APIs for simplicity and offline reliability

---

## What Is Not Implemented (v1)

- User authentication
- Real-time collaboration
- Document version history
- Cloud synchronization

---

## Future Improvements

- Document approvals and workflows
- Document search and listing
- Version control and audit logs
- Offline AI-assisted document drafting
- Multi-user collaboration with locking or CRDTs

---

## Notes

This project is a functional prototype intended to demonstrate system design thinking, offline-first architecture, and practical trade-offs rather than production-level completeness.


## Screenshots

### Document Editor (Frontend)
![Smart Office Editor](screenshots/frontend.png)

### Exported PDF (Offline)
![Exported PDF](screenshots/exported-pdf.png)
