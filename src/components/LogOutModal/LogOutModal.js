import React from "react";
import "./LogOutModal.css";
import Channel from "@iconscout/react-unicons/icons/uil-user";
import LogOut from "@iconscout/react-unicons/icons/uil-sign-out-alt";
import Setting from "@iconscout/react-unicons/icons/uil-setting";
import Help from "@iconscout/react-unicons/icons/uil-heart-alt";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userSlice";

const LogOutModal = ({ setOpenLogOut }) => {
   const { currentUser } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleLogOut = () => {
      dispatch(logOut());
      setOpenLogOut(false);
      navigate("/");
   };
   return (
      <div className="logOutModal">
         <div className="main-Modal">
            <span className="cros" onClick={() => setOpenLogOut(false)}>
               X
            </span>
            <div className="itemDiv">
               {currentUser ? (
                  <Link
                     style={{ textDecoration: "none", color: "inherit" }}
                     to={`/profile/${currentUser._id}`}
                  >
                     <div onClick={() => setOpenLogOut(false)}>
                        <Channel color="#000" size={"1.5rem"} />
                        <span> Your Channel</span>
                     </div>
                  </Link>
               ) : null}
               <div>
                  <Setting color="#000" size={"1.5rem"} />
                  <span> Setting</span>
               </div>
               <div>
                  <Help color="#000" size={"1.5rem"} />
                  <span> Help</span>
               </div>
               <div onClick={handleLogOut}>
                  <LogOut color="#000" size={"1.5rem"} />
                  <span> LogOut</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LogOutModal;
