import React from "react"
import "../../Style/Pages.css";

function VerifySuccess(){
    return(
        <div className="container text-center">
            <h3>Congratulations, your account has been verified.</h3>
            <h4><a th:href="/@{/login}">Click here to Login</a></h4>
        </div>
    )
}

export default VerifySuccess;