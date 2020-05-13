import React from 'react';

const title = (str)=> str.charAt(0).toUpperCase() + str.slice(1);

const UserThumbnail = ({user})=>(
    <div className="border border-dark">
{/*"{{url_for('user', username = user.username)}}"*/}
  <a href= '#' class="thumbnail">
    <h3>{title(user.first_name)} {title(user.last_name)}</h3>
    <h1 className='avatar' style={{color:user.color}}>
      {user.first_name[0].toUpperCase()}
    </h1>
  </a>
</div>
)

export default UserThumbnail;