import axios from 'axios'

let config = {
    headers:{
        Authorization:"Bearer" +" "+ localStorage.getItem("token")
    }
}

export const AddNote = async (obj) => {
    let response = await axios.post("https://localhost:44394/api/createnote",obj,config)
    return response
}

export const getNotes = async() =>{
    let response = await axios.get(`https://localhost:44394/api/getAllNotes?userid=${parseInt(localStorage.getItem("UserIdkey"))}`, config)
    return response
}

export const updateColor = async(obj) => {
    let response = await axios.put(`https://localhost:44394/api/editColor?noteId=${parseInt(obj.noteId)}&noteColor=${obj.color}`,config)
    return response
}

export const updateNoteAPICall = async(obj) => {
    let response = await axios.put("https://localhost:44394/api/editnote",obj,config);
    return response
}

export const getArchiveNotes = async() =>{
    let response = await axios.get(`https://localhost:44394/api/getArchiveNotes?userid=${parseInt(localStorage.getItem("UserIdkey"))}`, config)
    return response
}

export const getTrashNotes = async() =>{
    let response = await axios.get(`https://localhost:44394/api/getTrashNotes?userid=${parseInt(localStorage.getItem("UserIdkey"))}`, config)
    return response
}

export const getArchiveNotesTNT = async(obj) =>{
    let response = await axios.put(`https://localhost:44394/api/editIsArchive?noteId=${obj}`, config)
    return response
}