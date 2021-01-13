export function getCategoryMap(videos) {
  const catMap = new Map();
  videos.forEach((video) => {
    const catBig = video.cat_big;
    const catSmallList = video.cat_sm_list;
    if (!catMap.has(catBig)) {
      const curSet = new Set();
      catSmallList.forEach((word) => {
        curSet.add(word);
      });
      catMap.set(catBig, curSet);
    } else {
      const curSet = catMap.get(catBig);
      catSmallList.forEach((word) => {
        curSet.add(word);
      });
    }
  });

  let catObj = {}
  catMap.forEach((value, key, map) => {
    console.log(key, value);
    catObj[key] = [...value];
  })
  return catObj;
}
