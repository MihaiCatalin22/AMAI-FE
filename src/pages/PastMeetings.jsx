import React , {useState, useEffect}from "react";
import AgendaService from "../Services/AgendaService";
import Meeting from "../components/Meeting";
import Search from "../layoutComponents/Search";
import "../Style/Pages.css"

function PastTalks() {
  const [pastMeetings, setPastMeetings] = useState([]);

  useEffect(() => {
    AgendaService.getPastEvents().then(result => {
      setPastMeetings(result.data);
      console.log(pastMeetings);
    }).catch(error => console.error("Error fetching past meetings:", error));
  }, []);

  const handleSearch = (searchResults) => {
    setPastMeetings(searchResults);
  };

      return (
        <>
        <Search onSearch={handleSearch}/>
         <div className="home">
          <div className="meetings-wrapper">
              <div><label className="page-tittle">Past Meetings</label></div>
              <div className="meeting-list">
              {pastMeetings.map(meeting => (
                <Meeting key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
        </div>
        </>
      );
    }

export default PastTalks;