// データ読み込み
d3.csv("data.csv", function(data) {

  // 対象データ抽出
  var targetData = data.map(function(row) {
    return row[1]; // 2列目の値を取得
  }).slice(1, 26); // 2行目から26行目までの値

  // カラー スケール定義
  var colorScale = d3.scaleLinear()
    .domain([d3.min(targetData), d3.mean(targetData), d3.max(targetData)])
    .range(["red", "yellow", "green"]);

  // SVG要素作成
  var svg = d3.select("body")
    .append("svg")
      .attr("width", 800)
      .attr("height", 400);

  // データ可視化
  svg.selectAll("rect")
    .data(targetData)
    .enter()
    .append("rect")
      .attr("x", function(d, i) { return i * 30; })
      .attr("y", 50)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", function(d) { return colorScale(d); });
});
