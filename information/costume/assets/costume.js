document.addEventListener('DOMContentLoaded', function () {
  const dialog = document.getElementById('gif-dialog');
  const dialogImg = document.getElementById('gif-dialog-img');
  const dialogCaption = document.getElementById('gif-dialog-caption');
  if (!dialog || !dialogImg || !dialogCaption) return;

  function openGif(gifUrl, caption) {
    dialogImg.src = gifUrl;
    dialogImg.alt = caption;
    dialogCaption.textContent = caption;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }
  function closeDialog() {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    dialogImg.src = '';
    dialogImg.alt = '';
    dialogCaption.textContent = '';
  }

  document.querySelectorAll('.cos-cell[data-gif]').forEach(function (cell) {
    cell.addEventListener('click', function () {
      const gif = cell.getAttribute('data-gif');
      const caption = cell.getAttribute('data-caption') || '';
      if (gif) openGif(gif, caption);
    });
  });

  dialog.addEventListener('click', function (ev) {
    if (ev.target === dialog) closeDialog();
    if (ev.target.matches('[data-action="close"]')) closeDialog();
  });
});
