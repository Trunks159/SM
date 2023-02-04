import { Breadcrumbs, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { MyInput } from "../../forms/StyledComponents";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import "./TeamMemberDetails.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function TeamMemberDetails({ id }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const [teamMember, setTeamMember] = useState(null);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  useEffect(()=>{
    pathnames.map((name, index)=>(
      <Link to = { (()=>{
          const x = pathnames.slice(0, index + 1);
          let path = '';
          for(let item of x){
            path += `/${item}`
          }
          console.log('Here goes : ',  path)
      })() }>

      </Link>
    ))
  }, [pathnames]);

  useEffect(() => {
    fetch(`/team_member_details/${id}`)
      .then((response) => response.json())
      .then(({ user }) => {
        //this is where i should handle there being no user
        //but im lazy
        setTeamMember(user);
      });
  }, []);
  function handleChange(e) {
    setTeamMember({ ...teamMember, [e.target.name]: e.target.value });
  }
/*
  Breadcrumbs are a set of links that have the location of
  each thing

*/
  return (
    teamMember && (
      <div className="tm-details">
        <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
        <h1>{teamMember.firstName.charAt(0)}</h1>
        <MyInput
          disabled={!Boolean(teamMember.username)}
          label="Username"
          variant="outlined"
          value={teamMember.username || "Hasn't registered"}
          onChange={handleChange}
          name="firstName"
        />
        <MyInput
          label="First Name"
          variant="outlined"
          value={teamMember.firstName}
          onChange={handleChange}
          name="firstName"
        />
        <MyInput
          label="First Name"
          variant="outlined"
          value={teamMember.firstName}
          onChange={handleChange}
          name="firstName"
        />
        <h2>Availability</h2>
        <p>{"Set the time(s) you're available on each of the given days."}</p>
        <h2>Request Offs</h2>
        <p>This is where you can request off for any set of time.</p>
        <div className="upcoming-requests">
          <Button>View All</Button>
          <ol>
            {teamMember.requestOffs.length ? (
              <div>Daydate and time restriction</div>
            ) : (
              <h3>No upcoming request offs</h3>
            )}
          </ol>
          <Button>
            <img src={editIcon} />
          </Button>
          <Button>
            <img src={addIcon} />
          </Button>
        </div>
      </div>
    )
  );
}

export default TeamMemberDetails;
