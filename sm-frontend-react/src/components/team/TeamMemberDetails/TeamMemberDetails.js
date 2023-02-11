import { Breadcrumbs, Button, Slider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { MyInput } from "../../forms/StyledComponents";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import "./TeamMemberDetails.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MySlider from "./MySlider";
import saveIcon from "./assets/Save Icon.svg";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const StyledBreadcrumbs = styled(Breadcrumbs)({
  marginLeft: 90,
});

const StyledSaveButton = styled(Button)({
  textTransform: "none",
  background: "#568692",
  color: "white",
  '&:hover':{
    background : '#0B7792',
  }
});

function SaveButton(props) {
  const handleSave = () => {
    console.log("Saving");
  };
  return (
    <StyledSaveButton
      endIcon={<img alt="save" src={saveIcon} />}
      onClick={() => handleSave(props)}
    >
      Save Changes
    </StyledSaveButton>
  );
}

function TeamMemberDetails({ id }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const [teamMember, setTeamMember] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (teamMember) {
      const pathnames = location.pathname.split("/").filter((x) => x);
      setBreadCrumbs(
        pathnames.map((name, index) => {
          const to = (() => {
            const pathnamesSlice = pathnames.slice(0, index + 1);
            let to = "";
            for (let pathname of pathnamesSlice) {
              to += `${index === 0 ? "" : "/"}${pathname}`;
            }
            return to;
          })();
          const isActive = index === pathnames.length - 1;
          return (
            <Link to={to} className={`breadcrumb${isActive ? "-active" : ""}`}>
              {isActive ? teamMember.username || teamMember.firstName : name}
            </Link>
          );
        })
      );
    }
  }, [location, teamMember]);

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

  function handleSave(){
    
  } 

  console.log("Bread: ", breadcrumbs);
  return (
    teamMember && (
      <div className="tm-details">
        <StyledBreadcrumbs
          separator={
            <NavigateNextIcon
              style={{ color: grey[900], opacity: 0.57 }}
              fontSize="small"
            />
          }
        >
          {breadcrumbs}
        </StyledBreadcrumbs>
        <div className="letter">
          <h1>{teamMember.firstName.charAt(0)}</h1>
        </div>
        <div className="">
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
            label="Last Name"
            variant="outlined"
            value={teamMember.lastName}
            onChange={handleChange}
            name="lastName"
          />
          <SaveButton onClick = {()=>handleSave('names')}/>
        </div>
        <div>
          <h2>Availability</h2>
          <p>{"Set the time(s) you're available on each of the given days."}</p>
          <ol>
            {teamMember.availability.map((availability, index) => (
              <li key={index}>
                <h5>{DAYS_OF_WEEK[index]}</h5>
                <MySlider availability={availability} />
              </li>
            ))}
          </ol>
          <SaveButton onClick = {()=>handleSave('availability')} />
        </div>
        <div>
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
          <SaveButton onClick = {()=>handleSave('requestOffs')}/>
        </div>
      </div>
    )
  );
}

export default TeamMemberDetails;
