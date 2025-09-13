// 🔹 V1 – Basic Notes App
// Add a note using a text input
// Display notes in a simple list
// Delete a note
// Built with React + TypeScript
// No persistence: notes disappear after closing the browser


import { useState,useEffect } from 'react'
import './App.css'

type Note = {
  id: number;
  text: string;
};

function App() {
  const [text, setText] = useState<string>(" ") ;
  const [notes, setNotes] = useState<Note[]>([]) ;

  // Load notes from chrome storage 
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.get({ notes: [] }, (data: { notes: Note[] }) => {
        setNotes(data.notes);
      });
    }
  }, []);

  // Save notes to chrome storage whenever they change
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set({ notes });
    }
  }, [notes]);



  const addNote = () => {
    if(!text.trim()) return;
    const newNote: Note = {
      id: Date.now(),
      text: text.trim(),
    };
    setNotes([newNote, ...notes]);
    setText("");
    console.log("Note added:", newNote);
  };

  const deleteNote = (id: number) => {
    console.log("Note deleted:", id)
    setNotes(notes.filter(note => note.id !== id)) ;
  };

  return (
    <>
      <div className='w-72 p-4 bg-gray-50 rounded-lg shadow-md font-sans'>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Simple Notes
        </h2>

        <div className='flex gap-2 mb-2'>
          <input 
            className='flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type="text"
            placeholder="Add a note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 '
            onClick={addNote}
          >Add</button>
        </div>

        <div className='max-h-64 overflow-y-auto'>
          {notes.length === 0 && (
            <p className='text-gray-500 text-sm'>No notes yet</p>
          )}
          {notes.map((note) => (
            <div 
              className='flex items-center justify-between bg-white p-2 mb-2 rounded shadow-sm'
              key={note.id}
            >
              <span className='break-words'>{note.text}</span>
              <button
                className='text-red-500 hover:text-red-700'
                onClick={() => deleteNote(note.id)}
              >Delete</button>
            </div>
          ))}
        </div>
      </div>

      
    </>
  )
}

export default App


