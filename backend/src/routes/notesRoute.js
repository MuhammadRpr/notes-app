import express from 'express';
import { addNoteHandler, deleteNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler, updateNoteByIdHandler } from '../handlers/notesHandler.js';

const notesRouter = express.Router();

notesRouter.get('/notes', getAllNotesHandler);
notesRouter.post('/notes', addNoteHandler);
notesRouter.get('/notes/:id', getNoteByIdHandler);
notesRouter.put('/notes/:id', updateNoteByIdHandler);
notesRouter.delete('/notes/:id', deleteNoteByIdHandler);


export default notesRouter;