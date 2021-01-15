import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <img
        src={`http://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
        className="video-card--img"
      />
      <h3 className="heading-3 video-card--title">{video.title}</h3>
      <div>{video.cat_big}</div>
      <div>{video.cat_sm_list.join(", ")}</div>
      <div>{video.date}</div>
      <a className="video-card--link" href={video.link}>
        link
      </a>
    </div>
  );
};

export default VideoCard;
