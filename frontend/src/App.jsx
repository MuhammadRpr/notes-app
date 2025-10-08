import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState([]);

  const baseUrl = "https://notes-app-api-ten-rho.vercel.app";

  const fecthNotes = async () => {
    try {
      const res = await fetch(`${baseUrl}/notes`);
      const result = await res.json();
      setNotes(result.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fecthNotes();
  }, []);

  const addNote = async (newTitle, newContent) => {
    try {
      const res = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      const result = await res.json();
      if (res.ok) setNotes([...notes, result.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async (id, updateTitle, updateContent) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updateTitle, content: updateContent }),
      });
      const result = await res.json();
      if (res.ok) {
        setNotes((prev) =>
          prev.map((note) => (note.id === id ? result.data : note))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getNoteById = (id) => {
    console.log(id);
  };

  return (
    <>
      <Navbar />
      <main className="w-full h-full flex flex-col mt-24 items-center p-8">
        <NoteForm onAddNote={addNote} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={handleUpdateNote}
          onGetById={getNoteById}
        />
      </main>
    </>
  );
}

export default App;