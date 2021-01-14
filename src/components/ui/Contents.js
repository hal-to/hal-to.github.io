import React, { useEffect, useState } from "react";

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
      <h2>contents</h2>
      {filteredVideos.map((video) => (
        <div>
          <a href={video.link} target="_blank">{video.title}</a>
        </div>
      ))}
    </section>
  );
};

export default Contents;
