import React, { useState } from "react";
import Categories from "./ui/Categories";
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
      <Contents selectedSmCat={selectedSmCat} videos={videos} />
    </div>
  );
};

export default Home;
