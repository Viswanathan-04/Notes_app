import express from "express";
import Note from "../model/notes.model.js";
import { addNote, deleteNote, updateNote, getAllNotes, getNote } from "./controller.js";

const router = express.Router();

router.post("/", addNote);
router.delete("/:id", deleteNote);
router.get("/:id", getNote);
router.get("/", getAllNotes);
router.put("/:id", updateNote);


export default router;