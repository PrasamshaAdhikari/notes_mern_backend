import { Note } from "../models/note.model.js"

// CRUD
export const handleCreateNote=async (req,res)=> {
    try{
        const data= req.body
        const user=req.user

        const newNote=await Note.create({
            content: data.content,
            title:data.title,
            user: user._id
        })
            return res.json({
                message:"Note created", 
                data: newNote
            })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const handleEditNote = async (req, res) => {
    try {
    const user = req.user;
    const data = req.body;
    const { id } = req.params;

    const updatedNote = await Note.findOneAndUpdate(
        { _id: id, user: user._id },
        data,
      { new: true } // returns updated note
    );

    if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ message: "Note updated", data: updatedNote });
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    }
};


export const handleGetMyNotes=async (req,res)=> {
    try{
        const user=req.user

        const notes= await Note.find({
            user: user.id
        }).sort({
            createdAt : -1
        })
            return res.json({
                message:"All Notes", 
                data: notes
            })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const handleDeleteNote=async (req,res)=> {
    try{
        const user=req.user
        const {id}= req.params

        const notes= await Note.findOneAndDelete({
            user: user.id,
            _id:id
        })

        if(!notes){
            return res.status(400).json({
                message: "Note not found"
            })
        }
            return res.json({
                message:"Note deleted", 
            })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const handleGetMyNotesById=async (req,res)=> {
    try{
        const user=req.user
        const {id}= req.params

        const note= await Note.findOne({
            user: user.id,
            _id : id
        })
        if(!note){
            return res.status(404).json({
                message: "Note not found."
            })
        }
            return res.json({
                message:"Note fetched successfully", 
                data: note
            })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}