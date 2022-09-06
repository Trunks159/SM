import React, { Component } from "react";
import Tabs1 from "./Tabs1";
import Tabs2 from "./Tabs2";
import "./nav.css";
import { Collapse } from "@mui/material";
import WeekBar from "./WeekBar";

class SideNav extends Component {
  state = {
    menu: null,
  };

  changeMenu = (menuTitle) => {
    menuTitle = this.state.menu === menuTitle ? null : menuTitle;
    this.setState({ menu: menuTitle });
  };

  render() {
    const { selectedWeek } = this.props;
    const { menu } = this.state;
    console.log("Menu: ", menu);
    return (
      <>
        <div className="placeholder-nav"></div>
        <div className="side-navbar">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 70,
              background: "#51636D",
            }}
          >
            <Tabs1 dayIndex={0} weekId={selectedWeek && selectedWeek.id} />
            <Tabs2 changeMenu={this.changeMenu} selectedWeek={selectedWeek} />
          </div>

          <Collapse in={Boolean(menu)} orientation={"horizontal"} timeout={70}>
            <div className="nav-menu">
              {selectedWeek && <WeekBar menu={menu} week={selectedWeek.week} />}

              <div style={{ display: menu === "search" ? "flex" : "none" }}>
                Search
                <div>
                  Officia elit ipsum ut consectetur ut occaecat esse ea aliquip
                  qui reprehenderit ullamco duis laboris. Exercitation culpa
                  dolor sint id cillum. In eu pariatur cupidatat minim labore
                  non ut. Sunt aute adipisicing duis aliquip officia incididunt
                  ea ad excepteur cupidatat adipisicing sit. Laborum ipsum et
                  aliqua deserunt ullamco consectetur quis id dolore tempor
                  sunt. Et aliquip Lorem culpa elit sit amet exercitation velit
                  et cupidatat consequat. Laborum consequat aliqua duis nisi
                  ullamco culpa esse. Dolore esse ipsum id nulla dolore quis
                  nisi et quis. Ut dolore amet pariatur sint sit fugiat labore
                  ea tempor id. Aliquip et pariatur commodo aute elit ipsum
                  adipisicing occaecat pariatur. Sunt adipisicing velit do
                  pariatur duis elit commodo. Aute commodo occaecat quis ullamco
                  est. Culpa in incididunt eu officia et laboris mollit
                  cupidatat nisi aliqua exercitation veniam nisi sint. Cillum
                  cillum dolore do ut irure adipisicing laborum sint mollit.
                  Adipisicing nostrud fugiat eiusmod veniam nostrud minim dolore
                  pariatur labore pariatur esse ex eu. Ut eiusmod nostrud
                  pariatur labore occaecat. Elit eu elit enim irure culpa in
                  tempor id. Duis elit incididunt fugiat cillum dolore.
                  Exercitation minim dolor ipsum consequat in labore nulla.
                  Tempor laborum ad aliqua cillum culpa do laboris proident.
                  Adipisicing anim laborum irure commodo et. Anim aute tempor
                  nisi cupidatat nisi nostrud nulla amet aliqua. Commodo quis ea
                  laboris laborum qui elit velit consectetur. Eu ullamco sit
                  laboris eiusmod sit et eiusmod dolor enim incididunt proident
                  labore. Aute do velit ut adipisicing excepteur. Reprehenderit
                  fugiat nostrud anim nisi ex id consectetur. Anim quis ex magna
                  cupidatat exercitation nisi excepteur qui velit. Elit
                  cupidatat incididunt in occaecat aliqua nisi magna esse aute
                  qui pariatur aute proident ut. Labore adipisicing duis
                  voluptate labore mollit nostrud fugiat magna veniam ad.
                  Aliquip adipisicing ipsum commodo ex ullamco esse dolore dolor
                  commodo sint qui incididunt aliquip sint. Mollit quis pariatur
                  consectetur non ut elit sint esse aute sit pariatur aliquip
                  sint. Officia irure excepteur deserunt quis fugiat nulla magna
                  nulla minim in veniam fugiat. Veniam pariatur sunt cupidatat
                  officia dolor et Lorem do do. Exercitation ad voluptate sit
                  officia et in dolore ea ut reprehenderit amet nisi ut. Eiusmod
                  dolor ut non anim Lorem ea cupidatat nulla anim consectetur
                  tempor. Officia occaecat duis id laboris proident commodo
                  veniam qui. Labore in aliquip consequat eu ex aliquip. Id
                  culpa est pariatur do aliqua nulla non veniam. Incididunt
                  deserunt cillum ullamco ea Lorem ullamco nostrud cillum
                  incididunt proident eu non adipisicing. Enim labore voluptate
                  tempor ea sunt ullamco aliqua ea ex excepteur nulla. Anim
                  commodo exercitation ex magna consequat laboris ex est
                  exercitation consequat ut eu exercitation. Excepteur ex
                  nostrud excepteur et id. Laborum laboris non ad reprehenderit
                  laborum incididunt reprehenderit elit non tempor qui eiusmod
                  aute. Anim incididunt irure irure sint in magna id velit
                  proident. Cillum nisi adipisicing ex est. Nisi ullamco
                  occaecat est cupidatat enim non ad eu. Dolore velit nostrud
                  laboris aliqua minim eu laborum. In magna qui ea pariatur
                  cillum Lorem aute.
                </div>
              </div>
              <div style={{ display: menu === "settings" ? "flex" : "none" }}>
                Settings
              </div>
            </div>
          </Collapse>
        </div>
      </>
    );
  }
}

export default SideNav;
