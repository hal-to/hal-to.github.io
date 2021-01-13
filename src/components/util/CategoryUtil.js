export function getCategoryMap(videos) {
  const cat_map = new Map();
  videos.forEach((video) => {
    const cat_big = video.cat_big;
    const cat_sm_list = video.cat_sm;
    if (!cat_map.has(cat_big)) {
      const curSet = new Set();
      cat_sm_list.forEach((cat_sm) => {
        curSet.add(cat_sm);
      });
      cat_map.set(cat_big, curSet);
    } else {
      const curSet = cat_map.get(cat_big);
      cat_sm_list.forEach((cat_sm) => {
        curSet.add(cat_sm);
      });
    }
  });
  return cat_map;
}
