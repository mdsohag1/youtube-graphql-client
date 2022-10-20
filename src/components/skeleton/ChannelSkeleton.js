import React from "react";
import "./CardSkeleton.css";
import Skeleton from "react-loading-skeleton";

const ChannelSkeleton = () => {
   return (
      <div className="ChannelSkeleton">
         <Skeleton
            style={{ width: "100%", height: "300px", overflow: "hidden" }}
         />
         <div className="clogo">
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
               }}
            >
               <Skeleton circle width={60} height={60} />
               <Skeleton
                  width={150}
                  height={25}
                  borderRadius={10}
                  style={{ marginLeft: "20px" }}
               />
            </div>
            <Skeleton width={200} height={30} borderRadius={10} />
         </div>
         <div className="icon-skeleton">
            {Array(8)
               .fill(0)
               .map((item, i) => (
                  <Skeleton
                     key={i}
                     width={60}
                     height={15}
                     style={{ marginRight: "30px" }}
                     borderRadius={5}
                  />
               ))}
         </div>
      </div>
   );
};

export default ChannelSkeleton;
