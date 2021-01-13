import React from "react";

const Header = () => {
  // It's all right. It's restricted by domain.
  const K = "AIzaSyA0_136gWrkqUfV5t25yi4rKWQpEpXDl9c";

  // "https://docs.google.com/spreadsheets/d/1wPR2CCImrk6Qb8jwlGy2_RfDJu5PwY18POrJ3UR1sts/edit?fbclid=IwAR3XbNYzBo6ITLkMG-C_JXc7-IfUIIFxyFb1mDIZuPjUQKD0afaXNiCJ2As#gid=1577519440";
  const SHEET_ID = "1wPR2CCImrk6Qb8jwlGy2_RfDJu5PwY18POrJ3UR1sts"; // https://han.gl/49BQk
  const SHEET_TITLE = "강환국 할투 채널";

  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const loadSheet = async () => {
    console.log("loadSheet()", SHEET_ID);

    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(SHEET_ID);
    doc.useApiKey(K);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByTitle[SHEET_TITLE];
    console.log(sheet.title, sheet.rowCount);
    const rowCount = sheet.rowCount;

    await sheet.loadCells(`A2:F${rowCount}`);

    for (let row = 1; row < rowCount; row++) {
      const numCell = sheet.getCell(row, 0);
      const categoryBigCell = sheet.getCell(row, 1);
      const categorySmallCell = sheet.getCell(row, 2);
      const titleCell = sheet.getCell(row, 3);
      if (titleCell.value === null) continue;
      const hyperlink = titleCell.hyperlink;
      const summaryCell = sheet.getCell(row, 4);
      const dateCell = sheet.getCell(row, 5);
      console.log(numCell.value, titleCell.value, hyperlink, dateCell.value);
    }
  };

  return (
    <header className="header">
      <div className="title">
        <h1 className="heading-1 heading-1--light">할투 맵 0.1</h1>
        <h2 className="heading-2 heading-2--light">애, 차, 개 out!!</h2>
      </div>
      <div className="header-nav">
        <button>할투 영상</button>
        <button>추천 사이트</button>
        <button>about</button>
        <button onClick={loadSheet}>갱신</button>
      </div>
    </header>
  );
};

export default Header;
