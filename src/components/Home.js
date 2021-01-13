import React from "react";
import Categories from "./ui/Categories";
import ContentNav from "./ui/ContentNav";
import Contents from "./ui/Contents";

const Home = () => {
  return (
    <div className="home">
      <Categories />
      <ContentNav />
      <Contents />
    </div>
  );
};

export default Home;
