import React from "react";
import TagSection from "../TagSection/TagSection";
import Videos from "../Videos/Videos";
import "./ContentSide.css";

const ContentSide = ({ type }) => {
   return (
      <div className="content-side">
         <TagSection />
         <Videos type={type} />
      </div>
   );
};

export default ContentSide;
