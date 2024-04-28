
import React from "react"

function VerifySuccess(){
    return(
        <div class="container text-center">
            <h3>Congratulations, your account has been verified.</h3>
            <h4><a th:href="/@{/login}">Click here to Login</a></h4>
        </div>
    )
}

export default VerifySuccess;