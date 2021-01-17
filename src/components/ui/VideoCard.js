import React from "react";

const VideoCard = ({ video }) => {
  function flip(e) {
    const videoCard = e.target.parentElement.parentElement.parentElement;
    // console.log(videoCard);
    videoCard.classList.toggle("flipped");
  }

  return (
    <div className="video-card">
      <div className="video-card__side video-card__side--front">
        <img
          src={`http://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          className="video-card__img"
        />
        <div className="video-card__detail">
          <div className="video-card__cat-info">
            <div>
              <span className="video-card__cat-big">{video.cat_big}</span>
              {video.cat_sm_list.map((catSmall) => (
                <span key={catSmall} className="video-card__cat-small">
                  {catSmall}
                </span>
              ))}
            </div>
            <div className="video-card--date">{video.date}</div>
          </div>
          <h4 className="heading-4 video-card__title">{video.title}</h4>
          <button className="btn-card" onClick={flip}>
            detail
          </button>
          <a className="btn-card" href={video.link} target="_blank">
            Youtube &rarr;
          </a>
        </div>
      </div>
      <div className="video-card__side video-card__side--back">
        <div className="video-card__detail">
          <h4 className="heading-4 video-card__title">{video.title}</h4>
          <pre className="video-card__summary">{video.summary}</pre>
          <button className="btn-card" onClick={flip}>
            back
          </button>
          <a className="btn-card" href={video.link} target="_blank">
            Youtube &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
