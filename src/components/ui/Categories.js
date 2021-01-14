import React, { useEffect, useState } from "react";
import { getCategories } from "../util/CategoryUtil";

const Categories = ({ videos, selectedSmCat, setSelectedSmCat }) => {
  const [smallCats, setSmallCats] = useState(new Set());
  const [categories, setCategories] = useState({});
  const [selectedBigCat, setSelectedBigCat] = useState(new Set());

  useEffect(() => {
    console.log("Categories useEffect()");
    const tempCategories = getCategories(videos);
    setCategories(tempCategories);
    console.log(tempCategories);
  }, [videos]);

  function clearBig() {
    const selectedBigBtn = document.querySelectorAll(
      ".category-big .btn-cat.selected"
    );
    selectedBigBtn.forEach((button) => {
      button.classList.remove("selected");
    });
    setSmallCats(new Set());
    setSelectedSmCat(new Set());
  }

  function allBig() {
    const bigButton = document.querySelectorAll(".category-big .btn-cat");
    bigButton.forEach((button) => {
      button.classList.add("selected");
    });

    const tempSmallSet = new Set();
    for (const [_, smallCategoryList] of Object.entries(categories)) {
      smallCategoryList.forEach((small) => tempSmallSet.add(small));
    }
    setSmallCats(tempSmallSet);
    setSelectedSmCat(tempSmallSet);
  }

  function toggleBig(e) {
    const word = e.target.innerText;
    const tempSmallSet = new Set(smallCats);
    const tempSelectedSmCat = new Set(selectedSmCat);
    const tempSelectedBigCat = new Set(selectedBigCat);
    if (e.target.classList.contains("selected")) {
      tempSelectedBigCat.delete(word);

      const smallCategoryList = categories[word];
      smallCategoryList.forEach((small) => {
        tempSmallSet.delete(small);
        tempSelectedSmCat.delete(small);
      });
    } else {
      tempSelectedBigCat.add(word);

      const smallCategoryList = categories[word];
      smallCategoryList.forEach((small) => {
        tempSmallSet.add(small);
        tempSelectedSmCat.add(small);
      });
    }
    e.target.classList.toggle("selected");
    setSelectedBigCat(tempSelectedBigCat);
    setSmallCats(tempSmallSet);
    setSelectedSmCat(tempSelectedSmCat);
  }


  function clearSmall() {
    const selectedSmallBtn = document.querySelectorAll(
      ".category-small .btn-cat.selected"
    );
    selectedSmallBtn.forEach((button) => {
      button.classList.remove("selected");
    });
    setSelectedSmCat(new Set());
  }

  function allSmall() {
    const SmallButton = document.querySelectorAll(".category-small .btn-cat");
    SmallButton.forEach((button) => {
      button.classList.add("selected");
    });    
    setSelectedSmCat(smallCats);
  }

  function toggleSmall(e) {
    const smallCat = e.target.innerText;
    const tempSelectedSmCat = new Set(selectedSmCat);
    if (e.target.classList.contains("selected")) {
      tempSelectedSmCat.delete(smallCat);
    } else {
      tempSelectedSmCat.add(smallCat);      
    }
    e.target.classList.toggle("selected");
    setSelectedSmCat(tempSelectedSmCat);
  }

  return (
    <section className="categories">
      <div className="category-big">
        <h2>카테고리(대)</h2>
        <button onClick={clearBig}>Clear</button>
        <button onClick={allBig}>Select All</button>
        {Object.keys(categories).map((bigCategory) => (
          <button key={bigCategory} onClick={toggleBig} className="btn-cat">
            {bigCategory}
          </button>
        ))}
      </div>
      <div className="category-small">
        <h2>카테고리(소)</h2>
        <button onClick={clearSmall}>Clear</button>
        <button onClick={allSmall}>Select All</button>
        {Array.from(smallCats).map((smallCategory) => (
          <button key={smallCategory} onClick={toggleSmall} className="btn-cat selected">
            {smallCategory}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
