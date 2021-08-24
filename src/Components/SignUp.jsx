import React, { useContext, useState } from 'react';
import { firebaseDb, firebaseStorage } from '../config/firebase';
import { AuthContext } from '../context/AuthProvider';


const SignUp = (props) => {

    
        const [username, setusername] = useState("");
        const [email, setemail] = useState("");
        const [password, setpasswrd] = useState("");
        const [profileImage,setProfileImage]=useState(null);
        const [message,setmessage]=useState("");
        const{signUp} =useContext(AuthContext);

      const  handleFileSubmit=(e)=>{
          let fileObject=e.target.files[0];
          setProfileImage(fileObject);

        }
       const handleSignUp= async()=>{
       
        try{
            let response=await signUp(email,password);
            let uid=response.user.uid;

           const uploadPhotoObject= firebaseStorage.ref(`/profilePhotos/${uid}/image.jpg`).put(profileImage);

           uploadPhotoObject.on('state_changed',fun1,fun2,fun3);

           function fun1(snapshot){

                let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(progress);

           }
           function fun2(error){
               console.log(error);
        }
       async function fun3(){
               
            let photoUrl= await uploadPhotoObject.snapshot.ref.getDownloadURL();
            firebaseDb.collection("users").doc(uid).set({
                email:email,
                userId:uid,
                username:username,
                photoUrl:photoUrl
            })
            props.history.push("/");
        }
        }
        catch(err){
            console.log(err);
            setmessage(err.message);
        }
        }

    return (

        <>
            <h1>Login Page</h1>
            <div>
            <div>
                    Username
                    <input
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div>
                    Email
                    <input
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        value={password}
                        onChange={(e) => setpasswrd(e.target.value)}

                    />
                </div>
                <div>
                    Profile-Photo
                    <input
                       type="file"
                       accept="image/*"
                       onChange={(e)=>{handleFileSubmit(e);
                    }}

                    />
                </div>
            </div>
             <button onClick={handleSignUp}>SignUp</button>
                <h2 style={{color:"red"}}>{message}</h2> 
        </>



    );
}

export default SignUp;