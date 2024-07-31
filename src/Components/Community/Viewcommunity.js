import React, { useContext, useState } from "react";
import './Viewcommunity.css';
import Footer from "../Footer/Footer";
import MyContext from "../../MyContext";
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
function Viewcommunity(){
    const navigate = useNavigate();
    const sharedvalue = useContext(MyContext);
    const [filtervalue,setfiltervalue] = useState('');
    return(
        <>
            <div className="view-community-con">
                <div className="view-community-header">
                    <h1>community page</h1>
                </div>

                <div className="view-community-filter-select">
                    <div>
                        <label>Filter</label>
                        <select value={filtervalue} onChange={(e)=>setfiltervalue(e.target.value)}>
                            <option value=''>--select--</option>
                            <option value='Events and Activities'>Events and Activities</option>
                            <option value='Health and Wellness'>Health and Wellness</option>
                            <option value='Community News'>Community News</option>
                            <option value='Volunteer Opportunities'>Volunteer Opportunities</option>
                            <option value='Lifestyle and Hobbies'>Lifestyle and Hobbies</option>
                        </select>
                    </div>
                </div>

                <div className="all-post-created-posts">
                        {
                            sharedvalue.allcommunitykeys
                            .filter((item)=>sharedvalue.allcommunity[item].topic.includes(filtervalue)?true:false)
                            .length>0?
                            sharedvalue.allcommunitykeys
                            .filter((item)=>sharedvalue.allcommunity[item].topic.includes(filtervalue)?true:false)
                            .map((item,idx)=>(
                                <div key={idx} className="createcommunity-each-post-div">
                                    <div className="createcommunity-each-post-head">
                                        <AccountCircleIcon fontSize="large"/>
                                        <div>
                                            <h1>{sharedvalue.allcommunity[item].profiledata.name}</h1>
                                            <p>date: {sharedvalue.allcommunity[item].date}</p>
                                        </div>
                                    </div>
                                    <div className="createcommunity-topic-para">
                                        <p>{sharedvalue.allcommunity[item].topic}</p>
                                    </div>
                                    <div className="createcommunity-each-post-des">
                                        <h1>{sharedvalue.allcommunity[item].header}</h1>
                                        <p>{sharedvalue.allcommunity[item].description.substring(0,240)}...</p>
                                    </div>
                                    <div className="createcommunity-each-post-buttons">
                                        <div onClick={()=>navigate(`/viewcommunity/${item}`)}>
                                        <MessageIcon fontSize="medium" sx={{color:'green',cursor:'pointer'}} />
                                        <p>{sharedvalue.allcommunity[item].comments.length} comments</p>
                                        </div>
                                        <div className="viewcommunity-view-btn">
                                            <button onClick={()=>navigate(`/viewcommunity/${item}`)}>View</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            )):
                            <div>
                                <h1>No Result</h1>
                            </div>
                        }

                    </div>
                
            </div>
            <Footer/>
        </>
    );
}

export default Viewcommunity;