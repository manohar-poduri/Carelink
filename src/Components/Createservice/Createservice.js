import React, { useContext, useEffect, useState } from "react";
import './Createservice.css';
import { createService } from "../../Docs/Docs";
import { db } from "../../firebase";
import { writeBatch } from "firebase/firestore"; 
import MyContext from '../../MyContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";

function Createservice(){
    const navigate = useNavigate();
    const sharedvalue = useContext(MyContext);
    const [open, setOpen] = useState(false);
    const batch = writeBatch(db);
    const [servicedata,setservicedata] = useState({
        servicetype:'',
        serinput:'',
        serlocation:'',
        seraddress:'',
        freetimestart:'',
        freetimeend:'',
        enddate:'',
        accepted:false,
        acceptedby:'',
        completed:false,
        feedback:'',
        comment:'',
        showotp:false,
        otp:'',
        stars:'',
        
    });

    //adding the data towards the database
    async function handlecreateservices(e){
        e.preventDefault();
        setOpen(true);
        const uuidg = uuidv4();
        try{
            if(servicedata.servicetype!=='' &&
            servicedata.serinput!=='' &&
            servicedata.serlocation!=='' &&
            servicedata.seraddress!=='' &&
            servicedata.freetimestart!=='' &&
            servicedata.freetimeend!=='' &&
            servicedata.enddate!==''
            ){
                batch.update(createService, {[uuidg]:{
                    uuidg:uuidg,
                    servicetype:servicedata.servicetype,
                    serinput:servicedata.serinput,
                    serlocation:servicedata.serlocation,
                    seraddress:servicedata.seraddress,
                    freetimestart:servicedata.freetimestart,
                    freetimeend:servicedata.freetimeend,
                    enddate:servicedata.enddate,
                    accepted:false,
                    acceptedby:'',
                    completed:false,
                    feedback:'',
                    comment:'',
                    createdby:sharedvalue.uid,
                    createdpro:sharedvalue.profiledata,
                    name:sharedvalue.profiledata.name,
                    phone:sharedvalue.profiledata.phone,
                    email:sharedvalue.profiledata.email,
                    showotp:false,
                    otp:Math.floor(Math.random() * 900) + 100,
                    stars:'',
                }}); // need to update backend with new fields
                await batch.commit();
                alert('successfully added...');
                setservicedata(prev=>({
                    ...prev,
                    servicetype:'',
                    serinput:'',
                    serlocation:'',
                    seraddress:'',
                    freetimestart:'',
                    freetimeend:'',
                    enddate:'',
                    accepted:false,
                    acceptedby:'',
                    completed:false,
                    feedback:'',
                    comment:'',
                    showotp:false,
                    otp:'',
                    stars:'',
                }))
            }else{
                alert('please fill all the fields...');
            }
        }
        catch(e){
            console.log('you got an error while adding the services..',e);
        }
        setOpen(false);
    }

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[]);
    return(
        <>
            <div className="createservice-con">
            <div className="createservice-form">
                <h1>Create Your Service</h1>
                <form>
                    <div>
                        <label>select service<span>*</span></label>
                        <select value={servicedata.servicetype} onChange={(e)=>setservicedata(prev=>({
                            ...prev,
                            servicetype:e.target.value
                        }))}>
                                <option value=''>Select Service</option>
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
                    {servicedata.servicetype!=='' && 
                    <div>
                        <label>Write Your Service<span>*</span></label>
                        <textarea type='text' value={servicedata.serinput} onChange={(e)=>setservicedata(prev=>({
                            ...prev,
                            serinput:e.target.value
                        }))}/>
                    </div>
                    }
                    

                   
                    <div>
                        <label>Location<span>*</span></label>
                        <select value={servicedata.serlocation} onChange={(e)=>setservicedata(prev=>({
                            ...prev,
                            serlocation:e.target.value
                        }))}>
                            <option value=''>Choose Location</option>
                            <option value='New York'>New York</option>
                            <option value='Philadelphia'>Philadelphia</option>
                            <option value='Los Angeles'>Los Angeles</option>
                            <option value='California'>California</option>
                            <option value='San Diego'>San Diego</option>
                        </select>
                    </div>

                    {
                        servicedata.serlocation!=='' && 
                        <div>
                            <label>address<span>*</span></label>
                            <textarea type="text" value={servicedata.seraddress} onChange={((e)=>setservicedata(prev=>({
                                ...prev,
                                seraddress:e.target.value
                            })))}/>
                        </div>
                    }
                    <div>
                        <label>free time<span>*</span></label>
                        <label>from</label>
                        <input type='time' value={servicedata.freetimestart} onChange={(e)=>setservicedata(prev=>({
                            ...prev,
                            freetimestart:e.target.value
                        }))}/>
                        <label>to</label>
                        <input type='time' value={servicedata.freetimeend} onChange={(e)=>setservicedata(prev=>({
                            ...prev,
                            freetimeend:e.target.value
                        }))}/>
                    </div>

                    <div>
                        <label>Serive End Date<span>*</span></label>
                        <input type='date' value={servicedata.enddate} onChange={(e)=>setservicedata(prev=>({
                            ...prev,
                            enddate:e.target.value
                        }))}/>
                    </div>

                    <button onClick={(e)=>handlecreateservices(e)}>Create Service</button>
                </form>
                <p className="createservices-see-services-btn">if you want to see the created services? <span onClick={()=>navigate('/showcreateservices')}>click here</span></p>
            </div>
            </div>
            <Footer/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default Createservice;