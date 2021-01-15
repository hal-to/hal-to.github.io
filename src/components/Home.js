import React, { useState } from "react";
import Categories from "./ui/Categories";
import Contents from "./ui/Contents";

const Home = ({ videos }) => {
  const [selectedCat, setSelectedCat] = useState(new Map());

  return (
    <div className="home">
      <Categories
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        videos={videos}
      />
      <Contents selectedCat={selectedCat} videos={videos} />
    </div>
  );
};

export default Home;
