import mongoose from "mongoose";

const notes = new mongoose.Schema({
    "title" : {
        type : String,
        require : false
    },
    "content" : {
        type : String,
        require : false
    },
}, {
    timestamps : true
});

const Note = mongoose.model("Notes", notes);

export default Note;