import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <ul class="footer-nav">
        <li class="footer-nav__item">
          <a
            href="https://www.youtube.com/c/%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EC%95%8C%EA%B3%A0%ED%88%AC%EC%9E%90"
            target="_blank"
            class="footer-nav__link"
          >
            할수있다 알고투자 (유튜브 채널)
          </a>
        </li>
        <li class="footer-nav__item">
          <a
            href="https://han.gl/49BQk"
            target="_blank"
            class="footer-nav__link"
          >
            투자 자료 모음 (구글 시트)
          </a>
        </li>
      </ul>
      <p class="copyright">
        &copy; Copyright 2021 by 일편단씸. 갓환국님의 영상과 자료들입니다.
      </p>
    </footer>
  );
};

export default Footer;
