// データの読み込み
d3.csv("data.csv", function(data) {
  // ヘッダーを除いたデータを取得
  data = data.slice(1);

  // 各行のデータを変換
  data.forEach(function(row) {
    for (var i in row) {
      if (!isNaN(row[i])) {
        row[i] = parseFloat(row[i]);
      } else {
        row[i] = null; // 数値以外をnullに変換
      }
    }
  });

  // カラースケールの設定
  var minVal = d3.min(data, function(d) { return d[1]; });
  var maxVal = d3.max(data, function(d) { return d[1]; });

  var colorRange = ["#ffffcc", "#b22222"]; // 白から赤へのグラデーション

  var colorScale = d3.scaleLinear()
    .domain([minVal, maxVal])
    .range(colorRange);

  // SVG要素への描画
  var width = 500; // グラフの幅
  var height = 300; // グラフの高さ
  var cellWidth = width / data.length; // セルの幅
  var cellHeight = height / (maxVal - minVal); // セルの高さ

  var svg = d3.select("#chart")
    .append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d, i) { return i * cellWidth; })
      .attr("y", function(d) { return height - d[1] * cellHeight; })
      .attr("width", cellWidth)
      .attr("height", function(d) { return d[1] * cellHeight; })
      .style("fill", function(d) { return d[1] != null ? colorScale(d[1]) : "#ffffff"; });
});
