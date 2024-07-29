import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import { createService, careservices,community } from "./Docs/Docs";

function MyProvider({children}){
    const[profiledata,setprofiledata]=useState('');

    const[allservices,setallservices] = useState({});
    const[allserviceskeys,setallserviceskeys] = useState([]);

    const [allcareservices,setallcareservices] = useState({});
    const [ allcareserkeys,setallcareserkeys] = useState([]);

    const [allcommunity,setallcommunity] = useState({});
    const [allcommunitykeys,setallcommunitykeys] = useState([]);

    const [user,setuser] = useState({
        isAuthed:false,
        uid:'',
        userdtl:'',
        role:''
    })
    const sharedvalue={
        isAuthed:user.isAuthed,
        uid:user.uid,
        role:user.role,
        userdtl:user.userdtl,
        profiledata:profiledata,
        allservices:allservices,
        allserviceskeys:allserviceskeys,
        allcareservices:allcareservices,
        allcareserkeys:allcareserkeys,

        allcommunity:allcommunity,
        allcommunitykeys:allcommunitykeys
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (userd) => {
            if (userd) {
                const uid = userd.uid;
  
                //setting that user is authed
                setuser(prev=>({
                  ...prev,
                  isAuthed:true,
                  uid:uid,
                  userdtl:userd
                }))

                //fetching the community
                async function handlefetchcommunity(){
                    try{
                        await onSnapshot(community,(doc)=>{
                            const tempcommunitydata = doc.data();
                            // console.log(tempcommunitydata);
                            setallcommunity(tempcommunitydata);
                            const tempcommunitykeys = Object.keys(tempcommunitydata);
                            // console.log(tempcommunitykeys);
                            setallcommunitykeys(tempcommunitykeys);
                        })
                    }catch(e){
                        console.log('you got an error while fetching the community..',e);
                    }
                }
                handlefetchcommunity();

                //fetching the care services
                async function handlefetchcareservices(){
                    try{
                        await onSnapshot(careservices,(doc)=>{
                            const tempcareservicesdata = doc.data();
                            // console.log(tempservicesdata);
                            setallcareservices(tempcareservicesdata);
                            const tempcareservicekeys = Object.keys(tempcareservicesdata);
                            // console.log(tempservicekeys);
                            setallcareserkeys(tempcareservicekeys);
                        })
                    }catch(e){
                        console.log('getting error while fetching the care services...',e);
                    }
                }
                handlefetchcareservices();

                //fetching the all services created by senior

                async function handlefetchservices(){
                    try{
                        await onSnapshot(createService,(doc)=>{
                            const tempservicesdata = doc.data();
                            // console.log(tempservicesdata);
                            setallservices(tempservicesdata);
                            const tempservicekeys = Object.keys(tempservicesdata);
                            // console.log(tempservicekeys);
                            setallserviceskeys(tempservicekeys);
                        })
                    }catch(e){
                        console.log('getting error while fetching the services',e);
                    }
                }

                handlefetchservices();// calling function to fetch services

                //fetcching the users data
                async function handleprofiledata(){
                    try{
                        await onSnapshot( doc(db,"users",uid),(doc)=>{
                            const tempquotesdata = doc.data();
                            console.log(tempquotesdata);
                            setuser(prev=>({
                                ...prev,
                                role:tempquotesdata.role
                            }));
                            setprofiledata(tempquotesdata);

                          })
                    }catch(e){
                        console.log('you got an error while fetching the data',e);
                    }
                }
                handleprofiledata();// calling the profiledata function


            }else{
                //removing the user
              setuser(prev=>({
                ...prev,
                isAuthed:false,
                uid:'',
                user:'',
                role:''
              }))
            }
        })
        return ()=>{
            unSubscribe();
        }
    },[]);
    return(
        <MyContext.Provider value={sharedvalue}>
            {children}
        </MyContext.Provider>
    );
}

export default MyProvider;