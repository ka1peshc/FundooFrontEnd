import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from '../../services/userservices';
import "./Login.css"
import "antd/dist/antd.css";
import img from '../../assets/google-text.png'
import { useHistory } from 'react-router-dom';

const emailRegex = /^[a-zA-Z0-9]+([.#_$+-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

function SignIn(){
    const [emailBorder, setEmailBorder] = React.useState("")
    const [emailErrorMsg, setEmailErrorMsg] = React.useState("")
    const [passBorder, setPassBorder] = React.useState("")
    const [passErrorMsg, setPassErrorMsg] = React.useState("")
    const [loginObj, setLoginObj] = React.useState({email:"", password:""})
    
    const takeEmail = (e) => {
        setLoginObj({...loginObj,email: e.target.value})
    }
    
    const takePassword = (e) => {
        setLoginObj({...loginObj,password:e.target.value})
    }
    let history = useHistory()
    
    const submit = () => {
        console.log("loginObj"+loginObj)
        //checking email regex
        if(emailRegex.test(loginObj.email)){
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
        if(passwordRegex.test(loginObj.password)){
            setPassBorder("")
            setPassErrorMsg("")
        }else{
            setPassBorder("1px solid red")
            setPassErrorMsg("Enter strong password")
        }

        if(emailRegex.test(loginObj.email) && passwordRegex.test(loginObj.password)){
            login(loginObj).then((response) => {
                console.log(response)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("UserIdkey",response.data.data.userID)
                history.push('/dashboard')
            }).catch((err) => {
                console.log(err);
            })
        }
        else{
            console.log("failed to login")
        }
        
    }
    return (
        <div className="bodyContainer">
            <div className="loginContainer">

                <div className='headerContainer'>
                    <div class="google">
                        {/* <img src={img} alt="" /> */}
                        <h1>Google</h1>
                    </div>
                    <div className='signinLabel'>
                        <span>Sign in</span>
                    </div>
                    <div className='txt'>
                        <span>Use your Google Account</span>
                    </div>
                </div>
                
                <div className='inputContainer'>
                    <div className='userName'>
                        <div className='txtValue'>
                            <Input onChange={takeEmail} placeholder="User name" style={{border:emailBorder}}/>
                        </div>
                        <div>
                            <small>{emailErrorMsg}</small>
                        </div>
                    </div>
                    <div className='passdiv'>
                        <div className='txtValue'>
                        <Input.Password onChange={takePassword} placeholder='password' style={{border:passBorder}}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </div>
                        <div>
                            <small>{passErrorMsg}</small>
                        </div>
                    </div>
                    <div className='forgotPass'>
                        <Button className='btnforgot'>forgot password?</Button>
                    </div>
                </div>

                <div className='NoticeContainer'>
                    <div>
                        <p>Not your computer? Use Guest mode to sign in privately.</p>
                    </div>
                    <div>
                        <a href='#'>Learn more</a>
                    </div>
                </div>
                
                <div className="btnContainer">
                    <div>
                        <Button className='btnCreateNewAccount' onClick={() => (history.push('/signup'))}>Create account</Button>
                    </div>
                    <div>
                        <Button type="primary" className='btnsignin' onClick={submit}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn