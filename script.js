const searchForm = document.getElementById('searchForm');
const keywordInput = document.getElementById('keyword');
const searchResult = document.getElementById('searchResult');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const keyword = keywordInput.value.trim();
  if (keyword === '') {
    return;
  }

  // CSVファイルを読み込む
  fetch('data.csv')
    .then(response => response.text())
    .then(csvText => {
      const data = parseCSV(csvText);
      const results = searchData(data, keyword);
      displayResults(results);
    });
});

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    const rowData = {};
    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j];
    }
    data.push(rowData);
  }
  return data;
}

function searchData(data, keyword) {
  const results = [];
  for (const row of data) {
    for (const value of Object.values(row)) {
      if (value.toLowerCase().includes(keyword.toLowerCase())) {
        results.push(row);
        break;
      }
    }
  }
  return results;
}

function displayResults(results) {
  searchResult.innerHTML = '';
  if (results.length === 0) {
    searchResult.innerHTML = '<p>検索結果が見つかりませんでした。</p>';
    return;
  }

  const table = document.createElement('table');
  const headerRow = table.insertRow();
  for (const header of Object.keys(results[0])) {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  }

  for (const row of results) {
    const tr = table.insertRow();
    for (const value of Object.values(row)) {
      const td = document.createElement('td');
      td.textContent = value;
      tr.appendChild(td);
    }
  }

  searchResult.appendChild(table);
}
