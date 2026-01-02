import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.js";
import { handleCreateNote, handleDeleteNote, handleEditNote, handleGetMyNotes, handleGetMyNotesById } from "../controllers/note.controllers.js";

const noteRoute=Router()
noteRoute.post("/",requireAuth, handleCreateNote)
noteRoute.patch("/:id",requireAuth, handleEditNote)
noteRoute.get('/', requireAuth, handleGetMyNotes)
noteRoute.delete('/:id', requireAuth, handleDeleteNote)
noteRoute.get('/:id', requireAuth, handleGetMyNotesById)

export {noteRoute}