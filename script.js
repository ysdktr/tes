// Papa.parseライブラリの読み込み
const Papa = require('papaparse');

// CSVファイルのパス
const csvFilePath = 'data.csv';

// 表要素を取得
const table = document.querySelector('table');

// CSVファイルを読み込む
Papa.parse(csvFilePath, {
  header: true, // ヘッダー行を処理する
  complete: function(result) {
    // ヘッダー行の表示
    const headerRow = table.insertRow();
    result.data[0].forEach(function(header) {
      const th = headerRow.insertCell();
      th.textContent = header;
    });

    // データ行の表示
    result.data.slice(1).forEach(function(row) {
      const rowElement = table.insertRow();
      row.forEach(function(cellData) {
        const td = rowElement.insertCell();
        td.textContent = cellData;
      });
    });
  }
});
