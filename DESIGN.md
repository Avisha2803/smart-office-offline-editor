# Smart Office – Design & Approach

## Overview

Smart Office is an offline-first, browser-based document creation and editing system designed for secure or restricted environments where internet access is unavailable.

The goal of this system is to simplify document creation, reduce formatting errors, and standardize documents while ensuring data confidentiality by running entirely on a local machine or LAN.

This prototype focuses on clarity of system design, offline reliability, and practical trade-offs rather than feature completeness.

---

## 1. System Design

### High-Level Architecture

The system follows a simple client–server architecture running fully offline:

Browser (Editor UI)
   ↓ HTTP (REST)
Node.js Server
   ↓
Local Storage (JSON files + SQLite metadata)

### Components

**Frontend (Browser)**
- Rich text document editor
- Template loading
- Voice-based text input
- PDF export
- Communicates with server using REST APIs

**Backend (Node.js + Express)**
- Handles saving and loading documents
- Generates unique document IDs
- Manages document metadata (status, locking)
- Runs locally or on a LAN-accessible machine

**Storage**
- Document content stored as JSON files on disk
- Metadata stored in SQLite (offline database)

### Communication
- `POST /api/save` – Save document content
- `GET /api/load/:id` – Load document by ID
- `POST /api/lock/:id` – Lock document for editing (optional)

This design keeps the system simple, deterministic, and fully offline.

---

## 2. Document Editing

### Editor Choice

The browser editor is implemented using **Quill.js**, a mature rich-text editor library.

**Reasons for choosing Quill.js:**
- Supports headings, bold, lists, and formatting
- Provides structured document data (Delta format)
- Avoids the complexity of building a custom editor
- Easy to serialize and store offline

### Saving & Loading Documents

- Each document is assigned a unique **Document ID**
- Document content is stored as a JSON file using the Quill Delta format
- The Document ID corresponds to the filename
- On load, the server reads the JSON file and returns its contents to the editor

This approach ensures formatting consistency and offline reliability.

---

## 3. Voice Input (Speech-to-Text)

### Design Approach

Voice typing is implemented using the browser’s built-in Speech Recognition API.

### How It Works
- Audio is captured directly in the browser
- Speech recognition runs locally in the browser
- Transcribed text is inserted at the cursor position in the editor

### Trade-off

This approach was chosen for the prototype due to simplicity and ease of integration.

For production use, speech recognition could be moved to the server using offline speech models such as Vosk or Whisper to ensure consistent and deterministic behavior across machines.

---

## 4. Templates & Standardization

### Template Design

Templates are implemented as predefined Quill Delta JSON structures.

### Workflow
- User clicks “Load Template”
- Editor is populated with a standardized document layout
- Users fill in content while preserving structure

### Benefits
- Reduces formatting errors
- Ensures consistent document structure
- Speeds up document creation

Templates can be extended or versioned in future iterations.

---

## 5. Storage Strategy

### Hybrid Storage Approach

The system uses a hybrid offline storage model:

**JSON Files**
- Store full document content
- Optimized for large, structured editor data

**SQLite Database**
- Stores metadata such as:
  - Document ID
  - Status (DRAFT / APPROVED)
  - Locking information
  - Timestamps

This separation keeps the system modular, efficient, and easy to scale.

---

## 6. Key Trade-offs

### What Is Not Built in v1
- Real-time collaboration
- Authentication and user roles
- Version history
- Cloud synchronization

### Technical Shortcuts Avoided
- Building a custom editor from scratch
- Using internet-dependent services
- Over-engineering collaboration logic

### Expected Future Complexity
- Concurrent editing and conflict resolution
- Approval workflows
- Template versioning
- Offline AI-assisted drafting

The v1 prototype prioritizes simplicity, clarity, and offline reliability over feature completeness.

---

## Conclusion

This design demonstrates a practical, offline-first approach to document creation in secure environments. The system is intentionally simple while leaving clear extension points for future scalability.
