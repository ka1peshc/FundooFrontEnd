import React from "react";
import ColorPopper from "../ColorPoper/ColorPoper";
import { ClickAwayListener } from "@mui/material";
import "./TakeNoteThree.css"
import Modal from '@mui/material/Modal';
import {updateNoteAPICall, getArchiveNotesTNT} from "../../services/dataServices"
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';


export default function TakeNoteThree({noteprops,changeColorForTakeNoteThree,listenToArchieve,listenToUpdate}){
    // Model component state hook with open and close method
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    
    // Update note hook
    const[updateNoteObj, setUpdateNoteObj] = React.useState({NoteId:noteprops.noteId,
        Title:noteprops.title,
        body:noteprops.body,
        IsArchive:noteprops.IsArchive,
        Color:noteprops.color,
        userID:parseInt(localStorage.getItem("UserIdkey"))})
    // API call for update note    
    const updateNoteCall = () => {
        
        updateNoteAPICall(updateNoteObj).then((response)=>{
            listenToUpdate(true)
            setOpen(false);
        }).catch((err)=>{
            console.log(err)
        })
    }
    //API to update Archive state
    const updateArchive= () => {
        console.log(noteprops.noteId)
        getArchiveNotesTNT(noteprops.noteId).then((response)=>{
            console.log(response)
            listenToArchieve(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    // Get event from tag
    const getNoteTitle= (e) => {
        setUpdateNoteObj({...updateNoteObj,Title:e.target.value});   
    }
    const getNoteBody= (e) => {
        setUpdateNoteObj({...updateNoteObj,body:e.target.value});
    }

    const getNoteColor = (e) => {
        console.log("color"+e.target.id)
        //setUpdateNoteObj({...updateNoteObj,Color:v_noteId});
    }
    
    //color change event
    const talktotakeNoteThree = (data) => {
        if (data === true){
            changeColorForTakeNoteThree(true);
        }
    }

    return (
            <div className="NoteContainer" style={{backgroundColor:noteprops.color}}>
                <div className="NoteTitle" onClick={handleOpen}>
                    {noteprops.title}
                    <img className="pinImage greyBG" src="https://img.icons8.com/material-outlined/24/000000/pin.png"/>
                </div>

                <div className="NoteBody" onClick={handleOpen}>
                    {noteprops.body}
                </div>
                <div className="NoteThreeContainer">
                    <div className="tntNoteOptions">
                        <div className="greyBG">
                            <img alt="reminder" src="https://img.icons8.com/material-outlined/24/000000/add-reminder.png"/>
                        </div>
                        <div className="greyBG">
                            <img alt="collaborator" src="https://img.icons8.com/material-outlined/24/000000/add-user-male.png"/>
                        </div>
                        <div className="greyBG">
                            <ColorPopper action="update" 
                            v_noteId={noteprops.noteId} 
                            onClick={getNoteColor} 
                            talktotakeNoteThree={talktotakeNoteThree}/>
                        </div>
                        <div className="greyBG">
                            <img alt="addimage" src="https://img.icons8.com/material-outlined/24/000000/image.png"/>
                        </div>
                        <div className="greyBG" onClick={updateArchive}>
                            <ArchiveOutlinedIcon />
                        </div>
                    </div>
                    
                </div>
                <Modal
                open={open}
                onClose={handleClose}
                >
                <div className="Model-takeNote2 takeNote2" style={{backgroundColor:noteprops.color}}>
                    <div className="titleSection">
                        <input type='text' 
                            className="takenotetwo" 
                            placeholder="Title" 
                            onChange={getNoteTitle} 
                            defaultValue={noteprops.title}
                        />
                        <img className="pinImage greyBG" src="https://img.icons8.com/material-outlined/24/000000/pin.png" alt="Pin image"/>
                    </div>

                    <div className="noteBody">
                        <textarea 
                            className="takenotetwo" 
                            placeholder="Take a note..." 
                            autoSize onChange={getNoteBody} 
                            defaultValue={noteprops.body}
                        />
                    </div>
                    
                    <div className="AddFunctionality">
                        <div className="functions">
                            <div className="greyBG">
                                <img alt="reminder" src="https://img.icons8.com/material-outlined/24/000000/add-reminder.png"/>
                            </div>
                            <div className="greyBG">
                                <img alt="collaborator" src="https://img.icons8.com/material-outlined/24/000000/add-user-male.png"/>
                            </div>
                            <div className="greyBG">
                            <ColorPopper 
                                action="update" 
                                v_noteId={noteprops.noteId} 
                                onClick={getNoteColor} 
                                talktotakeNoteThree={talktotakeNoteThree}/>
                            </div>
                            <div className="greyBG">
                                <img alt="addimage" src="https://img.icons8.com/material-outlined/24/000000/image.png"/>
                            </div>
                            <div className="greyBG" onClick={updateArchive}>
                                <ArchiveOutlinedIcon />
                            </div>
                            <div className="greyBG">
                                <img alt="options" src="https://img.icons8.com/material-outlined/24/000000/menu-2.png"/>
                            </div>
                            <div className="greyBG">
                                <img alt="undo" src="https://img.icons8.com/material-outlined/24/000000/undo.png"/>
                            </div>
                            <div className="greyBG">
                                <img alt="redo" src="https://img.icons8.com/material-outlined/24/000000/redo.png"/>
                            </div>
                        </div>
                        <div className="clossButton">
                            <button value="close" className="closebtn" onClick={updateNoteCall}>close</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>//main container closing
    )
}