import React, { useEffect, useState } from "react";

function ProfileInfo({ profile }) {
  const { firstName, lastName, position, id } = profile;
  const [state, setState] = useState({ availability: [], requestOffs: [] });
  useEffect(() => {
    fetch(`/get_user_availability/${id}`)
      .then((response) => response.json())
      .then(({ availability, requestOffs, wasSuccessful }) => {
        wasSuccessful && setState({ ...state, availability, requestOffs });
      });
  }, []);
  return (
    <div>
      <h2>Team Member Profile Info</h2>
      <div>
        <div>
          <h1>{profile.firstName.charAt(0)}</h1>
          <div>
            <h3>
              {profile.firstName} {profile.lastName}
            </h3>
            <p>{profile.position}</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Availability</h2>
        <ol></ol>
      </div>
      <div>
        <h2>Request Offs</h2>
        <ol></ol>
      </div>
    </div>
  );
}

export default ProfileInfo;
