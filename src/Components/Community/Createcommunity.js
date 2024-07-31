import React, { useContext, useState } from "react";
import './Createcommunity.css';
import oldman1 from './Images/old man1.jpg';
import oldman2 from './Images/old man2.jpg';
import oldman3 from './Images/oldman3.jpg';
import oldman4 from './Images/oldman4.jpg';
import oldman5 from './Images/oldman5.jpg';
import Footer from "../Footer/Footer";

import { db } from "../../firebase";
import { writeBatch } from "firebase/firestore";
import { community } from "../../Docs/Docs";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';
import MyContext from "../../MyContext";
import { updateDoc, deleteField } from "firebase/firestore";

import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

function Createcommunity(){

    const navigate = useNavigate();
    const sharedvalue = useContext(MyContext);

    const [open, setOpen] = useState(false);
    const batch = writeBatch(db);

    const[createaddpost,setcreateaddpost]=useState({ //create add post ...
        active:false,
        header:'',
        description:'',
        topic:'',
        comments:[],
        likes:[],
        time:'',
        date:'',
        profiledata:''
    });

    // deleting the post
    async function handledeleteservice(id){
        setOpen(true);
        try{
            await updateDoc(community,{
                [id]:deleteField()
            });
            await batch.commit();
        }catch(e){
            console.log('you got an error while deleting the quotation',e);
        }
         setOpen(false);
    }

    



    //adding the post
    async function handleyourpost(){
        setOpen(true);
        const uuidg= uuidv4();
        try{
            const formatDateString = (date) => date.toISOString().split('T')[0];
            const currentDate = new Date();
            const stringtodaydate = formatDateString(currentDate);
            if(createaddpost.header!=='' && createaddpost.description!=='' &&
            createaddpost.topic!==''
            ){
                batch.update(community,{[uuidg]:{
                    header:createaddpost.header,
                    description:createaddpost.description,
                    topic:createaddpost.topic,
                    comments:[],
                    likes:[],
                    time:'',
                    date:stringtodaydate,
                    profiledata:sharedvalue.profiledata,
                    uid:sharedvalue.uid
                    }
                });
                await batch.commit();
                alert('successfully added...');
                setcreateaddpost(prev=>({
                    ...prev,
                    active:false,
                    header:'',
                    description:'',
                    topic:'',
                    comments:[],
                    likes:[],
                    time:'',
                    date:'',
                    profiledata:''
                }));
            }else{
                alert('please fill all the fields!!');
            }

        }catch(e){
            console.log('you got an error while adding the post..',e);
        }
        setOpen(false);
    }
    return(
        <>
            <div className={createaddpost.active===true?'careservices-addpost-active':''}>
            <div className="createcommunity-banner">
                <div>
                    <h1>Community Wisdom: Where Generations Unite to Support and Inspire!</h1>
                    <p> Ask questions, seek advice, and share your concerns. Experienced elders provide personalized responses, drawing from their rich life experiences. Varied perspectives 
                        enhance discussions, promoting learning and growth. Enjoy a secure, respectful environment with user-friendly navigation. Join our lively community today!</p>
                    <button onClick={()=>setcreateaddpost(prev=>({
                        ...prev,
                        active:true
                    }))}>+ Add New Post</button>
                </div>
            </div>
            <div className="createcommunity-header">
                <h1>Your Sharing Space: Questions, Concerns, Conversations and Many More!! </h1>
            </div>

            <div className="created-community-posts">
                <div className="left-container">
                    <div className="community-dreated-page-leftcon">
                        <h1>your community posts...</h1>
                    </div>
                    <div className="all-post-created-posts">
                        {
                            sharedvalue.allcommunitykeys
                            .filter((item)=>sharedvalue.allcommunity[item].uid===sharedvalue.uid).length>0?
                            sharedvalue.allcommunitykeys
                            .filter((item)=>sharedvalue.allcommunity[item].uid===sharedvalue.uid)
                            .map((item,idx)=>(
                                <div key={idx} className="createcommunity-each-post-div">
                                    <div className="createcommunity-each-post-head" onClick={()=>navigate(`/viewcommunity/${item}`)}>
                                        <AccountCircleIcon fontSize="large"/>
                                        <div>
                                            <h1>{sharedvalue.allcommunity[item].profiledata.name}</h1>
                                            <p>date: {sharedvalue.allcommunity[item].date}</p>
                                        </div>
                                    </div>
                                    <div className="createcommunity-topic-para" onClick={()=>navigate(`/viewcommunity/${item}`)}>
                                        <p>{sharedvalue.allcommunity[item].topic}</p>
                                    </div>
                                    <div className="createcommunity-each-post-des" onClick={()=>navigate(`/viewcommunity/${item}`)}>
                                        <h1>{sharedvalue.allcommunity[item].header}</h1>
                                        <p>{sharedvalue.allcommunity[item].description.substring(0,240)}...</p>
                                    </div>
                                    <div className="createcommunity-each-post-buttons">
                                        <div onClick={()=>navigate(`/viewcommunity/${item}`)}>
                                        <MessageIcon fontSize="medium" sx={{color:'green',cursor:'pointer'}} />
                                        <p>{sharedvalue.allcommunity[item].comments.length} comments</p>
                                        </div>
                                        <button onClick={()=>handledeleteservice(item)}>Delete</button>
                                    </div>
                                    
                                </div>
                            )):
                            <div>
                                <h1>still now you didn't create any posts</h1>
                            </div>
                        }

                    </div>
                </div>
                <div className="right-container">
                    <div className="message-box">
                        <div className="message-text">
                            <p>Hello there! I've walked many paths in life and am here to lend an ear and offer any advice or
                                guidance you may need. Let's chat!</p>
                        </div>
                        <div className="profile-photo">
                            <img src={oldman2} alt="Profile"/>
                        </div>
                    </div>
                    <div className="message-box">
                        <div className="message-text">
                            <p>Greetings! Age has granted me experiences aplenty. Whether it's advice, suggestions, or just a
                                listening ear you seek, I'm here to help.</p>
                        </div>
                        <div className="profile-photo">
                            <img src={oldman1} alt="Profile"/>
                        </div>
                    </div>
                    <div className="message-box">
                        <div className="message-text">
                            <p>Welcome! As someone who has seen their fair share of life's ups and downs, I'm here to offer my
                                wisdom and support. Feel free to reach out!</p>
                        </div>
                        <div className="profile-photo">
                            <img src={oldman5} alt="Profile"/>
                        </div>
                    </div>
                    <div className="message-box">
                        <div className="message-text">
                            <p>Good day! If you're facing a challenge or simply need a fresh perspective, don't hesitate to
                                connect with me. Together, we can find solutions.</p>
                        </div>
                        <div className="profile-photo">
                            <img src={oldman3} alt="Profile"/>
                        </div>
                    </div>
                    <div className="message-box">
                        <div className="message-text">
                            <p>Hey there! Life's journey has taught me many valuable lessons. If you're seeking guidance,
                                advice, or just a friendly chat, I'm here for you.</p>
                        </div>
                        <div className="profile-photo">
                            <img src={oldman4} alt="Profile"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
            <div className={createaddpost.active===true?`create-add-post-popup-active`:`create-add-post-popup-inactive`}>
                <div className="create-community-page">
                    <div className="create-community-page-div">
                        <p onClick={()=>setcreateaddpost(prev=>({
                            ...prev,
                            active:false
                        }))}>X</p>
                    </div>
                    <div className="create-community-page-form">
                        <div>
                            <label>subject</label>
                            <input type="text" value={createaddpost.header} onChange={(e)=>setcreateaddpost(prev=>({
                                ...prev,
                                header:e.target.value
                            }))}/>
                        </div>
                        <div>
                            <label>select topic</label>
                            <select value={createaddpost.topic} onChange={(e)=>setcreateaddpost(prev=>({
                                ...prev,
                                topic:e.target.value
                            }))}>
                                <option value=''>--select--</option>
                                <option value='Events and Activities'>Events and Activities</option>
                                <option value='Health and Wellness'>Health and Wellness</option>
                                <option value='Community News'>Community News</option>
                                <option value='Volunteer Opportunities'>Volunteer Opportunities</option>
                                <option value='Lifestyle and Hobbies'>Lifestyle and Hobbies</option>
                            </select>
                        </div>
                        <div>
                            <label>description</label>
                            <textarea placeholder="write your content here..." value={createaddpost.description} onChange={(e)=>setcreateaddpost(prev=>({
                                ...prev,
                                description:e.target.value
                            }))}/>
                        </div>
                        <button onClick={()=>handleyourpost()}>add a post</button>
                    </div>
                    
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            
        </>
    );
}

export default Createcommunity;