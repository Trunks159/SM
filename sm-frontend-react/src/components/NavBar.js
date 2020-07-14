import React from "react";

const NavBar = ({ users }) => (
  <div className="box-1">
    {/*
    <div className="testing">
      <div className="b1">
        Consectetur officia occaecat est enim minim ad consectetur exercitation
        aliqua esse consectetur incididunt. Labore occaecat aliquip velit
        aliquip. Consequat proident labore non Lorem et. Magna eiusmod cillum
        deserunt Lorem magna consequat anim magna nostrud irure nostrud
        deserunt. Dolore proident tempor sit Lorem ad laborum deserunt.
      </div>
      <div className="b2">Commodo veniam consectetur veniam in sint.</div>
      <div className="b3">
        Eiusmod nulla ipsum duis magna veniam veniam ullamco id enim.
      </div>
      <div className="b4">
        Nulla minim consectetur do aliquip sunt. Amet enim amet duis voluptate
        officia mollit et est sint duis aute. Ex nulla aliquip nostrud ullamco
        ut tempor et aliquip ex. Sit fugiat labore anim in tempor laboris aute
        ipsum eiusmod tempor magna Lorem reprehenderit.
      </div>
      <div className="b5">
        Culpa dolore et anim sunt aliquip deserunt. Irure Lorem officia esse
        officia ex et dolore sint sit nostrud ut culpa nisi. Aliqua ipsum fugiat
        reprehenderit nostrud aliqua magna cillum commodo dolor id ex elit.
        Cillum in aliqua velit qui sint officia magna Lorem officia duis aliquip
        cupidatat Lorem sit. Adipisicing cillum veniam ad pariatur magna
        incididunt veniam officia commodo pariatur laboris.
      </div>
    </div>
    */}
    <img
      className="logo"
      src="http://localhost:5000/static/images/logo.png"
      alt="test"
    />
    <hr />
    <p>
      <strong>Workers</strong>
    </p>
    <hr />
    {users.map((user) => (
      <div className="worker">
        <p className="w-name">{user.first_name}</p>
        <button className="plus-btn">
          <p className="plus">+</p>
        </button>
      </div>
    ))}
  </div>
);
export default NavBar;
