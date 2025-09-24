import express from 'express';
import { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } from '../handlers/notesHandler.js';

const notesRouter = express.Router();

notesRouter.get('/notes', getAllNotesHandler);
notesRouter.post('/notes', addNoteHandler);
notesRouter.get('/notes/:id', getNoteByIdHandler);

export default notesRouter;