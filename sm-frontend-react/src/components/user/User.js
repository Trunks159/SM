import React from "react";

const User = ({ user, Thumbnail }) => {
  const { username, first_name, last_name } = user;
  return (
    <article>
      <Thumbnail user={user} />
      <h1>{username}</h1>
      <p>
        {first_name} {last_name}
      </p>
    </article>
  );
};

export default User;
