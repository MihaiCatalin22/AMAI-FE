import React from "react"

function RegisterSuccess(){
    <div class="container text-center">
        <h3>You have signed up successfully!</h3>
        <p>Please check your email to verify your account.</p>     
        <h4><a th:href="/@{/login}">Click here to Login</a></h4>
    </div>
}

export default RegisterSuccess;