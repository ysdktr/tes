const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// CSVデータ読み込み
d3.csv('data.csv', function(data) {

  // データ処理
  const data2 = data.slice(1, 27).map(d => +d[1]); // 2列目の2行目から26行目の数値を抽出
  const min = d3.min(data2);
  const max = d3.max(data2);
  const mid = (min + max) / 2;

  // カラー スケール定義
  const colorScale = d3.scaleLinear()
    .domain([min, mid, max])
    .range(['red', 'yellow', 'green']);

  // X軸設定
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data2))
    .range([0, width]);

  const xAxis = d3.axisBottom(xScale)
    .ticks(5);

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  // データ可視化
  svg.selectAll('rect')
    .data(data2)
    .enter()
    .append('rect')
      .attr('x', (d, i) => xScale(d))
      .attr('y', height - 20)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', (d) => colorScale(d));
});
