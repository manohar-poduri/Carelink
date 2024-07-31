import React, { useState } from 'react';
import './Register.css';
import Loginlogo from '../../Assets/loginlogo.jpg';
import { useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

function Register(){
    const navigate = useNavigate();
    const [scregform,setscregform] = useState({ //senior citizen
        role:'',
        email:'',
        password:'',
        cnfpassword:'',
        address:'',
        phone:'',
        location:'',
        healthcon:'',
        name:''
    });
    const [spregf,setspregf] = useState({ // service provider
        email:'',
        password:'',
        cnfpassword:'',
        address:'',
        phone:'',
        sertype:'',
        name:'',
    });

    const [ctreg,setctreg] = useState({ //care taker
        email:'',
        password:'',
        cnfpassword:'',
        address:'',
        phone:'',
        name:''
    })

    // Register function for senior citizen
    async function handleseniorcitizen(){
        try{
            if(scregform.role!=='' && scregform.email!=='' && scregform.password!=='' && scregform.password===scregform.cnfpassword &&
             scregform.address!=='' && scregform.phone.length>=5){
                const userCredential = await createUserWithEmailAndPassword(auth, scregform.email, scregform.password);
                    console.log(userCredential);
                    if(userCredential){
                        await setDoc(doc(db,'users',userCredential.user.uid),{
                            role:scregform.role,
                            email:scregform.email,
                            password:scregform.password,
                            address:scregform.address,
                            phone:scregform.phone,
                            name:scregform.name,
                            imgurl:'',
                            stars:0,
                            reviews:0
                        });
                    }
                navigate('/');
            }else{
                alert('please provide the valied info');
            }
        }catch(e){
            console.error('you got an error while registring ',e);
            alert('you an error');
        }
    }
    // Register function for service provider
    async function handleserviceprovider(){
        try{
            if(scregform.role!=='' && spregf.email!=='' && spregf.name!=='' && spregf.password!=='' && spregf.cnfpassword===spregf.password && spregf.phone.length>=5
            && spregf.address!=='' && spregf.sertype!==''){
                const userCredential = await createUserWithEmailAndPassword(auth, spregf.email, spregf.password);
                    console.log(userCredential);
                    if(userCredential){
                        await setDoc(doc(db,'users',userCredential.user.uid),{
                            role:scregform.role,
                            email:spregf.email,
                            password:spregf.password,
                            address:spregf.address,
                            phone:spregf.phone,
                            name:spregf.name,
                            sertype:spregf.sertype
                        });
                    }
                    navigate('/');
            }else{
                alert('please fill the form correctly');
            }
        }catch(e){
            console.error('you got an error while registring ',e);
            alert('you an error');
        }
    }
    // Register function for care taker
    async function handlecaretaker(){
        try{
            if(scregform.role!=='' && ctreg.email!=='' && ctreg.name!=='' && ctreg.phone!=='' && ctreg.address!=='' && ctreg.password!=='' && ctreg.cnfpassword===ctreg.password){
                const userCredential = await createUserWithEmailAndPassword(auth, ctreg.email, ctreg.password);
                    console.log(userCredential);
                    if(userCredential){
                        await setDoc(doc(db,'users',userCredential.user.uid),{
                            role:scregform.role,
                            email:ctreg.email,
                            password:ctreg.password,
                            address:ctreg.address,
                            phone:ctreg.phone,
                            name:ctreg.name,
                        });
                    }
                navigate('/');
            }else{
                alert('please fill the fields correctly');
            }
        }catch(e){
            console.error('you got an error while registring ',e);
            alert('you an error');
        }
    }
    return(
        <>
            <div className="login-con">
                <div className="login-card">
                    <div>
                        <img src={Loginlogo} alt='logopic'/>
                    </div>
                    <div className="register-form">
                        <h1>Register</h1>
                        
                        <div>
                            <label>User Type</label>
                            <select value={scregform.role} onChange={(e)=>setscregform(prev=>({
                                ...prev,
                                role:e.target.value
                            }))}>
                                <option value=''>Select User Type</option>
                                <option value='seniorcitizen'>Senior citizen</option>
                                <option value='serviceprovider'>service provider</option>
                                <option value='caretaker'>care taker</option>
                            </select>
                        </div>
                        {scregform.role==='seniorcitizen' && 
                            <div className='regform-inner-div'>
                                <div>
                                    <label>name</label>
                                    <input type='text' value={scregform.name} onChange={(e)=>setscregform(prev=>({
                                        ...prev,
                                        name:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>email</label>
                                    <input type='email' value={scregform.email} onChange={(e)=>setscregform(prev=>({
                                        ...prev,
                                        email:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>address</label>
                                    <input type='text' value={scregform.address} onChange={(e)=>setscregform(prev=>({
                                        ...prev,
                                        address:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>phone</label>
                                    <input type='number' value={scregform.phone} onChange={(e)=>setscregform(prev=>({
                                        ...prev,
                                        phone:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='password' value={scregform.password} onChange={(e)=>setscregform(prev=>({
                                        ...prev,
                                        password:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>confirm password</label>
                                    <input type='password' value={scregform.cnfpassword} onChange={(e)=>setscregform(prev=>({
                                        ...prev,
                                        cnfpassword:e.target.value
                                    }))}/>
                                </div>
                            </div>
                        }
                        {
                            scregform.role==='serviceprovider' &&
                            <div className='regform-inner-div'>
                                <div>
                                    <label>Service type</label>
                                    <select value={spregf.sertype} onChange={(e)=>setspregf(prev=>({
                                        ...prev,
                                        sertype:e.target.value
                                    }))}>
                                        <option  value=''>Select Service</option>
                                        <option value='Home Care Services'>Home Care Services</option>
                                        <option value='Health Monitoring and Management'>Health Monitoring and Management</option>
                                        <option value='Transportation Assistance'>Transportation Assistance</option>
                                        <option value='Social Engagement and Activities'>Social Engagement and Activities</option>
                                        <option value='Nutrition Planning and Meal Services'>Nutrition Planning and Meal Services</option>
                                        <option value='Home Safety Assessments and Modifications'>Home Safety Assessments and Modifications</option>
                                        <option value='Memory Care Support'>Memory Care Support</option>
                                        <option value='Pet Care Services'>Pet Care Services</option>
                                        <option value='Legal and Financial Assistance'>Legal and Financial Assistance</option>
                                        <option value='Technology Training and Support'>Technology Training and Support</option>
                                        <option value='Counseling and Mental Health Support'>Counseling and Mental Health Support</option>
                                    </select>
                                </div> 
                                <div>
                                    <label>name</label>
                                    <input type='text' value={spregf.name} onChange={(e)=>setspregf(prev=>({
                                        ...prev,
                                        name:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>email</label>
                                    <input type='email' value={spregf.email} onChange={(e)=>setspregf(prev=>({
                                        ...prev,
                                        email:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>address</label>
                                    <input type='text' value={spregf.address} onChange={(e)=>setspregf(prev=>({
                                        ...prev,
                                        address:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>phone</label>
                                    <input type='number' value={spregf.phone} onChange={(e)=>setspregf(prev=>({
                                        ...prev,
                                        phone:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='password' value={spregf.password} onChange={(e)=>setspregf(prev=>({
                                        ...prev,
                                        password:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>confirm password</label>
                                    <input type='password' value={spregf.cnfpassword} onChange={(e)=>setspregf(prev=>({
                                        ...prev,
                                        cnfpassword:e.target.value
                                    }))}/>
                                </div>
                            </div>
                        }

                        {
                            scregform.role==='caretaker' &&
                            <div className='regform-inner-div'>
                                <div>
                                    <label>name</label>
                                    <input type='text' value={ctreg.name} onChange={(e)=>setctreg(prev=>({
                                        ...prev,
                                        name:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>email</label>
                                    <input type='email' value={ctreg.email} onChange={(e)=>setctreg(prev=>({
                                        ...prev,
                                        email:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>address</label>
                                    <input type='text' value={ctreg.address} onChange={(e)=>setctreg(prev=>({
                                        ...prev,
                                        address:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>phone</label>
                                    <input type='number' value={ctreg.phone} onChange={(e)=>setctreg(prev=>({
                                        ...prev,
                                        phone:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='password' value={ctreg.password} onChange={(e)=>setctreg(prev=>({
                                        ...prev,
                                        password:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>confirm password</label>
                                    <input type='password' value={ctreg.cnfpassword} onChange={(e)=>setctreg(prev=>({
                                        ...prev,
                                        cnfpassword:e.target.value
                                    }))}/>
                                </div>
                            </div>
                        }
                        {/* <div>
                            <h2>Email</h2>
                            <input type='email'/>
                        </div>
                        <div>
                            <h2>Password</h2>
                            <input type='password'/>
                        </div> */}
                        <button onClick={scregform.role==='seniorcitizen'?()=>handleseniorcitizen():
                        scregform.role==='serviceprovider'?()=>handleserviceprovider():()=>handlecaretaker()}>Register</button>
                    </div>
                </div>
                <h2 className="register-login-btn">already you have an account? <span onClick={()=>navigate('/login')}>Sign in</span></h2>
            </div>
        </>
    );
}

export default Register;