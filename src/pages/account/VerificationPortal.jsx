import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";


function VerificationPortal(){
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const verificationCode = urlParams.get('code');

    useEffect(() => {
        UserService.verify(verificationCode).then(result => {
            if (result.data == "verify_success") {
                navigate("/verifySuccess");
            } else {
                navigate("/verifyFail");
            }
        });
    }, [navigate, verificationCode]);
    return null;
}

export default VerificationPortal;