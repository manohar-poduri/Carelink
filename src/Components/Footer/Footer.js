import React from "react";
import './Footer.css';
import { NavLink } from "react-router-dom";

function Footer(){
    return(
        <>
        <footer id="footer">

<div className="footer-section-1 footer-sub">
    <div className="footer-heading">
        <h1>Address</h1>
    </div>
    <div className="content-footer">
        <div className="footer-address">
            <i className="fa-solid fa-location-dot" ></i>Hyderabad, Telangana, India.
        </div>
        <div className="footer-phone">
            <i className="fa-solid fa-phone" ></i>987654321
        </div>
        <div className="footer-phone">
            <i className="fa-solid fa-envelope" ></i>Google@gmail.com.com
        </div>
        
    </div>
</div>

<div className="footer-section-2 footer-sub flex">
    <div className="footer-heading">
        <h1>Quick Links</h1>
    </div>
    <div className="content-footer">
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/'>Home</NavLink>
        </div>
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/about'>About Us</NavLink>
        </div>
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/ourservices'>Our Services</NavLink>
        </div>
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/Viewcommunity'>View Community</NavLink>
        </div>
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/profile'>Profile</NavLink>
        </div>
        {/* <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/contact'>Contact Us</NavLink>
        </div> */}
        
    </div>

</div>

<div className="footer-section-3 footer-sub">
    <div className="footer-heading">
        <h1>About</h1>
    </div>
    <div className="content-footer">
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" style={{color: "#ffffff"}}></i><NavLink to='/about'>Our Mission</NavLink>
        </div>
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/about'>Our Vision</NavLink>
        </div>
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><NavLink to='/about'>Our Values</NavLink>
        </div>
    </div>

</div>

<div className="footer-section-4 footer-sub">
    <div className="footer-heading">
        <h1>Contact Us</h1>
    </div>
    <div className="content-footer">
        <div className="footer-2-link">
        <i className="fa-solid fa-greater-than" ></i><NavLink to='/contact'>Contact Us</NavLink>
        </div>
        {/* <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><>Career</>
        </div>
        <div className="footer-2-link">
            <i className="fa-solid fa-greater-than" ></i><>SiteMap</>
        </div> */}
    </div>

</div>

</footer>
        </>
    )
}

export default Footer;