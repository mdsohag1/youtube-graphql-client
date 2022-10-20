import React from "react";
import Sidebar from "../SIdebar/Sidebar";
import TagSection from "../TagSection/TagSection";

const BrowsChannel = () => {
   return (
      <div className="home">
         <Sidebar />
         <div className="content-side">
            <TagSection />
            <div className="BrowsChannel"></div>
         </div>
      </div>
   );
};

export default BrowsChannel;
