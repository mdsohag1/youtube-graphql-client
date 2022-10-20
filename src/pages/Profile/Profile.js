import React from "react";
import Sidebar from "../../components/SIdebar/Sidebar";
import SingleProfile from "../../components/SingleProfile/SingleProfile";
import "./Profile.css";

const Profile = () => {
   return (
      <div className="profile home">
         <Sidebar />
         <SingleProfile />
      </div>
   );
};

export default Profile;
