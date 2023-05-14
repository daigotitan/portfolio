// 各<dl>をそれぞれ value として操作する
document.querySelectorAll('dl.qa').forEach((value) => {
  // <dl>すべてに .invisible のクラスを追加（transitionの設定はないので最初のみ一瞬で非表示）
  value.classList.add('invisible');
});

// 各<dt>をそれぞれ value として操作する
document.querySelectorAll('dl.qa dt').forEach((value) => {
  // <dt>がクリックされた時の処理
  value.addEventListener('click', () => {
    // クリックされた<dt>の親の<dl>が .unselected か .invisible のクラスを持っていたら
    if(value.parentNode.classList.contains('unselected') ||
      value.parentNode.classList.contains('invisible')){
      // 親の<dl>の .invisible のクラスを削除
      value.parentNode.classList.remove('invisible');
      // 親の<dl>の .unselected のクラスを削除
      value.parentNode.classList.remove('unselected');
      // 親の<dl>に .selected のクラスを追加
      value.parentNode.classList.add('selected');
    }
    // クリックされた<dt>の親の<dl>が .unselected か .invisible のクラスを持っていなかったら
    else{
      // 親の<dl>の .selected のクラスを削除
      value.parentNode.classList.remove('selected');
      // 親の<dl>に .unselected のクラスを追加
      value.parentNode.classList.add('unselected');
    }
  });
});