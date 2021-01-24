import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos } from "../util/YoutubeUtil";
import Loading from "./Loading";

const Header = ({ videos, setVideos }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [lastFetchDate, setLastFetchDate] = useState("N/A");
  const [quotationIdx, setQuotationIdx] = useState(0);

  const VIDEOS_LS = "videos";
  const LAST_FETCH_DATE_LS = "last_fetch";

  const loadAndSaveSheet = async () => {
    setIsImporting(true);
    let remoteVideos = await getVideos();
    localStorage.setItem(VIDEOS_LS, JSON.stringify(remoteVideos));
    const now = new Date();
    localStorage.setItem(LAST_FETCH_DATE_LS, now.getTime());
    setLastFetchDate(now);
    setVideos(remoteVideos);
    setIsImporting(false);
  };

  useEffect(() => {
    console.log("Header mounted");
    const localVideos = JSON.parse(localStorage.getItem(VIDEOS_LS)) || [];
    const lastFetchDateStr = localStorage.getItem(LAST_FETCH_DATE_LS) || "0";
    const lastFetchDateTemp = new Date(parseInt(lastFetchDateStr));
    setLastFetchDate(lastFetchDateTemp);
    setVideos(localVideos);

    // Fetch google sheet automatically according to lastFetchDate
    const now = new Date();
    const FOUR_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 4;
    const diffInMs = now - lastFetchDateTemp;
    if (diffInMs > FOUR_DAYS_IN_MS) {
      console.log("trigger fetch");
      loadAndSaveSheet();
    }

    updateQuatation();
  }, []);

  const quotations = [
    "애, 차, 개 out!!",
    "내일 당장 투자를 시작하세요.",
    "가장 중요 - 매수 전 언제 매도할 지 알기!!!",
    "백테스트 만개 이하는 겸상하지 않습니다.",
    "투자자의 99%에게 영구포트폴리오, 올웨더를 권합니다.",
    "투자는 선택이 아니라 생존!",
    "투자 수익 1%가 우리 노후에 엄청난 차이를 미칩니다.",
    "내 돈 남에게 맡기면 큰일납니다.",
    "백테스트는 직접 해봐야 합니다.",
    "상관성 낮은 자산에 분산 투자 하십시오.",
    "고수익 전략보다 버틸 수 있는 전략이 중요합니다.",
  ];

  function updateQuatation() {
    const tempQuotationIdx = Math.floor(Math.random() * quotations.length);
    setQuotationIdx(tempQuotationIdx);
    const quotationH2 = document.querySelector(".quotation");
    quotationH2.classList.add("quotation--animation");

    setTimeout(function () {
      quotationH2.classList.remove("quotation--animation");
    }, 5000);

    setTimeout(function () {
      updateQuatation();
    }, 5100);
  }

  return (
    <>
      {isImporting ? <Loading /> : null}
      <header className="header">
        <div className="header__title">
          <h1 className="heading-1">할투 맵</h1>
          <h2 className="heading-2 quotation">{quotations[quotationIdx]}</h2>
        </div>
        <div className="header__nav">
          <Link className="btn-text btn-text--header" to="/">
            카테고리별
          </Link>
          <Link className="btn-text btn-text--header" to="/recommend">
            커스텀 추천
          </Link>
          <Link className="btn-text btn-text--header" to="/about">
            어바웃
          </Link>
          <button
            className="btn-text btn-text--header"
            onClick={loadAndSaveSheet}
          >
            갱신
          </button>
          {isImporting ? (
            <div className="header__nav--info">fetching...</div>
          ) : (
            <div className="header__nav--info">
              <p>{videos.length} videos are fetched</p>
              <p>last fetch: {lastFetchDate.toLocaleString()}</p>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
