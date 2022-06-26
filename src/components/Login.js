import React from "react";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import PlantList from "./Plantlist";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () =>{

    const [user, setUser] = useState({
        username: '', password: ''
    })

    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value})
    }

    const login = () => {
        fetch('api/auth/signin',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {if(response.status === 401){
                toast.warn("Check your username and password",{
                position: toast.POSITION.BOTTOM_LEFT
                })
            }else{
                return(response.json());
            }
        })
        .then(response => {
            const jwtToken = response.accessToken;
            if(jwtToken !== null){
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }else{
                toast.warn("Check your username and password",{
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
        })
        .catch(err=> console.error(err))
    }





    if(isAuthenticated === true){
        return (<PlantList/>)
    }else{
        return (
            <div>
                <TextField name="username" label="Username" onChange={handleChange}/>
                <br/>
                <TextField name="password" label="Password" onChange={handleChange}/>
                <br/>
                <br/>
                <Button variant="outlined" color="primary" onClick={login}>Login</Button>
                <ToastContainer autoClose={1500}/>
            </div>
        );   
    }
}

export default Login;