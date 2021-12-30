import React from "react"
import { Input } from 'antd';

import "antd/dist/antd.css";
import "./FundooHeader.css"
import { Route, Redirect, useHistory } from 'react-router-dom'

export default function FundooHeader(props){
    //toggle logic
    const listenToBurger = () => {
        if(props.status == false){
            props.listenToHeader(true)
        }
        else{
            props.listenToHeader(false)
        }
    }
    let history = useHistory();
    const logout = () => {
        localStorage.clear();
        history.push("/")
    }
    return(
        <div className="header_container">
            <div className="left_side">
                <div className="navigation" onClick={listenToBurger}>
                    <i className="fa fa-bars"></i>
                </div>
                <div className="logo">
                    <img className="imageSize" alt="Nav" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"/>
                    <a href="#" style={{textDecoration:'none'}}><span>Keep</span></a>
                </div>
                
            </div>
            <div className="search_side">
                <div className="box">
                        <i className="fa fa-search" ></i>
                        <Input placeholder="Search" className="txtSearch"></Input>
                        <i className="fa fa-times"></i>
                </div>
            </div>
            <div className="setting">
                <div className="refresh mr-5p">
                    <img className="imageSize" alt="Refresh" src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"/>
                </div>
                <div className="settingIcon mr-5p">
                    <img className="imageSize" alt="settingIcon" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-setting-basic-ui-elements-flatart-icons-outline-flatarticons.png"/>
                </div>
                <div className="displayNote mr-5p">
                    <img className="imageSize" alt="displayNote" src="https://img.icons8.com/android/24/000000/stack.png"/>
                </div>
                
            </div>
            <div className="login">
                <div className="otherApps mr-5p">
                    <img className="imageSize" alt="otherAppsGrid" src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-grid-alignment-and-tools-kiranshastry-lineal-kiranshastry.png"/>
                </div>
                <div className="profileImage mr-5p" onClick={logout}>
                    <img className="imageSize" alt="profileImage" src="https://img.icons8.com/ultraviolet/24/000000/user-male-circle.png"/>
                </div>
            </div>
        </div>
    )
}
