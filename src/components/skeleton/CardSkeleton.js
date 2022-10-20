import React from "react";
import Skeleton from "react-loading-skeleton";
import "./CardSkeleton.css";

const CardSkeleton = ({ cards }) => {
   return Array(cards)
      .fill(0)
      .map((item, i) => (
         <div className="card-skeleton" key={i}>
            <div className="item-1">
               <Skeleton borderRadius={10} height={200} />
            </div>
            <div className="logo-text">
               <Skeleton
                  circle
                  width={40}
                  height={40}
                  style={{ borderRradius: "50%", marginRight: "20px" }}
               />
               <Skeleton width={280} height={20} borderRadius={20} />
            </div>
            <div className="view-date">
               <Skeleton width={200} height={15} borderRadius={20} count={2} />
            </div>
         </div>
      ));
};

export default CardSkeleton;
