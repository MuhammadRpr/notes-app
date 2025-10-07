import { NoteItem } from "./NoteItem.jsx";


export const NoteList = ({ notes, onUpdate, onDelete }) => {
    return (
        <section className="container py-8">
            <h2 className="inline-flex items-center gap-2 text-2xl font-medium mb-6">
                <img src="/note.svg" alt="note icon" className="w-8 h-8" />
                Notes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.length > 0 ? (
                    notes.map((note) => <NoteItem key={note.id} note={note} onUpdate={onUpdate} onDelete={onDelete} />)
                ) : (
                    <h1>Data Kosong</h1>
                )}
            </div>
        </section>
    );
};