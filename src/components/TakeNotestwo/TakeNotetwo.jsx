import React from "react";
import { Button, Input } from 'antd';
import "antd/dist/antd.css";
import "./TakeNotestwo.css"
import { ClickAwayListener } from "@mui/material";
import { AddNote } from "../../services/dataServices";
import ColorPopper from "../ColorPoper/ColorPoper"
const { TextArea } = Input;


export default function TakeNotetwo(props){
    const backToTakeNoteOne = () => {
        props.listenToTakeNote2(false)
    }
    const[noteObj, setNoteObj] = React.useState({Title:"",body:"",IsArchive:false,Color:"",userID:parseInt(localStorage.getItem("UserIdkey"))})
    const getNoteTitle= (e) => {
        setNoteObj({...noteObj,Title:e.target.value});   
    }
    const getNoteBody= (e) => {
        setNoteObj({...noteObj,body:e.target.value});
    }
    const archivetoggle = () => {
        setNoteObj({...noteObj,IsArchive:!noteObj.IsArchive})
    }
    
    const AddNewNote = () => {
        console.log(noteObj)
        AddNote(noteObj).then((response)=>{
            props.listenToTakeNote2(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        
        <div className="main_content" >
            <ClickAwayListener onClickAway={backToTakeNoteOne}>
        <div className="takeNote2" style={{backgroundColor:noteObj.Color}}>
            <div className="titleSection">
                <input type='text' className="takenotetwo" placeholder="Title" onChange={getNoteTitle}/>
                <img className="pinImage greyBG" src="https://img.icons8.com/material-outlined/24/000000/pin.png"/>
            </div>

            <div className="noteBody">
                <textarea className="takenotetwo" placeholder="Take a note..." autoSize onChange={getNoteBody}/>
                {/* <TextArea className="txtTitle txtBody" rows="auto" placeholder="Take a note..."></TextArea> */}
            </div>
            
            <div className="AddFunctionality">
                <div className="functions">
                    <div className="greyBG">
                        <img alt="reminder" src="https://img.icons8.com/material-outlined/24/000000/add-reminder.png"/>
                    </div>
                    <div className="greyBG">
                        <img alt="collaborator" src="https://img.icons8.com/material-outlined/24/000000/add-user-male.png"/>
                    </div>
                    <ColorPopper action="create" noteObj={noteObj} setNoteObj={setNoteObj}/>
                    <div className="greyBG">
                        <img alt="addimage" src="https://img.icons8.com/material-outlined/24/000000/image.png"/>
                    </div>
                    <div className="greyBG" onClick={archivetoggle}>
                        <img alt="archive" src="https://img.icons8.com/material-outlined/24/000000/archive.png"/>
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
                    <Button value="close" className="closebtn" onClick={AddNewNote}>close</Button>
                </div>
            </div>
        </div>
        </ClickAwayListener>
    </div>
    
    )
}