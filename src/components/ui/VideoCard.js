import React from "react";

const VideoCard = ({ video }) => {
  // Particle. Reference: https://css-tricks.com/playing-with-particles-using-the-web-animations-api/
  function pop(e) {
    for (let i = 0; i < 15; i++) {
      createParticle(e.clientX, e.clientY, i);
    }
  }
  function createParticle(x, y, i) {
    // Create a custom particle element
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const type = i % 3;
    particle.classList.add(`particle--${type + 1}`);
    document.body.appendChild(particle);

    let width = Math.floor(Math.random() * 30 + 25);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 400;
    let destinationY = (Math.random() - 0.5) * 400;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;

    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;

    const animation = particle.animate(
      [
        {
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${
            y + destinationY
          }px) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 1000 + 1500,
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay: delay,
      }
    );

    // When the animation is finished, remove the element from the DOM
    animation.onfinish = () => {
      particle.remove();
    };
  }

  function flip(e) {
    const videoCard = e.target.parentElement.parentElement.parentElement;
    if (document.body.animate && !videoCard.classList.contains("flipped")) {
      pop(e);
    }
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
