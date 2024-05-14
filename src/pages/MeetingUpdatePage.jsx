import React from "react";
import "../Style/Pages.css";
import MeetingUpdateForm from "../components/MeetingUpdateForm";

function MeetingUpdatePage(){

    return(
        <div className="meeting-listing-form">
        <MeetingUpdateForm/>
        </div>
    )

}

export default MeetingUpdatePage;