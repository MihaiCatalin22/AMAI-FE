import React from "react";
import "./style/MeetingInfo.css";
import MeetingUpdateForm from "../components/MeetingUpdateForm";

function MeetingUpdatePage(){

    return(
        <div className="meeting-listing-form">
        <MeetingUpdateForm/>
        </div>
    )

}

export default MeetingUpdatePage;