import React, { useState } from "react";
import "./Header.css";
import Voice from "@iconscout/react-unicons/icons/uil-microphone";
import Search from "@iconscout/react-unicons/icons/uil-search";
import Videos from "@iconscout/react-unicons/icons/uil-upload";
import Notification from "@iconscout/react-unicons/icons/uil-bell";
import User from "@iconscout/react-unicons/icons/uil-user";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import basicLogo from "../../img/images.png";

//data
import logo from "../../img/logo.png";
import Bars from "@iconscout/react-unicons/icons/uil-bars";
import Upload from "../Upload/Upload";
import LogOutModal from "../LogOutModal/LogOutModal";

const Header = () => {
   const [openModal, setOpenModal] = useState(false);
   const [openLogOut, setOpenLogOut] = useState(false);
   const [q, setQ] = useState("");

   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/search?q=${q}`);
   };
   return (
      <>
         <div className="header">
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
               <div className="logo">
                  <Bars color="#000" size={"1.5rem"} />
                  <img src={logo} alt="" />
                  <span>AliTube</span>
               </div>
            </Link>
            <div className="search-aria">
               <div className="search">
                  <Search color="#000" size={"1.2rem"} />
                  <input
                     type="text"
                     placeholder="Search"
                     onChange={(e) => setQ(e.target.value)}
                  />
               </div>
               <div className="icon-right" onClick={handleClick}>
                  <Search color="#000" size={"1.5rem"} />
               </div>
               <div className="voice">
                  <Voice color="#000" size={"1.5rem"} />
               </div>
            </div>
            <div className="aria-right">
               <span onClick={() => setOpenModal(true)}>
                  <Videos color="#000" size={"1.8rem"} />
               </span>
               <Notification color="#000" size={"1.8rem"} />
               {currentUser ? (
                  <div className="d-flex">
                     <div className="user" onClick={() => setOpenLogOut(true)}>
                        <img
                           src={currentUser ? currentUser.img : basicLogo}
                           alt=""
                        />
                     </div>

                     <span>
                        <b>{currentUser.name}</b>
                     </span>
                  </div>
               ) : (
                  <Link
                     to={"/signin"}
                     style={{ textDecoration: "none", color: "inherit" }}
                  >
                     <User color="#000" size={"1.8rem"} />
                  </Link>
               )}
            </div>
         </div>
         {openModal && <Upload setOpen={setOpenModal} />}
         {openLogOut && <LogOutModal setOpenLogOut={setOpenLogOut} />}
      </>
   );
};

export default Header;
