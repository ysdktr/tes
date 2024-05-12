// CSVファイルのパス
const csvFilePath = "data.csv";

// SVGの幅と高さ
const width = 800;
const height = 400;

// カラースケール
const colorScale = d3.scaleSequential(d3.interpolateBlues);

// SVG要素の選択とサイズの設定
const svg = d3.select("#visualization")
    .attr("width", width)
    .attr("height", height);

// CSVファイルの読み込みとデータの処理
d3.csv(csvFilePath).then(data => {
    // データの最小値と最大値を取得
    const minValue = d3.min(data.slice(1, 26), d => {
        const value = parseFloat(d3.values(d)[0]);
        return isNaN(value) ? Infinity : value; // 数値でない場合はInfinityを返す
    });
    const maxValue = d3.max(data.slice(1, 26), d => {
        const value = parseFloat(d3.values(d)[0]);
        return isNaN(value) ? -Infinity : value; // 数値でない場合は-Infinityを返す
    });
    
    // カラースケールのドメインを設定
    colorScale.domain([minValue, maxValue]);

    // データを元にビジュアライゼーションを作成
    svg.selectAll("rect")
        .data(data.slice(1, 26))
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * (height / 25))
        .attr("width", width)
        .attr("height", height / 25)
        .attr("fill", d => {
            const value = parseFloat(d3.values(d)[0]);
            return isNaN(value) ? "white" : colorScale(value); // 数値でない場合は白を返す
        });
});
