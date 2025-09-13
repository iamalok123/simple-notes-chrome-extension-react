// 🔹 V1 – Basic Notes App
// Add a note using a text input
// Display notes in a simple list
// Delete a note
// Built with React + TypeScript
// No persistence: notes disappear after closing the browser


// import { useState,useEffect } from 'react'
// import './App.css'

// type Note = {
//   id: number;
//   text: string;
// };

// function App() {
//   const [text, setText] = useState<string>(" ") ;
//   const [notes, setNotes] = useState<Note[]>([]) ;

//   // Load notes from chrome storage 
//   useEffect(() => {
//     if (typeof chrome !== "undefined" && chrome.storage) {
//       chrome.storage.sync.get({ notes: [] }, (data: { notes: Note[] }) => {
//         setNotes(data.notes);
//       });
//     }
//   }, []);

//   // Save notes to chrome storage whenever they change
//   useEffect(() => {
//     if (typeof chrome !== "undefined" && chrome.storage) {
//       chrome.storage.sync.set({ notes });
//     }
//   }, [notes]);



//   const addNote = () => {
//     if(!text.trim()) return;
//     const newNote: Note = {
//       id: Date.now(),
//       text: text.trim(),
//     };
//     setNotes([newNote, ...notes]);
//     setText("");
//     console.log("Note added:", newNote);
//   };

//   const deleteNote = (id: number) => {
//     console.log("Note deleted:", id)
//     setNotes(notes.filter(note => note.id !== id)) ;
//   };

//   return (
//     <>
//       <div className='w-72 p-4 bg-gray-50 rounded-lg shadow-md font-sans'>
//         <h2 className="text-xl font-bold mb-2 text-gray-800">
//           Simple Notes
//         </h2>

//         <div className='flex gap-2 mb-2'>
//           <input 
//             className='flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
//             type="text"
//             placeholder="Add a note..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />

//           <button
//             className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 '
//             onClick={addNote}
//           >Add</button>
//         </div>

//         <div className='max-h-64 overflow-y-auto'>
//           {notes.length === 0 && (
//             <p className='text-gray-500 text-sm'>No notes yet</p>
//           )}
//           {notes.map((note) => (
//             <div 
//               className='flex items-center justify-between bg-white p-2 mb-2 rounded shadow-sm'
//               key={note.id}
//             >
//               <span className='break-words'>{note.text}</span>
//               <button
//                 className='text-red-500 hover:text-red-700'
//                 onClick={() => deleteNote(note.id)}
//               >Delete</button>
//             </div>
//           ))}
//         </div>
//       </div>

      
//     </>
//   )
// }

// export default App







// 🔹 Version 2 – Enhanced & Persistent Notes

// Chrome Storage API integration → notes persist even after browser restart
// Edit notes inline with save/cancel
// Sorting → newest notes appear at the top
// Responsive and scrollable UI for Chrome extension popup
// Styled with Tailwind CSS → clean and modern design
// Icon buttons (Edit ✏️, Delete 🗑️, Save 💾, Cancel ❌) instead of text
// Improved UX and small-screen compatibility

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";

interface Note {
  id: number;
  text: string;
  created: number;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // 🔹 Load notes from Chrome storage
  useEffect(() => {
    if (chrome?.storage) {
      chrome.storage.sync.get({ notes: [] }, (data: { notes: Note[] }) => {
        setNotes(data.notes);
      });
    }
  }, []);

  // 🔹 Save notes to Chrome storage whenever they change
  useEffect(() => {
    if (chrome?.storage) {
      chrome.storage.sync.set({ notes });
    }
  }, [notes]);

  // Add a new note
  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now(),
      text: newNote,
      created: Date.now(),
    };
    const updated = [note, ...notes].sort((a, b) => b.created - a.created);
    setNotes(updated);
    setNewNote("");
  };

  // Delete note
  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Start editing
  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  // Save edit
  const saveEdit = (id: number) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: editText } : n))
    );
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="w-[300px] max-h-[500px] p-3 bg-white shadow-md rounded-xl overflow-y-auto">
      <h1 className="text-lg font-bold text-center mb-3">📝 My Notes</h1>

      {/* Input box */}
      <div className="flex mb-3">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Type a note..."
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          onClick={addNote}
        >
          +
        </button>
      </div>

      {/* Notes list */}
      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
          >
            {editingId === note.id ? (
              <>
                <input
                  className="flex-1 border border-gray-300 rounded px-2 py-1 mr-2 text-sm"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button
                  className="text-green-500 hover:text-green-700 mr-1"
                  onClick={() => saveEdit(note.id)}
                >
                  <Save size={18} />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setEditingId(null)}
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 break-words text-sm">{note.text}</span>
                <button
                  className="text-blue-500 hover:text-blue-700 mr-1"
                  onClick={() => startEditing(note)}
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteNote(note.id)}
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
