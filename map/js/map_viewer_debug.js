(function () {
    "use strict";

    var state = {
        mapId: readMapId(),
        zoom: 1,
        imgSizeVersion: "",
        imgSizeLoadedAt: "",
        overrideSize: null,
        naturalImageSize: null,
        mobDbLoaded: false,
        mobDbError: "",
        timer: null,
    };

    window.MobData = window.MobData || {};
    window.AreaData = window.AreaData || {};

    function readMapId() {
        var params = new URLSearchParams(window.location.search);
        var value = Number(params.get("map_id") || params.get("mapid") || 0);
        return Number.isFinite(value) ? value : 0;
    }

    function $(id) {
        return document.getElementById(id);
    }

    function cacheKey() {
        return Date.now().toString(36);
    }

    function loadScript(src, id) {
        return new Promise(function (resolve, reject) {
            if (id) {
                var old = document.getElementById(id);
                if (old) old.remove();
            }
            var script = document.createElement("script");
            script.src = src;
            script.async = true;
            if (id) script.id = id;
            script.onload = function () { resolve(); };
            script.onerror = function () { reject(new Error(src)); };
            document.head.appendChild(script);
        });
    }

    function currentImgSize() {
        var fromFile = window.IMG_SIZE && window.IMG_SIZE[state.mapId];
        return state.overrideSize || fromFile || { w: 300, h: 200 };
    }

    function imgSizeSignature() {
        var item = window.IMG_SIZE && window.IMG_SIZE[state.mapId];
        return JSON.stringify(item || null);
    }

    function loadImgSize(forceRender) {
        return loadScript("database/imgsize.js?debug_ts=" + cacheKey(), "debug-imgsize-js").then(function () {
            var signature = imgSizeSignature();
            var changed = signature !== state.imgSizeVersion;
            state.imgSizeVersion = signature;
            state.imgSizeLoadedAt = new Date().toLocaleTimeString();
            if (forceRender || changed) render();
        }).catch(function () {
            state.imgSizeLoadedAt = "load error";
            renderStatus();
        });
    }

    function loadMobDb() {
        state.mobDbLoaded = false;
        state.mobDbError = "";
        window.MobData = {};
        window.AreaData = {};
        window.MobList = window.MobList || {};
        var src = "https://sokomin.github.io/sokomin_repository/db/mobdb/mobdb" + state.mapId + ".js?debug_ts=" + cacheKey();
        return loadScript(src, "debug-mobdb-js").then(function () {
            state.mobDbLoaded = true;
        }).catch(function () {
            state.mobDbError = "mobdb load error";
        });
    }

    function mapName() {
        if (window.NameList && window.NameList[state.mapId]) return window.NameList[state.mapId].name || "";
        return "";
    }

    function imageName() {
        if (!window.NameList || !window.NameList[state.mapId]) return "";
        return window.NameList[state.mapId].img || window.NameList[state.mapId].black || "";
    }

    function imageUrl() {
        var name = imageName();
        if (!name) return "";
        if (window.NameList[state.mapId].img) return "https://sokomin.github.io/sokomin_repository/db/map/" + name;
        return "https://sokomin.github.io/sokomin_repository/db/map_img/" + name;
    }

    function displaySize(size) {
        if ($("lock-image-natural").checked && state.naturalImageSize) {
            return {
                w: Number(state.naturalImageSize.w || size.w || 300),
                h: Number(state.naturalImageSize.h || size.h || 200),
                scale: 200 / Math.max(Number(size.h || 1), 1),
                mode: "image natural",
            };
        }
        return {
            w: Number(size.w || 300),
            h: Number(size.h || 200),
            scale: 200 / Math.max(Number(size.h || 1), 1),
            mode: "viewer compatible",
        };
    }

    function localImageUrl() {
        var name = imageName();
        return name ? "design/" + name : "";
    }

    function scaled(value, size) {
        return Number(value || 0) * 200 / Math.max(Number(size.h || 1), 1);
    }

    function isOutsidePoint(row, size) {
        var x = Number(row.posx || 0);
        var y = Number(row.posy || 0);
        return x < 0 || y < 0 || x > Number(size.w || 0) || y > Number(size.h || 0);
    }

    function isOutsideArea(row, size) {
        var x1 = Number(row.posx || 0);
        var x2 = Number(row.posx2 || 0);
        var y1 = Number(row.posy || 0);
        var y2 = Number(row.posy2 || 0);
        return Math.min(x1, x2) < 0 || Math.min(y1, y2) < 0 || Math.max(x1, x2) > Number(size.w || 0) || Math.max(y1, y2) > Number(size.h || 0);
    }

    function renderMobs(size) {
        var layer = $("mob-layer");
        layer.innerHTML = "";
        layer.style.display = $("show-mobs").checked ? "block" : "none";
        var rows = (window.MobData && window.MobData[state.mapId]) || [];
        var outside = 0;
        rows.forEach(function (row, index) {
            var dot = document.createElement("div");
            dot.className = "debug-dot";
            if (isOutsidePoint(row, size)) {
                dot.className += " outside";
                outside++;
            }
            dot.style.left = (scaled(row.posx, size) * state.zoom + 10) + "px";
            dot.style.top = (scaled(row.posy, size) * state.zoom) + "px";
            dot.textContent = String(row.inid || index);
            dot.title = (row.name || "") + "\nreal=(" + row.real_posx + "," + row.real_posy + ")\npos=(" + row.posx + "," + row.posy + ")";
            layer.appendChild(dot);
        });
        return { total: rows.length, outside: outside };
    }

    function renderAreas(size) {
        var layer = $("area-layer");
        layer.innerHTML = "";
        layer.style.display = $("show-areas").checked ? "block" : "none";
        var rows = (window.AreaData && window.AreaData[state.mapId]) || [];
        var outside = 0;
        rows.forEach(function (row) {
            var x1 = scaled(row.posx, size);
            var x2 = scaled(row.posx2, size);
            var y1 = scaled(row.posy, size);
            var y2 = scaled(row.posy2, size);
            var area = document.createElement("div");
            area.className = "debug-area";
            if (isOutsideArea(row, size)) {
                area.className += " outside";
                outside++;
            }
            area.style.left = (Math.min(x1, x2) * state.zoom + 10) + "px";
            area.style.top = (Math.min(y1, y2) * state.zoom) + "px";
            area.style.width = Math.max(2, Math.abs(x2 - x1) * state.zoom) + "px";
            area.style.height = Math.max(2, Math.abs(y2 - y1) * state.zoom) + "px";
            area.title = "[" + row.id + "] type=" + row.type + " " + (row.name || "") + "\nreal=(" + row.real_posx + "," + row.real_posy + ")-(" + row.real_posx2 + "," + row.real_posy2 + ")";
            layer.appendChild(area);
        });
        return { total: rows.length, outside: outside };
    }

    function render() {
        var size = currentImgSize();
        var shown = displaySize(size);
        var renderedW = shown.w * shown.scale * state.zoom;
        var renderedH = shown.h * shown.scale * state.zoom;
        var stage = $("map-stage");
        var img = $("map-image");
        stage.style.width = (renderedW + 20) + "px";
        stage.style.height = renderedH + "px";
        img.style.left = "10px";
        img.style.width = renderedW + "px";
        img.style.height = renderedH + "px";
        if (img.dataset.mapId !== String(state.mapId)) {
            img.dataset.mapId = String(state.mapId);
            state.naturalImageSize = null;
            img.src = imageUrl();
        }
        img.onload = function () {
            var nextSize = { w: img.naturalWidth || 0, h: img.naturalHeight || 0 };
            if (!state.naturalImageSize || state.naturalImageSize.w !== nextSize.w || state.naturalImageSize.h !== nextSize.h) {
                state.naturalImageSize = nextSize;
                render();
            }
        };
        img.onerror = function () {
            var fallback = localImageUrl();
            if (fallback && img.src.indexOf(fallback) === -1) img.src = fallback;
        };
        $("map-name").textContent = mapName() || ("map " + state.mapId);
        $("map-meta").textContent = "id=" + state.mapId + " imgsize=" + Number(size.w || 0) + "x" + Number(size.h || 0) + " render=" + Math.round(renderedW) + "x" + Math.round(renderedH);
        var mobStats = renderMobs(size);
        var areaStats = renderAreas(size);
        renderStatus(mobStats, areaStats);
    }

    function renderStatus(mobStats, areaStats) {
        var size = currentImgSize();
        var source = state.overrideSize ? "preview" : "imgsize.js";
        $("status").textContent = [
            "source: " + source,
            "imgsize: w=" + Number(size.w || 0) + " h=" + Number(size.h || 0),
            "natural: " + (state.naturalImageSize ? state.naturalImageSize.w + "x" + state.naturalImageSize.h : "-"),
            "display: " + displaySize(size).mode,
            "loaded: " + (state.imgSizeLoadedAt || "-"),
            "mob: " + ((mobStats && mobStats.total) || 0) + " / outside " + ((mobStats && mobStats.outside) || 0),
            "area: " + ((areaStats && areaStats.total) || 0) + " / outside " + ((areaStats && areaStats.outside) || 0),
            state.mobDbError || "",
        ].filter(Boolean).join("\n");
    }

    function setMapId(mapId) {
        state.mapId = Number(mapId) || 0;
        $("map-id").value = state.mapId;
        state.overrideSize = null;
        $("override-w").value = "";
        $("override-h").value = "";
        var url = new URL(window.location.href);
        url.searchParams.set("map_id", String(state.mapId));
        window.history.replaceState({}, "", url.toString());
        loadMobDb().then(function () {
            return loadImgSize(true);
        });
    }

    function bind() {
        $("map-id").value = state.mapId;
        $("load-map").addEventListener("click", function () {
            setMapId($("map-id").value);
        });
        $("map-id").addEventListener("keydown", function (event) {
            if (event.key === "Enter") setMapId($("map-id").value);
        });
        $("open-viewer").addEventListener("click", function () {
            window.open("map_viewer.html?map_id=" + state.mapId + "&debug_ts=" + cacheKey(), "_blank");
        });
        $("apply-override").addEventListener("click", function () {
            var w = Number($("override-w").value);
            var h = Number($("override-h").value);
            if (w > 0 && h > 0) {
                state.overrideSize = { w: w, h: h };
                render();
            }
        });
        $("clear-override").addEventListener("click", function () {
            state.overrideSize = null;
            $("override-w").value = "";
            $("override-h").value = "";
            render();
        });
        $("zoom").addEventListener("input", function () {
            state.zoom = Number($("zoom").value) || 1;
            render();
        });
        ["show-mobs", "show-areas"].forEach(function (id) {
            $(id).addEventListener("change", render);
        });
        $("lock-image-natural").addEventListener("change", render);
        $("auto-refresh").addEventListener("change", function () {
            if ($("auto-refresh").checked) startTimer();
            else stopTimer();
        });
    }

    function startTimer() {
        stopTimer();
        state.timer = window.setInterval(function () {
            if (!state.overrideSize) loadImgSize(false);
        }, 1500);
    }

    function stopTimer() {
        if (state.timer) window.clearInterval(state.timer);
        state.timer = null;
    }

    bind();
    setMapId(state.mapId);
    startTimer();
}());
