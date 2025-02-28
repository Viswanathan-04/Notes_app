import Note from "../model/notes.model.js";

export const addNote = async (req, res) => {
    const data = req.body;
    console.log(data);
    const newNote = new Note(data);
    try {
        await newNote.save();
        console.log("Note added")
        return res.status(200).json({"success" : true, "message" : "Note added" })
    }
    catch (error) {
        console.log("Note not added")
        return res.status(500).json({"success" : false, "message" : "Error adding Note"})
    }
}

export const deleteNote = async (req, res) => {
    const {id} = req.params;
    try {
         await Note.findByIdAndDelete(id);
         return res.status(200).json({"success" : true, "message" : "Note deleted" })
    }
    catch (error) {
        return res.status(404).json({"success" : false, "message" : "Note not found" })
    }
}

export const getNote = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await Note.findById(id);
        return res.status(200).json({"success" : true, "data" : data });
    }
    catch (error) {
        return res.status(404).json({"success" : false, "message" : "Note not found" })
    }
}

export const getAllNotes = async (req, res) => {
    try{
        const data = await Note.find({});
        return res.status(200).json({"success" : true, "data" : data });
    }
    catch (error) {
        return res.status(404).json({"success" : false, "message" : "Notes not found" })
    }
}

export const updateNote = async (req, res) => {
    const {id} = req.params;
    try{
        const new_data = req.body;
        const data = await Note.findByIdAndUpdate(id, new_data); 
        return res.status(200).json({"success" : true, "message" : "Note Updated", "data" : new_data });
    }
    catch (error) {
        return res.status(200).json({"success" : false, "message" : "Note not updated" });
    }
}