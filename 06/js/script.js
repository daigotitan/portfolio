// 横スクロール部分 #js-nav を v_nav として取得
const v_nav = document.querySelector('#js-nav');
// スクロール値表示部分 #js-display を v_display として取得
const v_display = document.querySelector('#js-display');
// すべての <a>要素を 配列 a_links として取得
const a_links = document.querySelectorAll('#js-nav a');

// スクロール座標
let positionX = 0;
// パラメータ格納（page,scroll）
let queryObject = new Object();

// パラメータを取得する関数
const get_parameter = function(){
  // URLからパラメータ部分を取得する
  let queryString = window.location.search;
  // 取得できたら実行
  if(queryString){
    // 取得した文字列から最初の"?"を削除する
    queryString = queryString.substring(1);
    // 複数のパラメータがあるので区切っていた"&"で分けてパラメータごとに配列に格納する
    let parameters = queryString.split('&');
    // 配列の数（2）だけ繰り返す
    for (let i = 0; i < parameters.length; i++){
      // 各パラメータは"="で名前と値で区切られているのでこれも配列に分ける
      let element = parameters[i].split('=');
      // 配列の最初は名前（pageとscroll）でデコードして取得
      let paramName = decodeURIComponent(element[0]);
      // 二番目は名前の対応する値で、デコードしてさらに十進数の数値に変換する
      let paramValue = parseInt(decodeURIComponent(element[1]), 10); 
      // オブジェクトに以下のように加えると名前から値を取得できる
      queryObject[paramName] = paramValue;
    }
  }
}

// アクティブなクラスを設定する関数
const set_active = function(){
  // オブジェクト 
  if('page' in queryObject){
    // リストの数だけ繰り返す
    for (let i = 0; i < a_links.length; i++){
      // 一致する順番があったら
      if(i === queryObject['page']){
        // そのリストの<a>要素に'is-active'というクラスを追加する
        a_links[i].classList.add('is-active');
        break;
      }
    }
  }
  else{
    a_links[0].classList.add('is-active');
  }
}

// URLからパラメータを削除する関数
const delete_parameter = function(){
  // URLの文字列を取得する
  let url_string = window.location.href;
  // 文字列を"?"で区切って配列に分ける
  let a_url = url_string.split('?');
  // 配列のパラメータ以外の文字列で上書きする
  url_string = a_url[0];
  // ブラウザーに表示されているURLを変更する（内容が変わるだけで遷移はしない）
  // history.pushState(null, null, url_string);
  // 以下の方法だと履歴に残さないらしいがイマイチ不明
  //history.replaceState(null, null, url_string);
}

// 画面表示時
window.addEventListener('load', function(){
  // パラメータを取得する
  get_parameter();
  // アクティブなクラスを設定する
  set_active();
  // 取得したスクロール座標の位置にメニューを動かす
  v_nav.scrollLeft = queryObject['scroll'];
  // URLからパラメータを削除する
  delete_parameter()
},false);

// メニューがスクロールされた時
v_nav.addEventListener('scroll', function(){
  // スクロール量を取得
  positionX = v_nav.scrollLeft;
  // スクロール量を表示
  v_display.innerHTML = positionX;
},false);

// リンクの数だけ繰り返す
for(let i=0; i<a_links.length; i++){
  // 即時関数でクロージャを作成して引数に i を渡して n として使用。
  // このやり方でないと繰り返しを使ってのイベントの取得がうまく行かない。特にIE
  (function(n){
    // メニューのリンク部分がクリックされた場合
    a_links[n].addEventListener('click', function(e){
      //イベントをキャンセル（リンクさせない）
      e.preventDefault();
      // リンク先の文字列にページ数とスクロール量を追加する 例："index2.html?page=1&scroll=68"
      let link_string = a_links[n].href + '?page=' + n + '&scroll=' + positionX;
      // リンク先に遷移する
      window.location.href = link_string;
    },false);
  })(i);
}

// get_parameter2();