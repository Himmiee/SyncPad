import { Request, Response, NextFunction } from "express";
import {
  createUserNote,
  deleteNoteWithId,
  getNoteById,
  getUserNotes,
  updateNoteWithId,
} from "./notes.services";

// Create notes for user
export const CreateNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body;
    const ownerId = Number(req.userId);
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const note = await createUserNote({ title, content, ownerId });

    return res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (err) {
    next(err);
  }
};

//  Get all notes for a given user
export const GetNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }
    const notes = await getUserNotes(Number(userId));

    return res.status(200).json({
      message: "Notes retrieved successfully",
      notes,
    });
  } catch (err) {
    next(err);
  }
};

// Get single note by note ID
export const GetNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Valid note ID is required" });
    }

    const note = await getNoteById(Number(id));

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({
      message: "Note retrieved successfully",
      note,
    });
  } catch (err) {
    next(err);
  }
};

// patch single note
export const UpdateNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ownerId = req.userId;
    const { title, content } = req.body;

    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Valid note ID is required" });
    }

    const note = await getNoteById(Number(id));
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const updatedNote = await updateNoteWithId(Number(id), Number(ownerId), {
      title,
      content,
    });

    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    next(err);
  }
};


export const DeleteNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ownerId = req.userId;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Valid note ID is required" });
    }

    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await deleteNoteWithId(Number(id), Number(ownerId));

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err: any) {
    next(err);
  }
};
