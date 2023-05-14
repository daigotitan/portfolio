// すべての .sub_menu をそれぞれ value として操作する
document.querySelectorAll('.sub_menu').forEach((value) => {
  // .sub_menu すべてに .unselected のクラスを追加
  // .sub_menu の下の<li>が非表示になる（transitionの設定はないので最初のみ一瞬で非表示）
  value.classList.add('invisible');
});

// すべての .side_menu をそれぞれ value として操作する
document.querySelectorAll('.side_menu').forEach((value) => {
  // .side_menu すべてに .unselected のクラスを追加
  // .side_menu の下の<li>が非表示になる
  value.classList.add('unselected');
});

// すべての .underline をそれぞれ value として操作する
document.querySelectorAll('.underline').forEach((value) => {
  // .underline すべてに .unselected のクラスを追加して非表示にする
  value.classList.add('invisible');
});

// すべての .main_menu 内の一番上の<li>（.sub_menuの親）のみをまとめて value として操作する
document.querySelectorAll('.main_menu>li').forEach((value) => {
  // 一番上の<li>の上にマウスが乗った場合（子も有効）
  value.addEventListener('mouseenter', () => {
    // 初期化で追加した .invisible のクラスを削除
    value.querySelector('.sub_menu').classList.remove('invisible');
    value.querySelector('.underline').classList.remove('invisible');
    // 子の .sub_menu と .underline から .unselected クラスを削除
    value.querySelector('.sub_menu').classList.remove('unselected');
    value.querySelector('.underline').classList.remove('unselected');
    // 子の .sub_menu と .underline に .selected クラスを追加
    value.querySelector('.sub_menu').classList.add('selected');
    value.querySelector('.underline').classList.add('selected');
  },false);
  // 一番上の<li>の上からマウスが出た場合（子も有効）
  value.addEventListener('mouseleave', () => {
    // 子の .sub_menu と .underline から .selected クラスを削除
    value.querySelector('.sub_menu').classList.remove('selected');
    value.querySelector('.underline').classList.remove('selected');
    // 子の .sub_menu と .underline に .unselected クラスを追加
    value.querySelector('.sub_menu').classList.add('unselected');
    value.querySelector('.underline').classList.add('unselected');
  },false);
});

// すべての .side_menu をそれぞれ value として操作する
// 非表示のための初期化で一度繰り返しているが、わかりやすくするため別に行う
document.querySelectorAll('.side_menu').forEach((value) => {
  // .side_menu の親の<li>の上にマウスが乗った場合（子の .side_menu も有効）
  value.parentNode.addEventListener('mouseenter', () => {
    // .side_menu の .unselected クラスを削除
    // forEachだと直接 value を編集できる
    value.classList.remove('unselected');
    // 同様に.side_menu に .selected クラスを追加
    value.classList.add('selected');
  },false);
  // .side_menu の親の<li>の上からマウスが出た場合（子の .side_menu も有効）
  value.parentNode.addEventListener('mouseleave', () => {
    // .side_menu から .selected クラスを削除
    value.classList.remove('selected');
    // .side_menu に .unselected クラスを追加
    value.classList.add('unselected');
  },false);
});

// 結果表示用の変数を定義
const e_menu_name = document.createElement('p');
const e_link_name = document.createElement('p');
const e_delete_button = document.createElement('p');

// 削除ボタンにマウスが乗った場合（アロー関数を使った場合thisではなくe_delete_buttonを直接使う）
e_delete_button.addEventListener('mouseenter', () => {
  // ボタンに .hover のクラスを追加（ここではthisではない）
  e_delete_button.classList.add('hover');
},false);
// 削除ボタンからマウスが降りた場合（thisを使って自身を制御するので本来はアロー関数は使わないほうがいい）
e_delete_button.addEventListener('mouseleave', function(){
  // ボタンから .hover のクラスを削除
  this.classList.remove('hover');
},false);
// 削除ボタンを押された場合
e_delete_button.addEventListener('click', function(){
  // ボタンから .hover のクラスを削除
  this.classList.remove('hover');
  // 結果表示用の要素を削除
  document.querySelector('main').removeChild(e_menu_name);
  document.querySelector('main').removeChild(e_link_name);
  // IEでは使えないremove()で自身を削除する
  this.remove();
},false);

// 結果表示用の内容設定の関数
const create_result = (menu) => {
  // メニューの内容を取得してクラスを追加する
  e_menu_name.innerHTML = 'メニュー名は <span>'+ menu.textContent + '</span> です。';
  e_menu_name.classList.add('menu_name');
  // メニューのリンク先を取得してクラスを追加する
  e_link_name.innerHTML = 'リンク先は <span>'+ menu.getAttribute('href') + '</span> です。';
  e_link_name.classList.add('link_name');
  // 削除ボタンの表示を設定してクラスを追加する
  e_delete_button.innerHTML = '表示を削除';
  e_delete_button.classList.add('delete_button');
};

// すべてのリンクメニューをそれぞれ value として操作する
document.querySelectorAll('.main_menu a').forEach((value) => {
  // メニューのリンク部分がクリックされた場合
  value.addEventListener('click', (e) => {
    //イベントをキャンセル（リンクさせない）
    e.preventDefault();
    // 結果表示用の内容設定の関数を呼び出す
    create_result(value);
    // 結果表示用のクラスの要素から変数を作成（スクリプトから作成する要素なので最初は存在しない）
    const menu_name = document.querySelector('.menu_name');
    // もしも表示用の要素がまだ存在していない場合
    if (!menu_name){
      // クリックしたリンクメニューの内容から作成された要素を挿入する
      document.querySelector('main').appendChild(e_menu_name);
      document.querySelector('main').appendChild(e_link_name);
      document.querySelector('main').appendChild(e_delete_button);
    }
  },false);
});

