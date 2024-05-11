const loadButton = document.getElementById('loadButton');
const dataTable = document.getElementById('dataTable');

loadButton.addEventListener('click', () => {
  // data.csvファイルを非同期で読み込む
  fetch('data.csv')
    .then(response => response.text())
    .then(data => {
      // CSVデータを配列に変換
      const rows = data.split('\n').map(row => row.split(','));

      // 表の見出し行を作成
      const headerRow = dataTable.insertRow();
      rows[0].forEach(cellText => {
        const cell = headerRow.insertCell();
        cell.textContent = cellText;
      });

      // データ行を作成
      rows.slice(1).forEach(row => {
        const rowElement = dataTable.insertRow();
        row.forEach(cellText => {
          const cell = rowElement.insertCell();
          cell.textContent = cellText;
        });
      });
    });
});
