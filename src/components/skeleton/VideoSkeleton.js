import React from "react";
import "./CardSkeleton.css";
import Skeleton from "react-loading-skeleton";

const VideoSkeleton = () => {
   return (
      <div className="videoSkeleton">
         <div className="left">
            <Skeleton width={1100} height={650} borderRadius={10} />
            <div className="linkSection">
               <Skeleton
                  count={2}
                  width={200}
                  height={20}
                  borderRadius={10}
                  style={{ marginTop: "10px" }}
               />
               <div style={{ display: "flex" }}>
                  <Skeleton
                     borderRadius={50}
                     width={60}
                     height={40}
                     style={{ marginLeft: "20px" }}
                  />
                  <Skeleton
                     borderRadius={50}
                     width={60}
                     height={40}
                     style={{ marginLeft: "20px" }}
                  />
                  <Skeleton
                     borderRadius={50}
                     width={60}
                     height={40}
                     style={{ marginLeft: "20px" }}
                  />
                  <Skeleton
                     borderRadius={50}
                     width={60}
                     height={40}
                     style={{ marginLeft: "20px" }}
                  />
                  <Skeleton
                     borderRadius={50}
                     width={60}
                     height={40}
                     style={{ marginLeft: "20px" }}
                  />
               </div>
            </div>
            <hr style={{ height: "2px", marginTop: "10px" }} />
            <div>
               <div></div>
               <div></div>
            </div>
         </div>
         <div className="right">
            {Array(20)
               .fill(0)
               .map((item, i) => (
                  <div className="suggestVideo" key={i}>
                     <Skeleton
                        width={200}
                        height={120}
                        borderRadius={6}
                        style={{ marginRight: "20px" }}
                     />
                     <div>
                        <Skeleton
                           width={200}
                           height={20}
                           borderRadius={10}
                           count={3}
                           style={{ marginTop: "10px" }}
                        />
                     </div>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default VideoSkeleton;
