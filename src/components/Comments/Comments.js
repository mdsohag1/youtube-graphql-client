import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Comments.css";
import SingleComment from "../SingleComment/SingleComment";
import basicLogo from "../../img/images.png";

const Comments = ({ comments, author }) => {
   const [newComment, setNewComment] = useState("");

   // const authAxios = axios.create({
   //    baseURL: baseUrl,
   //    headers: {
   //       Authorization: `Bearer ${currentUser ? currentUser.token : null}`,
   //    },
   // });

   // useEffect(() => {
   //    try {
   //       const fetchChannel = async () => {
   //          const resComments = await axios.get(
   //             `${baseUrl}/comments/${videoId}`
   //          );
   //          setComments(resComments.data);
   //       };
   //       fetchChannel();
   //    } catch (error) {}
   // }, [videoId]);

   const handleComment = async () => {
      // await authAxios.post(`/comments/`, {
      //    desc: newComment,
      //    videoId: videoId,
      // });
   };

   return (
      <div className="parent-comment">
         <div className="comment d-flex">
            <div className="videoLogo">
               <img src={author.img} alt="" />
            </div>
            <input
               type="text"
               onChange={(e) => setNewComment(e.target.value)}
               placeholder="add a comment..."
            />
            <button className="btnComment" onClick={handleComment}>
               add comment
            </button>
         </div>
         <div className="mt-4">
            {comments.map((cmt) => (
               <SingleComment comment={cmt} />
            ))}
         </div>
      </div>
   );
};

export default Comments;
