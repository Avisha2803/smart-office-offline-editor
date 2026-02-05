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
├── server.js            # Node.js backend server
├── package.json         # Project dependencies and scripts
├── smartoffice.db       # SQLite database (document metadata)
├── documents/           # Stored document content (JSON)
│   └── <document-id>.json
├── public/              # Frontend assets
│   └── index.html       # Browser-based editor UI
├── DESIGN.md            # System design and architecture explanation
└── README.md            # Project overview and usage instructions

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
![Smart Office Editor](<img width="908" height="691" alt="Screenshot 2026-02-04 231634" src="https://github.com/user-attachments/assets/f08e8925-5b82-414d-892f-c5a3e1862400" />
)

### Exported PDF (Offline)
![Exported PDF](<img width="1050" height="620" alt="image" src="https://github.com/user-attachments/assets/faa71092-f237-42cc-af8e-48f156887346" />
)
