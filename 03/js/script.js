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
// すべてのボタンをそれぞれ value として操作する
document.querySelectorAll('.button_area p').forEach((value) => {
  // ボタンにマウスが乗った時
  value.addEventListener('mouseenter', () => {
    // ボタンに .hover のクラスを追加
    value.classList.add('hover');
  });
  // ボタンからマウスが降りた時
  value.addEventListener('mouseleave', () => {
    // ボタンの .hover のクラスを削除
    value.classList.remove('hover');
  });
  // ボタンの上でマウスを押した時
  value.addEventListener('mousedown', () => {
    // ボタンに .click のクラスを追加
    value.classList.add('click');
  });
  // ボタンの上で押したマウスを離す時
  value.addEventListener('mouseup', () => {
    // ボタンの .click のクラスを削除
    value.classList.remove('click');
  });
  // ボタンをクリックした時
  value.addEventListener('click', () => {
    let qa_name;
    // 押したボタンが .open なら変数に selected を代入
    if(value.classList.contains('open')){
      qa_name = 'selected';
    }
    // 押したボタンが .open でないなら変数に unselected を代入
    else{
      qa_name = 'unselected';
    }
    // すべての<dt>から .selected も .unselected も .invisible も削除して 代入された変数をクラスにして追加
    document.querySelectorAll('dl.qa dt').forEach((value) => {
      value.parentNode.classList.remove('invisible');
      value.parentNode.classList.remove('selected');
      value.parentNode.classList.remove('unselected');
      value.parentNode.classList.add(qa_name);
    });
  });
});