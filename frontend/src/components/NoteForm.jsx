import { useEffect } from "react";
import { useState } from "react";

export const NoteForm = ({ onAddNote }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddNote(title, content);
        setTitle("");
        setContent("");
    };

    return (
        <section className="container w-100 px-5 mb-8 shadow-2xl p-5 rounded-md bg-gray-50 ">
            <h1 className="p-3">Add Your List:</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="rounded-sm outline outline-gray-400 p-2"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    className="resize-y min-h-14 rounded-sm outline outline-gray-400 p-2"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-orange-500 text-white font-semibold rounded-lg py-2 cursor-pointer"
                >
                    Add note
                </button>
            </form>
        </section>
    );
};