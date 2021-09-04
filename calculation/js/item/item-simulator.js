function getItemJson() {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/calculation/js/item/itemData.json", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(skill_str, req.responseText);
    }
}

function init1() {
    var d1dom = document.getElementById("sub_d1");
    var d2dom = document.getElementById("sub_d2");
    var d3dom = document.getElementById("sub_d3");
    // var d2dom = document.getElementByClassName("d2");
    // var d3dom = document.getElementByClassName("d3");
    skillIdMap.forEach(function (e, index) {
        document.optionlist.a2.options[index] = new Option(e.value, e.value);
        // .options[index] = new Option(e.value, e.value);
        var element1 = document.createElement('option');
        element1.setAttribute('value', e.value);
        element1.innerHTML = e.value;
        d1dom.appendChild(element1);
        var element2 = document.createElement('option');
        element2.setAttribute('value', e.value);
        element2.innerHTML = e.value;
        d2dom.appendChild(element2);
        var element3 = document.createElement('option');
        element3.setAttribute('value', e.value);
        element3.innerHTML = e.value;
        d3dom.appendChild(element3);
        // document.keisannormal.d2.options[index] = new Option(e.value, e.value);
        // document.keisannormal.d3.options[index] = new Option(e.value, e.value);
    });
}
