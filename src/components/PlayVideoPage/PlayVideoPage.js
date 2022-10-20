import React, { useEffect, useState } from "react";
import "./PlayVideoPage.css";
import Like from "@iconscout/react-unicons/icons/uil-thumbs-up";
import Share from "@iconscout/react-unicons/icons/uil-share";
import Save from "@iconscout/react-unicons/icons/uil-save";
import Clip from "@iconscout/react-unicons/icons/uil-times";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import SuggestVideo from "../SuggestVideo/SuggestVideo";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { dislike, fetchSuccess, like } from "../../redux/videoSlice";
import { subscription } from "../../redux/userSlice";
import Comments from "../Comments/Comments";
import basicLogo from "../../img/images.png";
import { VerifyAuth } from "../../VerifyAuth";
import { RANDOM_VIDEOS, VIDEOS_BY_ID } from "../../graphql/Queries/clientQuery";
import { useQuery } from "@apollo/client";
import VideoSkeleton from "../skeleton/VideoSkeleton";

const PlayVideoPage = () => {
   const { videoId } = useParams();
   const dispatch = useDispatch();

   const { loading, error, data } = useQuery(VIDEOS_BY_ID, {
      variables: { id: videoId },
   });
   const {
      loading: rLoading,
      error: rError,
      data: rData,
   } = useQuery(RANDOM_VIDEOS);

   const [suggestVideo, setSuggestVideo] = useState([]);

   useEffect(() => {
      if (loading === false && data) {
         dispatch(fetchSuccess(data?.video));
      }
   }, [loading, data]);

   useEffect(() => {
      if (rLoading === false && rData) {
         setSuggestVideo(rData?.randomVideos);
      }
   }, [rLoading, rData]);

   let { currentVideo } = useSelector((state) => state.video);
   const { currentUser } = useSelector((state) => state.user);

   if (loading) return <VideoSkeleton />;
   if (error) return <p>Somthing went wrong</p>;
   if (rError) return <p>Somthing went wrong</p>;

   const handleLike = async () => {};
   const handleDislike = async () => {};
   const handleSubscribe = async () => {};

   return (
      <div className="playvideo">
         <div className="left">
            <video src={currentVideo.videoUrl} controls autoPlay></video>
            <div className="linkSection">
               <div className="title">
                  <h5>{currentVideo.tittle}</h5>
                  <div className="views">
                     <span>{currentVideo.views} views . </span>
                     <span>{format(currentVideo.createdAt)}</span>
                  </div>
               </div>
               <div className="linkIcons">
                  {currentUser ? (
                     <div onClick={handleLike}>
                        {currentVideo.likes.includes(currentUser._id) ? (
                           <FaThumbsUp size={"1.4rem"} color="#000" />
                        ) : (
                           <Like color="#000" size={"1.5rem"} />
                        )}
                        <span>{currentVideo.likes?.length}</span>
                     </div>
                  ) : (
                     <div>
                        <Like color="#000" size={"1.5rem"} />
                        <span>{currentVideo.likes?.length}</span>
                     </div>
                  )}
                  {currentUser ? (
                     <div onClick={handleDislike}>
                        {currentVideo.dislikes.includes(currentUser._id) ? (
                           <FaThumbsDown size={"1.4rem"} color="#000" />
                        ) : (
                           <FaThumbsDown
                              size={"1.4rem"}
                              color="rgb(145, 145, 145)"
                           />
                        )}
                        <span>DISLIKE</span>
                     </div>
                  ) : (
                     <FaThumbsDown size={"1.4rem"} color="rgb(145, 145, 145)" />
                  )}
                  <div>
                     <Share color="#000" size={"1.5rem"} />
                     <span>SHARE</span>
                  </div>
                  <div>
                     <Clip color="#000" size={"1.5rem"} />
                     <span>CLIP</span>
                  </div>
                  <div>
                     <Save color="#000" size={"1.5rem"} />
                     <span>SAVE</span>
                  </div>
               </div>
            </div>
            <hr />
            <div className="subscribe">
               <div className="d-flex">
                  <div className="videoLogo">
                     <img src={currentVideo.author.img} alt="" />
                  </div>
                  <div className="des">
                     <h5>{currentVideo.author?.name}</h5>
                     <p>{currentVideo.author?.subscriber} Subscriber</p>
                     <div></div>
                  </div>
               </div>
               <div onClick={handleSubscribe}>
                  <button
                     // className={
                     //    currentUser.subscribedUsers.includes(channel._id)
                     //       ? "subscribed"
                     //       : "sub"
                     // }
                     className="sub"
                  >
                     {/* {currentUser.subscribedUsers.includes(channel._id)
                        ? "SUBSCRIBED"
                        : "SUBSCRIBE"} */}
                     SUBSCRIBE
                  </button>
               </div>
            </div>
            <div>
               <p className="description">{currentVideo.desc}</p>
            </div>
            <hr />
            <Comments
               comments={currentVideo.comments}
               author={currentVideo.author}
            />
         </div>
         <div className="right">
            {suggestVideo.map((video) => (
               <SuggestVideo key={video._id} video={video} />
            ))}
         </div>
      </div>
   );
};

export default PlayVideoPage;
