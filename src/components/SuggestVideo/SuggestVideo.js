import React from "react";
import { Link } from "react-router-dom";
import "./SuggestVideo.css";

const SuggestVideo = ({ video }) => {
   return (
      <Link
         to={`/video/${video._id}`}
         style={{ textDecoration: "none", color: "inherit" }}
      >
         <div className="suggestVideo">
            <img src={video.imgUrl} alt="" />
            <div className="text">
               <h5>{video.tittle}</h5>
               <h6>{video.author.name}</h6>
               <p>
                  {video.views} views. {video.date}
               </p>
            </div>
         </div>
      </Link>
   );
};

export default SuggestVideo;
