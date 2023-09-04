document.addEventListener("DOMContentLoaded", function () {
    var getCellValue = function (tr, idx) {
        var cellValue = tr.children[idx].innerText || tr.children[idx].textContent;
        if (idx === 1) {  // If second column, convert rank to number
            return rankToNumber(cellValue);
        }
        return cellValue;
    }
    var comparer = function (idx, asc) {
        idx -= 1;
        if (idx < 0) { idx = 0; }
        return function (a, b) {
            var v1 = getCellValue(asc ? a : b, idx),
                v2 = getCellValue(asc ? b : a, idx);
            return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
                ? v1 - v2
                : v1.toString().localeCompare(v2);
        }
    }

    // Helper function to convert rank to corresponding number
    var rankToNumber = function (rank) {
        switch(rank) {
            case 'N': return 1;
            case 'R': return 2;
            case 'HR': return 3;
            case 'SR': return 4;
            case 'LR': return 5;
            case 'GR': return 6;
            default: return rank;  // Return original value if not a known rank
        }
    }
    document.querySelectorAll('th').forEach(function (th, idx) {
        th.addEventListener('click', function () {
            var table = th.closest('table');
            var tbody = table.querySelector('tbody');
            Array.from(tbody.querySelectorAll('tr'))
                .sort(comparer(idx, this.asc = !this.asc))
                .forEach(function (tr) {
                    tbody.appendChild(tr);
                });
        });
    });
});