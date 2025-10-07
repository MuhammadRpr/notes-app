import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const baseUrl = "https://notes-app-api-ten-rho.vercel.app"

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        setNotes([...notes, result.data]);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async (id, updateTitle, updateContent) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updateTitle, content: updateContent })
      });

      const result = await res.json();
      setNotes((prevNotes) => {
        return prevNotes.map((note) => (note.id === id ? result.data : note));
      });

      console.log(result.data)
    } catch (error) {
      console.error(error)
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setNotes((notes) => notes.filter((note) => note.id !== id))
      }

    } catch (error) {
      console.error(error)
    }
  };

  const getNoteById = (id) => {
    console.log(id);
  };


  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col mt-24 items-center">
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

// ================== Komponen ==================





const NoteItem = ({ note, onDelete, onUpdate }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(note.title);
  const [contentEdit, setContentEdit] = useState(note.content);

  const handleCancel = () => {
    setTitleEdit(note.title)
    setContentEdit(note.content)
    setIsEditing(false)
  }

  return (
    <div className="rounded-lg shadow-md bg-white w-[300px] p-5">
      {isEditing ? (<>
        <input
          value={titleEdit}
          type="text"
          className="w-full rounded-sm outline outline-gray-400 p-2"
          onChange={(e) => setTitleEdit(e.target.value)}
        />

        <textarea
          value={contentEdit}
          type="text"
          className="w-full rounded-sm outline outline-gray-400 p-2 mt-2"
          onChange={(e) => setContentEdit(e.target.value)}
        />

        <div className="mt-4 flex gap-2">
          <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={handleCancel}>
            Cancel
          </button>
          <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => {
            onUpdate(note.id, titleEdit, contentEdit);
            setIsEditing(false);
          }}>
            Save
          </button>
        </div>
      </>
      ) : (
        <>
          <p className="font-medium text-xl">{note.title}</p>
          <p className="text-sm text-gray-500">
            ~{showFormattedDate(note.created_at)}
          </p>
          <p className="mt-2">{note.content}</p>
          <div className="mt-4 flex gap-2">
            <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};



// helper
const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
