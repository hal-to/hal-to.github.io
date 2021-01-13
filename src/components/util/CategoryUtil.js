export function getCategoryMap(videos) {
  let cat_map = new Map();
  videos.forEach((video) => {
    const cat_big = video.cat_big;
    const cat_sm = video.cat_sm;
    if (!cat_map.has(cat_big)) {
      let curSet = new Set();
      curSet.add(cat_sm);
      cat_map.set(cat_big, curSet);
    } else {
      let curSet = cat_map.get(cat_big);
      curSet.add(cat_sm);
    }
  });
  return cat_map;
}
