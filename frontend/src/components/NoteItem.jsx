import { useState } from "react";
import { showFormattedDate } from "../utils/showFormattedDate";


export const NoteItem = ({ note, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [titleEdit, setTitleEdit] = useState(note.title);
    const [contentEdit, setContentEdit] = useState(note.content);

    const handleCancel = () => {
        setTitleEdit(note.title);
        setContentEdit(note.content);
        setIsEditing(false);
    };

    return (
        <div className="rounded-lg shadow-md bg-gray-50 w-[300px] p-5">
            {isEditing ? (
                <>
                    <input
                        value={titleEdit}
                        type="text"
                        className="w-full rounded-sm outline outline-gray-400 p-2"
                        onChange={(e) => setTitleEdit(e.target.value)}
                    />

                    <textarea
                        value={contentEdit}
                        className="w-full rounded-sm outline outline-gray-400 p-2 mt-2"
                        onChange={(e) => setContentEdit(e.target.value)}
                    />

                    <div className="mt-4 flex gap-2">
                        <button
                            className="bg-white text-orange-500 border border-orange-500 rounded px-3 py-1 cursor-pointer"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-orange-500 text-white px-3 py-1 rounded cursor-pointer"
                            onClick={() => {
                                onUpdate(note.id, titleEdit, contentEdit);
                                setIsEditing(false);
                            }}
                        >
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
                        <button
                            className="bg-orange-500 text-white px-3 py-1 rounded cursor-pointer"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-white text-orange-500 px-3 py-1 rounded cursor-pointer border border-orange-500"
                            onClick={() => onDelete(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};