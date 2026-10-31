(function () {
  "use strict";
  document.querySelectorAll("[data-npcop-weapons-ref]").forEach(function (target) {
    var source = document.getElementById(target.getAttribute("data-npcop-weapons-ref"));
    if (!source || !source.classList.contains("npc-weapons") || source.children.length !== 25) {
      throw new Error("NPCOP weapon diagram source is missing or invalid");
    }
    target.replaceChildren.apply(target, Array.from(source.children, function (icon) {
      return icon.cloneNode(true);
    }));
  });
}());
