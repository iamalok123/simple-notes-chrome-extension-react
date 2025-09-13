# 📝 Simple Notes - Chrome Extension

A lightweight Chrome Extension to quickly add, edit, and manage notes directly in your browser. Built with **React**, **TypeScript**, and **Tailwind CSS**, with persistent storage using the **Chrome Storage API**.

---

## 🚀 Overview

Simple Notes started as a fun experiment to create a tiny space to jot down quick thoughts while browsing. Over time, it evolved into a practical tool I now use daily. The extension is designed to be fast, responsive, and user-friendly, fitting perfectly into the Chrome popup.

---

## 🔹 Version History

### Version 1 - Basic Notes App
- Add a note using a text input
- Display notes in a simple list
- Delete a note
- Built with React + TypeScript
- **No persistence**: notes disappear after closing the browser

**Code Features**
- `useState` for managing notes and input
- Basic `addNote` and `deleteNote` functions
- Simple, clean UI with Tailwind CSS

---

### Version 2 - Enhanced & Persistent Notes
- **Persistent storage**: notes stay saved after restarting the browser using Chrome Storage API
- **Edit notes inline** with save/cancel buttons
- **Sorting**: newest notes appear at the top
- Responsive and scrollable UI for Chrome extension popup
- **Icon buttons** for Edit ✏️, Delete 🗑️, Save 💾, Cancel ❌
- Improved UX and small-screen compatibility

**Code Features**
- `useEffect` hooks for loading and saving notes to Chrome storage
- `useState` hooks for editing and managing notes
- Dynamic rendering for editing state
- Modern, clean design using Tailwind CSS

---

## ✨ Features

- ➕ **Add Notes Instantly** – Quickly jot down ideas or reminders
- ✏️ **Edit Notes Anytime** – Update your notes directly in the popup
- ❌ **Delete Notes** – Remove notes you no longer need
- 💾 **Persistent Storage** – Notes are saved even after closing the browser
- 📱 **Responsive UI** – Designed to fit small Chrome extension popups perfectly

---

## 🛠️ Tech Stack

- **React + TypeScript** → Component-based UI with type safety  
- **Chrome Storage API** → Persistent note storage  
- **Tailwind CSS** → Quick, modern, responsive styling  
- **Vite** → Fast build tool for development  

---

## 💡 What You’ll Learn

- How to integrate React apps into a Chrome Extension
- Managing data persistence using Chrome’s `storage.sync`
- Building editable and dynamic UI with React hooks (`useState`, `useEffect`)
- Importance of responsive design for small popup extensions

---

## 📦 Installation & Usage

1. **Clone the repository**
  ```bash
    git clone https://github.com/iamalok123/simple-notes-chrome-extension-react.git
    cd simple-notes
  ```
2. **Install dependencies**
  ```bash
    npm install
  ```
3. **Build the extension**
  ```bash
    npm run build
  ```
4. Load into Chrome
   - Open chrome://extensions/
   - Enable Developer mode
   - Click Load unpacked and select the dist/ folder

5. Start using your notes
   - Open the extension popup
   - Add, edit, or delete notes
   - Notes are automatically saved

---

## Feedback & Suggestions

- I’d love to hear from you:
What’s one feature you think a Notes Chrome Extension must have?
