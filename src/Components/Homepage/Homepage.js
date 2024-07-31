import React,{useEffect} from "react";
import './Homepage.css';
import Marquee from "react-fast-marquee";
import KnowMore from '../../Assets/knowmoreimg.jpeg';
import { useNavigate } from "react-router-dom";
// import Promo from '../../Assets/promo.mp4';
import promo2 from '../../Assets/promo.jpg'
import Footer from "../Footer/Footer";

import Caregiver from "./Care givers.jpg";
import Services from "./Services banner.jpg";
import Caregivertwo from "./Care givers.jpg";

import Caregiverthree from "./Care givers.jpg";

function Homepage(){
    const navigate = useNavigate();
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[]);
    return(
        <>

        <div className='video-container'>
            {/* <video  className='video-tag' autoPlay muted loop>
                <source src={Promo} type='video/mp4'/>
                    Your browser does not support the video tag.
            </video> */}
            <img src={promo2} alt="promo"/>
            <div>
                <h1>Care Link</h1>
                <p>Empowering Seniors To Live Life To The Fullest</p>
                <p>At Care Link, we believe that every senior deserves to live life to the fullest, with dignity, independence, and support.</p>
            </div>

        </div>

        

        {/* know more about */}
            <div className="know-more-about-con">
                <h1>Who We Are</h1>
                <div className="know-more-about">
                    <div>
                        <h1>We Help To Get You Well</h1>
                        <p>Care Link is dedicated to enhancing the quality of life for aging individuals by providing personalized services, 
                            resources, and community connections. Our team is committed to compassionately supporting seniors and their families 
                            on their journey of aging.
                        </p>
                        <button onClick={()=>navigate('/about')}>Know More <span>{`>`}</span></button>
                    </div>
                    
                    <div className="know-more-about-img">
                        <img src={KnowMore} alt='know_more_about'/>
                    </div>
                </div>
            </div>

        {/* div one */}
        <section class="ServiceProviderHome increasegaptopbottom">
            <div class="headingServiceHome">
                <h1>Our Senior Users</h1>
                <p>We extend our deepest gratitude to our Senior Users, whose resilience and wisdom inspire us every day. Your trust in our services and your courage in 
                    facing life's challenges are truly admirable. We are privileged to serve you and are committed to ensuring that you receive the care, support, and 
                    respect you deserve. Thank you for allowing us to be a part of your journey, and know that your well-being is our highest priority.</p>
                <button><>Join As Senior User</></button>
            </div>
            <div class="sericeHomeImage">
                <img src={Caregiver} alt="caregiver"/>
                <img src={Services} alt="services"/>
                <img src={Caregivertwo} alt="caregivertwo"/>
            </div>
        </section>

        {/* div two */}
        <div class="caregivers increasegaptopbottom">
            <div class="caregiversContent">
                <h1>Care Givers</h1>
                <p>At Care Link, we express our heartfelt gratitude to our senior community. Your 
                    resilience and wisdom are a constant source of inspiration for us. Your trust in our 
                    services and your courage in navigating life's challenges are truly commendable. It is our 
                    honor to support you, and we are dedicated to providing the care, respect, and assistance you deserve. 
                    Thank you for making Care Link a part of your journey. Your well-being remains our utmost priority.</p>
                <button><>Join As CareGivers</></button>
            </div>
            <div class="caregiversImg">
                <img src={Caregiverthree} alt="No Source"/>
            </div>
        </div>

        {/* service provider */}
        <section class="caregiversCTA">
        <h1>Extending Thanks to Our Service Providers</h1>
        <p>We extend our deepest gratitude to our service providers, whose unwavering dedication and compassionate care positively impact the lives of our seniors each day. Your commitment to excellence, professionalism, and empathy is a beacon of hope and support for those in need. We deeply appreciate the exceptional service you provide, and we are honored to work alongside such dedicated individuals who enrich our community with their heartfelt service.</p>

        <button><>Join As Servise Provider</></button>

        </section>
        {/* testimonial's */}
        <div className="careservices-types">
                <h1>Testimonial's</h1>
                <div>
                    <Marquee>
                        <div className="careservice-divs">
                            <h1>Testimonial from Sarah D.</h1>
                            <p>"GoldenAge Support has truly enriched my life with its Lifestyle and Hobbies section. I've rediscovered my passion for
                                 gardening and have connected with like-minded seniors who share my love for plants and outdoor activities."</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Testimonial from James W.</h1>
                            <p>As a retired traveler, I find the Lifestyle and Hobbies section on GoldenAge Support incredibly inspiring. It's a treasure trove of travel tips, destination recommendations,
                                 and stories that fuel my wanderlust and keep me exploring new horizons.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Testimonial from Margaret S.</h1>
                            <p>The Lifestyle and Hobbies section on GoldenAge Support has opened up a world of creativity for me. From art classes to DIY projects, I've found joy in pursuing new hobbies and expressing myself through various artistic endeavors.</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Testimonial from Robert M.</h1>
                            <p>I never knew how much I'd enjoy cooking until I stumbled upon the Lifestyle and Hobbies section on GoldenAge Support. The recipes, cooking tips, and culinary adventures shared here have turned me into a gourmet chef in my own kitchen!</p>
                        </div>
                        <div className="careservice-divs">
                            <h1>Testimonial from Alice H.</h1>
                            <p>The Lifestyle and Hobbies section on GoldenAge Support has reignited my love for music. From virtual concerts to music appreciation classes, I've found a community of music lovers who appreciate the timeless melodies that bring us together.</p>
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
        {/* footer */}
        <Footer/>
        </>
    );
}

export default Homepage;