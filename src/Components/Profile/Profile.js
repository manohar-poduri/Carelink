import React, { useContext,useState} from "react";
import './Profile.css';
import Profilepic from './Profilebg.png';
import Profileimg from './Profile img.jpg';
import Footer from '../Footer/Footer';
import MyContext from '../../MyContext';
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage';
import { storage } from "../../firebase";
import {writeBatch} from "firebase/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Profile(){
    const batch = writeBatch(db);
    const sharedvalue = useContext(MyContext);
    // console.log('usrdtl: ',sharedvalue.profiledata);
    const [ctktfile,setctktfile]=useState('');
    const [showloading,setshowloading] = useState(false);
     //downloading the file url from datastorage
     const downloadfileurl = async() =>{
        try{
            return new Promise((resolve,reject)=>{
                const storageref = ref(storage,ctktfile.name);
                const downloadurl = getDownloadURL(storageref);
                console.log('downloadurl',downloadurl);
                resolve(downloadurl);
            })
                
        }catch(e){
            console.log('you getting an error while downloading url ',e);
            alert('you get error while adding image',e);
        }
    }
    function handleselectfile(e){
        const selectedFile = e.target.files[0];
        setctktfile(selectedFile);
    }

    async function handleuploadimage(){
        setshowloading(true);
        try{
            var fileurl ='';
            const storageref = ref(storage,ctktfile.name);
            const response = await uploadBytes(storageref,ctktfile);
            if(response){
                fileurl= await downloadfileurl();
            }else{
                console.log('response error');
            }
            await batch.update(doc(db,"users",sharedvalue.uid),{
                ...sharedvalue.profiledata,
                imgurl:fileurl,
            });
            await batch.commit();
            
        }catch(e){
            console.error('you got an error while uploading gthe file, ', e);
            alert('you got an  error');
        }
        setshowloading(false);
    }

    return(
        <>
        {sharedvalue.profiledata!=='' && 
            <section className="profile">
        <div className="profile-image">
            <div className="bannerimg">
                <img src={Profilepic} alt="profilepics"/>
            </div>
            <div className="profileimg">
                <img src={sharedvalue.profiledata.imgurl===''?Profileimg:sharedvalue.profiledata.imgurl} alt="profilepics"/>
            </div>
        </div>
        <div className="profile-content">

            <div className="editing-the-profile-data">
                <input type='file'   onChange={(e)=>handleselectfile(e)}/>
                <p onClick={()=>handleuploadimage()}>upload</p>
            </div>
            {/* <div className="profile-content1">
                
            </div> */}
            <div className="profileName">
                <h1>{sharedvalue.profiledata.name}</h1>
            </div>
            <div className="profileServiceName">
                <h1>{sharedvalue.profiledata.role}</h1>
            </div>
            <div className="profileServiceName">
                <p><span>{sharedvalue.allcommunitykeys
                            .filter((item)=>sharedvalue.allcommunity[item].uid===sharedvalue.uid).length}</span>  Community Posts</p>
                {
                    sharedvalue.profiledata.role==='caretaker' && <p><span>{sharedvalue.allcareserkeys
                        .filter(item=>(sharedvalue.allcareservices[item].createduid===sharedvalue.uid))
                        .length}</span>  care services</p>
                }

                {
                    sharedvalue.profiledata.role==='serviceprovider' &&
                    <p>
                        <span>{sharedvalue.allserviceskeys.filter(item=>(sharedvalue.allservices[item].accepted===true && sharedvalue.allservices[item].acceptedby.email===sharedvalue.profiledata.email))
                            .filter(item=>sharedvalue.allservices[item].completed===true)
                            .length}</span> Services Provided
                    </p>
                }

                {
                    sharedvalue.profiledata.role==='seniorcitizen' &&
                    <p>
                        <span>{sharedvalue.allserviceskeys
                            .filter(item=>sharedvalue.allservices[item].createdby===sharedvalue.uid)
                            .filter(item=>sharedvalue.allservices[item].completed===true)
                            .length}</span> Services Taken
                    </p>
                }
            </div>
            {/* <div className="profileServiceLocation">
                <div>
                    <i className="fa-solid fa-location-dot"></i> <p>Location</p>
                    <i className="fa-regular fa-calendar-days"></i><p>Date Joined</p>
                </div>
            </div> */}
        </div>

    {
        sharedvalue.role==='serviceprovider' && 
    
    <>
        <div className="feedbackHeading">
            <h1>Feedback</h1>
        </div>

        <div className="feedback">
            <div className="feedback-card">
                <div className="feedbackhead">
                    <img src={Profileimg} alt="profilepics"/>
                    <h1>Cusomer Name</h1>
                    <div className="feedback-rating">
                        <h1>Rating: </h1><p>3.5/5</p>
                    </div>
                </div>
                <div className="feedbackbody">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero cum fugit, consequatur neque et nisi necessitatibus quas doloremque, corporis tenetur molestias voluptas consequuntur quaerat dolor dolorem harum sit quos ullam ea perspiciatis, non laboriosam.</p>
                </div>
            </div>
            <div className="feedback-card">
                <div className="feedbackhead">
                    <img src={Profileimg} alt="profilepics"/>
                    <h1>Cusomer Name</h1>
                    <div className="feedback-rating">
                        <h1>Rating: </h1><p>3.5/5</p>
                    </div>
                </div>
                <div className="feedbackbody">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero cum fugit, consequatur neque et nisi necessitatibus quas doloremque, corporis tenetur molestias voluptas consequuntur quaerat dolor dolorem harum sit quos ullam ea perspiciatis, non laboriosam.</p>
                </div>
            </div>
            <div className="feedback-card">
                <div className="feedbackhead">
                    <img src={Profileimg} alt="profilepics"/>
                    <h1>Cusomer Name</h1>
                    <div className="feedback-rating">
                        <h1>Rating: </h1><p>3.5/5</p>
                    </div>
                </div>
                <div className="feedbackbody">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero cum fugit, consequatur neque et nisi necessitatibus quas doloremque, corporis tenetur molestias voluptas consequuntur quaerat dolor dolorem harum sit quos ullam ea perspiciatis, non laboriosam.</p>
                </div>
            </div>
            <div className="feedback-card">
                <div className="feedbackhead">
                    <img src={Profileimg} alt="profilepics"/>
                    <h1>Cusomer Name</h1>
                    <div className="feedback-rating">
                        <h1>Rating: </h1><p>3.5/5</p>
                    </div>
                </div>
                <div className="feedbackbody">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero cum fugit, consequatur neque et nisi necessitatibus quas doloremque, corporis tenetur molestias voluptas consequuntur quaerat dolor dolorem harum sit quos ullam ea perspiciatis, non laboriosam.</p>
                </div>
            </div>
            <div className="feedback-card">
                <div className="feedbackhead">
                    <img src={Profileimg} alt="profilepics"/>
                    <h1>Cusomer Name</h1>
                    <div className="feedback-rating">
                        <h1>Rating: </h1><p>3.5/5</p>
                    </div>
                </div>
                <div className="feedbackbody">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero cum fugit, consequatur neque et nisi necessitatibus quas doloremque, corporis tenetur molestias voluptas consequuntur quaerat dolor dolorem harum sit quos ullam ea perspiciatis, non laboriosam.</p>
                </div>
            </div>
            <div className="feedback-card">
                <div className="feedbackhead">
                    <img src={Profileimg} alt="profilepics"/>
                    <h1>Cusomer Name</h1>
                    <div className="feedback-rating">
                        <h1>Rating: </h1><p>3.5/5</p>
                    </div>
                </div>
                <div className="feedbackbody">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero cum fugit, consequatur neque et nisi necessitatibus quas doloremque, corporis tenetur molestias voluptas consequuntur quaerat dolor dolorem harum sit quos ullam ea perspiciatis, non laboriosam.</p>
                </div>
            </div>
            
            
        </div>
    </>
    }

        <div className="Blogsheading">
            <h1>Blogs</h1>
        </div>

        <div className="blogsSection">
            <div className="blogcard">
                <div className="bloghead">
                    <img src={Profileimg} alt="profilepics"/>
                </div>
                <div className="blog-label">
                    <p>Health</p>
                </div>
                <div className="blog-card-body">
                    <h1>Blog name comes hereBlog name comes here</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil praesentium incidunt nemo ratione molestiae fugit rem, provident corporis facere qui officia est ipsum quaerat necessitatibus ipsa quibusdam molestias accusantium eligendi perferendis? Commodi, deleniti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil praesentium incidunt nemo ratione molestiae fugit rem, provident corporis facere qui officia est ipsum quaerat necessitatibus ipsa quibusdam molestias accusantium eligendi perferendis? Commodi, deleniti!</p>
                    <button>Read More...</button>
                </div>
            </div>
            <div className="blogcard">
                <div className="bloghead">
                    <img src={Profileimg} alt="profilepics"/>
                </div>
                <div className="blog-label">
                    <p>Health</p>
                </div>
                <div className="blog-card-body">
                    <h1>Blog name comes hereBlog name comes here</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil praesentium incidunt nemo ratione molestiae fugit rem, provident corporis facere qui officia est ipsum quaerat necessitatibus ipsa quibusdam molestias accusantium eligendi perferendis? Commodi, deleniti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil praesentium incidunt nemo ratione molestiae fugit rem, provident corporis facere qui officia est ipsum quaerat necessitatibus ipsa quibusdam molestias accusantium eligendi perferendis? Commodi, deleniti!</p>
                    <button>Read More...</button>
                </div>
            </div>
            <div className="blogcard">
                <div className="bloghead">
                    <img src={Profileimg} alt="profilepics"/>
                </div>
                <div className="blog-label">
                    <p>Health</p>
                </div>
                <div className="blog-card-body">
                    <h1>Blog name comes hereBlog name comes here</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil praesentium incidunt nemo ratione molestiae fugit rem, provident corporis facere qui officia est ipsum quaerat necessitatibus ipsa quibusdam molestias accusantium eligendi perferendis? Commodi, deleniti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil praesentium incidunt nemo ratione molestiae fugit rem, provident corporis facere qui officia est ipsum quaerat necessitatibus ipsa quibusdam molestias accusantium eligendi perferendis? Commodi, deleniti!</p>
                    <button>Read More...</button>
                </div>
            </div>
            
        </div>
    </section>
    }
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

export default Profile;