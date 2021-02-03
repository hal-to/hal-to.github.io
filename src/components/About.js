import React from "react";

const About = () => {
  return (
    <div className="about">
      <section>
        <h2 className="heading-2 heading-2--dark">사이트 소개</h2>
        <p>
          갓환국님이 정리해서 공유해주신{" "}
          <a href="https://han.gl/49BQk" target="_blank" rel="noreferrer">
            비밀 링크
          </a>
          를 가져와서 보여주는 사이트 입니다. <br />
          '갱신' 버튼을 누르거나, 4일 주기로 구글 시트를 로컬 스토리지에
          가져옵니다.
        </p>
      </section>

      <section>
        <h2 className="heading-2 heading-2--dark">'카테고리별' 메뉴</h2>
        <p>갓환국님께서 구분해 두신 카테고리별로 영상을 확인할 수 있습니다.</p>
      </section>

      <section>
        <h2 className="heading-2 heading-2--dark">'커스텀 추천' 메뉴</h2>
        <p>본인이 추천하고자 하는 영상들의 제목과 번호를 입력합니다.</p>
        <p>영상 번호들은 콤마(,) 로 구분하고, 띄어쓰기는 없어야 합니다.</p>
        <p>
          제목 순으로 정렬되서 보여지므로, 제목에 번호를 붙이는 게 좋습니다.
        </p>
        <p>아랫부분의 url 을 복사해서, 지인들에게 공유해주시면 됩니다.</p>
      </section>

      <section>
        <h2 className="heading-2 heading-2--dark">만든 사람들</h2>
        <ul>
          <li className="contributor">
            <a
              className="contributor__link"
              href="https://mechurak.tistory.com"
              target="_blank"
              rel="noreferrer"
            >
              일편단씸
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
