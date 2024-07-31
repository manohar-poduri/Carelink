import React, { useEffect } from "react";
import './About.css';
import img1 from './image/About bg.jpg';
import img2 from "./image/pic1.jpg";
import img3 from "./image/mission.png";
import img4 from "./image/vision.png";
import img5 from "./image/home.svg";
import img6 from "./image/health.svg";
import img7 from "./image/transportation.svg";
import img8 from "./image/nutrition.svg";
import img9 from "./image/social.svg";
import img10 from "./image/safety.svg";
import img11 from "./image/pet.svg";
import img12 from "./image/question.svg";
import Footer from "../Footer/Footer";
function About(){
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[]);
    return(
        <>
        <div className="about-con">
         <section>
        <div className="top-bg">
            <h1>About Us</h1>
            <img src={img1} alt="pics"/>
        </div>
    </section>

    <section id="about-us-show">
        
        <div className="about-us-container">,
            <div className="about-us-content">
                <h2>Welcome to our page</h2>
                <p>Welcome to Care Link, where we are dedicated to enhancing the lives of seniors and providing them with the support they need to thrive in their golden years. Our mission is to create a caring and compassionate community that empowers seniors to live life to the fullest.</p>
               
            </div>
            <div className="about-us-image">
                <img src={img2} alt=""/>
            </div>
        </div>
    </section>

    <section id="MissionVision">
        <div className="title-mission-vision">
            <h1>MISSION / VISION / OUR VALUES</h1>
        </div>
        <div className="mission">
            <div className="mission-content">
                <h2>Our Mission</h2>
                <p>At Care Link, our mission is to enhance the quality of life for aging individuals by providing compassionate care, personalized services, and community connections. We are committed to empowering seniors to live life to the fullest, with dignity, independence, and support.</p>
            </div>
            <div className="mission-image">
                <img src={img3} alt=""/>
            </div>
        </div>
        <div className="vision">
            <div className="vision-image">
                <img src={img4} alt=""/>
            </div>
            <div className="vision-content">
                <h2>Our Vision</h2>
                <p>At Care Link, our vision is to create a world where aging is celebrated, respected, and embraced as a natural part of life. We envision a community where seniors have access to the resources, support, and opportunities they need to thrive and flourish in their golden years.</p>
            </div>

        </div>    

        <h1 className="our-values-heading">OUR VALUES</h1>

        <div className="accordation">
            <div className="accordation-heading">
                <h2>Compassion:</h2>
            </div>
            <div className="accordation-content">
                <p>We approach every interaction with empathy, respect, and kindness, recognizing the dignity and worth of every individual we serve.</p>
            </div>
        </div>
        <div className="accordation">
            <div className="accordation-heading">
                <h2>Quality:</h2>
            </div>
            <div className="accordation-content">
                <p>We are committed to delivering high-quality care and services that meet the unique needs and preferences of each senior and family member.</p>
            </div>
        </div>
        <div className="accordation">
            <div className="accordation-heading">
                <h2>Empowerment:</h2>
            </div>
            <div className="accordation-content">
                <p>We empower seniors to live life to the fullest by providing them with the tools, resources, and support they need to thrive.</p>
            </div>
        </div>
        <div className="accordation">
            <div className="accordation-heading">
                <h2>Community:</h2>
            </div>
            <div className="accordation-content">
                <p>We believe in the power of community and collaboration, fostering meaningful connections and partnerships to enrich the lives of seniors and their families.</p>
            </div>
        </div>
        <div className="accordation">
            <div className="accordation-heading">
                <h2>Integrity:</h2>
            </div>
            <div className="accordation-content">
                <p>We uphold the highest standards of honesty, transparency, and ethical conduct in everything we do, earning the trust and confidence of our clients and stakeholders.</p>
            </div>
        </div>
        
    </section>

    <section id="our-services-about">

        <div className="service-about">
            <img src={img5} alt="pics"/>
            <p>Home Care Services</p>
        </div>
        <div className="service-about">
            <img src={img6} alt="pics"/>
            <p>Health Monitoring and Management</p>
        </div>
        <div className="service-about">
            <img src={img7} alt="pics"/>
            <p>Transportation Assistance</p>
        </div>
        <div className="service-about">
            <img src={img8} alt="pics" />
            <p>Nutrition Planning and Meal Services</p>
        </div>
        <div className="service-about">
            <img src={img9} alt="pics" />
            <p>Social Engagement and Activities</p>
        </div>
        <div className="service-about">
            <img src={img10} alt="pics"/>
            <p>Home Safety Assessments and Modifications</p>
        </div>
        <div className="service-about">
            <img src={img11} alt="pics"/>
            <p>Pet Care Services</p>
        </div>
        <div className="service-about">
            <img src={img12} alt="pics"/>
            <p>Memory Care Support</p>
        </div>

    </section>
    
    <Footer/>
    </div>
        </>
    );
}

export default About;