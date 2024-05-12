const dataUrl = "data.csv";
const chart = d3.select("#chart");

d3.csv(dataUrl, (data) => {
  // ヘッダーを除いたデータ抽出
  const formattedData = data.slice(1).map((row) => {
    return row.slice(1);
  });

  // 数値データと文字列データに分ける
  const numericData = formattedData.map((row) => row.map(Number));
  const stringData = formattedData.map((row) => row.map(String));

  // カラーマップ作成
  const colorScale = d3.scaleLinear()
    .domain([d3.min(numericData, (d) => d3.min(d)), d3.max(numericData, (d) => d3.max(d))])
    .range(["green", "yellow", "red"]);

  // SVG要素作成
  const svg = chart.append("svg")
    .attr("width", 800)
    .attr("height", 400);

  // セル作成
  const cells = svg.selectAll("rect")
    .data(numericData)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 30)
    .attr("y", (d, i) => i * 30)
    .attr("width", 30)
    .attr("height", 30)
    .style("fill", (d) => {
      const value = d3.min(d);
      return isNaN(value) ? "white" : colorScale(value);
    });

  // 軸作成
  const xAxis = d3.scaleLinear()
    .domain([0, numericData.length - 1])
    .range([0, 800]);

  const yAxis = d3.scaleLinear()
    .domain([0, numericData[0].length - 1])
    .range([0, 400]);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, 400)")
    .call(d3.axisBottom(xAxis));

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(800, 0)")
    .call(d3.axisRight(yAxis));

  // ラベル表示
  cells.append("text")
    .attr("x", (d, i) => i * 30 + 15)
    .attr("y", (d, i) => i * 30 + 15)
    .text((d, i) => stringData[i][0])
