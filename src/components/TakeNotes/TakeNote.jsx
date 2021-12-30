import React from "react";
import { Input } from 'antd';
import "antd/dist/antd.css";
import "./TakeNotes.css";

export default function TakeNote(props){
    const changeToTakeNote2 = () => {
        console.log(props)
        props.listenToTakeNote1(true)
    }
    return (
        <div className="main_content">
        <div className="takeNote" onClick={changeToTakeNote2}>
            <div className="txtTitle">
            <input placeholder="Take a note..." className="txtTitle" />
            </div>
            <div className="arrange">
                <i className="fa fa-check-square"></i>
            </div>
            <div className="arrange">
                <i className="fa fa-paint-brush"></i>
            </div>
            <div className="arrange">
                <i className="fa fa-image"></i>
            </div>
        </div>
        
    </div>
    )
}