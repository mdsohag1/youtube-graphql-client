import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/SIdebar/Sidebar";
import SuggestVideo from "../SuggestVideo/SuggestVideo";
import TagSection from "../TagSection/TagSection";
import "./Search.css";

const Search = () => {
   const baseUrl = "http://localhost:5000/api";
   const [videos, setVideos] = useState([]);
   const query = useLocation().search;

   useEffect(() => {
      const fetchingVideo = async () => {
         const res = await axios.get(`${baseUrl}/videos/search${query}`);
         setVideos(res.data);
      };
      fetchingVideo();
   }, [query]);

   return (
      <div className="home">
         <Sidebar />
         <div className="content-side">
            <TagSection />
            <div className="searchVideo">
               {videos.map((vd) => (
                  <SuggestVideo video={vd} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Search;
