import React, { useEffect, useState } from "react";
import queryString from "query-string";
import VideoCard from "./ui/VideoCard";
import { Link } from "react-router-dom";

const Recommend = ({ videos, location }) => {
  const [videosObj, setVidoesObj] = useState({});
  const [recommendObj, setRecommendObj] = useState({});
  const [queryStr, setQueryStr] = useState("");
  const [queryRowList, setQueryRowList] = useState([]);
  const [rowIdx, setRowIdx] = useState(0);

  useEffect(() => {
    const tempVideosObj = {};
    videos.forEach((video) => {
      tempVideosObj[video.num] = video;
    });
    setVidoesObj(tempVideosObj);

    // ex) "?1.첫 걸음 및 총 정리=468,218&2.영구 포트폴리오=348&3.자녀교육=429,435,475,391&4.갓환국님 현재(21년 1월) 전략=443,445,446,447,461"
    let tempQueryStr = decodeURI(location.search);
    if (tempQueryStr === "") {
      tempQueryStr =
        "?1.첫 걸음 및 총 정리=468,218&2.영구 포트폴리오=348&3.자녀교육=429,435,475,391&4.갓환국님 현재(21년 1월) 전략=443,445,446,447,461";
    }
    setQueryStr(tempQueryStr);

    const queryObj = queryString.parse(tempQueryStr);
    console.log("queryObj", queryObj);
    const tempRecommendObj = {};
    const tempQueryRowList = [];
    let tempRowIdx = rowIdx;
    Object.keys(queryObj).forEach((title, i) => {
      tempQueryRowList.push({
        index: tempRowIdx,
        title: title,
        numsStr: queryObj[title],
      });
      tempRowIdx++;

      const numsStr = queryObj[title];
      const nums = numsStr.split(",").map(Number);
      const filteredNums = nums.filter((x) => x in tempVideosObj);
      tempRecommendObj[title] = filteredNums;
    });
    setRowIdx(tempRowIdx);
    setRecommendObj(tempRecommendObj);
    setQueryRowList(tempQueryRowList);
  }, [videos, location.search]);
  
  console.log("window.location", window.location);
  const urlPrefix = window.location.origin + window.location.pathname;  

  function updateText(tempQueryRowList) {
    let tempQueryStr = "?";
    tempQueryRowList.forEach((row) => {
      if (row.title !== "" && row.numsStr !== "") {
        tempQueryStr += `${row.title}=${row.numsStr}&`;
      }
    });
    tempQueryStr = tempQueryStr.slice(0, -1);
    setQueryStr(tempQueryStr);
  }

  function handleInput(e) {
    const value = e.target.value;
    const indexStr = e.target.getAttribute("index");
    const isNumsStr = e.target.getAttribute("isnums");
    const tempQueryRowList = [...queryRowList];
    let i = 0;
    for (i = 0; i < tempQueryRowList.length; i++) {
      if (tempQueryRowList[i].index === parseInt(indexStr)) {
        break;
      }
    }

    if (isNumsStr === "true") {
      tempQueryRowList[i].numsStr = value;
    } else {
      tempQueryRowList[i].title = value;
    }

    setQueryRowList(tempQueryRowList);
    updateText(tempQueryRowList);
  }

  function addRow(e) {
    const tempQueryRowList = [...queryRowList];
    tempQueryRowList.push({
      index: rowIdx,
      title: "",
      numsStr: "",
    });
    setRowIdx(rowIdx + 1);
    setQueryRowList(tempQueryRowList);
  }

  function removeRow(e) {
    const indexStr = e.target.getAttribute("index");
    const tempQueryRowList = [...queryRowList];
    let i = 0;
    for (i = 0; i < tempQueryRowList.length; i++) {
      if (tempQueryRowList[i].index === parseInt(indexStr)) {
        break;
      }
    }
    tempQueryRowList.splice(i, 1);
    setQueryRowList(tempQueryRowList);
    updateText(tempQueryRowList);
  }

  function copy(e) {
    const textArea = document.querySelector(".rec-side__text");

    const tempArea = document.createElement("textarea");
    tempArea.value = textArea.value;

    document.body.appendChild(tempArea);
    tempArea.select();
    tempArea.setSelectionRange(0, 9999);

    document.execCommand("copy");
    document.body.removeChild(tempArea);

    const copied = document.querySelector(".rec-side__copied");
    copied.classList.add("show");
    setTimeout(function () {
      copied.classList.remove("show");
    }, 1500);
  }

  return (
    <div className="recommend">
      <div className="rec-side">
        <p>제목, 영상 번호(콤마로 구분)</p>
        {queryRowList.map((row, i) => (
          <div key={row.index} className="form-control">
            <button
              index={row.index}
              className="form-control__btn"
              onClick={removeRow}
            >
              -
            </button>
            <input
              type="text"
              index={row.index}
              isnums="false"
              placeholder="Enter title"
              defaultValue={row.title}
              onChange={handleInput}
              className="form-control__input"
            />
            <input
              type="text"
              index={row.index}
              isnums="true"
              placeholder="Enter numbers (ex. 468,218)"
              defaultValue={row.numsStr}
              onChange={handleInput}
              className="form-control__input"
            />
          </div>
        ))}
        <button className="form-control__btn" onClick={addRow}>
          +
        </button>
        <br />
        <p>url</p>
        <div className="rec-side__text-div">
          <textarea
            className="rec-side__text"
            readOnly
            disabled
            value={`${urlPrefix}${queryStr.replace(/ /g, "%20")}`}
          ></textarea>
          <p className="rec-side__copied">copied!</p>
        </div>
        <div className="button-container">
          <button className="form-control__btn" onClick={copy}>
            copy
          </button>
          <Link className="form-control__btn" to={`/recommend${queryStr}`}>
            go
          </Link>
        </div>
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
