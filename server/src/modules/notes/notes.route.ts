import express from "express";
import * as noteControllers from "./notes.controller";
import { AuthMiddleware } from "@/middleware/authMiddleware";

const router = express.Router();

// Get all notes
router.get("/note/all", AuthMiddleware, noteControllers.GetNotes);

// Create a new note
router.post("/note/create", AuthMiddleware, noteControllers.CreateNotes);

// Get note by ID
router.get("/note/detail/:id", AuthMiddleware, noteControllers.GetNoteById);

// Update note by ID
router.patch(
  "/note/update/:id",
  AuthMiddleware,
  noteControllers.UpdateNoteById
);

// Delete note by ID
router.delete(
  "/note/delete/:id",
  AuthMiddleware,
  noteControllers.DeleteNoteById
);

export default router;
