import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';


const Login = (props) => {
    const [email, setemail] = useState("");
    const [password, setpasswrd] = useState("");
    let { login } = useContext(AuthContext);
    const[message,setmessage]=useState("");

    const handleLogin= async(e)=>{
        try{
        await login(email,password);
        props.history.push("/");
        }
        catch(err){
            setmessage(err.message);
            setemail("");
            setpasswrd("");

        }
    }

    return (
        <>
            <h1>Login Page</h1>

            <div>
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
            </div>
            <button onClick={handleLogin}>Login</button>
            <h2 style={{color:"red"}}>{message}</h2>
        </>

    );
}

export default Login;