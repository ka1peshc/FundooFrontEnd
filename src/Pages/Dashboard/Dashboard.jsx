import React from "react";
import FundooHeader from "../../components/FundooHeader/FundooHeader";
import "./Dashboard.css"
import "antd/dist/antd.css";
import TakeNote from "../../components/TakeNotes/TakeNote";
import TakeNotetwo from "../../components/TakeNotestwo/TakeNotetwo";
import TakeNoteThree from "../../components/TakeNotethree/TakeNoteThree";
import { getNotes, getArchiveNotes, getTrashNotes } from "../../services/dataServices";
import MiniDrawer from "../../components/NavBar/NavBar"
import { withRouter } from "react-router-dom"

function Dashboard(){

    const[switchNotesContainer, setSwitchNotesContainer] = React.useState(false)
    const [noteList, setNoteList] = React.useState([])
    const [navOption, setNavOption] = React.useState("")
    
    const getNotesfn = ()=>{
        getNotes().then(response => { 
            setNoteList(response.data.data)
            console.log(response.data.data)
        }).catch(err => {
            console.error(err)
        })
    }
    const listenToUpdate = (data) => {
        console.log(data)
        if (data === true){
            getNotesfn();
        }
    }
    // archive for take note 3
    const listenToArchieve = (data) => {
        console.log(data)
        if (data === true){
            getNotesfn();
        }
    } 
    //Archive list for Nav
    const getArchiveNotesfn = ()=>{
        getArchiveNotes().then(response => { 
            setNoteList(response.data.data)
            console.log(response.data.data)
        }).catch(err => {
            console.error(err)
        })
    }
    //Trash list for Nav
    const getTrashNotesfn = () => {
        getTrashNotes().then(response => {
            setNoteList(response.data.data)
        }).catch(err => {
            console.error(err)
        })
    }
    // Call method on change of navOption
    React.useEffect(() => {
        console.log(navOption)
        if (navOption === "ArchiveNotes"){
            getArchiveNotesfn();
        }
        else if (navOption === "TrashNotes"){
            getTrashNotesfn();
        }
        else{
            getNotesfn()
        }
    }, [switchNotesContainer,navOption])

    //fetching archive  notes
    const fetchArchiveList = (data) => {
        setNavOption(data)
    }
    const fetchNoteList = (data) => {
        setNavOption(data)
    }

    const changeColorForTakeNoteThree = (data) => {
        if (data === true){
            getNotesfn();
        }
    }
    const NotesList = noteList.map(note => <TakeNoteThree noteprops={note} 
        key={note.noteId} 
        changeColorForTakeNoteThree={getNotesfn} 
        listenToArchieve={listenToArchieve}
        listenToUpdate={listenToUpdate}/>)

    // Toggle between Take note1 and take note2
    const listenToTakeNote1 = data => {
        console.log(data)
        if (data === true){
            setSwitchNotesContainer(true)
        }
        else{
            setSwitchNotesContainer(false)
        }
    }
    
    //On click of burger menu show nav
    const [navStatus, setNavStatus] = React.useState(false)
    const listenToBurger= (value) => {
        if(value == true){
            setNavStatus(true)
        }
        else{
            setNavStatus(false)
        }
    }
    
    return(    
        <div className="DB_wrapper">
            
            <header className="header">
                <FundooHeader listenToHeader= {listenToBurger} status={navStatus} />
            </header> 
            <div className="DB_MainContainer">
                <div className="DB_Drawer">
                <MiniDrawer status={navStatus} fetchArchiveList={fetchArchiveList} fetchNoteList={fetchNoteList}/>
                </div>
            
                <div className="DB_noteContainer">
                    <div className="DB_TakeNotes">
                        {switchNotesContainer ? <TakeNotetwo listenToTakeNote2={listenToTakeNote1}/> : <TakeNote listenToTakeNote1={listenToTakeNote1}/> }
                    </div> 
                    <div className="DB_DisplayNotes">
                        {NotesList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Dashboard)