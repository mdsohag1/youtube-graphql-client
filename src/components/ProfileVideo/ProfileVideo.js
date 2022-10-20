import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import "./ProfileVideo.css";

const ProfileVideo = ({ video }) => {
   return (
      <div className="profileVideo">
         <Link
            to={`/video/${video._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
         >
            <div className="videoCard">
               <img src={video.imgUrl} alt="" />
               <h6>{video.tittle}</h6>
               <p>
                  {video.views} views . {format(video.createdAt)}
               </p>
            </div>
         </Link>
      </div>
   );
};

export default ProfileVideo;
