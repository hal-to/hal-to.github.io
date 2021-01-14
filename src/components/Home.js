import React, { useState } from "react";
import Categories from "./ui/Categories";
import ContentNav from "./ui/ContentNav";
import Contents from "./ui/Contents";

const Home = ({ videos }) => {
  const [selectedSmCat, setSelectedSmCat] = useState(new Set());

  return (
    <div className="home">
      <Categories
        selectedSmCat={selectedSmCat}
        setSelectedSmCat={setSelectedSmCat}
        videos={videos}
      />
      <ContentNav />
      <Contents selectedSmCat={selectedSmCat} videos={videos} />
    </div>
  );
};

export default Home;
