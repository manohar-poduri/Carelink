import React, { useContext, useState } from "react";
import './Eachcommunity.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useParams } from "react-router-dom";
import MyContext from "../../MyContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from "../../firebase";
import { writeBatch } from "firebase/firestore";
import { community } from "../../Docs/Docs";
import ForumIcon from '@mui/icons-material/Forum';

function Eachcommunity(){
    const navigate = useNavigate();
    const {id}= useParams();
    const sharedvalue = useContext(MyContext);
    const [addcomment,setaddcomment] = useState('');
    const [open, setOpen] = useState(false);
    const batch = writeBatch(db);
    //handling the adding comment
    async function handlingaddcomment(){
        setOpen(true);
        try{
            const formatDateString = (date) => date.toISOString().split('T')[0];
            const currentDate = new Date();
            const stringtodaydate = formatDateString(currentDate);
            if(addcomment!==''){
                batch.update(community,{[id]:{
                    ...sharedvalue.allcommunity[id],
                    comments:[...sharedvalue.allcommunity[id].comments,{
                        ...sharedvalue.profiledata,
                        comment:addcomment,
                        date:stringtodaydate
                    }]
                }});
                await batch.commit();
                alert('successfully added...');
                setaddcomment('');

            }else{
                alert('please enter the valid data..');
            }

        }catch(e){
            console.log('you got an error while adding the comments...',e);
        }
        setOpen(false);
    }
    return(
        <>{sharedvalue.allcommunitykeys.length>0 && 
            <div className="eachcommunity-con">
                <div className="eachcommunity-inner-con">
                    <div className="eachcommunity-inner-view-topic">
                        <ArrowBackIcon onClick={()=>navigate(-1)} sx={{cursor:'pointer'}}/>
                        <div className="eachcommunity-inner-view-topic-head">
                            <AccountCircleIcon fontSize='large'/>
                            <div className="eachcommunity-inner-view-name-dtl">
                                <div>
                                    <h1>{sharedvalue.allcommunity[id].profiledata.name}</h1>
                                    <p>date: {sharedvalue.allcommunity[id].date}</p>
                                </div>
                                <p>{sharedvalue.allcommunity[id].topic}</p>
                            </div>
                        </div>
                        <div className="eachcommunity-inner-descripiton-topic">
                            <h1>{sharedvalue.allcommunity[id].header}</h1>
                            <p>{sharedvalue.allcommunity[id].description}</p>
                        </div>

                        <div className="createcommunity-each-post-buttons">
                            <div>
                                <MessageIcon fontSize="medium" sx={{color:'green',cursor:'pointer'}} />
                                <p>{sharedvalue.allcommunity[id].comments.length} comments</p>
                            </div>
                            {/* <button>Delete</button> */}
                        </div>
                    </div>
                    <div className="eachcomm-add-your">
                        <label>Add Your Comment's</label>
                        <textarea value={addcomment} placeholder="write your comments here...." onChange={(e)=>setaddcomment(e.target.value)}/>
                        <button onClick={()=>handlingaddcomment()}>post</button>
                    </div>
                    <div className="eachcomm-comments-header">
                        <h1>Comments</h1>
                    </div>
                    <div className="eachcomm-all-comments-dis">
                        {
                            sharedvalue.allcommunity[id].comments.map((item,idx)=>(
                                <div>
                                    <div className="createcommunity-each-post-head">
                                        <ForumIcon fontSize="medium"/>
                                        <div>
                                            <h1>{item.name}</h1>
                                            <p>date: {item.date}</p>
                                        </div>
                                    </div>
                                    {/* <div className="createcommunity-topic-para">
                                        <p>{sharedvalue.allcommunity[item].topic}</p>
                                    </div> */}
                                    <div className="createcommunity-each-post-des">
                                        {/* <h1>{sharedvalue.allcommunity[item].header}</h1> */}
                                        <p>{item.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </div>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default Eachcommunity;