import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const Contents = ({ selectedSmCat, videos }) => {
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    console.log(selectedSmCat);
    const tempVideos = videos.filter((video) => {
      for (let i = 0; i < video.cat_sm_list.length; i++) {
        const cat = video.cat_sm_list[i];
        if (selectedSmCat.has(cat)) {
          return true;
        }
      }
      return false;
    });
    tempVideos.sort((a, b) => {
      return b.num - a.num;
    });
    console.log("tempVideos", tempVideos);
    setFilteredVideos(tempVideos);
  }, [selectedSmCat, videos]);

  return (
    <section className="contents">
      <p>{filteredVideos.length} videos</p>
      <div className="content-container">
        {filteredVideos.map((video) => (
          <VideoCard key={video.num} video={video} />
        ))}
      </div>
    </section>
  );
};

export default Contents;
