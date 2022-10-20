import React, { useEffect, useState } from "react";
import "./SingleProfile.css";
import Search from "@iconscout/react-unicons/icons/uil-search";
import Edit from "@iconscout/react-unicons/icons/uil-edit-alt";
import ProfileVideo from "../ProfileVideo/ProfileVideo";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { subscription } from "../../redux/userSlice";
import basicLogo from "../../img/images.png";
import basicBanner from "../../img/jn8jyih8obj71.webp";
import EditProfile from "../EditProfile/EditProfile";
import { useQuery } from "@apollo/client";
import { USER, CHANNEL_VIDEO } from "../../graphql/Queries/clientQuery";
import ChannelSkeleton from "../skeleton/ChannelSkeleton";

const SingleProfile = () => {
   const { profileId } = useParams();
   const [open, setOpen] = useState(false);

   const { currentUser } = useSelector((state) => state.user);
   const [channel, setChannel] = useState({});
   const [channelVideo, setChannelVideo] = useState([]);

   const { loading, error, data } = useQuery(USER, {
      variables: { id: profileId },
   });

   console.log(channelVideo);

   const {
      loading: videoLoading,
      error: videoError,
      data: videoData,
   } = useQuery(CHANNEL_VIDEO, {
      variables: { id: profileId },
   });

   useEffect(() => {
      if (loading === false && data) {
         setChannel(data?.user);
      }
   }, [loading, data]);

   useEffect(() => {
      if (videoLoading === false && videoData) {
         setChannelVideo(videoData?.channelVideos);
      }
   }, [videoLoading, videoData]);

   if (loading) return <ChannelSkeleton />;

   if (error || videoError) return <p>somthing went wrong...</p>;

   const handleSubscribe = () => {};

   return (
      <>
         <div className="SingleProfile">
            <div className="cover">
               <img src={channel.coverImg} alt="" />
            </div>
            <div className="p-div">
               <div className="prifileLogo">
                  <div className="d-flex">
                     <div className="p-logo">
                        <img src={channel.img} alt="" />
                     </div>
                     <div className="">
                        <h5>{channel.name}</h5>
                        <p>{channel.subscriber} subscribers.</p>
                     </div>
                  </div>
                  <div>
                     {currentUser._id === profileId ? (
                        <button
                           className="btn btn-primary"
                           style={{ fontWeight: "bold" }}
                           onClick={() => setOpen(true)}
                        >
                           CUSTOMIZE CHANNEL
                        </button>
                     ) : (
                        <button
                           onClick={handleSubscribe}
                           className={
                              currentUser.subscribedUsers.includes(profileId)
                                 ? "subscribed"
                                 : "sub"
                           }
                        >
                           {currentUser.subscribedUsers.includes(profileId)
                              ? "SUBSCRIBED"
                              : "SUBSCRIBE"}
                        </button>
                     )}
                  </div>
               </div>
               <div className="menubar">
                  <span>HOME</span>
                  <span>VIDEOS</span>
                  <span>PLAYLIST</span>
                  <span>COMMUNITY</span>
                  <span>CHANNELS</span>
                  <span>ABOUT</span>
                  <span>
                     <Search color="" size={"1.2rem"} />
                  </span>
                  {currentUser._id === profileId && (
                     <span
                        onClick={() => setOpen(true)}
                        className="editProfile"
                     >
                        <Edit color="" size={"1.6rem"} />
                     </span>
                  )}
               </div>
            </div>
            <div className="p-videos">
               <div className="pv">
                  {channelVideo.map((video) => (
                     <ProfileVideo key={video._id} video={video} />
                  ))}
               </div>
            </div>
         </div>
         {open && <EditProfile setOpen={setOpen} />}
      </>
   );
};

export default SingleProfile;
