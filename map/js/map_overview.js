// ベースURL。mapIdを付与してリンクにする
const BASE_URL = "https://sokomin.github.io/map/map_viewer.html?map_id=";

const mapContainer = document.getElementById("map-container");
const infoPanel = document.getElementById("info-panel");
const hoverTooltip = document.getElementById("hover-tooltip");

// JSONを読み込む
fetch("js/maps.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      if (item.type === "area") {
        // エリアマップ用の四角いホットスポット
        createAreaSpot(item);
      } else if (item.type === "tooltip") {
        // ツールチップ用の小さなマーカー、または透明領域
        createTooltipSpot(item);
      }
    });
  })
  .catch((err) => console.error(err));

/** エリアマップ・ダンジョン用スポット作成 */
function createAreaSpot(area) {
  const spot = document.createElement("div");
  spot.classList.add("map-spot");

  spot.style.left = area.x + "px";
  spot.style.top = area.y + "px";
  spot.style.width = area.width + "px";
  spot.style.height = area.height + "px";

  // 簡易ホバー時のtitle属性 (マウスを乗せるとブラウザ標準ツールチップ)
  spot.title = area.name;

  // クリック時に infoPanel を表示
  spot.addEventListener("click", (e) => {
    // エリア情報を組み立て
    let html = `<h6><a href="${
      BASE_URL + area.mapId
    }" target="_blank">${area.name}</a></h6>`;
    // エリア本体へのリンク
    // html += `<p><a href="${
    //   BASE_URL + area.mapId
    // }" target="_blank">エリアの詳細へ</a></p>`;

    // ダンジョンリスト
    if (area.dungeons && area.dungeons.length > 0) {
      area.dungeons.forEach((d, i) => {
        html += `<p>${i + 1}: <a href="${BASE_URL + d.mapId}" target="_blank">${
          d.name
        }</a></p>`;
      });
    } else {
      html += `<p>隣接しているダンジョンはありません。</p>`;
    }

    infoPanel.innerHTML = html;
    infoPanel.style.display = "block";

    // まず表示してサイズを取得
    const panelRect = infoPanel.getBoundingClientRect();
    const panelWidth = panelRect.width;
    const panelHeight = panelRect.height;

    // クリック位置を中心にパネルを表示
    const leftPos = e.pageX - panelWidth / 2 - 30;
    const topPos = e.pageY - panelHeight / 2 - 60;
    // クライアント座標から、親要素の座標を引いて絶対位置を取得
    // let leftPos = e.clientX + window.scrollX + offsetX;
    // let topPos = e.clientY + window.scrollY + offsetY;

    // // 画面端での調整
    // const tooltipWidth = hoverTooltip.offsetWidth;
    // const tooltipHeight = hoverTooltip.offsetHeight;

    // // 右端では左側に表示
    // if (leftPos + tooltipWidth > window.innerWidth) {
    //   leftPos = e.clientX - panelRect.left + window.scrollX - tooltipWidth - offsetX;
    // }

    // // 下端では上側に表示
    // if (topPos + tooltipHeight > window.innerHeight) {
    //   topPos = e.clientY - panelRect.top + window.scrollY - tooltipHeight - offsetY;
    // }

    infoPanel.style.left = leftPos + "px";
    infoPanel.style.top = topPos + "px";
  });

  mapContainer.appendChild(spot);
}

/** ツールチップ用スポット作成 */
function createTooltipSpot(item) {
  const spot = document.createElement("div");
  spot.style.position = "absolute";
  spot.style.left = item.x + "px";
  spot.style.top = item.y + "px";

  // もしユーザが見やすいように小さなアイコンや丸を表示したい場合は：
  // spot.style.width = '24px';
  // spot.style.height = '24px';
  // spot.style.background = 'rgba(0, 255, 0, 0.3)';
  // などと記述すると可視化できます。透明にしたい場合は不要。
  spot.style.width = "24px";
  spot.style.height = "24px";
    // spot.style.background = "rgba(0, 255, 0, 0.5)";
  spot.style.background = "rgba(0, 255, 0, 0.01)";
  spot.style.cursor = "default";

  // マウスホバー時に tooltip 表示
  spot.addEventListener("mouseenter", (e) => {
    hoverTooltip.innerText = item.text; // "魚が多く取れる東海"など
    hoverTooltip.style.display = "block";
  });
  spot.addEventListener("mouseleave", () => {
    hoverTooltip.style.display = "none";
  });
  spot.addEventListener("mousemove", (e) => {
    const offsetX = 10; // カーソルの右側に表示するためのオフセット
    const offsetY = 10; // カーソルの下側に表示するためのオフセット

    // 親要素（マップ）の位置を取得
    const rect = mapContainer.getBoundingClientRect();

    // クライアント座標から、親要素の座標を引いて絶対位置を取得
    let leftPos = e.clientX - rect.left + window.scrollX + offsetX;
    let topPos = e.clientY - rect.top + window.scrollY + offsetY;

    // 画面端での調整
    const tooltipWidth = hoverTooltip.offsetWidth;
    const tooltipHeight = hoverTooltip.offsetHeight;

    // 右端では左側に表示
    if (leftPos + tooltipWidth > window.innerWidth) {
      leftPos = e.clientX - rect.left + window.scrollX - tooltipWidth - offsetX;
    }

    // 下端では上側に表示
    if (topPos + tooltipHeight > window.innerHeight) {
      topPos = e.clientY - rect.top + window.scrollY - tooltipHeight - offsetY;
    }

    hoverTooltip.style.left = leftPos + "px";
    hoverTooltip.style.top = topPos + "px";
  });

  mapContainer.appendChild(spot);
}

/** mapContainer外をクリックしたとき等にパネルを閉じる例 */
document.addEventListener("click", (e) => {
  // .map-spot を含まないクリックであれば閉じる
  if (!e.target.closest(".map-spot")) {
    infoPanel.style.display = "none";
  }
});
