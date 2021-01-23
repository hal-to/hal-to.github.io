import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const Contents = ({ selectedCat, videos }) => {
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    console.log(selectedCat);
    if (selectedCat.size) {
      const tempVideos = videos.filter((video) => {
        const catBig = video.cat_big;
        if (selectedCat.has(catBig)) {
          const selectedSmCatSet = selectedCat.get(catBig);
          const curCatSmSet = new Set(video.cat_sm_list);
          const intersection = Array.from(selectedSmCatSet).filter((x) =>
            curCatSmSet.has(x)
          );
          if (intersection.length > 0) return true;
        }
        return false;
      });
      tempVideos.sort((a, b) => {
        return b.num - a.num;
      });
      console.log("tempVideos", tempVideos);
      setFilteredVideos(tempVideos);
    } else {
      let tempVideos = [...videos];
      tempVideos.sort((a, b) => {
        return b.num - a.num;
      });
      tempVideos = tempVideos.slice(0, 20);
      console.log("tempVideos", tempVideos);
      setFilteredVideos(tempVideos);
    }
  }, [selectedCat, videos]);

  return (
    <section className="contents">
      {selectedCat.size ? (
        <p className="contents__count">{filteredVideos.length} videos</p>
      ) : (
        <p className="contents__count">no selection. latest 20 videos</p>
      )}

      <div className="content-container">
        {filteredVideos.map((video) => (
          <VideoCard key={video.num} video={video} />
        ))}
      </div>
    </section>
  );
};

export default Contents;
