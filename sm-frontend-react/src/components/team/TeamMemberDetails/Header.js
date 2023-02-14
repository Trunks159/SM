import React from 'react';

function Header({firstName, lastName, username}) {
    return (   <div className="header">
          <h1>{firstName.charAt(0)}</h1>
          <h1>{username || firstName}</h1>
          <h3>View edit your info here</h3>
        </div>);
}

export default Header;