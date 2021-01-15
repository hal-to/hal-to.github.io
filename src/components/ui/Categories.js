import React, { useEffect, useState } from "react";
import { getCategories } from "../util/CategoryUtil";

const Categories = ({ videos, selectedCat, setSelectedCat }) => {
  const [availableCat, setAvailableCat] = useState(new Map());
  const [categories, setCategories] = useState({});
  const [targetCats, setTargetCats] = useState([]);
  // targetCats = [
  //   {
  //     value: "small_category",
  //     catBig: "big_category",
  //     selected: true,
  //   },
  // ];

  useEffect(() => {
    console.log("Categories useEffect()");
    const tempCategories = getCategories(videos);
    setCategories(tempCategories);
    console.log(tempCategories);
  }, [videos]);

  function clearBig() {
    const selectedBigBtn = document.querySelectorAll(
      ".category-big .btn-cat.btn-cat--selected"
    );
    selectedBigBtn.forEach((button) => {
      button.classList.remove("btn-cat--selected");
    });
    setTargetCats([]);
    setAvailableCat(new Map());
    setSelectedCat(new Map());
  }

  function allBig() {
    const bigButton = document.querySelectorAll(".category-big .btn-cat");
    bigButton.forEach((button) => {
      button.classList.add("btn-cat--selected");
    });

    const tempSelectedCat = new Map();
    const tempTargetCats = [];
    for (const [catBig, smallCategoryList] of Object.entries(categories)) {
      const tempSmallSet = new Set();
      smallCategoryList.forEach((small) => {
        tempSmallSet.add(small);
        tempTargetCats.push({
          value: small,
          catBig: catBig,
          selected: true,
        });
      });
      tempSelectedCat.set(catBig, tempSmallSet);
    }
    setTargetCats(tempTargetCats);
    setAvailableCat(tempSelectedCat);
    setSelectedCat(tempSelectedCat);
  }

  function toggleBig(e) {
    const catBig = e.target.innerText;
    const tempSelectedCat = new Map(selectedCat);
    const tempAvailableCat = new Map(availableCat);
    let tempTargetCats = [...targetCats];
    if (e.target.classList.contains("btn-cat--selected")) {
      tempSelectedCat.delete(catBig);
      tempAvailableCat.delete(catBig);
      tempTargetCats = tempTargetCats.filter(
        (targetCat) => targetCat.catBig !== catBig
      );
    } else {
      const tempSmallSet = new Set(categories[catBig]);
      tempSelectedCat.set(catBig, tempSmallSet);
      tempAvailableCat.set(catBig, tempSmallSet);
      tempSmallSet.forEach((value) => {
        tempTargetCats.push({
          value: value,
          catBig: catBig,
          selected: true,
        });
      });
    }
    e.target.classList.toggle("btn-cat--selected");
    setSelectedCat(tempSelectedCat);
    setAvailableCat(tempAvailableCat);
    setTargetCats(tempTargetCats);
    console.log(tempTargetCats);
  }

  function clearSmall() {
    const selectedSmallBtn = document.querySelectorAll(
      ".category-small .btn-cat.btn-cat--selected"
    );
    selectedSmallBtn.forEach((button) => {
      button.classList.remove("btn-cat--selected");
    });

    const tempSelectedCat = new Map();
    selectedCat.forEach((value, key, map) => {
      tempSelectedCat.set(key, new Set());
    });
    setSelectedCat(tempSelectedCat);

    const tempTargetCats = [...targetCats];
    tempTargetCats.forEach((targetCat) => {
      targetCat.selected = false;
    });
    setTargetCats(tempTargetCats);
  }

  function allSmall() {
    const smallButton = document.querySelectorAll(".category-small .btn-cat");
    smallButton.forEach((button) => {
      button.classList.add("btn-cat--selected");
    });

    const tempSelectedCat = new Map(selectedCat);
    selectedCat.forEach((value, key, map) => {
      const availableSmallCat = availableCat.get(key);
      tempSelectedCat.set(key, availableSmallCat);
    });
    setSelectedCat(tempSelectedCat);

    const tempTargetCats = [...targetCats];
    tempTargetCats.forEach((targetCat) => {
      targetCat.selected = true;
    });
    setTargetCats(tempTargetCats);
  }

  function toggleSmall(e) {
    const catSmall = e.target.innerText;
    const catBig = e.target.getAttribute("catbig");
    const index = e.target.getAttribute("index");
    console.log(catSmall, catBig, index);

    const tempSelectedCat = new Map(selectedCat);
    const tempSelectedSmCatSet = tempSelectedCat.get(catBig);
    const tempTargetCats = [...targetCats];
    if (e.target.classList.contains("btn-cat--selected")) {
      tempSelectedSmCatSet.delete(catSmall);
      tempTargetCats[index].selected = false;
    } else {
      tempSelectedSmCatSet.add(catSmall);
      tempTargetCats[index].selected = true;
    }
    e.target.classList.toggle("btn-cat--selected");
    setSelectedCat(tempSelectedCat);
    setTargetCats(tempTargetCats);
  }

  return (
    <>
      <div className="category-big">
        <h2>카테고리(대)</h2>
        <button onClick={clearBig}>Clear</button>
        <button onClick={allBig}>Select All</button>
        {Object.keys(categories).map((catBig) => (
          <button key={catBig} onClick={toggleBig} className="btn-cat">
            {catBig}
          </button>
        ))}
      </div>
      <div className="category-small">
        <h2>카테고리(소)</h2>
        <button onClick={clearSmall}>Clear</button>
        <button onClick={allSmall}>Select All</button>
        {targetCats.map((targetCat, i) => (
          <button
            key={i}
            index={i}
            onClick={toggleSmall}
            className="btn-cat btn-cat--selected"
            catbig={targetCat.catBig}
          >
            {targetCat.value}
          </button>
        ))}
      </div>
    </>
  );
};

export default Categories;
