import React from "react";
import ContentSide from "../../components/ContentSide/ContentSide";
import Sidebar from "../../components/SIdebar/Sidebar";
import "./Home.css";

const Home = ({ type }) => {
   return (
      <div className="home">
         <Sidebar />
         <ContentSide type={type} />
      </div>
   );
};

export default Home;
