import React from "react";
import "./Videos.css";
import VideoCard from "../VideoCard/VideoCard";
import { gql, useQuery } from "@apollo/client";
import { RANDOM_VIDEOS } from "../../graphql/Queries/clientQuery";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../skeleton/CardSkeleton";

const Videos = ({ type }) => {
   const { loading, error, data } = useQuery(RANDOM_VIDEOS);

   if (error) return <p>Somthing went wrong</p>;

   return (
      <>
         <div className="videos">
            {loading ? (
               <CardSkeleton cards={12} />
            ) : (
               data.randomVideos.map((video) => (
                  <VideoCard video={video} key={video._id} />
               ))
            )}
         </div>
      </>
   );
};

export default Videos;
