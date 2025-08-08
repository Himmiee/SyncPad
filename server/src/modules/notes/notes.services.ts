import prisma from "@/config/db";
import { Notes } from "../../types/notes";
import { findUserById } from "../user/user.service";

// Get all user notes
export const getUserNotes = async (id: number) => {
  return await prisma.note.findMany({
    where: { ownerId: id },
    orderBy: { id: "desc" },
  });
};

// Create user note
export const createUserNote = async (data: Notes) => {
  const user = await findUserById(data.ownerId);
  if (!user) throw new Error("User not found");

  return await prisma.note.create({
    data: {
      title: data.title,
      ownerId: data.ownerId,
      content: data.content,
    },
  });
};

// Get a single note by its ID
export const getNoteById = async (id: number) => {
  return await prisma.note.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      ownerId: true,
      owner: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
};

// Update a user note
export const updateNoteWithId = async (
  id: number,
  ownerId: number,
  data: Partial<Notes>
) => {
  const note = await prisma.note.findUnique({
    where: { id },
    select: { ownerId: true, owner: true },
  });
  if (!note) throw new Error("Note not found");

  if (note.ownerId !== ownerId) throw new Error("Not authorized");

  return await prisma.note.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.content !== undefined && { content: data.content }),
    },
  });
};

// Delete user note
export const deleteNoteWithId = async (id: number, ownerId: number) => {
  const note = await prisma.note.findUnique({
    where: { id },
    select: { ownerId: true },
  });
  if (!note) throw new Error("Note not found");
  if (note.ownerId !== ownerId) throw new Error("Not authorized");

  return await prisma.note.delete({
    where: { id },
  });
};
