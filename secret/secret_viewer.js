/* secret_viewer.js
 *
 * 秘密ダンジョン閲覧用ビューア (本番想定)。
 * - 既存 sokomin.github.io/map/{common.js, calc.js, mapdata.js} には依存しない (新規実装)。
 * - URL: ?id=<secret_id>  (maplist_secret.csv の id 列、10000 番台)
 * - 連動マップ・新連動マップ情報は扱わない (秘密ダンジョン仕様)。
 *
 * アセット解決:
 *   localhost で起動 (http://localhost:PORT/decomin/staging/secret/) → 同一サーバ root
 *     から /sokomin_repository2023/...、/sokomin_repository/... をたどる。
 *   それ以外 (sokomin.github.io 等) → 絶対 URL https://sokomin.github.io/... を使用。
 */
(function () {
    "use strict";

    // ---- 環境判定 + アセットベース URL ----
    var IS_LOCAL = (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    var BASE_REPO_2023 = IS_LOCAL ? "/sokomin_repository2023" : "https://sokomin.github.io/sokomin_repository2023";
    var BASE_REPO_LEGACY = IS_LOCAL ? "/sokomin_repository" : "https://sokomin.github.io/sokomin_repository";

    var URL_MAPLIST = BASE_REPO_2023 + "/db/map_secret/maplist_secret.csv";
    var URL_MOBDB_DIR = BASE_REPO_2023 + "/db/map_secret/";
    var URL_PNG_DIR = BASE_REPO_2023 + "/db/map_secret_png/";
    var URL_PNG_ORIGINAL_DIR = BASE_REPO_2023 + "/db/map_secret_original/";
    var URL_MONSTER_CSV = BASE_REPO_LEGACY + "/db/monster.csv";
    var URL_INTERFACE2_DIR = BASE_REPO_LEGACY + "/db/interface2/";
    var URL_ETC_ANM_DIR = BASE_REPO_LEGACY + "/db/etc_anm/";
    var URL_MONSTER_IMG_DIR = "https://sokomin.github.io/monster/design/image/monster/";

    // 描画基準: 既存 map_viewer の慣習 (h=200 基準で scale)
    var BASE_HEIGHT = 200;
    var MAP_PADDING = 20; // map_image の left:20px と整合

    // ---- 画像座標空間オーバーライド (デバッグ / 個別補正用) ----
    // maplist の width/height や読み込んだ画像の naturalWidth/Height では
    // mob プロットがずれる場合に手動で座標空間 (= mob の posx/posy が収まるべき
    // 矩形) を上書きする。優先順位: IMG_SIZE_OVERRIDES > 画像の naturalWidth/Height > maplist。
    // キーは str_map (例 "vampirekingdom"), 値は { rmd_index: { w, h } } もしくは
    // 全 rmd 共通なら { "*": { w, h } }。rmd_index は文字列 "000"/"001"/... をそのまま使う。
    // {
        // 例: "vampirekingdom": { "001": { w: 400, h: 200 } },
        // secretViewer.debugSize()      // 現在採用されている座標空間 (override / natural / maplist)
        // secretViewer.setSize(400, 200)        // 現マップの座標空間を 400x200 に固定
        // secretViewer.setSize(400, 200, true)  // 同 str_map の全 rmd に適用
        // secretViewer.getOverrides()   // 現在の override 一覧
    // };
    var IMG_SIZE_OVERRIDES = 
    {
        "spacetime": {
            "000": {
                "w": 400,
                "h": 210
            }
        },
        "kobolt_cave": {
            "000": {
                "w": 400,
                "h": 200
            }
        },
        "hanov_pillow_hide": {
            "000": {
                "w": 305,
                "h": 155
            }
        },
        "robber_hideway": {
            "000": {
                "w": 205,
                "h": 105
            }
        },
        "mythrimine_hide": {
            "000": {
                "w": 430,
                "h": 220
            }
        },
        "cave_of_bloodogre": {
            "000": {
                "w": 250,
                "h": 125
            }
        },
        "alphas_hide_jail": {
            "000": {
                "w": 200,
                "h": 100
            }
        },
        "drug_laboratory": {
            "000": {
                "w": 200,
                "h": 270
            }
        },
        "mercenary_big": {
            "000": {
                "w": 200,
                "h": 90
            }
        },
        "mine_of_tatba": {
            "000": {
                "w": 200,
                "h": 100
            }
        },
        "patrol_tomb": {
            "000": {
                "w": 190,
                "h": 110
            }
        },
        "Magic_tomb_curse": {
            "000": {
                "w": 240,
                "h": 140
            }
        },
        "hagu_treasure": {
            "000": {
                "w": 320,
                "h": 160
            }
        },
        "curse_tomb_tower": {
            "000": {
                "w": 200,
                "h": 155
            }
        },
        "dead_treasure": {
            "000": {
                "w": 200,
                "h": 130
            }
        },
        "glory_display_relic": {
            "000": {
                "w": 200,
                "h": 110
            }
        },
        "nest_of_kingcrab": {
            "000": {
                "w": 250,
                "h": 150
            }
        },
        "sealedarea_of_darksoul": {
            "000": {
                "w": 250,
                "h": 120
            }
        },
        "supernatural": {
            "000": {
                "w": 150,
                "h": 100
            }
        },
        "swebtower": {
            "000": {
                "w": 370,
                "h": 190
            }
        },
        "gigastemple": {
            "001": {
                "w": 250,
                "h": 80
            }
        },
        "mysteryarea_of_Spain hall": {
            "000": {
                "w": 250,
                "h": 125
            }
        },
        "miznacave_hide": {
            "000": {
                "w": 300,
                "h": 120
            }
        },
        "cave_of_Hesopar": {
            "000": {
                "w": 260,
                "h": 220
            }
        },
        "vampirekingdom": {
            "001": {
                "w": 350,
                "h": 180
            },
            "002": {
                "w": 300,
                "h": 180
            }
        }
    }
    ;

    // ---- アイテム種別 (decomin/batch/rs_decoder/common/text.py の item_type_text を verbatim 移植) ----
    // sokomin.github.io/update/js/itemtype_list.js の同名 const は window に attach されない
    // (`const` は global object に乗らない仕様) ため、本ビューア内で自前定義する。
    var ITEM_TYPE_TEXT = {
        0: "ヘルメット",  1: "冠",        2: "グローブ",   3: "投擲機",     4: "爪",
        5: "ブレスレット", 6: "ベルト",    7: "ブーツ",     8: "ネックレス", 9: "リング",
        10: "イヤリング", 11: "マント",   12: "ブローチ",  13: "腕刺青",   14: "肩刺青",
        15: "十字架",     16: "共用鎧",   17: "専用鎧",    18: "片手剣",   19: "盾",
        20: "両手剣",     21: "杖",       22: "牙",        23: "メイス",   24: "翼",
        25: "短剣",       26: "弓",       27: "矢",        28: "槍",       29: "笛",
        30: "スリング",   31: "スリング弾丸", 32: "ワンド", 33: "鞭",       34: "宝石",
        35: "ヒールポーション", 36: "チャージポーション", 37: "ステータスポーション",
        38: "油、爪、心臓ほか", 39: "治療薬", 40: "霊薬、復活", 41: "鍵",
        42: "移動アイテム", 43: "必殺技の巻物", 44: "お菓子", 45: "力の霊薬ほか",
        46: "魔力補充キット", 47: "セッティング原石", 48: "イベントアイテム",
        49: "クエストアイテム", 50: "課金アイテム", 51: "エンチャント", 52: "BOX",
        53: "null",       54: "鎌",       55: "クロー",    56: "本",       57: "ほうき",
        58: "双剣",       59: "コスチューム", 60: "クレスト", 61: "ダークコア",
        62: "null",       63: "双拳銃",   64: "魔弾石",
        65: "超越の書ノーマル", 66: "超越の書レア", 67: "超越の書ユニーク",
        68: "錬金石",     69: "触媒石",   70: "格闘武器",  71: "鞘",       72: "マスターキー",
        73: "保護帯",     74: "獣毛装飾", 75: "星群",      76: "契約霊",   77: "ウォーペイント",
        78: "コサージュ", 80: "アンカー", 81: "酒瓶",      82: "大砲",     83: "エネルギーチャージャー",
        // 79 は text.py に欠番 (将来拡張枠)
    };

    var state = {
        secretId: null,         // 表示対象の secret_id (number)
        entry: null,            // maplist_secret.csv の該当行
        maplist: [],
        dungeonGroup: [],       // 同一 str_map に属するマップ群 (rmd_index 昇順)
        monsterByName: null,    // name -> monster.csv row (first match)
        monsterById: null,      // id  -> monster.csv row
        scale: 1.0,
        highlightedInid: null,  // 現在ハイライト中の inid (string) または null
    };

    // ---- ユーティリティ ----
    function $(id) { return document.getElementById(id); }
    function getParam(name) {
        var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(location.search);
        return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
    }
    function fetchText(url) {
        return fetch(url, { cache: "no-store" }).then(function (r) {
            if (!r.ok) throw new Error("HTTP " + r.status + " " + url);
            return r.text();
        });
    }
    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var s = document.createElement("script");
            s.src = src;
            s.onload = function () { resolve(); };
            s.onerror = function () { reject(new Error("script load: " + src)); };
            document.head.appendChild(s);
        });
    }
    function escapeHtml(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    // CSV パーサ (QUOTE_ALL 想定 + 空白行スキップ)
    function parseCsv(text) {
        var rows = [], i = 0, n = text.length, row = [], field = "", inQ = false;
        while (i < n) {
            var c = text[i];
            if (inQ) {
                if (c === '"') {
                    if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
                    inQ = false; i++; continue;
                }
                field += c; i++;
            } else {
                if (c === '"') { inQ = true; i++; continue; }
                if (c === ",") { row.push(field); field = ""; i++; continue; }
                if (c === "\r") { i++; continue; }
                if (c === "\n") { row.push(field); field = ""; rows.push(row); row = []; i++; continue; }
                field += c; i++;
            }
        }
        if (field.length || row.length) { row.push(field); rows.push(row); }
        return rows;
    }
    function csvToObjects(rows) {
        if (!rows.length) return [];
        var header = rows[0], out = [];
        for (var i = 1; i < rows.length; i++) {
            var r = rows[i];
            if (r.length === 1 && r[0] === "") continue;
            var o = {};
            for (var j = 0; j < header.length; j++) o[header[j]] = r[j] === undefined ? "" : r[j];
            out.push(o);
        }
        return out;
    }

    // ---- データ読み込み ----
    function loadMaplist() {
        return fetchText(URL_MAPLIST + "?ts=" + Date.now()).then(function (text) {
            var rows = parseCsv(text);
            state.maplist = csvToObjects(rows);
            state.maplist.forEach(function (m) {
                m.id = Number(m.id);
                m.dungeon_id = Number(m.dungeon_id);
                m.width = Number(m.width || 0);
                m.height = Number(m.height || 0);
                m.has_image = Number(m.has_image || 0);
                m.has_image_original = Number(m.has_image_original || 0);
                m.has_mob = Number(m.has_mob || 0);
                m.has_area = Number(m.has_area || 0);
            });
        });
    }

    function loadMonsterCsv() {
        return fetchText(URL_MONSTER_CSV).then(function (text) {
            var rows = parseCsv(text);
            var objs = csvToObjects(rows);
            state.monsterById = {};
            state.monsterByName = {};
            objs.forEach(function (m) {
                state.monsterById[m.id] = m;
                if (m.name && state.monsterByName[m.name] === undefined) {
                    state.monsterByName[m.name] = m;
                }
            });
        }).catch(function (e) {
            console.warn("monster.csv load failed:", e.message);
            state.monsterById = state.monsterById || {};
            state.monsterByName = state.monsterByName || {};
        });
    }

    function loadMobdb(entry) {
        // mobdb_<slug>.js は MobData/AreaData/MobList をグローバルに代入する
        // (key = secret_id)。読み込み後にスコープ局所コピーを作る。
        return loadScript(URL_MOBDB_DIR + entry.mobdb + "?ts=" + Date.now()).then(function () {
            var k = entry.id;
            var data = {
                MobData: (window.MobData && window.MobData[k]) || [],
                AreaData: (window.AreaData && window.AreaData[k]) || [],
                MobList: (window.MobList && window.MobList[k]) || [],
            };
            return data;
        }).catch(function () { return { MobData: [], AreaData: [], MobList: [] }; });
    }

    // ---- マップ切替タブ (同一 str_map で複数マップがあるダンジョン用) ----
    function buildDungeonGroup(entry) {
        // str_map をキーに同一ダンジョン内の全マップを抽出 (rmd_index 昇順)。
        // dungeon_id=-1 (未分類) で別ダンジョンを誤グルーピングしないよう str_map で揃える。
        if (!entry.str_map) return [entry];
        return state.maplist
            .filter(function (m) { return m.str_map === entry.str_map; })
            .sort(function (a, b) {
                var ai = Number(a.rmd_index), bi = Number(b.rmd_index);
                if (Number.isFinite(ai) && Number.isFinite(bi) && ai !== bi) return ai - bi;
                return a.id - b.id;
            });
    }

    function ensureMapTabsContainer() {
        var c = $("map_tabs");
        if (c) return c;
        c = document.createElement("div");
        c.id = "map_tabs";
        var titleNode = $("map_title_name");
        if (titleNode && titleNode.parentNode) {
            titleNode.parentNode.insertBefore(c, titleNode);
        }
        return c;
    }

    function renderMapTabs(currentEntry) {
        var c = ensureMapTabsContainer();
        var group = state.dungeonGroup || [];
        if (group.length <= 1) {
            c.innerHTML = "";
            c.style.display = "none";
            return;
        }
        c.style.display = "";
        var html = '<div class="map-tab-bar">';
        group.forEach(function (m, i) {
            var label = "マップ" + (i + 1);
            var isActive = (m.id === currentEntry.id);
            var canShow = m.has_image || m.has_image_original || m.has_mob;
            var cls = "map-tab" + (isActive ? " active" : "") + (canShow ? "" : " disabled");
            var attrs = 'data-id="' + m.id + '"';
            if (!canShow) attrs += ' disabled';
            html += '<button type="button" class="' + cls + '" ' + attrs + '>' + escapeHtml(label) + '</button>';
        });
        html += '</div>';
        c.innerHTML = html;

        c.querySelectorAll('.map-tab').forEach(function (btn) {
            btn.addEventListener("click", function () {
                if (btn.classList.contains("disabled")) return;
                var id = Number(btn.getAttribute("data-id"));
                if (Number.isFinite(id)) selectMap(id);
            });
        });
    }

    function selectMap(newId) {
        if (state.entry && state.entry.id === newId) return;
        var newEntry = (state.dungeonGroup || []).find(function (m) { return m.id === newId; });
        if (!newEntry) return;

        state.entry = newEntry;
        state.secretId = newId;
        state.highlightedInid = null;
        state.lastData = null;

        if (window.history && window.history.replaceState) {
            try {
                window.history.replaceState({}, "", location.pathname + "?id=" + newId);
            } catch (e) { /* noop */ }
        }

        renderTitle(newEntry);
        renderMapTabs(newEntry);

        if (!newEntry.mobdb) {
            applyImageSize(newEntry);
            $("npc_info").innerHTML = '<p class="viewer-loading">このダンジョンの mob/area データはまだ生成されていません。</p>';
            return;
        }
        loadMobdb(newEntry).then(function (data) {
            state.lastData = data;
            renderOverlay(newEntry, data);
            renderInfoPanel(newEntry, data);
        });
    }

    // ---- レンダリング ----
    function renderTitle(entry) {
        document.title = entry.name_jp + "　秘密ダンジョン　赤石の民衆";
        $("breadcrumb-current").textContent = entry.name_jp;
        $("map_title_name").innerHTML = '<h4>' + escapeHtml(entry.name_jp) + '</h4>';

        var lvText = "";
        if (entry.level_max && Number(entry.level_max) < 9000) {
            lvText = '[適正レベル] ' + entry.level_min + '〜' + entry.level_max;
        } else if (Number(entry.level_min) > 0) {
            lvText = '[最低レベル] ' + entry.level_min;
        }
        $("map_level_range").textContent = lvText;

        var extra = [];
        if (!entry.has_image) extra.push('<span style="color:#888;">※ マップ画像はまだ生成されていません。</span>');
        if (!entry.has_mob) extra.push('<span style="color:#888;">※ モンスター配置データなし。</span>');
        $("map_extra_info").innerHTML = extra.join("<br>");
    }

    // ---- 座標空間の解決 ----
    // 優先順位: IMG_SIZE_OVERRIDES (str_map + rmd_index, "*" は全 rmd 共通)
    //         > 読み込んだ画像の naturalWidth/Height (画像が実画素を持っている場合)
    //         > maplist の width/height (フォールバック)
    function resolveCoordSpace(entry) {
        var ov = IMG_SIZE_OVERRIDES[entry.str_map];
        if (ov) {
            var v = ov[entry.rmd_index] || ov["*"];
            if (v && v.w > 0 && v.h > 0) {
                return { w: v.w, h: v.h, source: "override" };
            }
        }
        var img = $("map_image");
        if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
            return { w: img.naturalWidth, h: img.naturalHeight, source: "natural" };
        }
        return { w: entry.width || 100, h: entry.height || 100, source: "maplist" };
    }

    function applyImageSize(entry) {
        var img = $("map_image");
        var placeholder = $("map_placeholder_node");
        if (placeholder) placeholder.remove();

        var space = resolveCoordSpace(entry);
        var w = space.w;
        var h = space.h;
        var dispH = BASE_HEIGHT * state.scale;
        var dispW = dispH * w / h;

        if ((entry.has_image_original || entry.has_image) && entry.image) {
            img.style.display = "";
            // map_secret_original (人手 curate のカラー版) があればそちらを優先、無ければ
            // 自動生成の白黒 map_secret_png にフォールバック
            var dir = entry.has_image_original ? URL_PNG_ORIGINAL_DIR : URL_PNG_DIR;
            var newSrc = dir + encodeURIComponent(entry.image);
            if (img.src !== newSrc) {
                // 画像を新規ロード → naturalWidth/Height が確定したら座標再計算のため再描画
                img.onload = function () {
                    if (state.entry === entry && state.lastData) {
                        renderOverlay(entry, state.lastData);
                    }
                };
                img.src = newSrc;
            }
            img.style.width = dispW + "px";
            img.style.height = dispH + "px";
        } else {
            img.style.display = "none";
            // 画像なし用のプレースホルダ
            var ph = document.createElement("div");
            ph.id = "map_placeholder_node";
            ph.className = "map-placeholder";
            ph.style.width = dispW + "px";
            ph.style.height = dispH + "px";
            ph.innerHTML = "マップ画像なし<br><span>mob 所在のみ表示</span>";
            img.parentNode.insertBefore(ph, img.nextSibling);
        }
        // 後続要素 (NPC info) のレイアウト維持
        $("map_blank").style.height = dispH + "px";
        return { dispW: dispW, dispH: dispH, w: w, h: h, source: space.source };
    }

    function renderOverlay(entry, data) {
        var sz = applyImageSize(entry);
        // 表示画像 (dispW × dispH) と座標空間 (w × h) の比 = プロット倍率。
        // 横と縦を独立に取り、画像の実描画サイズと mob posx/posy を必ず一致させる。
        var fx = sz.dispW / sz.w;
        var fy = sz.dispH / sz.h;

        // モンスターのドット
        var dotHtml = "";
        (data.MobData || []).forEach(function (row, idx) {
            var x = Number(row.posx || 0) * fx;
            var y = Number(row.posy || 0) * fy;
            var inid = row.inid !== undefined ? row.inid : idx;
            var name = row.name || "(name?)";
            var repop = row.repop || 0;
            var rx = parseInt(row.real_posx || 0, 10);
            var ry = parseInt(row.real_posy || 0, 10);
            var titleName = escapeHtml(name) + "\nリポップ時間：" + repop +
                "秒\n(" + rx + "," + ry + ")";
            var titleType = "type=" + escapeHtml(row.type);
            dotHtml += '\t<div class="Obj Pa a' + inid + '" style="top:' + y + 'px; left:' +
                (x + MAP_PADDING) + 'px;" title="' + titleType + '">' + inid + '</div>\n';
            dotHtml += '\t<div class="Obj Pb a' + inid + '" style="top:' + (y - 1) + 'px; left:' +
                (x + MAP_PADDING - 1) + 'px;" title="' + titleName + '">' + inid + '</div>\n';
        });
        $("map-drawer").innerHTML = dotHtml;

        // エリア (秘密入り口・移動ポータル等)
        var lnkHtml = "";
        (data.AreaData || []).forEach(function (row) {
            var t = Number(row.type);
            var x = Number(row.posx || 0) * fx;
            var y = Number(row.posy || 0) * fy;
            var col = "", nam = "", nam2 = "", alt = "";

            if (t === 2) {
                // 秘密ダンジョン入口
                col = "#00ffff";
                nam = '<img width="15" height="15" title="秘密ダンジョン入口" src="' + URL_ETC_ANM_DIR + 'etc_anm_0064.png">';
                nam2 = nam;
                alt = row.name || "";
            } else if (t === 3) {
                // 移動ポータル (秘密ダンジョン内では基本同じ秘密内の別フロアを指す)
                col = "#00ffff";
                nam = '<img width="15" height="15" src="' + URL_ETC_ANM_DIR + 'etc_anm_0022.png">';
                nam2 = nam;
                alt = row.name || row.access_map || "";
            } else if (t === 5) {
                col = "#ff7fff"; nam = "○"; nam2 = "○"; alt = row.name || "";
            } else if (t === 6) {
                col = "#00ff00";
                nam = '<img title="' + escapeHtml(row.name || "") + '" src="' + URL_INTERFACE2_DIR + 'interface2_0633.png">';
                nam2 = nam;
                alt = row.name || "";
            } else {
                // type=0/4/11 等 — 多くは _필드 전체 / _화면 / 함정 等。位置 0,0 はスキップ。
                if (Number(row.posx) === 0 && Number(row.posx2) === 0 &&
                    Number(row.posy) === 0 && Number(row.posy2) === 0) return;
                col = "#999999"; nam = "·"; nam2 = "·"; alt = "[type " + t + "] " + (row.name || "");
            }
            lnkHtml += '\t<div class="Lnk Pa" style="top:' + (y - 10) + 'px; left:' +
                (x + MAP_PADDING) + 'px;" title="' + escapeHtml(alt) + '">' + nam + '</div>\n';
            lnkHtml += '\t<div class="Lnk" style="top:' + (y - 9) + 'px; left:' +
                (x + MAP_PADDING - 1) + 'px; color:' + col + ';" title="' + escapeHtml(alt) + '">' + nam2 + '</div>\n';
        });
        $("map-portal").innerHTML = lnkHtml;
    }

    // ---- NPC / モンスター情報パネル ----
    function renderInfoPanel(entry, data) {
        var html = '';
        html += '<table border="0"><colgroup><col span="1" width="360px" /><col span="1" width="960px" /></colgroup><tbody><tr><td valign="top">';

        // 左: NPC + モンスター名一覧 (MobList を流用)
        html += renderNameList(data);

        html += '</td><td valign="top">';

        // 右: モンスター詳細 (mob name → monster.csv 解決)
        html += renderMonsterDetails(data);

        html += '</td></tr></tbody></table>';
        $("npc_info").innerHTML = html;
        bindNameListClicks();
        // 直前の選択状態がある場合は再付与 (ダンジョン切替時は init で state.highlightedInid を null に戻す)
        if (state.highlightedInid !== null) applyHighlight(state.highlightedInid);
    }

    function renderNameList(data) {
        var doc = '<table id="table10" border="0" style="width: 360px;" cellspacing="1" cellpadding="2">';
        doc += '<colgroup><col span="1" width="20%" /><col span="1" width="80%" /></colgroup><tbody>';
        doc += '<tr><th colspan="2">NPC・モンスター</th></tr>';

        // MobList[0] は "モンスター" の見出し文字列。MobList[inid + 1] = 各 inid の名前。
        // None. はスキップ。クリックでマップ上の同 inid ドットをハイライト (色反転)。
        var list = data.MobList || [];
        if (list.length <= 1) {
            doc += '<tr><td colspan="2" class="muted">(無し)</td></tr>';
        } else {
            doc += '<tr><th colspan="2">モンスター/NPC</th></tr>';
            for (var i = 1; i < list.length; i++) {
                var name = list[i];
                if (!name || name === "None.") continue;
                var inid = i - 1;
                doc += '<tr><td class="mob-num">' + inid + '</td>' +
                       '<td><a href="javascript:void(0);" class="mob-name-link" data-inid="' + inid + '">' +
                       escapeHtml(name) + '</a></td></tr>';
            }
        }
        doc += '</tbody></table>';
        return doc;
    }

    function renderMonsterDetails(data) {
        var rows = (data.MobData || []).slice();
        if (rows.length === 0) return '<p class="viewer-loading">モンスター情報なし</p>';

        // MobList の順 (inid) で重複排除
        var seen = {};
        var unique = [];
        rows.forEach(function (r) {
            var key = r.name || ("inid_" + r.inid);
            if (seen[key]) return;
            seen[key] = true;
            unique.push(r);
        });

        var hasAny = false;
        var html = '<table id="table10" border="0" style="width: 900px;" cellspacing="1" cellpadding="2">';
        html += '<colgroup><col span="1" width="270px" /><col span="1" width="150px" /><col span="1" width="120px" /><col span="1" width="180px" /></colgroup><tbody>';
        html += '<tr><th colspan="4">モンスター関連情報</th></tr>';
        html += '<tr><th>モンスター名</th><th>画像</th><th>種別</th><th>主なドロップ</th></tr>';

        unique.forEach(function (r) {
            // is_npc は MobData に直接乗っている (true で NPC、false で敵)
            if (r.is_npc) return;
            var md = state.monsterByName ? state.monsterByName[r.name] : null;
            if (!md) {
                // 名前マッチ無し: 名前だけ表示
                html += '<tr><td>' + escapeHtml(r.name || '') + '</td><td>-</td><td>-</td><td>-</td></tr>';
                hasAny = true;
                return;
            }
            // ドロップなしモンスターは省略 (calc.js と同様)
            var drop = createDropItem(md);
            if (!drop) return;
            if (Number(md["DefaultHP"]) <= 0) return;

            var mobLink = '<a href="https://sokomin.github.io/monster/monster-list-detail.html?mi=' + escapeHtml(md.id) +
                '">' + escapeHtml(r.name) + '</a>';
            if (md.name && md.name !== r.name) mobLink += '<br>(' + escapeHtml(md.name) + ')';

            var imgHex = Number(md.EffectId).toString(16);
            imgHex = ('0' + imgHex).slice(-3);
            var imgUrl = URL_MONSTER_IMG_DIR + '0' + imgHex.toLowerCase() + '000' + md.EffectId_2 + '.png';
            var imgTag = '<img width="140px" src="' + imgUrl + '" onerror="this.style.display=\'none\';">';

            var spec = '';
            if (window.mobSpec && window.mobSpec[md.Species] !== undefined) spec += escapeHtml(window.mobSpec[md.Species]);
            if (window.mobRank && window.mobRank[md.Lineage] !== undefined) spec += '<br>' + escapeHtml(window.mobRank[md.Lineage]);

            html += '<tr>';
            html += '<td>' + mobLink + '</td>';
            html += '<td style="background-color:#000;">' + imgTag + '</td>';
            html += '<td>' + spec + '</td>';
            html += '<td style="text-align:left;">' + drop + '</td>';
            html += '</tr>';
            hasAny = true;
        });

        html += '</tbody></table>';
        if (!hasAny) return '<p class="viewer-loading">ドロップ情報のあるモンスターは登録されていません。</p>';
        return html;
    }

    function createDropItem(md) {
        // calc.js と同じ unknown_29 / 33 / 37 / ... / 65 のペアからドロップ種別を抽出
        // 偶数列 = item_type_id, 奇数列 = 抽選比率 (calc.js の表記をそのまま踏襲)。
        if (!md) return "";
        var pairs = [
            ["unknown_29", "unknown_31"], ["unknown_33", "unknown_35"], ["unknown_37", "unknown_39"],
            ["unknown_41", "unknown_43"], ["unknown_45", "unknown_47"], ["unknown_49", "unknown_51"],
            ["unknown_53", "unknown_55"], ["unknown_57", "unknown_59"], ["unknown_61", "unknown_63"],
            ["unknown_65", "unknown_67"],
        ];
        var txt = "";
        pairs.forEach(function (p) {
            var typeId = Number(md[p[0]]);
            if (!Number.isFinite(typeId) || typeId <= 0) return;
            var label = ITEM_TYPE_TEXT[typeId];
            if (!label || label === "null") {
                // text.py 側でも null / 欠番扱いの ID は "種別 N" 表記でフォールバック
                label = "種別 " + typeId;
            }
            txt += "- " + escapeHtml(label) + "(" + escapeHtml(md[p[1]]) + ")<br>";
        });
        return txt;
    }

    // ---- 公開 API (HTML から呼ばれる zoomIn / zoomOut + デバッグ用) ----
    var publicApi = {
        zoomIn: function () { state.scale = Math.min(state.scale + 0.2, 6); rerender(); },
        zoomOut: function () { state.scale = Math.max(state.scale - 0.2, 0.4); rerender(); },

        // デバッグ用: 現在表示中のマップの座標空間を手動指定して即時再描画する。
        // (例) secretViewer.setSize(400, 200) または secretViewer.setSize(400, 200, true)
        // 第3引数 true で同 str_map の全 rmd_index に適用、false (省略) で現在の rmd のみ。
        setSize: function (w, h, applyToAll) {
            if (!state.entry || !(w > 0) || !(h > 0)) return;
            var key = state.entry.str_map;
            if (!IMG_SIZE_OVERRIDES[key]) IMG_SIZE_OVERRIDES[key] = {};
            IMG_SIZE_OVERRIDES[key][applyToAll ? "*" : state.entry.rmd_index] = { w: w, h: h };
            rerender();
            return IMG_SIZE_OVERRIDES;
        },
        // 現在採用されている座標空間 (override / natural / maplist) を確認する
        debugSize: function () {
            if (!state.entry) return null;
            return resolveCoordSpace(state.entry);
        },
        getOverrides: function () { return IMG_SIZE_OVERRIDES; },
    };
    window.secretViewer = publicApi;

    function rerender() {
        if (!state.entry || !state.lastData) return;
        renderOverlay(state.entry, state.lastData);
        // 再描画でハイライトが消えるので状態に応じて再付与
        if (state.highlightedInid !== null) {
            applyHighlight(state.highlightedInid);
        }
    }

    // ---- ハイライト (名前クリック → 同 inid ドットの色反転) ----
    function clearHighlight() {
        document.querySelectorAll('#map-drawer .Obj.highlighted').forEach(function (el) {
            el.classList.remove('highlighted');
        });
        document.querySelectorAll('#npc_info a.mob-name-link.active').forEach(function (el) {
            el.classList.remove('active');
        });
    }

    function applyHighlight(inid) {
        clearHighlight();
        // CSS.escape は古いブラウザ非対応。inid は数値前提なのでエスケープ不要。
        document.querySelectorAll('#map-drawer .Obj.a' + inid).forEach(function (el) {
            el.classList.add('highlighted');
        });
        document.querySelectorAll('#npc_info a.mob-name-link[data-inid="' + inid + '"]').forEach(function (el) {
            el.classList.add('active');
        });
    }

    function toggleHighlight(inid) {
        var key = String(inid);
        if (state.highlightedInid === key) {
            // 同じ名前を再クリック → ハイライト解除
            state.highlightedInid = null;
            clearHighlight();
        } else {
            state.highlightedInid = key;
            applyHighlight(key);
        }
    }

    function bindNameListClicks() {
        var panel = $("npc_info");
        if (!panel || panel.dataset.clickBound === "1") return;
        panel.dataset.clickBound = "1";
        panel.addEventListener("click", function (ev) {
            var t = ev.target;
            // <a class="mob-name-link"> が target でない場合 (内側に span 等を入れた将来の拡張対策)
            while (t && t !== panel && !t.classList.contains("mob-name-link")) {
                t = t.parentNode;
            }
            if (!t || t === panel) return;
            var inid = t.getAttribute("data-inid");
            if (inid === null) return;
            ev.preventDefault();
            toggleHighlight(inid);
        });
    }

    // ---- 初期化 ----
    function showError(msg) {
        $("npc_info").innerHTML = '<div class="viewer-error">' + escapeHtml(msg) + '</div>';
    }

    function init() {
        var idParam = getParam("id");
        if (!idParam) {
            // id 未指定 → 一覧ページ風の fallback (将来は /secret/ 一覧へ誘導)
            showError("URL に ?id=<秘密ダンジョンID> を指定してください (例: ?id=10001)。");
            return;
        }
        var id = Number(idParam);
        if (!Number.isFinite(id)) { showError("不正な id: " + idParam); return; }

        state.secretId = id;

        Promise.all([loadMaplist(), loadMonsterCsv()]).then(function () {
            var entry = state.maplist.find(function (m) { return m.id === id; });
            if (!entry) {
                showError("id=" + id + " は存在しません。");
                return;
            }
            state.entry = entry;
            state.dungeonGroup = buildDungeonGroup(entry);
            renderTitle(entry);
            renderMapTabs(entry);

            if (!entry.mobdb) {
                // rmd 無しダンジョン
                applyImageSize(entry);
                $("npc_info").innerHTML = '<p class="viewer-loading">このダンジョンの mob/area データはまだ生成されていません。</p>';
                return;
            }
            loadMobdb(entry).then(function (data) {
                state.lastData = data;
                renderOverlay(entry, data);
                renderInfoPanel(entry, data);
            });
        }).catch(function (e) {
            console.error(e);
            showError("初期化失敗: " + e.message);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
