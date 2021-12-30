import React from "react";
import { Button, Input, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { reg } from "../../services/registerServices";
import "./Signup.css"
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";


function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const nameRegex = /^[A-Z]{1}[a-z]{2,}$/
  const emailRegex = /^[a-zA-Z0-9]+([.#_$+-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/


function SignUp(){
    const [firstNameBorder, setFirstNameBorder] = React.useState("")
    const [firstNameMsg, setFirstNameMsg] = React.useState("")

    const [lastNameBorder, setLastNameBorder] = React.useState("")
    const [lastNameMsg, setLastNameMsg] = React.useState("")

    const [emailBorder, setEmailBorder] = React.useState("")
    const [emailErrorMsg, setEmailErrorMsg] = React.useState("")
    const [passBorder, setPassBorder] = React.useState("")
    const [passErrorMsg, setPassErrorMsg] = React.useState("")
    const [signupObj, setSignupObj] = React.useState({FirstName:"",LastName:"",Email:"",Password:""})

    const takeFirstName = (e) => {
        setSignupObj({...signupObj,FirstName:e.target.value})
    }
    const takeLastName = (e) => {
        setSignupObj({...signupObj,LastName:e.target.value})
    }
    const takeEmail = (e) => {
        setSignupObj({...signupObj,Email: e.target.value})
    }
    
    const takePassword = (e) => {
        setSignupObj({...signupObj,Password:e.target.value})
    }

    const submitUserData = () => {
        if(nameRegex.test(signupObj.FirstName)){
            setFirstNameBorder("")
            setFirstNameMsg("")
        }else{
            setFirstNameBorder("1px solid red")
            setFirstNameMsg("Fill first name")
        }

        if(nameRegex.test(signupObj.LastName)){
            setLastNameBorder("")
            setLastNameMsg("")
        }else{
            setLastNameBorder("1px solid red")
            setLastNameMsg("Fill last name")
        }

        if(emailRegex.test(signupObj.Email)){
            console.log(true)
            setEmailBorder("")
            setEmailErrorMsg("")
        }
        else{
            console.log(false)
            setEmailBorder("1px solid red")
            setEmailErrorMsg("Enter correct email")
        }
        // checking password regex
        if(passwordRegex.test(signupObj.Password)){
            setPassBorder("")
            setPassErrorMsg("")
        }else{
            setPassBorder("1px solid red")
            setPassErrorMsg("Enter strong password")
        }

        if(nameRegex.test(signupObj.FirstName) && nameRegex.test(signupObj.LastName) && emailRegex.test(signupObj.Email) && passBorder.test(signupObj.Password)){
            reg(signupObj).then((response)=>{
                console.log(response)
            }).catch((err) => {
                console.log(err);
            })
        }
        
    }
    let history = useHistory()

    return (
        <div className="bodyContainer">
            <div className="mainSignupContainer">
                <div className="signupContainer">

                    <div className="Header">
                        <div className="googleLogo">
                            <h1>Google</h1>
                        </div>
                        <div>
                            <h1>Create your Google Account</h1>
                        </div>
                    </div>
                    <div className="nameErrorContainer">
                    <div className="nameContainer">
                        <div className='userName'>
                            <Input placeholder="First name" className='txtValue' onChange={takeFirstName} style={{border:firstNameBorder}}/>
                        </div>
                        <div className='userName'>
                            <Input placeholder="Last name" className='txtValue' onChange={takeLastName} style={{border:lastNameBorder}}/>
                        </div>
                    </div>
                    <div className="nameErrorMsg">
                        <small className="errorMsg">{firstNameMsg}  {lastNameMsg}</small>
                    </div>
                    </div>
                    
                    
                    <div className="emailContainer">
                        <div className="emailTextbox">
                            <Input placeholder="Username" className="txtEmail" onChange={takeEmail} style={{border:emailBorder}}/>
                        </div>
                        <div>
                            <small className="errorMsg">{emailErrorMsg}</small>
                        </div>
                        <div>
                            <small>You can use letters, numbers and periods</small>
                        </div>
                        <div>
                            <Button className="emailBtn">Use my current email address insted</Button>
                        </div>
                    </div>
                    
                    
                    
                    <div className="passwordContainer">
                        <div className="password">
                            <div className="userName">
                            <Input.Password placeholder='password' onChange={takePassword} style={{border:passBorder}} 
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            </div>
                            <div className="userName">
                            <Input.Password placeholder='password' onChange={takePassword} style={{border:passBorder}} 
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            </div>
                        </div>
                        <div>
                        <small className="errorMsg">{passErrorMsg}</small>
                        </div>
                        <div className="passwordNote">
                            <small>Use 8 or more characters with a mix of letters, numbers and symbols</small>
                        </div>
                        <div className="showCheckbox">
                            <Checkbox onChange={onChange}>Show password</Checkbox>
                        </div>
                    </div>
                    
                    

                    <div className="btnContainer">
                        <div className="signin">
                            <Button className="signinbtn" onClick={() => (history.push('/'))}>Sign in insted</Button>
                        </div>
                        <div className="nextbtn">
                            <Button className="nextbtn" type="primary" onClick={submitUserData}>Next</Button>
                        </div>
                    </div>

                </div>



                <div className="imageContainer">
                    <div className="googleImage">
                        <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"></img>
                    </div>
                    <div>
                        <h3>One account. All of Google<br></br>working for you.</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp