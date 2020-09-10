import React from "react";

const User = ({ user, Thumbnail }) => {
  const { username, first_name, last_name, position } = user;
  const x = ["Crew", "Manager"];
  return (
    <article>
      <Thumbnail user={user} />
      <h1>Username: {username}</h1>
      <p>
        Full Name: {first_name} {last_name}
      </p>
      <p>Position: {x[position]}</p>
      <h1>Upcoming Shifts</h1>
    </article>
  );
};

export default User;
