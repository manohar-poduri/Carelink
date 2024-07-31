import React, { useEffect } from "react";
import './Contactus.css';
import Footer from "../Footer/Footer";

function Contactus(){
    useEffect(()=>{
        window.scrollTo({top:0, behavior:'smooth'});
    },[])
    return(
        <>
            <div class="contact-card">
        <div class="contact-form">
            <p><b>Contact With Us</b></p>
            <h1>Feel Free to Write us Anytime</h1>
            <div class="contact-inner-form">
                <div>
                    <input type="text" placeholder="Name" value=""/>
                    <input type="email" placeholder="Email Address" value=""/></div>
                <div>
                    <input type="tel" placeholder="Phone" value=""/>
                    <input type="tel" placeholder="Alternative Phone" value=""/>
                </div>
                <div>
                    <input type="text" placeholder="Subject" value=""/>
                </div>
                <textarea placeholder="Write a Message"></textarea>
                <button>send a message</button>
            </div>
        </div>
    </div>
    <Footer/>
        </>
    );
}

export default Contactus;