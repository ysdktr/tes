// ページが読み込まれたときに実行される関数
document.addEventListener("DOMContentLoaded", function() {
  // データを読み込み、表示する関数
  d3.csv("data.csv").then(function(data) {
    // データをコンソールに出力して確認
    console.log(data);

    // データを使用してグラフを描画する処理を記述
    // ここでは例として、データをコンソールに出力するのみとします
  }).catch(function(error) {
    // データの読み込みに失敗した場合の処理
    console.log("データの読み込みエラー:", error);
  });
});
