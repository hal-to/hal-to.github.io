import React, { useState } from "react";

const CATEGORIES_LS = "categories";
const categories = JSON.parse(localStorage.getItem(CATEGORIES_LS)) || {};
let selectedItem = [];
let selectedSmallItems = [];

const Categories = () => {
  const [smallCats, setSmallCats] = useState(new Set());

  function clearBig() {
    const selectedBigBtn = document.querySelectorAll(
      ".category-big .btn-cat.selected"
    );
    selectedBigBtn.forEach((button) => {
      button.classList.remove("selected");
    });
    setSmallCats(new Set());
  }

  function allBig() {
    const bigButton = document.querySelectorAll(".category-big .btn-cat");
    bigButton.forEach((button) => {
      button.classList.add("selected");
    });

    const tempSmallSet = new Set();
    for (const [key, smallCategoryList] of Object.entries(categories)) {
      smallCategoryList.forEach((small) => tempSmallSet.add(small));
    }
    setSmallCats(tempSmallSet);
    console.log(tempSmallSet.size);
  }

  function toggleBig(e) {
    console.log("toggle", e);
    const word = e.target.innerText;
    const tempSmallSet = new Set(smallCats);
    if (e.target.classList.contains("selected")) {
      const idx = selectedItem.indexOf(word);
      if (idx > -1) selectedItem.splice(idx, 1);

      const smallCategoryList = categories[word];
      smallCategoryList.forEach((small) => {
        tempSmallSet.delete(small);
        const idx = selectedSmallItems.indexOf(small);
        if (idx > -1) selectedSmallItems.splice(idx, 1);
      });
    } else {
      selectedItem.push(word);

      const smallCategoryList = categories[word];
      smallCategoryList.forEach((small) => {
        tempSmallSet.add(small);
        selectedSmallItems.push(small);
      });
    }
    e.target.classList.toggle("selected");
    console.log(selectedItem);
    console.log(tempSmallSet);
    setSmallCats(tempSmallSet);
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
      <div>
        <h2>카테고리(소)</h2>
        <button>Clear</button>
        <button>Select All</button>
        {Array.from(smallCats).map((smallCategory) => (
          <button key={smallCategory} className="btn-cat">
            {smallCategory}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
