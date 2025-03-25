import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance";

import '../styles/login.css';
import { useState } from "react";

function Login({setToken}) {
    const [user,setUser] = useState({
        email:"",
        password:""
    });
    const [error,setError] = useState("");
    const [isError,setIsError] = useState(false);

    const navigate = useNavigate();

      /* Axios.get("https://localhost:7028/api/todo")
      .then((res) => {
        console.log(res.data);
      }); */
    function handleLogin(e)
     {
        e.preventDefault();
        setError("");
        setIsError(false);
        
        axiosInstance.post("/auth/login",user)
            .then((res) => {
                const token = res.data;
                localStorage.setItem('token', token);
                setToken(token);
                navigate('/todoPage');
            })
            .catch((err) => {
                if(err.response && err.response.status === 401)
                    {
                        setError("Email or password is incorrect");
                        setIsError(true);
                    }
                else{
                    setError("An error occurred. Please try again later.");
                }
            })
    }



    function handleChange(e)
    {
        const {name,value} = e.target;

        setUser((prev) => ({
            ...prev,
            [name] : value
        }));
    }

    

    
    return (
    <div className="login-body">
        <div className="login-wrapper">
        <div className="form-header">
            <div className="titles">
                <div className="title-login">Login</div>
            </div>
        </div>
        <form onSubmit={handleLogin} className="login-form" autoComplete="off">
            {error && <p className="error-mesage">{error}</p>}
            <div className="input-box">
                <input 
                    type="text" 
                    className = {`input-field ${isError ? "input-error" : ""}`}
                    id="log-email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required />
                <label htmlFor="log-email" className="label">Email</label>
            </div>
            <div className="input-box">
                <input 
                type="password" 
                className= {`input-field ${isError ? "input-error" : ""}`}
                id="log-pass" 
                onChange={handleChange}
                name="password"
                value={user.password}
                required/>
                <label htmlFor="log-pass" className="label">Password</label>
            </div>
            <div className="form-cols">
                <div className="col-1"></div>
                <div className="col-2">
                    
                </div>
            </div>
            <div className="input-box">
                <button type="submit" className="btn-submit" id="SignInBtn">Sign In <i className='bx bx-log-in' ></i></button>
            </div>
            <div className="switch-form">
                <span>Don't have an account? <a href="register">Register</a></span>
            </div>
        </form>
     </div>
     </div>
        
    );
  }
  
  export default Login;