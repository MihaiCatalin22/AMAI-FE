import React from "react"
import Login from "./Login";
import { Link } from "react-router-dom";
import "../../Style/Pages.css";

function RegisterSuccess(){
    return(
        <div className="register-message">
        <h3>You have registered successfully!</h3>
        <p>If you are a teacher, please check your email to verify your account.</p>
        <h4><Link to="/login">Login</Link></h4>
    </div>
    )
}

export default RegisterSuccess;