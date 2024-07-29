import React, { useContext, useEffect, useState } from "react";
import './Services.css';
import Relphopic from '../../Assets/ralphwaldoemerson.jpg';
import charledicken from '../../Assets/CharlesDickens.jpg';
import barackobama from '../../Assets/BarackObama.jpg';
import Footer from '../Footer/Footer';
import MyContext from "../../MyContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AccessibleIcon from '@mui/icons-material/Accessible';
import servicecard1 from '../../Assets/servicescard1.jpg';
import { useNavigate } from "react-router-dom";

import Marquee from "react-fast-marquee";
import { db } from "../../firebase";
import { writeBatch } from "firebase/firestore"; 
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { updateDoc} from "firebase/firestore";
import { createService } from "../../Docs/Docs";

function Services(){
    const sharedvalue = useContext(MyContext);
    const navigate = useNavigate();
    const batch = writeBatch(db);
    const [sortlocation,setsortlocation] = useState('');
    const [showloading,setshowloading] = useState(false);


    async function handleacceptservice(serviceid){
        setshowloading(true);
        try{
            await updateDoc(createService,{
                [serviceid]:{
                    ...sharedvalue.allservices[serviceid],
                    accepted:true,
                    acceptedby:sharedvalue.profiledata
                }
            });
            await batch.commit();
        }catch(e){
            console.log('you got an error while deleting the quotation',e);
        }
         setshowloading(false);
    }
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'instant'});
    },[]);
    return(
        <>
            <div className="services-display-banner-con">
                <div className="all-services-provide-display-banner">
                    
                </div>
                <div className="all-services-provide-display-banner-two">
                    <div className="all-services-boxes-comes-here">
                        <div className="all-service-box1">
                            <div className="all-services-boxes-icon">
                                <MedicalInformationIcon/>
                            </div>
                            <p>
                            Our caregivers provide personalized help with daily activities at home, such as bathing, grooming, meal preparation, and medication reminders, ensuring comfort and support all the way.
                            </p>
                            <h2 onClick={()=>navigate('/ourservices')}>Know More{`>`}</h2>
                        </div>
                        <div className="all-service-box1">
                            <div className="all-services-boxes-icon">
                                <AccessibleIcon/>
                            </div>
                            <p>
                                Our caregivers offer personalized assistance with ADLs at home, including bathing, grooming, meal prep, and medication 
                                reminders, ensuring comfort and support throughout.
                            </p>
                            <h2 onClick={()=>navigate('/ourservices')}>Know More{`>`}</h2>
                        </div>
                        <div className="all-service-box1">
                            <img src={servicecard1} alt='golden-age-support'/>
                            <p>
                            Our caregivers deliver tailored support with daily activities at home, such as bathing, grooming, meal preparation, and medication reminders, ensuring consistent comfort and care.
                            </p>

                            <h2 onClick={()=>navigate('/ourservices')}>Know More{`>`}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="services-con">
                <div className="services-divs">
                    <div className="services-divs-one">

                        <div className="services-filter-location-con">
                            <div className="services-filter-location">
                                <label>Location</label>
                                <select value={sortlocation} onChange={(e)=>setsortlocation(e.target.value)}>
                                    <option value=''>Choose Location</option>
                                    <option value='New York'>New York</option>
                                    <option value='Philadelphia'>Philadelphia</option>
                                    <option value='Los Angeles'>Los Angeles</option>
                                    <option value='California'>California</option>
                                    <option value='San Diego'>San Diego</option>
                                </select>
                            </div>
                        </div>

                        {/* allservices values wil come here... */}
                        {

                            sharedvalue.allserviceskeys.filter(item=>(sharedvalue.allservices[item].accepted!==true)).length>0?
                            <div className="allservices-all-services">
                            {sharedvalue.allserviceskeys
                            .filter(item=>(sharedvalue.allservices[item].serlocation.includes(sortlocation)))
                            .filter(item=>(sharedvalue.allservices[item].accepted!==true))
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
                                        <div className="allservices-accept-button">
                                            <button onClick={()=>handleacceptservice(item)}>Accept</button>
                                        </div>
                                    </div>
                                    <div className="required-services-first">
                                        <h1>Required Service</h1>
                                        <p>{sharedvalue.allservices[item].serinput}</p>
                                    </div>

                                    <div className="services-freetime-enddate">
                                        <p><span>Free-Time: </span>{sharedvalue.allservices[item].freetimestart} - {sharedvalue.allservices[item].freetimeend}</p>
                                        <p><span>enddate: </span>{sharedvalue.allservices[item].enddate}</p>
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

                    <div className="services-divs-two">
                        <div className="services-message-cards">
                            <div className="servi-img-name-div">
                                <div className="services-message-cards-img">
                                    <img src={Relphopic} alt='relphopic'/>
                                </div>
                                <h1>Ralph waldo emerson</h1>
                            </div>
                            
                            <div className="services-message-cards-para">
                                <p>
                                    “The purpose of life is not to be happy. 
                                    It is to be useful, to be honorable, to be compassionate, to 
                                    have it make some difference that you have lived and lived well.”
                                </p>
                            </div>
                        </div>

                        <div className="services-message-cards">
                            <div className="servi-img-name-div">
                                <div className="services-message-cards-img">
                                    <img src={barackobama} alt='relphopic'/>
                                </div>
                                <h1>Barack Obama</h1>
                            </div>
                            
                            <div className="services-message-cards-para">
                                <p>
                                    “The best way to not feel hopeless is to get up and do something. 
                                    Don’t wait for good things to happen to you. If you go out and make some 
                                    good things happen, you will fill the world with hope, you will fill yourself with hope.”
                                </p>
                            </div>
                        </div>

                        <div className="services-message-cards">
                            <div className="servi-img-name-div">
                                <div className="services-message-cards-img">
                                    <img src={charledicken} alt='relphopic'/>
                                </div>
                                <h1>Charles Dickens</h1>
                            </div>
                            
                            <div className="services-message-cards-para">
                                <p>
                                “No one is useless in this world who lightens the burdens of another.”
                                </p>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div>

            <div className="careservices-types">
                <h1>Testimonial's</h1>
                <div>
                    <Marquee>
                        <div className="careservice-divs">
                            <h1>Personal Care</h1>
                            <p>Caretakers assist with personal hygiene tasks such as bathing, dressing, grooming, and toileting. 
                                They ensure that seniors maintain good hygiene practices and stay comfortable.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Medication Management</h1>
                            <p>Caretakers help seniors with medication reminders, ensuring they take their prescribed medicines on time 
                                and in the correct dosage as per the healthcare provider's instructions.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Mobility Support</h1>
                            <p>For older adults with mobility issues, caretakers provide support with walking, 
                                transferring from one place to another (e.g., from bed to chair), and using mobility aids like walkers or wheelchairs.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Meal Preparation</h1>
                            <p>Caretakers prepare nutritious meals based on dietary requirements and preferences. 
                                They may also assist with feeding if necessary, ensuring seniors receive adequate nutrition.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Household Assistance</h1>
                            <p>Caretakers help with light household chores such as cleaning, laundry, and organizing. They create a safe and 
                                tidy environment for seniors to live comfortably.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Companionship</h1>
                            <p>Beyond physical assistance, caretakers offer companionship and emotional support. They engage in meaningful conversations, provide companionship during activities, and offer reassurance and encouragement.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Monitoring Health</h1>
                            <p> Caretakers observe and report any changes in the senior's health or behavior to healthcare professionals or family members. They may also accompany seniors to medical appointments.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Safety and Emergency Response</h1>
                            <p>Caretakers ensure the safety of seniors by identifying potential hazards in the home environment and implementing preventive measures. They are trained to respond calmly and effectively in case of emergencies.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Respect for Dignity and Independence</h1>
                            <p>Caretakers respect the dignity and independence of older adults, promoting autonomy whenever possible while offering respectful assistance and support.</p>
                        </div>
                    </Marquee>
                </div>
            </div>
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

export default Services;