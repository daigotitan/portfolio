window.onload = function () {
  var box = document.querySelector('.sports-wbc_tournament__box');
  var button = document.querySelector('.sports-wbc_tournament__button');
  var boxHeight = $('.sports-wbc_tournament__image img').height();
  box.style.height = boxHeight + "px";
  button.addEventListener('click', function () {
    if (box.classList.contains('closed')) {
      box.classList.remove('closed');
      box.classList.add('opened');
      button.innerHTML = "<span>閉じる</span>";
    } else {
      box.classList.remove('opened');
      box.classList.add('closed');
      button.innerHTML = "<span>もっと見る</span>";
    }
  }, false);
}
