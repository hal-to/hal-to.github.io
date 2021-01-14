import React, { useEffect, useState } from "react";

const Contents = ({selectedSmCat, videos}) => {
  useEffect(() => {
    console.log(selectedSmCat);
    console.log(videos.length);
  }, [selectedSmCat, videos]);

  return (
    <section className="contents">
      <h2>contents</h2>
    </section>
  );
};

export default Contents;
