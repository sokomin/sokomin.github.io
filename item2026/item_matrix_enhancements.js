(function () {
  'use strict';

  function cleanText(value) {
    return value.replace(/\s+/g, ' ').trim();
  }

  function imageOnlyLink(link) {
    var clone = link.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll('img'), function (image) {
      image.remove();
    });
    return cleanText(clone.textContent) === '';
  }

  function describeIconLinks(table) {
    var headingRow = Array.prototype.find.call(table.rows, function (row) {
      return row.cells.length > 1 && row.querySelectorAll('th').length === row.cells.length;
    });
    if (!headingRow) {
      return;
    }

    var columnLabels = Array.prototype.map.call(headingRow.cells, function (cell) {
      return cleanText(cell.textContent);
    });

    Array.prototype.forEach.call(table.rows, function (row) {
      var rowLabel = row.cells.length ? cleanText(row.cells[0].textContent) : '';
      Array.prototype.forEach.call(row.cells, function (cell) {
        var columnLabel = columnLabels[logicalColumnIndex(cell)] || '';
        var description = cleanText([rowLabel, columnLabel, '\u30a2\u30a4\u30c6\u30e0\u4e00\u89a7'].filter(Boolean).join(' '));
        if (!description) {
          return;
        }
        Array.prototype.forEach.call(cell.querySelectorAll('a img'), function (image) {
          if (!image.hasAttribute('alt') || cleanText(image.getAttribute('alt') || '') === '') {
            image.setAttribute('alt', description);
          }
          var link = image.closest('a');
          if (link && imageOnlyLink(link) && !link.hasAttribute('aria-label')) {
            link.setAttribute('aria-label', description);
          }
        });
      });
    });
  }

  function logicalColumnIndex(cell) {
    var index = 0;
    var sibling = cell.parentElement.firstElementChild;
    while (sibling && sibling !== cell) {
      index += sibling.colSpan || 1;
      sibling = sibling.nextElementSibling;
    }
    return index;
  }

  function activateCell(table, cell) {
    var selectedColumn = logicalColumnIndex(cell);
    Array.prototype.forEach.call(table.querySelectorAll('.item-matrix-row-active'), function (row) {
      row.classList.remove('item-matrix-row-active');
    });
    Array.prototype.forEach.call(table.querySelectorAll('.item-matrix-col-active'), function (activeCell) {
      activeCell.classList.remove('item-matrix-col-active');
    });

    cell.parentElement.classList.add('item-matrix-row-active');
    Array.prototype.forEach.call(table.rows, function (row) {
      var column = 0;
      Array.prototype.some.call(row.cells, function (rowCell) {
        var nextColumn = column + (rowCell.colSpan || 1);
        if (selectedColumn >= column && selectedColumn < nextColumn) {
          rowCell.classList.add('item-matrix-col-active');
          return true;
        }
        column = nextColumn;
        return false;
      });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('table#table10'), function (table) {
    table.classList.add('item-matrix-enhanced');
    describeIconLinks(table);

    table.addEventListener('pointerdown', function (event) {
      var cell = event.target.closest('th, td');
      if (cell && table.contains(cell)) {
        activateCell(table, cell);
      }
    });

    table.addEventListener('focusin', function (event) {
      var cell = event.target.closest('th, td');
      if (cell && table.contains(cell)) {
        activateCell(table, cell);
      }
    });
  });
}());