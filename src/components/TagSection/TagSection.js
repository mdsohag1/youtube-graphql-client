import React from "react";
import "./TagSection.css";

const TagSection = () => {
   return (
      <div className="tag-section">
         <button className="tag-btn active">All</button>
         <button className="tag-btn">Javascript</button>
         <button className="tag-btn">Natok</button>
         <button className="tag-btn">Music</button>
         <button className="tag-btn">Movie</button>
         <button className="tag-btn">Drama</button>
         <button className="tag-btn">Programming</button>
         <button className="tag-btn">Learning</button>
         <button className="tag-btn">Bangla Natok</button>
         <button className="tag-btn">CSS</button>
         <button className="tag-btn">Mongodb</button>
         <button className="tag-btn">Node</button>
      </div>
   );
};

export default TagSection;
