import React,{useState} from "react";
import './Login.css';
import Loginlogo from '../../Assets/loginlogo.jpg';
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
function Login(){
    const navigate = useNavigate();
    const [usrdtl,setusrdtl] = useState({
        email:'',
        password:''
    });

    async  function handleloginform(){
        try{
            if(usrdtl.email.trim()!=='' && usrdtl.password.trim()!==''){
                await signInWithEmailAndPassword(auth, usrdtl.email, usrdtl.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    if(user){
                        alert('successfully loggedin');
                        
                    }
                    navigate('/');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if(errorCode==='auth/invalid-credential'){
                        alert('you got an error!!');
                    }
                    else if(errorCode === 'auth/invalid-email') {
                        alert('you got an error...');
                    }
                    else{
                        alert('You Got An Error While Sign In');
                    }
                });
            }else{
                alert('please fill the form!!')
            }
            
        }catch(e){
            alert('you got an error')
        }
    }

    return(
        <>
            <div className="login-con">
                <div className="login-card">
                    <div>
                        <img src={Loginlogo} alt='logopic'/>
                    </div>
                    <div className="login-form">
                        <h1>Login</h1>
                        <div>
                            <h2>Email</h2>
                            <input type='email' value={usrdtl.email} onChange={(e)=>setusrdtl(prev=>({
                                ...prev,
                                email:e.target.value
                            }))}/>
                        </div>
                        <div>
                            <h2>Password</h2>
                            <input type='password' value={usrdtl.password} onChange={(e)=>setusrdtl(prev=>({
                                ...prev,
                                password:e.target.value
                            }))}/>
                        </div>
                        <button onClick={()=>handleloginform()}>Login</button>
                    </div>
                </div>
                <h2 className="register-login-btn">you don't have an account? <span onClick={()=>navigate('/register')}>Sign up</span></h2>
            </div>
        </>
    );
}

export default Login;