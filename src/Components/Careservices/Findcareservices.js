import React, { useContext,  useState } from "react";
import './Findcareservices.css';
import { Typewriter } from 'react-simple-typewriter'
import MyContext from "../../MyContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from "../Footer/Footer";
import { careservices } from "../../Docs/Docs";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { writeBatch } from "firebase/firestore";
import { db } from "../../firebase";

function Findcareservices(){
    const sharedvalue = useContext(MyContext);
    //filter 
    const[chooselocation,setchooselocation] = useState('');
    const[chooseservicetype,setchooseservicetype] = useState('');
    const [open, setOpen] = useState(false);
    const batch = writeBatch(db);
    //adding the interest 
    async function interestedaddingfunction(itemid){
        setOpen(true);
        try{
            if(sharedvalue.allcareservices[itemid].interestedby.filter(item=>item.email===sharedvalue.profiledata.email).length===0){
                batch.update(careservices,{[itemid]:{
                    ...sharedvalue.allcareservices[itemid],
                    interestedby:[...sharedvalue.allcareservices[itemid].interestedby,sharedvalue.profiledata]
                }});
            }else{
                batch.update(careservices,{[itemid]:{
                    ...sharedvalue.allcareservices[itemid],
                    interestedby:sharedvalue.allcareservices[itemid].interestedby.filter(item=>(item.email!==sharedvalue.profiledata.email))
                }});
            }
            
            await batch.commit();
        }catch(e){
            console.log('you got an error while adding ...',e);
        }
        setOpen(false);
    }
    // useEffect(()=>{
    //     window.scrollTo({top:0,behavior:'instant'});
    // })
    return(
        <>
            <div className="find-care-services-banner">
                <div>
                    <h1>Discover Experienced Caretakers on Our Find Caretakers Page</h1>
                    <p>Explore our Find Caretakers page for a diverse selection of skilled professionals 
                        ready to provide personalized support, empowering older adults with seamless connections 
                        for their care needs.</p>
                    <h2>
                    <Typewriter
                        words={['Personalized assistance available.', 'Seamless connections for seniors.', 'Professional care for elders.']}
                        loop={0}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                    </h2>
                </div>
            </div>
            <div className="findcareservices-con">
                <div className="findcareservices-display-div">

                    <div className="findcare-serv-header">
                        <h1>Find care Services...</h1>
                    </div>

                    {sharedvalue.allserviceskeys.length>0 && sharedvalue.allcareserkeys.length>0 &&
                        sharedvalue.allcareserkeys
                        .filter(item=>(sharedvalue.allcareservices[item].carelocat.includes(chooselocation)))
                        .filter(item=>(sharedvalue.allcareservices[item].careservtype.includes(chooseservicetype)))
                        .map((item,idx)=>(
                            <div key={idx} className="findcareservice-each-display">
                                <div className="findcareservice-each-display-first">
                                    <div className="findcareservice-each-display-first-first">
                                        <AccountCircleIcon fontSize="large"/>
                                        <div>
                                            <h1>{sharedvalue.allcareservices[item].createdby.name}</h1>
                                            <p>{sharedvalue.allcareservices[item].carelocat}</p>
                                        </div>
                                    </div>
                                    <div className="findcareservice-each-display-first-second">
                                        <p>salary expecting: <span>${sharedvalue.allcareservices[item].careslyexp}</span></p>
                                    </div>
                                </div>
                                <div className="findcareservice-each-display-second">
                                    <div className="findcareservice-each-display-second-first">
                                        <h2>{sharedvalue.allcareservices[item].careyourserv}</h2>
                                        <p>{sharedvalue.allcareservices[item].careservtype}</p>
                                        <h3>
                                            {sharedvalue.allcareservices[item].careservdes}
                                        </h3>
                                    </div>
                                    <div className="findcareservice-each-display-second-second">
                                            <p>likes | {sharedvalue.allcareservices[item].interestedby.length}</p>
                                        {sharedvalue.allcareservices[item].interestedby.filter(item=>item.email===sharedvalue.profiledata.email).length!==0?<h2 onClick={()=>interestedaddingfunction(item)}>not interested</h2>:<button onClick={()=>interestedaddingfunction(item)}>interest</button>}
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    

                </div>
                <div className="findcare-services-filter-box">
                    <p>Filter</p>
                    <div>
                        <label>Location</label>
                        <select value={chooselocation} onChange={(e)=>setchooselocation(e.target.value)}>
                                <option value=''>Choose Location</option>
                                <option value='New York'>New York</option>
                                <option value='Philadelphia'>Philadelphia</option>
                                <option value='Los Angeles'>Los Angeles</option>
                                <option value='California'>California</option>
                                <option value='San Diego'>San Diego</option>
                        </select>
                    </div>
                    <div>
                        <label>Select Service type</label>
                        <select value={chooseservicetype} onChange={(e)=>setchooseservicetype(e.target.value)}>
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

export default Findcareservices;