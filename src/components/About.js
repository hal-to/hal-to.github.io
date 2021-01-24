import React from "react";

const About = () => {
  return (
    <div className="about">
      <section>
        <h2 className="heading-2 heading-2--dark">사이트 소개</h2>
        <p>
          갓환국님이 정리해서 공유해주신 비밀 링크를 가져와서 보여주는 사이트
          입니다.
        </p>
      </section>

      <section>
        <h2 className="heading-2 heading-2--dark">추천 영상 공유</h2>
        <p>본인이 추천하고자 하는 영상들의 제목과 번호를 입력합니다.</p>
        <p>영상 번호들은 콤마(,) 로 구분하고, 띄어쓰기는 없어야 합니다.</p>
        <p>
          제목 순으로 정렬되서 보여지므로, 제목에 번호를 붙이는 게 좋습니다.
        </p>
        <p>아랫부분의 url 을 복사해서, 지인들에게 공유해주시면 됩니다.</p>
      </section>

      <section>
        <h2 className="heading-2 heading-2--dark">카테고리별 영상 확인</h2>
        <p>갓환국님께서 구분해 두신 카테고리별로 영상을 확인할 수 있습니다.</p>
      </section>
    </div>
  );
};

export default About;
