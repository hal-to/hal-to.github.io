import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="title">
        <h1 className="heading-1 heading-1--light">할투 맵 0.1</h1>
        <h2 className="heading-2 heading-2--light">애, 차, 개 out!!</h2>
      </div>
      <div className="header-nav">
        <button>할투 영상</button>
        <button>추천 사이트</button>
        <button>about</button>
        <button>갱신</button>
      </div>
    </header>
  );
};

export default Header;
