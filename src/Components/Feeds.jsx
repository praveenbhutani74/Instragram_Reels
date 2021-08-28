import React, { useContext,useState } from 'react';
import{uuid} from "uuidv4";
import { firebaseDb, firebaseStorage } from '../config/firebase';
import { AuthContext } from '../context/AuthProvider';
import {Button} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera'


const Feeds = (props) => {
    const [videoFile, setVideoFile] = useState(null);


    const {signOut}=useContext(AuthContext);
    const { currentUser } = useContext(AuthContext);

    const handleLogout= async()=>{
        try{
        await signOut();
        props.history.push("/login");
        }catch(err){
            console.log(err);
        }
    }
    const handleInputFile=(e)=>{

        let file = e.target.files[0];
    setVideoFile(file);
    }
    const handleUploadFile = async () => {
        try{
            let uid=currentUser.uid;
            const uploadVideoObject=firebaseStorage.ref(`/profilePhotos/${uid}/${Date.now()}.mp4`)
            .put(videoFile);
            uploadVideoObject.on('state_changed',fun1,fun2,fun3);
            function fun1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              <div>{progress}</div>
            }
            function fun2(error){
                console.log(error);
            }

           async function fun3(){
                let videoUrl = await uploadVideoObject.snapshot.ref.getDownloadURL();
                console.log(videoUrl);
                let pid = uuid(); // unique id
                await firebaseDb.collection("posts").doc(pid).set({

                    pid:pid,
                    uid:uid,
                    comments:[],
                    likes:[],
                    videoLink:videoUrl
                  });
                  let doc = await firebaseDb.collection("users").doc(uid).get();
                  let document = doc.data();
                  document.postsCreated.push(pid);
                  await firebaseDb.collection("users").doc(uid).set(document);

            }


        }
        catch (err) {}
      };

    return ( <div>

        <h1>Feeds</h1>
        <button onClick={handleLogout}>Logout</button>

        <div className="uploadVideo">
            <div>
                <input type="file"  onChange={handleInputFile}/>
                <label >

                    <Button  onClick={handleUploadFile} variant="contained" color="secondary" startIcon={<PhotoCamera></PhotoCamera>}>Upload</Button>
                </label>
            </div>

        </div>


    </div> );
}
 
export default Feeds;