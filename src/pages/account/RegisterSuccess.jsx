import React from "react"
import Login from "./Login";
import { Link } from "react-router-dom";
import "../../Style/Pages.css";

function RegisterSuccess(){
    return(
        <div class="container text-center">
        <h3>You have signed up successfully!</h3>
        <p>Please check your email to verify your account.</p>     
        <h4><Link to="/login">Login</Link></h4>
    </div>
    )
}

export default RegisterSuccess;