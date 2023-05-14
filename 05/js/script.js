// モニターの画像の種類のインデックス 0:ぐー 1:ちょき 2:ぱー
let v_monitorIndex = 0;
// 結果の画像の種類のインデックス 0:なし 1:かち 2:まけ 3:あいこ
let v_resultIndex = 0;
// ランプ点滅のインデックス 0:消灯 1以上:点灯
let v_lampIndex = 0;
// ランプ点滅のアニメーションID
let v_lampFlash;
// 通常時のモニターのアニメーションID
let v_normalMonitor;
// バトル時のモニターのアニメーションID
let v_battleMonitor;

// .result の画像名配列
const a_resultImg = ['img/result_0.png', 'img/result_1.png', 'img/result_2.png', 'img/result_3.png'];
// .lamp の画像名配列
const a_lampImg = ['img/lamp_0.png', 'img/lamp_1.png', 'img/lamp_2.png', 'img/lamp_3.png'];
// .monitor の画像名配列
const a_monitorImg = ['img/monitor_0.png', 'img/monitor_1.png', 'img/monitor_2.png'];

// メッセージの .message を v_message として取得
const v_message = document.querySelector('.message');
// 結果表示の .result を v_result として取得
const v_result = document.querySelector('.result');
// ランプの .lamp を v_lamp として取得
const v_lamp = document.querySelector('.lamp');
// ジャンケンモニターの .monitor を v_monitor として取得
const v_monitor = document.querySelector('.monitor');
// スタートボタンの .button_start を v_start として取得
const v_start = document.querySelector('.button_start');
// すべての .select_area のジャンケンボタンをまとめて配列にして a_selects として取得
// const ではIEで不具合が起きたときもあった
const a_selects = document.querySelectorAll('.select_area p');

// 初期化の関数 f_init()
const f_init = function(){
  // 結果の画像の種類のインデックスをなしの0にする
  v_resultIndex = 0;
  // v_message の表示を変更する
  v_message.querySelector('p').innerHTML = 'スタートボタンを押してね';
  // v_start に .on のクラスを追加して使用可能にする
  v_start.classList.add('on');
  // ランプが点滅していたら止める
  clearInterval(v_lampFlash);
  // v_lamp に .normal のクラスを追加して回転させる
  v_lamp.classList.add('normal');
  // v_lamp の画像を"img/lamp_2.png"に変更して回転1にする
  v_lamp.querySelector('img').src = a_lampImg[2];
  // v_result の画像を"img/result_0.png"に変更してすべて消灯させる
  v_result.querySelector('img').src = a_resultImg[0];
  // a_selects の各ボタンのクラスから .yellow と .red を削除
  for(let i=0; i<a_selects.length; i++){
    a_selects[i].classList.remove('yellow');
    a_selects[i].classList.remove('red');
  }
  // バトルのモニターのアニメをクリアする
  clearInterval(v_battleMonitor);
  // 通常のモニターのアニメにする
  v_normalMonitor = setInterval(f_monitorChange, 1000);
}

// バトル開始の関数 f_battleStart()
const f_battleStart = function(){
  // 最初の勝負の場合
  if(v_resultIndex === 0){
    // v_message の表示を変更する
    v_message.querySelector('p').innerHTML = 'じゃーん…';
  }
  // あいこからの勝負の場合
  else{
    // v_message の表示を変更する
    v_message.querySelector('p').innerHTML = 'あいこで…';
  }
  // v_start から .on のクラスを削除
  v_start.classList.remove('on');
  // v_lamp から .normal のクラスを削除
  v_lamp.classList.remove('normal');
  // v_lamp に .battle のクラスを追加
  v_lamp.classList.add('battle');
  // v_lamp の画像を"img/lamp_3.png"に変更
  v_lamp.querySelector('img').src = a_lampImg[3];
  // a_selects の各ボタンのクラスから .yellow と .red を削除
  for(let i=0; i<a_selects.length; i++){
    a_selects[i].classList.remove('yellow');
    a_selects[i].classList.remove('red');
  }
  // 通常のモニターのアニメをクリアする
  clearInterval(v_normalMonitor);
  // バトルのモニターのアニメにする
  v_battleMonitor = setInterval(f_monitorChange, 200);
  // すこし待ってじゃんけんボタンが使用可能になる
  setTimeout(function(){
    // 最初の勝負の場合のみ
    if(v_resultIndex === 0){
      v_message.querySelector('p').innerHTML = 'じゃーん　けーん…';
    }
    // a_selects の各ボタンのクラスに .yellow を追加
    for(let i=0; i<a_selects.length; i++){
      a_selects[i].classList.add('yellow');
    }
  }, 1000);
}

// バトル判定の関数 f_battleJudege()
const f_battleJudege = function(v_selectIndex){
  // 最初の勝負の場合
  if(v_resultIndex === 0){
    // v_message の表示を変更する
    v_message.querySelector('p').innerHTML = 'じゃーん　けーん　ぽん！！';
  }
  // あいこからの勝負の場合
  else{
    // v_message の表示を変更する
    v_message.querySelector('p').innerHTML = 'あいこで　しょ！！';
  }
  // CPUの出した手（仮判定） 0:ぐー 1:ちょき 2:ぱー
  let v_cpuIndex = Math.floor(Math.random()*3);
  // モニターの画像の種類のインデックスをCPUの出した手にする
  v_monitorIndex = v_cpuIndex;
  // モニターのバトル表示をクリア
  clearInterval(v_battleMonitor);
  // モニターの画像をCPUの出した手にする
  v_monitor.querySelector('img').src = a_monitorImg[v_monitorIndex];
  // あいこの場合
  if(v_selectIndex === v_cpuIndex){
    // 結果の画像の種類のインデックスをあいこの3にする
    v_resultIndex = 3;
    // v_lamp から .battle のクラスを削除して回転させない
    v_lamp.classList.remove('battle');
    // v_lamp の画像を"img/lamp_1.png"に変更して点灯する
    v_lamp.querySelector('img').src = a_lampImg[1];
    // v_result の画像を"img/result_3.png"に変更
    v_result.querySelector('img').src = a_resultImg[v_resultIndex];
    // 少し待ってからバトル再開
    setTimeout(function(){
      // バトル再開
      f_battleStart();
      console.log('あいこ v_selectIndex : '+ v_selectIndex);
      console.log('あいこ v_cpuIndex : ' + v_cpuIndex);
    }, 2000);

  }
  // 勝った場合（最初の正当な判定で）
  else if(
    // 自分が0、かつ相手が1、または自分が1、かつ相手が2の場合か
    (v_selectIndex === (v_cpuIndex - 1)) && (v_selectIndex !== 2) ||
    // 自分が2、かつ相手が0の場合
    (v_cpuIndex === 0) && (v_selectIndex === 2)){
    // さらにインチキな判定を行い半々であいこにされてしまう
    if(Math.floor(Math.random()*2) === 0){
      // CPUの出した手がプレイヤーの選んだ手と同じにされてしまう
      v_cpuIndex = v_selectIndex;
      // モニターの画像の種類のインデックスをCPUの出した手にする
      v_monitorIndex = v_cpuIndex;
      // モニターの画像をCPUの出した手にする
      v_monitor.querySelector('img').src = a_monitorImg[v_monitorIndex];
      // 結果の画像の種類のインデックスをあいこの3にする
      v_resultIndex = 3;
      // v_lamp から .battle のクラスを削除して回転させない
      v_lamp.classList.remove('battle');
      // v_lamp の画像を"img/lamp_1.png"に変更して点灯する
      v_lamp.querySelector('img').src = a_lampImg[1];
      // v_result の画像を"img/result_3.png"に変更
      v_result.querySelector('img').src = a_resultImg[v_resultIndex];
      // 少し待ってからバトル再開
      setTimeout(function(){
        // バトル再開
        f_battleStart();
        console.log('いんちきあいこ v_selectIndex : '+ v_selectIndex);
        console.log('いんちきあいこ v_cpuIndex : ' + v_cpuIndex);
      }, 2000);
    }
    // インチキに負けずにかち
    else{
      // 結果の画像の種類のインデックスをかちの1にする
      v_resultIndex = 1;
      // v_lamp から .battle のクラスを削除して回転させない
      v_lamp.classList.remove('battle');
      // v_lamp の画像を v_lampFlash で点滅させる
      v_lampFlash = setInterval(f_lampFlash, 200);
      // v_result の画像を"img/result_1.png"に変更
      v_result.querySelector('img').src = a_resultImg[v_resultIndex];
      // 少し待ってからメッセージを変更
      setTimeout(function(){
        // v_message の表示を変更する
        v_message.querySelector('p').innerHTML = 'やっぴーーーー！！！';
          console.log('かち v_selectIndex : '+ v_selectIndex);
          console.log('かち v_cpuIndex : ' + v_cpuIndex);
      }, 2000);
      // さらに少し待ってから初期化する
      setTimeout(function(){
        // 初期化する
        f_init();
      }, 4000);
    }
  }
  // 負けた場合
  else{
    // 結果の画像の種類のインデックスをあいこの2にする
    v_resultIndex = 2;
    // v_lamp から .battle のクラスを削除して回転させない
    v_lamp.classList.remove('battle');
    // v_lamp の画像を"img/lamp_0.png"に変更して消灯する
    v_lamp.querySelector('img').src = a_lampImg[0];
    // v_result の画像を"img/result_2.png"に変更
    v_result.querySelector('img').src = a_resultImg[v_resultIndex];
    // 少し待ってからメッセージを変更
    setTimeout(function(){
      // v_message の表示を変更する
      v_message.querySelector('p').innerHTML = 'ずこーー';
      console.log('まけ v_selectIndex : '+ v_selectIndex);
      console.log('まけ v_cpuIndex : ' + v_cpuIndex);
    }, 1000);
    // さらに少し待ってから初期化する
    setTimeout(function(){
      // 初期化する
      f_init();
    }, 4000);
  }
}

// モニターの画像変更
const f_monitorChange = function(){
  // const v_date = new Date();
  // const v_second = Math.trunc(v_date.getTime());
  // v_monitor.querySelector('img').src = a_monitorImg[v_second % 3];

  // モニターの手を一つずらす ぐー->ちょき ちょき-> ちょき->ぱー
  v_monitorIndex++;
  // ぱーだったらちょきにする
  if (v_monitorIndex >= 3){
    v_monitorIndex = 0;
  }
  // 画像に反映させる
  v_monitor.querySelector('img').src = a_monitorImg[v_monitorIndex];
}

// ランプを点滅させる
const f_lampFlash = function(){
  v_lampIndex++;
  if (v_lampIndex >= 4){
    v_lampIndex = 0;
    // v_lamp の画像を"img/lamp_0.png"に変更して消灯する
    v_lamp.querySelector('img').src = a_lampImg[0];
  }
  else{
    // v_lamp の画像を"img/lamp_1.png"に変更して点灯する
    v_lamp.querySelector('img').src = a_lampImg[1];
  }
}

// 初期化する
f_init();

// スタートを押された場合
v_start.addEventListener('click', function(){
  // クラスが .on なら
  if(this.classList.contains('on')){
    // バトル開始
    f_battleStart();
  }
},false);

// ジャンケン選択ボタンが押された場合
for(let i=0; i<a_selects.length; i++){
  a_selects[i].addEventListener('click', function(){
    // 黄色の状態で押した場合
    if(this.classList.contains('yellow')){
      // すべてのボタンの黄色を解除する
      for(let j=0; j<a_selects.length; j++){
        a_selects[j].classList.remove('yellow');
      }
      // 押されたボタンのみ赤くする
      this.classList.add('red');
      // 本来ならfor の i を渡せばよく、p には予めクラスは必要ないのだが
      // IEでは i が 3になって渡されてしまうので以下のようにした
      if(this.classList.contains('button_0')){
        // バトル開始 ぐー
        f_battleJudege(0);
      }
      else if(this.classList.contains('button_1')){
        // バトル開始 ちょき
        f_battleJudege(1);
      }
      else{
        // バトル開始 ぱー
        f_battleJudege(2);
      }
      // 本来ならこれでできた
      // バトル判定の関数に押されたボタンの順序を渡す 0:ぐー 1:ちょき 2:ぱー
      // f_battleJudege(i);
    }
  },false);
}