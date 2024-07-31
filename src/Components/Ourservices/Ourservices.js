import React, { useEffect } from 'react';
import './Ourservices.css';

import img1 from './OurServicesBg.jpg';
import img2 from "./home.svg";
import img3 from "./health.svg";
import img4 from "./transportation.svg";
import img5 from "./nutrition.svg";
import img6 from "./social.svg";
import img7 from "./safety.svg";
import img8 from "./pet.svg";
import img9 from "./question.svg";

import Footer from '../Footer/Footer';


function Ourservices(){
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[]);
    return(
        <>
            <div className="top-bg">
        <h1> Our Services</h1>
        <img src={img1} alt="backgground-pic"/>
    </div>
    <div className="ourServicesHeading">
        <h1>At Care Link, we are dedicated to providing compassionate care and support services tailored to the unique needs of seniors and their families. Our team of experienced professionals is committed to enhancing the quality of life for our clients by offering a comprehensive range of services designed to promote independence, well-being, and dignity. Explore our services below:</h1>
    </div>
    <section id="Services">
        <div className="service-card">
            <img src={img2} alt="services-pics"/>
            <h1>Home Care Services</h1>
            <p>Our home care services are tailored to provide personalized assistance with activities of daily living (ADLs) in the comfort of your own home. From bathing and grooming to meal preparation and medication reminders, our compassionate caregivers are here to support you every step of the way.</p>
        </div>
        <div className="service-card">
            <img src={img3} alt="services-pics"/>
            <h1>Health Monitoring and Management</h1>
            <p>We offer comprehensive health monitoring and management services to help seniors stay on top of their health and well-being. From regular vital sign checks to medication management and health assessments, we empower seniors to take control of their health and live life to the fullest.</p>
        </div>
        <div className="service-card">
            <img src={img4} alt="services-pics" />
            <h1>Transportation Assistance</h1>
            <p>We offer transportation assistance services to help seniors get to medical appointments, errands, and social outings safely and conveniently, ensuring they can maintain their independence and stay connected with their communities.</p>
        </div>
        <div className="service-card">
            <img src={img5} alt="services-pics" />
            <h1>Nutrition Planning and Meal Services</h1>
            <p>Our team offers meal preparation services and nutrition guidance to ensure seniors receive balanced and nutritious meals that meet their dietary needs and preferences.</p>
        </div>
        <div className="service-card">
            <img src={img6} alt="services-pics" />
            <h1>Social Engagement and Activities</h1>
            <p>Caring for a loved one can be demanding, and everyone deserves a break. Our respite care services provide temporary relief for family caregivers, allowing them to recharge and rejuvenate while knowing their loved one is in good hands.</p>
        </div>
        <div className="service-card">
            <img src={img7} alt="services-pics" />
            <h1>Medication Management</h1>
            <p>We provide medication management services to help seniors adhere to their medication schedules and ensure safe and effective use of medications, promoting better health outcomes and peace of mind.</p>
        </div>
        <div className="service-card">
            <img src={img8} alt="services-pics" />
            <h1>Pet Care Services</h1>
            <p>Pets are an important part of many seniors' lives, and we're here to help care for them too. Our pet care services include pet sitting, dog walking, and assistance with pet grooming and veterinary appointments.</p>
        </div>
        <div className="service-card">
            <img src={img9} alt="services-pics" />
            <h1>Memory Care Support</h1>
            <p>For seniors living with memory impairment, we offer specialized memory care support services, including memory-enhancing activities, caregiver support, and resources to help families navigate the challenges of memory loss with compassion and dignity.</p>
        </div>


    </section>
    <Footer/>
        </>
    );
}

export default Ourservices;