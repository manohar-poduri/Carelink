import React, { useEffect,useContext ,useState} from 'react';
import './ShowAcceptedServices.css';
import MyContext from '../../MyContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from '../Footer/Footer';
// import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../firebase';
import {writeBatch} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { createService } from '../../Docs/Docs';

function ShowAcceptedServices(){
    // const navigate = useNavigate();
    const sharedvalue = useContext(MyContext);
    const batch = writeBatch(db);//get a new write batch
    const [showloading,setshowloading] = useState(false);
    const [blurwholecon,setblurwholecon] = useState(false);
    const [compopupdata,setcompopupdata] = useState({
        active:false,
        servid:'',
        otp:''
    })

    async function handlecancleservice(serviceid){
        setshowloading(true);
        try{
            await updateDoc(createService,{
                [serviceid]:{
                    ...sharedvalue.allservices[serviceid],
                    accepted:false,
                    acceptedby:''
                }
            });
            await batch.commit();
        }catch(e){
            console.log('you got an error while deleting the quotation',e);
        }
         setshowloading(false);
    }
    //function handle show password
    async function handleshowpassword(item){
        setshowloading(true);
        try{
            if(sharedvalue.allservices[item].showotp===false){
                await updateDoc(createService,{
                    [item]:{
                        ...sharedvalue.allservices[item],
                        showotp:true
                    }
                });
                await batch.commit();
            }
        }catch(e){
            console.log('you got an error send the otp...',e);
            alert('you got an error while sending otp');
        }
        setshowloading(false);
    }
    //function handling the submit button
    async function handlecompletedsubmitbtn(item){
        setshowloading(true);
        try{
            if(Number(sharedvalue.allservices[item].otp)===Number(compopupdata.otp)){
                await updateDoc(createService,{
                    [item]:{
                        ...sharedvalue.allservices[item],
                        completed:true
                    }
                });
                await batch.commit();
                setcompopupdata(prev=>({
                    ...prev,
                    active:false,
                    servid:'',
                    otp:''
                }));
                setblurwholecon(false);
            }else{
                alert('incorrect otp...');
            }
        }catch(e){
            console.log('you got an error send the otp...',e);
            alert('you got an error while sending otp');
        }
        setshowloading(false);
    }
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'instant'});
    },[]);
    return(
        <>
            <div className={blurwholecon===true?'showacceptedservice-inactive':''}>
                <div className='show-accepted-services-banner'>
                    <div>
                        <h1>See Generosity in Action</h1>
                        <p>Welcome to a World of Generosity! Explore Free Services Created with Care by a Wise Elder. See How Small Acts of Kindness Can Have a Big Impact. Join Us in Celebrating the Joy of Giving Back!</p>
                    </div>
                </div>
                <div className='showaccepted-services-header'>
                    <h1>Accepted services...</h1>
                </div>
                <div className="show-services-con">
                    <div className="services-divs">
                        <div className="show-services-divs-one">
                            {/* allservices values wil come here... */}
                            {

                                sharedvalue.allserviceskeys.filter(item=>(sharedvalue.allservices[item].accepted===true && sharedvalue.allservices[item].acceptedby.email===sharedvalue.profiledata.email))
                                .filter(item=>sharedvalue.allservices[item].completed===false)
                                .length>0?
                                <div className="allservices-all-services">
                                {sharedvalue.allserviceskeys
                                .filter(item=>(sharedvalue.allservices[item].accepted===true && sharedvalue.allservices[item].acceptedby.email===sharedvalue.profiledata.email))
                                .filter(item=>sharedvalue.allservices[item].completed===false)
                                .map((item,idx)=>(
                                    <div className="allservices-each-div" key={idx}>

                                        <div className="service-card-first-header">
                                            <div className="servies-card-top-header">
                                                <AccountCircleIcon fontSize="large" sx={{color:'gray'}}/>
                                                <div>
                                                    <h1>{sharedvalue.allservices[item].name}</h1>
                                                    <p><span>Location:</span> {sharedvalue.allservices[item].serlocation}</p>
                                                    <p><span>Address:</span> {sharedvalue.allservices[item].seraddress}</p>
                                                </div>
                                            </div>
                                            <div className="showacceptedbtn-completed">
                                                <button onClick={()=>{
                                                    setblurwholecon(true);
                                                    setcompopupdata(prev=>({
                                                        ...prev,
                                                        active:true,
                                                        servid:item
                                                    }));
                                                    handleshowpassword(item);
                                                }}>Completed</button>
                                            </div>
                                        </div>
                                        <div className="required-services-first">
                                            <h1>Required Service</h1>
                                            <p>{sharedvalue.allservices[item].serinput}</p>
                                        </div>

                                        <div className="services-freetime-enddate">
                                            <p><span>email: </span>{sharedvalue.allservices[item].createdpro.email}</p>
                                            <p><span>phone: </span>{sharedvalue.allservices[item].createdpro.phone}</p>
                                        </div>

                                        <div className="services-freetime-enddate">
                                            <p><span>Free-Time: </span>{sharedvalue.allservices[item].freetimestart} - {sharedvalue.allservices[item].freetimeend}</p>
                                            <p><span>enddate: </span>{sharedvalue.allservices[item].enddate}</p>
                                        </div>

                                        {
                                            sharedvalue.allservices[item].accepted===true &&
                                            <div className='sc-ser-acceptedby-profile'>
                                                <h1>Service Accepted By..</h1>
                                                <div className='sc-ser-aptd-pro-div1'>
                                                    <AccountCircleIcon fontSize='large' sx={{color:'gray'}}/>
                                                    <div>
                                                        <h1>{sharedvalue.allservices[item].acceptedby.name}</h1>
                                                        <p>{sharedvalue.allservices[item].acceptedby.address}</p>
                                                    </div>
                                                </div>
                                                <div className='sc-ser-aptd-pro-div2'>
                                                    <div>
                                                        <p>email: <span>{sharedvalue.allservices[item].acceptedby.email}</span></p>
                                                        <p>mobile: <span>{sharedvalue.allservices[item].acceptedby.phone}</span></p>
                                                        {sharedvalue.allservices[item].acceptedby.showotp===true && <p>otp: <span>{sharedvalue.allservices[item].acceptedby.otp}</span></p>}
                                                    </div>
                                                    <button onClick={()=>handlecancleservice(item)}>Cancle</button>
                                                </div>
                                            </div>
                                        }
                                        <div className='services-acceptedby-show-to-sc'>

                                        </div>
                                    </div>
                                ))}
                                </div>
                                :
                                <div>
                                    <h1>No services For Now</h1>
                                </div>
                                }
                        </div>
                    </div>
                    <div className='show-services-after'>
                        <h1>Services Provided ....</h1>
                        {
                            sharedvalue.allserviceskeys.filter(item=>(sharedvalue.allservices[item].accepted===true && sharedvalue.allservices[item].acceptedby.email===sharedvalue.profiledata.email))
                            .filter(item=>sharedvalue.allservices[item].completed===true)
                            .length>0?
                            <div className="allservices-all-services">
                            {sharedvalue.allserviceskeys
                            .filter(item=>(sharedvalue.allservices[item].accepted===true && sharedvalue.allservices[item].acceptedby.email===sharedvalue.profiledata.email))
                            .filter(item=>sharedvalue.allservices[item].completed===true)
                            .map((item,idx)=>(
                                <div className="show-all-accepted-servces-each-div" key={idx}>

                                    <div className="service-card-first-header">
                                        <div className="servies-card-top-header">
                                            <AccountCircleIcon fontSize="large" sx={{color:'gray'}}/>
                                            <div>
                                                <h1>{sharedvalue.allservices[item].name}</h1>
                                                <p><span>Location:</span> {sharedvalue.allservices[item].serlocation}</p>
                                                <p><span>Address:</span> {sharedvalue.allservices[item].seraddress}</p>
                                            </div>
                                        </div>
                                        <div className='successfully-completed-btn'>
                                            <button>successfully Completed</button>
                                        </div>
                                    </div>
                                    <div className="required-services-first">
                                        <h1>Required Service</h1>
                                        <p>{sharedvalue.allservices[item].serinput}</p>
                                    </div>

                                    <div className="services-freetime-enddate">
                                        <p><span>email: </span>{sharedvalue.allservices[item].createdpro.email}</p>
                                        <p><span>phone: </span>{sharedvalue.allservices[item].createdpro.phone}</p>
                                    </div>

                                    <div className="services-freetime-enddate">
                                        <p><span>Free-Time: </span>{sharedvalue.allservices[item].freetimestart} - {sharedvalue.allservices[item].freetimeend}</p>
                                        <p><span>enddate: </span>{sharedvalue.allservices[item].enddate}</p>
                                    </div>

                                    {sharedvalue.allservices[item].stars!=='' &&
                                    <div>
                                     <p className='showcreated-service-stars-show'>stars:<span>{sharedvalue.allservices[item].stars}</span><span className='showcreated-service-stars-show-span'>★</span></p>
                                     <div className="services-freetime-enddate">
                                      <p><span>feedback: </span>{sharedvalue.allservices[item].feedback}</p>
                                     </div>
                                     </div>
                                     }
                                    <div className='services-acceptedby-show-to-sc'>

                                    </div>
                                </div>
                            ))}
                            </div>:
                            <div>
                                <p>Still you didn't provide any Services!!!</p>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
            {/* complete popup card */}
            <div className={compopupdata.active===true?'show-accepted-compopup-active':'show-accepted-compopup-inactive'}>
                <div className='show-accpt-popup-close'>
                    <h3  onClick={()=>{
                        setcompopupdata(prev=>({
                        ...prev,
                        active:false
                        }));
                        setblurwholecon(false);
                    }}>X</h3>
                </div>
                
                <h1>Complete the service</h1>
                <p>please enter the otp</p>
                <input type='text' value={compopupdata.otp} onChange={(e)=>setcompopupdata(prev=>({
                    ...prev,
                    otp:e.target.value
                }))}/>
                <button onClick={()=>handlecompletedsubmitbtn(compopupdata.servid)}>Submit</button>
                
                
            </div>

             {/* here ia the back drop */}
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showloading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <Footer/>
        </>
    );
}

export default ShowAcceptedServices;