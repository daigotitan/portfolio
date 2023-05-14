/*
https://www.google.com/search?q=javascript+%E9%85%8D%E5%88%97+%E3%81%8B%E3%81%B6%E3%82%89%E3%81%AA%E3%81%84%E3%82%88%E3%81%86%E3%81%AB%E9%81%B8%E6%8A%9E&rlz=1C1CHBD_jaJP865JP865&oq=javascript+%E9%85%8D%E5%88%97+%E3%81%8B%E3%81%B6%E3%82%89%E3%81%AA%E3%81%84%E3%82%88%E3%81%86%E3%81%AB%E9%81%B8%E6%8A%9E&aqs=chrome..69i57.43894j0j7&sourceid=chrome&ie=UTF-8

・question_countsの数の配列question_data[最大question_counts][最大6]を作成し、json_dataのどの順番を出すかの数字を被らないように
　question_data[i][0]の中に数字を格納する。

・question_countsの回数以下を繰り返す
　・4問中どの番号が正解かを設定
  ・4回以下を繰り返す
    ・今の回数が正解ならquestion_data[i][1から4]にquestion_data[i][0]の数字を入れる
    ・正解でなければ
      json_dataの配列からランダムで選択しcolorのRGBYPWKのどれかがquestion_data[i][0]と同じなら
        データのcodeがquestion_data[i][0から3]までで同じなものがなければその番号をquestion_data[i][1から4]に格納
        もしも同じならやり直す
      どれもあてはまらなければ出るまでやり直す
  ・question_data[i][5]には0を入れる

・これでquestion_data[最大question_counts][最大5]にすべて数字がはいる
　・question_data[i][0]が正解でquestion_data[i][1から4]が出題

・各問題でquestion_data[i][5]が0ならまだ問題を出してないので出題する
　第一問だと戻るが表示されず、二問目以降は答えるまで次へが表示されない

・各問題でarea_2の背景をquestion_data[i][0]のcodeのものにする
　question_data[i][1から4]のname_1のみを問題として出す
　ユーザーがクリックしたボタンからquestion_data[i][0]とquestion_data[i][選択]のidを比べて正解を判断
　question_data[i][5]に正解なら1、不正解なら2を入れる。
　表示も正解か不正解で変える。

・解答すれば正解、不正解問わずボタンにすべての情報が表示され、その色に変わる。
　正解なら周りの色が赤くなる。

・戻るで戻った場合、今の番号と照らし合わせて背景と各ボタンの色を変える。
　正解か不正解かも再度表示させ、正解ボタンの周りの色を赤くする。
　もしも全ボタン押してなくてもすべて回答済みの状態で表示させる

・全問終わったらquestion_data[i][5]の1がいくつあるか数えて点数を出す

*/

let count = 0;
const output = document.querySelector('output');

// 各エリアを取得
const area_1 = document.querySelector('.area_1');
const area_2 = document.querySelector('.area_2');
const area_3 = document.querySelector('.area_3');

// 問題数選択ボタンをまとめて question_counts_button として取得
const question_counts_button = document.querySelectorAll('.area_1 ul li');

// 現在の問題番号、残問題数、正解数 の表示要素を取得
const question_counts_area = document.querySelector('.area_2 div');

// 正解、不正解の表示の要素を取得
const result = document.querySelector('.area_2 .result');

// 解答選択ボタンをまとめて question_button として取得
const question_button = document.querySelectorAll('.area_2 ul.question li');

// 前へ、次へ、タイトルへ戻るボタンを取得
const prev = document.querySelector('.area_2 .prev');
const next = document.querySelector('.area_2 .next');
const restart_1 = document.querySelector('.area_2 .restart');

// 結果発表の表示要素を取得
const resurlt_area = document.querySelector('.area_3 ul');

// タイトルへ戻るボタンを取得
const restart_2 = document.querySelector('.area_3 p');

// 非同期通信を行うオブジェクト
let request = new XMLHttpRequest();


// 問題数
let question_counts = 0;
// 現在の問題の番号
let current_count = 0;
// 回答済みの問題の番号
let ansewred_count = 0;
// 正解数
let right_counts = 0;

// 外部JSON読み込みデータ
let json_data = [];

// 順番データ
let order_data = [];

// 出題データ
let question_data = [];

// // 
// request.onreadystatechange = function(){
//   if (request.readyState == 4){
//     if (request.status == 200){
//       let data = request.responseText;
//       console.log(data);
//       json_data = JSON.parse(data);
//       console.log( json_data[0].color );
//       output[0].innerText = json_data[1].name_1;
//     }
//   }
// }
// 初期化の関数 f_init()
const f_init = function(){
  // JSONファイルのHTMLリクエストの初期化を行う
  request.open('GET', 'color.json', true);
  console.log("send前");
  // HTTPリクエストをサーバーに送信する
  request.send(null);
  console.log("send後");
  console.log('request.readyState:' + request.readyState);
  console.log( 'order_data2: '+ order_data );
}

// 順番データ作成
const f_makeOrder = function(){
  // 外部JSON読み込みデータの数だけ繰り返す
  for(let i = 0; i < json_data.length; i++){
    // order_dataに順番と同じ番号を格納する
    order_data[i] = i;
  }
}

// 出題データ作成
const f_makeQuestion = function(){
  // 出題数だけ繰り返す
  for(let i = 0; i < question_counts; i++){
    // 二次元配列にする
    question_data[i] = [];
    // どの順番から出題するかの乱数x（0～現時点でのorder_dataの数）を作成
    let x = Math.floor(Math.random() * order_data.length);
    // 各出題のどれが正解なのかの乱数y（1～4）を作成
    let y = Math.floor(Math.random() * 4) + 1;
    // 6回繰り返す
    for(let j = 0; j < 6; j++){
      // 0番目はjson_dataの何番目が問題なのか格納する
      if(j === 0){
        //question_data[i][0]にorder_dataの乱数x番目の値を渡し、その配列は削除する
        question_data[i][j] = order_data.splice(x, 1);
      }
      // 5番目は回答情報を設定 0：未回答、1：正解、2：不正解。最初なので0
      else if(j === 5){
        question_data[i][j] = 0;
      }
      // 1から4番目は選択肢の順番をjson_dataの何番目かからか取得
      // 1から4のどれが正解かもランダムで決めて、正解ならquestion_data[i][0]と同じ番号を格納する
      // question_data[i][0]とWGKRGBPのどれかが同じで、codeが同じでないものを選び出す。
      // どれが正解かはidを比較すればいいので特に設定しなくてよい（codeの比較でもいいがせっかく作ったのでそっちを使う）
      else{
        // もしも正解なら
        if(j === y){
          // 0番目の問題番号を取得する
          question_data[i][j] = question_data[i][0];
        }
        // 正解でないなら
        else{
          // searching_1 ture：検索を続ける、false：検索終了
          let searching_1 = true;
          // searching_1 が true の間は検索を繰り返す
          while(searching_1){
            // 0 から json_data の数までのどれかの整数kをランダムで取得
            let k = Math.floor(Math.random() * json_data.length);
            // question_data[i][1] から question_data[i][j]までに k が重複していないか確認
            // searching_2 ture：重複していない、false：重複している
            let searching_2 = true;
            for(let l = 1; l < j; l++){
              // 数値が重複していなくてもcodeが同じ場合がありうるのでそちらで比較する
              if(json_data[question_data[i][0]].code === json_data[k].code){
                // 重複していたらループを抜ける
                searching_2 = false;
                break;
              }
            }
            // 整数kが他の選択肢と重複していないなら
            if(searching_2){
              // お互いの順番の色データのcolorに同じ文字があるかを比較する
              // json_dataのquestion_data[i][0]の指定の番号のcolor文字数だけ繰り返す
              for(let m = 0; m < json_data[question_data[i][0]].color.length; m++){
                // すでに同じ文字があった場合はsearching_1 を false になっているのでループを終える
                if(!searching_1){
                  break;
                }
                // json_dataのk番目のcolor文字数だけ繰り返す
                for(let n = 0; n < json_data[k].color.length; n++){
                  count++;
                  // それぞれのcolorで同じ文字があるか
                  if(json_data[question_data[i][0]].color.charAt(m) === json_data[k].color.charAt(n)){
                    // question_data[i][j] に k を代入する
                    question_data[i][j] = k;
                    // searching_1 を falseにしてループを終える。
                    searching_1 = false;
                    break;
                  }
                }
              }
            }
          }
            console.log( 'question_data[i][0]:'+question_data[i][0] );
            console.log( 'json_data[question_data[i][0]].color:'+json_data[question_data[i][0]].color );
            console.log( 'json_data[question_data[i][0]].color.length:'+json_data[question_data[i][0]].color.length );
        }
      }
    }
      console.log( 'question_data: '+ question_data );
  }
}

// ボタンにより問題数を設定して問題を開始する
const f_questionInit = function(question_index){
  // 現在の問題の番号の初期化
  current_count = 0;
  // 回答済みの問題の番号の初期化
  ansewred_count = 0;
  // 正解数の初期化
  right_counts = 0;
    console.log( 'question_index = ' + question_index );
  // 最初のボタンなら問題数は10
  if(question_index === 0){
    question_counts = 10;
  }
  else if(question_index === 1){
    question_counts = 20;
  }
  else if(question_index === 2){
    question_counts = 50;
  }

      f_makeOrder();
      console.log( 'order_data1: '+ order_data );
      f_makeQuestion();
      console.log( 'count: '+ count );
  // 問題エリアに変更し出題する
  f_changeArea(0);
}

// 表示エリアを変更しエリアに合わせた行動を行う
const f_changeArea = function(change_mode){
  // change_mode が 0 なら初期エリアから問題エリアに変更し出題する
  if(change_mode === 0){
    // area_1.classList.toggle('invisible');
    area_1.classList.toggle('visible');
    // area_2.classList.toggle('invisible');
    area_2.classList.toggle('visible');
    // 出題する
    f_question();
  }
  // change_mode が 1 なら問題エリアから初期エリアに変更
  else if(change_mode === 1){
    area_2.classList.toggle('visible');
    area_1.classList.toggle('visible');
  }
}


// 出題する
const f_question = function(){
  // 現在の問題数表示
  question_counts_area.querySelector('.count_1').innerHTML = current_count + 1;
  // 残りの問題数を表示
  question_counts_area.querySelector('.count_2').innerHTML = question_counts - current_count -1;
  // 現在の正解数を表示
  question_counts_area.querySelector('.count_3').innerHTML = right_counts;
  // 正解、不正解の表示部分を非表示にする
  result.classList.add('invisible');
  // もしも第一問目なら「前へ」ボタンを表示させすにそれ以外なら表示させる
  if(current_count === 0){
    prev.classList.add('invisible');
  }
  else{
    prev.classList.remove('invisible');
  }
  // もしも現在の問題が未回答なら「次へ」ボタンを表示させすにそれ以外なら表示させる
  if(current_count === ansewred_count){
    next.classList.add('invisible');
  }
  else{
    next.classList.remove('invisible');
  }
  // 現在の問題の色を背景にする
  area_2.style.backgroundColor = json_data[question_data[current_count][0]].code;
  // 問題数選択ボタンの数だけ繰り返して選択肢の内容を表示させる
  // console.log('question_button[i].querySelector:'+question_button[0].querySelector('.name').innerHTML);
  for(let i=0; i<question_button.length; i++){
    // ボタンをOFFにする
    question_button[i].classList.remove('on');
    // 正解・不正解の表示を非表示にする
    question_button[i].querySelector('.answer').classList.add('invisible');
    // 各詳細を非表示にする
    question_button[i].querySelector('.detail_1').textContent = '';
    question_button[i].querySelector('.detail_2').textContent = '';
    question_button[i].querySelector('.detail_3').textContent = '';
    // 問題の色名を表示する
    question_button[i].querySelector('.name').textContent = json_data[question_data[current_count][i+1]].name_1;

  }
}


// リクエストの送信の時
request.addEventListener('readystatechange', function(){
  // レスポンスを受信が完了した場合
  if (request.readyState === 4){
    console.log('request.status:'+request.status);
    // 正常に通信が行われた場合
    if (request.status === 200){
      // 受け取ったテキストデータ（JSONファイルのJSON文字列）を data に格納する
      let data = request.responseText;
      //console.log('data:' + data);
      // data の内容をJavaScriptのオブジェクトに変換して json_data に格納する
      json_data = JSON.parse(data);
      console.log( 'json_data[0].color:'+json_data[0].color );
      output.innerText = json_data[1].name_1;

    }
  }
},false);



// 問題数選択ボタンの数だけ繰り返す
for(let i=0; i<question_counts_button.length; i++){
  // 問題数選択ボタンがクリックされた時の処理
  question_counts_button[i].addEventListener('click', function(){

    // クリックされたボタンの順番を取得する
    // （本来は for の i を渡せばよいのだがIEではループの最後の数字で確定してしまうため以下の方法で取得する）

    // HTMLCollectionなどを配列に変換できるslice.callメソッドを利用し、question_counts_button を配列に変換
    let arrayButton = Array.prototype.slice.call(question_counts_button);
    // 配列から指定した要素の順序を取得できるindexOfメソッドを利用し押されたボタンの順番を取得
    let question_index = arrayButton.indexOf(this);

    output.innerText = question_index;
    f_questionInit(question_index);
  },false);
}

// 「タイトルへ戻る」ボタンが押された時の処理
restart_1.addEventListener('click', function(){
  // 問題エリアから初期エリアに変更
  f_changeArea(1);
},false);


// 初期化する
f_init();
