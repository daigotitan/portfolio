// 各<dd>をそれぞれ value として操作する
document.querySelectorAll('dl.qa dd').forEach((value) => {
  // <dd>すべてに .invisible のクラスを追加
  value.classList.add('invisible');
});

// 各<dt>をそれぞれ value として操作する
document.querySelectorAll('dl.qa dt').forEach((value) => {
  // <dt>がクリックされた時の処理
  value.addEventListener('click', () => {
    // クリックされた<dt>が .selected のクラスを持っていたら削除、なければ追加する
    value.classList.toggle('selected');
    // クリックされた<dt>の親の<dl>の子の<dd>が .invisible のクラスを持っていたら削除、なければ追加する
    value.parentNode.querySelector('dd').classList.toggle('invisible');
  });
});