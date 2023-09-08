import React, { useState } from "react";
import "../Styles/Sidebar.scss";
import tokenaddressico from "../assest/ic_baseline-token.png";
import pairaddressico from "../assest/fluent_pair-24-filled.png";
import topicon from "../assest/topico.png";
import facebk from "../assest/facebook.png";
import linkedin from "../assest/linkedin.png";
import menu from "../assest/menubar.png";
import twitter from "../assest/twitter.png";
import PairAddress from "../Pages/PairAddress";
import TokenAddress from "../Pages/TokenAddress";

function Sidebar() {
  const [sidebardata, setSidebardata] = useState([
    {
      name: "Token Address",
      image: tokenaddressico,
      active: "active",
    },
    {
      name: "Pair Address",
      image: pairaddressico,
      active: "none",
    },
  ]);
  const [currentindex, setCurrentindex] = useState(0);

  return (
    <div className="page" id="page">
      <div className="sidebar" id="sidebar">
        <div className="logotop">
          <img className="menu" src={menu} alt="" />
          <img className="topic" src={topicon} alt="" />
          <h2>NFTify</h2>
          <div className="connect">
            <button>Connect</button>
        </div>
        </div>
        <div className="sidebartab">
          {sidebardata.map((item, index) => (
            <div
              onClick={() => {
                setCurrentindex(index);
                const updatedData = sidebardata.map((dataItem, dataIndex) => ({
                  ...dataItem,
                  active: dataIndex === index ? "active" : "none",
                }));
                setSidebardata(updatedData);
              }}
              className={`sidebartab-data ${item.active}`}
              key={index}
            >
              <img src={item.image} alt="" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="social">
          <img src={facebk} alt="" />
          <img src={linkedin} alt="" />
          <img src={twitter} alt="" />
        </div>
      </div>

      <div className="component">
        {currentindex === 0 ? <TokenAddress /> : <PairAddress />}
      </div>
    </div>
  );
}

export default Sidebar;
