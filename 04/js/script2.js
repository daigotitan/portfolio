// すべての .sub_menu をまとめて sub_menus として取得
const sub_menus = document.querySelectorAll('.sub_menu');
// sub_menu の数だけ繰り返す
for(let i=0; i<sub_menus.length; i++){
  // .sub_menu すべてに .invisible のクラスを追加
  // .sub_menu の下の<li>が非表示になる（transitionの設定はないので最初のみ一瞬で非表示）
  sub_menus[i].classList.add('invisible');
}

// すべての .side_menu をまとめて side_menus として取得
const side_menus = document.querySelectorAll('.side_menu');
// .side_menu の数だけ繰り返す
for(let i=0; i<side_menus.length; i++){
  // .side_menu すべてに .unselected のクラスを追加
  // .side_menu の下の<li>が非表示になる
  side_menus[i].classList.add('unselected');
}

// すべての .underline をまとめて underlines として取得
const underlines = document.querySelectorAll('.underline');
// .underline の数だけ繰り返す
for(let i=0; i<underlines.length; i++){
  // .underline すべてに .invislble のクラスを追加して非表示にする
  underlines[i].classList.add('invisible');
}

// すべての .main_menu 内の一番上の<li>（.sub_menuの親）のみをまとめて main_lists として取得
const main_lists = document.querySelectorAll('.main_menu>li');
// 一番上の<li>の数だけ繰り返す
for(let i=0; i<main_lists.length; i++){
  // 一番上の<li>の上にマウスが乗った場合（子も有効）
  main_lists[i].addEventListener('mouseenter', function(){
    // 初期化で追加した .invisible のクラスを削除
    this.querySelector('.sub_menu').classList.remove('invisible');
    this.querySelector('.underline').classList.remove('invisible');
    // 子の .sub_menu と .underline から .unselected クラスを削除
    this.querySelector('.sub_menu').classList.remove('unselected');
    this.querySelector('.underline').classList.remove('unselected');
    // 子の .sub_menu と .underline に .selected クラスを追加
    this.querySelector('.sub_menu').classList.add('selected');
    this.querySelector('.underline').classList.add('selected');
  },false);
  // 一番上の<li>の上からマウスが出た場合（子も有効）
  main_lists[i].addEventListener('mouseleave', function(){
    // 子の .sub_menu と .underline から .selected クラスを削除
    this.querySelector('.sub_menu').classList.remove('selected');
    this.querySelector('.underline').classList.remove('selected');
    // 子の .sub_menu と .underline に .unselected クラスを追加
    this.querySelector('.sub_menu').classList.add('unselected');
    this.querySelector('.underline').classList.add('unselected');
  },false);
}

// .side_menu の数だけ繰り返す
// 非表示のための初期化で一度繰り返しているが、わかりやすくするため別に行う
for(let i=0; i<side_menus.length; i++){
  // .side_menu の親の<li>の上にマウスが乗った場合（子の .side_menu も有効）
  side_menus[i].parentNode.addEventListener('mouseenter', function(){
    // thisは子の .side_menu の親の<li>
    // thisの中の .side_menu なので親子を行ったり来たりしているが .unselected クラスを削除
    this.querySelector('.side_menu').classList.remove('unselected');
    // 同様に.side_menu に .selected クラスを追加
    this.querySelector('.side_menu').classList.add('selected');
  },false);
  // .side_menu の親の<li>の上からマウスが出た場合（子の .side_menu も有効）
  side_menus[i].parentNode.addEventListener('mouseleave', function(){
    // .side_menu から .selected クラスを削除
    this.querySelector('.side_menu').classList.remove('selected');
    // .side_menu に .unselected クラスを追加
    this.querySelector('.side_menu').classList.add('unselected');
  },false);
}

// 結果表示用の変数を定義
const e_menu_name = document.createElement('p');
const e_link_name = document.createElement('p');
const e_delete_button = document.createElement('p');

// 削除ボタンにマウスが乗った場合
e_delete_button.addEventListener('mouseenter', function(){
  // ボタンに .hover のクラスを追加
  this.classList.add('hover');
},false);
// 削除ボタンからマウスが降りた場合
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
  // IEではremove()で自身を削除できないので親に削除してもらう
  document.querySelector('main').removeChild(e_delete_button);
},false);

// 結果表示用の内容設定の関数
const create_result = function(menu){
  // メニューの内容を取得してクラスを追加する
  e_menu_name.innerHTML = 'メニュー名は <span>'+ menu.textContent + '</span> です。';
  e_menu_name.classList.add('menu_name');
  // メニューのリンク先を取得してクラスを追加する
  e_link_name.innerHTML = 'リンク先は <span>'+ menu.getAttribute('href') + '</span> です。';
  e_link_name.classList.add('link_name');
  // 削除ボタンの表示を設定してクラスを追加する
  e_delete_button.innerHTML = '表示を削除';
  e_delete_button.classList.add('delete_button');
}

// すべてのリンクメニューをまとめて menus として取得
const menus = document.querySelectorAll('.main_menu a');
// メニューの数だけ繰り返す
for(let i=0; i<menus.length; i++){
  // メニューのリンク部分がクリックされた場合
  menus[i].addEventListener('click', function(e){
    //イベントをキャンセル（リンクさせない）
    e.preventDefault();
    // 結果表示用の内容設定の関数を呼び出す
    create_result(this);
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
}

