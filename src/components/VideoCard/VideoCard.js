import React, { useEffect, useState } from "react";
import "./VideoCard.css";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../skeleton/CardSkeleton";

const VideoCard = ({ video }) => {
   const navigate = useNavigate();
   const handleClick = () => {
      navigate(`/video/${video._id}`);
   };
   console.log(video);

   return (
      <>
         <div className="video">
            <img src={video.imgUrl} alt="" onClick={handleClick} />
            <div className="logo-text">
               <Link to={`/profile/${video.userId}`}>
                  <img src={video.author.img} alt="" />
               </Link>
               <h5>{video.tittle}</h5>
            </div>
            <b>
               <p className="channelname">{video.author.name}</p>
            </b>
            <div className="view-date">
               <p>{video.views} views .</p>
               {/* <p>{format(video.createdAt)}</p> */}
            </div>
         </div>
      </>
   );
};

export default VideoCard;
