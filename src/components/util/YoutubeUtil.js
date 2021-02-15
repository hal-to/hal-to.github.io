// https://stackoverflow.com/a/9102270
function getYoutubeId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
}

// "https://docs.google.com/spreadsheets/d/1wPR2CCImrk6Qb8jwlGy2_RfDJu5PwY18POrJ3UR1sts/edit?fbclid=IwAR3XbNYzBo6ITLkMG-C_JXc7-IfUIIFxyFb1mDIZuPjUQKD0afaXNiCJ2As#gid=1577519440";
const SHEET_ID = "1wPR2CCImrk6Qb8jwlGy2_RfDJu5PwY18POrJ3UR1sts"; // https://han.gl/49BQk

// https://theoephraim.github.io/node-google-spreadsheet
const { GoogleSpreadsheet } = require("google-spreadsheet");
export async function getVideos() {
  const SHEET_TITLE = "강환국 할투 채널";
  console.log("getVideos()", SHEET_ID);

  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(SHEET_ID);
  doc.useApiKey(process.env.REACT_APP_API_KEY);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  console.log(sheet.title, sheet.rowCount);
  const rowCount = sheet.rowCount;

  await sheet.loadCells(`A2:F${rowCount}`);

  let videos = [];
  for (let row = 1; row < rowCount; row++) {
    const numCell = sheet.getCell(row, 0);
    const categoryBigCell = sheet.getCell(row, 1);
    const categorySmallCell = sheet.getCell(row, 2);
    let smallCategories = [];
    if (categorySmallCell.value !== null) {
      const words = categorySmallCell.value
        .split("+")
        .map((item) => item.trim());
      smallCategories = words;
    } else {
      smallCategories.push("미분류");
    }

    const titleCell = sheet.getCell(row, 3);
    if (titleCell.value === null) continue;
    const hyperlink = titleCell.hyperlink;
    const id = getYoutubeId(hyperlink);
    const summaryCell = sheet.getCell(row, 4);
    const dateCell = sheet.getCell(row, 5);
    const video = {
      num: numCell.value,
      cat_big: categoryBigCell.value,
      cat_sm_list: smallCategories,
      title: titleCell.value,
      link: hyperlink,
      id: id,
      summary: summaryCell.value,
      date: dateCell.formattedValue,
    };
    videos.push(video);
  }
  console.log(videos);
  return videos;
}
