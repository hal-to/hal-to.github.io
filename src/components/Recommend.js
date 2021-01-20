import React, { useEffect, useState } from "react";
import queryString from "query-string";
import VideoCard from "./ui/VideoCard";
import { Link } from "react-router-dom";

const Recommend = ({ videos, location }) => {
  const [videosObj, setVidoesObj] = useState({});
  const [recommendObj, setRecommendObj] = useState({});
  const [queryStr, setQueryStr] = useState("");

  useEffect(() => {
    const tempVideosObj = {};
    videos.forEach((video) => {
      tempVideosObj[video.num] = video;
    });
    setVidoesObj(tempVideosObj);

    // ex) ?1.첫 걸음 및 총 정리=468,218&2.영구 포트폴리오=348&3.갓환국님 현재 전략=443,445,446,447,461
    let tempQueryStr = decodeURI(location.search);
    if (tempQueryStr === "") {
      tempQueryStr =
        "?1.첫 걸음 및 총 정리=468,218&2.영구 포트폴리오=348&3.갓환국님 현재 전략=443,445,446,447,461";
    }
    setQueryStr(tempQueryStr);

    const queryObj = queryString.parse(tempQueryStr);
    console.log(queryObj);
    const tempRecommendObj = {};
    Object.keys(queryObj).forEach((title) => {
      const numsStr = queryObj[title];
      const nums = numsStr.split(",").map(Number);
      const filteredNums = nums.filter((x) => x in tempVideosObj);
      tempRecommendObj[title] = filteredNums;
    });
    console.log(tempRecommendObj);
    setRecommendObj(tempRecommendObj);
  }, [videos, location.search]);

  const urlPrefix = "https://mechurak.github.io/halto-map/recommend";

  function handleInput(e) {
    const value = e.target.value;
    setQueryStr(value);
  }

  return (
    <div className="recommend">
      <div className="rec-side">
        <p>query string</p>
        <input
          className="rec-side__input"
          type="text"
          defaultValue={queryStr}
          onChange={handleInput}
        ></input>
        <p>url</p>
        <textarea
          className="rec-side__text"
          readOnly
          disabled
          value={`${urlPrefix}${queryStr.replace(/ /g, "%20")}`}
        ></textarea>
        <Link
          className="btn-text btn-text--category rec-side__submit"
          to={`/recommend${queryStr}`}
        >
          go
        </Link>
      </div>

      <div className="rec-contents">
        {Object.keys(recommendObj).map((title) => (
          <div key={title} className="rec-subject">
            <h2 className="heading-2 heading-2--dark">{title}</h2>
            <div className="content-container">
              {recommendObj[title].map((num) => (
                <VideoCard key={num} video={videosObj[num]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
