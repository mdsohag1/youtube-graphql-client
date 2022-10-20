import React from "react";
import "./Sidebar.css";
import Home from "@iconscout/react-unicons/icons/uil-home";
import Explore from "@iconscout/react-unicons/icons/uil-yen-circle";
import Shorts from "@iconscout/react-unicons/icons/uil-compass";
import Subscription from "@iconscout/react-unicons/icons/uil-money-insert";
import Library from "@iconscout/react-unicons/icons/uil-minus-path";
import History from "@iconscout/react-unicons/icons/uil-history";
import Videos from "@iconscout/react-unicons/icons/uil-video-question";
import WatchLater from "@iconscout/react-unicons/icons/uil-eye";
import Likes from "@iconscout/react-unicons/icons/uil-thumbs-up";
import BrowsChannel from "@iconscout/react-unicons/icons/uil-plus-circle";
import Gaming from "@iconscout/react-unicons/icons/uil-game-structure";
import Sports from "@iconscout/react-unicons/icons/uil-tennis-ball";
import Youtube from "@iconscout/react-unicons/icons/uil-youtube";
import User from "@iconscout/react-unicons/icons/uil-user";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
   const { currentUser } = useSelector((state) => state.user);
   return (
      <div className="sidebar">
         <div className="sidebar-icons">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
               <div className="icon">
                  <Home color="#000" size={"1.5rem"} />
                  <span>Home</span>
               </div>
            </Link>
            <Link
               to={"/trend"}
               style={{ textDecoration: "none", color: "inherit" }}
            >
               <div className="icon">
                  <Explore color="#000" size={"1.5rem"} />
                  <span>Explore</span>
               </div>
            </Link>
            <div className="icon">
               <Shorts color="#000" size={"1.5rem"} />
               <span>Shorts</span>
            </div>
            <Link
               to={"/subscription"}
               style={{ textDecoration: "none", color: "inherit" }}
            >
               <div className="icon">
                  <Subscription color="#000" size={"1.5rem"} />
                  <span>Subscriptions</span>
               </div>
            </Link>
            <hr />
            <div className="icon">
               <Library color="#000" size={"1.5rem"} />
               <span>Library</span>
            </div>
            <div className="icon">
               <History color="#000" size={"1.5rem"} />
               <span>History</span>
            </div>
            <div className="icon">
               <Videos color="#000" size={"1.5rem"} />
               <span>Your videos</span>
            </div>
            <div className="icon">
               <WatchLater color="#000" size={"1.5rem"} />
               <span>Watch later</span>
            </div>
            <div className="icon">
               <Likes color="#000" size={"1.5rem"} />
               <span>Likes videos</span>
            </div>
            <hr />
            <h6>Subscriptions</h6>
            {!currentUser && (
               <Link
                  to={"/signin"}
                  style={{ textDecoration: "none", color: "inherit" }}
               >
                  <div className="icon">
                     <User color="#000" size={"1.5rem"} />
                     <span>SignIn</span>
                  </div>
               </Link>
            )}
            <div className="icon">
               <BrowsChannel color="#000" size={"1.5rem"} />
               <span>Browschannels</span>
            </div>
            <hr />
            <h6>Explore</h6>
            <div className="icon">
               <Gaming color="#000" size={"1.5rem"} />
               <span>Gaming</span>
            </div>
            <div className="icon">
               <Sports color="#000" size={"1.5rem"} />
               <span>Sports</span>
            </div>
            <hr />
            <h6>MORE FROM YOUTUBE</h6>
            <div className="icon">
               <Youtube color="red" size={"1.5rem"} />
               <span>Creator Studio</span>
            </div>
            <div className="icon">
               <Youtube color="red" size={"1.5rem"} />
               <span>Youtube Music</span>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
