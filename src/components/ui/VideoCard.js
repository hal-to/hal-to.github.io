import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <img
        src={`http://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
        className="video-card--img"
      />
      <div className="video-card--detail">
        <div className="video-card--cat-info">
          <div>
            <span className="video-card--cat-big">{video.cat_big}</span>
            {video.cat_sm_list.map((catSmall) => (
              <span className="video-card--cat-small">{catSmall}</span>
            ))}
          </div>
          <div className="video-card--date">{video.date}</div>
        </div>
        <h4 className="heading-4 video-card--title">{video.title}</h4>
        <button className="btn-card video-card--summary">detail</button>
        <a
          className="btn-card video-card--link"
          href={video.link}
          target="_blank"
        >
          Youtube &rarr;
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
