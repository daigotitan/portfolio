/*
https://www.google.com/search?q=javascript+%E9%85%8D%E5%88%97+%E3%81%8B%E3%81%B6%E3%82%89%E3%81%AA%E3%81%84%E3%82%88%E3%81%86%E3%81%AB%E9%81%B8%E6%8A%9E&rlz=1C1CHBD_jaJP865JP865&oq=javascript+%E9%85%8D%E5%88%97+%E3%81%8B%E3%81%B6%E3%82%89%E3%81%AA%E3%81%84%E3%82%88%E3%81%86%E3%81%AB%E9%81%B8%E6%8A%9E&aqs=chrome..69i57.43894j0j7&sourceid=chrome&ie=UTF-8

・question_countsの数の配列question_data[最大question_counts][最大6]を作成し、json_dataのどの順番を出すかの数字を被らないように
　question_data[i][0]の中に数字を格納する。

・question_countsの回数以下を繰り返す
　・4問中どの番号が正解かを設定
  ・4回、以下を繰り返す
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

・各問題でarea_3の背景をquestion_data[i][0]のcodeのものにする
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

// 各エリアを取得
const area_1 = document.querySelector('.area_1');
const area_2 = document.querySelector('.area_2');
const area_3 = document.querySelector('.area_3');
const area_4 = document.querySelector('.area_4');

// カラーコード選択ボタンをまとめて color_code_button として取得
const color_code_button = document.querySelectorAll('.area_1 ul li');

// 問題数選択ボタンをまとめて question_counts_button として取得
const question_counts_button = document.querySelectorAll('.area_2 ul li');
// スタートに戻る（問題数選択時）ボタンを取得
const restart_1 = document.querySelector('.area_2 p.restart');

// 現在の問題番号、残問題数、正解数 の表示要素を取得
const question_counts_area = document.querySelector('.area_3 div');

// 正解、不正解の表示の要素を取得
const result = document.querySelector('.area_3 .result');

// 解答選択ボタンをまとめて question_select_button として取得
const question_select_button = document.querySelectorAll('.area_3 ul.question li');

// 前へ、次へ、スタートに戻る（出題時）ボタンを取得
const prev = document.querySelector('.area_3 .prev');
const next = document.querySelector('.area_3 .next');
const restart_2 = document.querySelector('.area_3 .restart');

// 結果発表の表示要素を取得
const result_area = document.querySelector('.area_4 ul');

// 結果コメントを取得
const comment = document.querySelector('.area_4 p.comment');
// スタートに戻る（結果発表時）ボタンを取得
const restart_3 = document.querySelector('.area_4 p.restart');

// 非同期通信を行うオブジェクト
let request = new XMLHttpRequest();

// 参照カラーコード
let color_code = 0;

// 問題数
let question_counts = 0;
// 現在の問題の番号
let current_count = 0;
// 回答済みの問題の番号
let ansewred_count = 0;
// 正解数
let correct_counts = 0;

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
// JSONファイルの初期化の関数 f_jsonInit()
const f_jsonInit = function(){
  // JSONのパスを設定する
  let jsonPath = '';
  // color_code 0だとWiliPediaから引用したJSONファイルのパス
  if(color_code === 0){
    jsonPath = 'json/color_1.json'
  }
  // 1だとカラーコードセラピーから引用したJSONファイルのパス
  else{
    jsonPath = 'json/color_2.json'
  }
  // JSONファイルのHTMLリクエストの初期化を行う
  request.open('GET', jsonPath, true);
  console.log("send前");
  // HTTPリクエストをサーバーに送信する
  request.send(null);
  console.log("send後");
  console.log('request.readyState:' + request.readyState);
  console.log( 'order_data2: '+ order_data );
  // 問題数選択エリアに移動
  f_changeArea(0);
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
            // searching_2 ture：重複していない、false：重複している
            let searching_2 = true;
            // ループで重複を確認し、重複があれば次の確認をせずに searching_1 のループを繰り返す
            for(let l = 0; l < j; l++){
              // question_data[i][0] から question_data[i][j-1]までに k が重複していないか確認と数値が重複していなくても問題のcodeが正解と同じ場合がありうるのでそちらで比較する
              if((question_data[i][l] === k) || (json_data[question_data[i][0]].code === json_data[k].code)){
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
        }
      }
    }
  }
}

// ボタンにより問題数を設定して問題を開始する
const f_questionInit = function(question_index){
  // 現在の問題の番号の初期化
  current_count = 0;
  // 回答済みの問題の番号の初期化
  ansewred_count = 0;
  // 正解数の初期化
  correct_counts = 0;
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
  // 順番データ作成
  f_makeOrder();
  // 出題データ作成
  f_makeQuestion();
  // 問題エリアに変更し出題する
  f_changeArea(1);
}

// 回答処理を行う
const f_questionAnswer = function(question_index){
// 最初の答えかどうかのチェック
// 最初の答えで正解ならその処理を行う
// 不正解でもボタンの色は表示させて不正解と表示
// 二度目以降もボタンの色を表示させる。正解不正解に関係なく
// 正解なら二度目以降もボタンにマルはつく
// 一度ボタンを押されると押せなくなる
// 一発正解で他のボタンを押してない状態で次のページに進んだあとに戻った場合押してないボタンもすでに押されたことになり色が表示され押せなくなる
// console.log( 'question_index: '+ question_index );
// console.log( 'question_data[current_count][question_index + 1]: '+ question_data[current_count][question_index + 1] );
  // 正解を選んでいた場合
  if(question_data[current_count][question_index + 1] === question_data[current_count][0]){
    // 回答を正解にする
    question_select_button[question_index].querySelector('.answer span').classList.add('correct');
    // 最初の答え（回答情報が0）の場合
    if(question_data[current_count][5] === 0){
      // 出題データの回答情報を正解（1）にする
      question_data[current_count][5] = 1;
      // 結果の枠を赤くする
      result.classList.add('correct');
      // 結果を正解の表示にする
      result.textContent = '正解！';
      result.classList.remove('invisible');
      // 現在の正解数をを一つ増やして再表示
      correct_counts++;
      question_counts_area.querySelector('.count_3').innerHTML = correct_counts;
    }
    // 回答済みの問題の番号を一つ増やす
    ansewred_count++;
    // 次へボタンを表示させる
    next.classList.remove('invisible');
  }
  // 不正解を選んだ場合
  else{
    // 回答を不正解にする
    question_select_button[question_index].querySelector('.answer span').classList.add('incorrect');
    // 最初の答え（回答情報が0）の場合
    if(question_data[current_count][5] === 0){
      // 出題データの回答情報を不正解（2）にする
      question_data[current_count][5] = 2;
      // 結果の枠は赤くしない
      result.classList.remove('correct');
      // 結果を不正解の表示にする
      result.textContent = '不正解';
      result.classList.remove('invisible');
    }
  }
  // ボタンをONにする
  question_select_button[question_index].classList.add('on');
  // 回答を表示する
  question_select_button[question_index].querySelector('.answer').classList.remove('invisible');
  // 各詳細を表示にする
  question_select_button[question_index].querySelector('.name .name_2').textContent = '（' + json_data[question_data[current_count][question_index + 1]].name_2 + '）';
  question_select_button[question_index].querySelector('.detail_1').textContent = json_data[question_data[current_count][question_index + 1]].detail_1;
  question_select_button[question_index].querySelector('.detail_2').textContent = json_data[question_data[current_count][question_index + 1]].detail_2;
  question_select_button[question_index].querySelector('.detail_3').textContent = json_data[question_data[current_count][question_index + 1]].detail_3;
  // ボタンの色を自分の色にする
  question_select_button[question_index].style.backgroundColor = json_data[question_data[current_count][question_index + 1]].code;
}

// 表示エリアを変更しエリアに合わせた行動を行う
const f_changeArea = function(change_mode){
  // change_mode が 0 なら初期エリアから問題数選択エリアに変更
  if(change_mode === 0){
    area_1.classList.toggle('visible');
    area_2.classList.toggle('visible');
  }
  // change_mode が 1 なら問題数選択エリアから問題エリアに変更し出題する
  if(change_mode === 1){
    area_2.classList.toggle('visible');
    area_3.classList.toggle('visible');
    // 出題する
    f_question();
  }
  // change_mode が 2 なら問題数選択エリアから初期エリアに変更
  if(change_mode === 2){
    area_2.classList.toggle('visible');
    area_1.classList.toggle('visible');
  }
  // change_mode が 3 なら問題エリアから初期エリアに変更
  else if(change_mode === 3){
    area_3.classList.toggle('visible');
    area_1.classList.toggle('visible');
  }
  // change_mode が 4 なら問題エリアから結果エリアに変更
  else if(change_mode === 4){
    area_3.classList.toggle('visible');
    area_4.classList.toggle('visible');
    // 結果表示する
    f_result();
  }
  // change_mode が 5 なら結果エリアから初期エリアに変更
  else if(change_mode === 5){
    area_4.classList.toggle('visible');
    area_1.classList.toggle('visible');
  }
}

// 出題する
const f_question = function(){
  // 参照元のカラーコードを設定
  let code_name = '';
  if(color_code === 0){
    code_name = 'Wikipedia';
  }
  else{
    code_name = 'カラーコードセラピー';
  }
  
  // 現在の問題数表示
  question_counts_area.querySelector('.count_1').innerHTML = current_count + 1;
  // 残りの問題数を表示
  question_counts_area.querySelector('.count_2').innerHTML = question_counts - current_count - 1;
  // 参照カラーコード表示
  question_counts_area.querySelector('.color_code').innerHTML = code_name;
  // 現在の正解数を表示
  question_counts_area.querySelector('.count_3').innerHTML = correct_counts;
  // 正解、不正解の表示部分を非表示にする
  result.classList.add('invisible');
  // もしも第一問目なら「前へ」ボタンを表示させすにそれ以外なら表示させる
  if(current_count === 0){
    prev.classList.add('invisible');
  }
  else{
    prev.classList.remove('invisible');
  }
  // 現在の問題の色を背景にする
  area_3.style.backgroundColor = json_data[question_data[current_count][0]].code;
  // 現在の問題が未回答の場合
  if(current_count === ansewred_count){
    // 「次へ」ボタンを表示させない
    next.classList.add('invisible');
    // 問題数選択ボタンの数だけ繰り返して選択肢の内容を未回答として表示させる
    for(let i=0; i<question_select_button.length; i++){
      // 正解・不正解の設定を解除する
      question_select_button[i].querySelector('.answer span').classList.remove('correct');
      question_select_button[i].querySelector('.answer span').classList.remove('incorrect');
      // ボタンをOFFにする
      question_select_button[i].classList.remove('on');
      // 正解・不正解の表示を非表示にする
      question_select_button[i].querySelector('.answer').classList.add('invisible');
      // 各詳細を非表示にする
      question_select_button[i].querySelector('.name .name_2').textContent = '';
      question_select_button[i].querySelector('.detail_1').textContent = '';
      question_select_button[i].querySelector('.detail_2').textContent = '';
      question_select_button[i].querySelector('.detail_3').textContent = '';
      // 問題の色名を表示する
      question_select_button[i].querySelector('.name .name_1').textContent = json_data[question_data[current_count][i + 1]].name_1;
      // 現在の問題の色をボタンの背景にする
      question_select_button[i].style.backgroundColor = json_data[question_data[current_count][0]].code;
    }
  }
  // 現在の問題が回答済みの場合
  else{
    // 回答が正解（回答情報が1）の場合
    if(question_data[current_count][5] === 1){
      // 結果の枠を赤くする
      result.classList.add('correct');
      // 結果を正解の表示にする
      result.textContent = '正解！';
    }
    // 回答が不正解（回答情報が2）の場合
    else{
      // 結果の枠は赤くしない
      result.classList.remove('correct');
      // 結果を不正解の表示にする
      result.textContent = '不正解';
    }
    // 結果を表示させる
    result.classList.remove('invisible');
    // 「次へ」ボタンを表示させる
    next.classList.remove('invisible');
    // 問題数選択ボタンの数だけ繰り返して選択肢の内容を回答済みとして表示させる
    for(let i=0; i<question_select_button.length; i++){
      // 正解・不正解の設定を解除する
      question_select_button[i].querySelector('.answer span').classList.remove('correct');
      question_select_button[i].querySelector('.answer span').classList.remove('incorrect');
      // ボタンをONにする
      question_select_button[i].classList.add('on');
      // 回答を表示する
      question_select_button[i].querySelector('.answer').classList.remove('invisible');
      // 各詳細を表示にする
      question_select_button[i].querySelector('.name .name_2').textContent = '（' + json_data[question_data[current_count][i + 1]].name_2 + '）';
      question_select_button[i].querySelector('.detail_1').textContent = json_data[question_data[current_count][i + 1]].detail_1;
      question_select_button[i].querySelector('.detail_2').textContent = json_data[question_data[current_count][i + 1]].detail_2;
      question_select_button[i].querySelector('.detail_3').textContent = json_data[question_data[current_count][i + 1]].detail_3;
      // 問題の色名を表示する
      question_select_button[i].querySelector('.name .name_1').textContent = json_data[question_data[current_count][i + 1]].name_1;
      // ボタンの色を自分の色にする
      question_select_button[i].style.backgroundColor = json_data[question_data[current_count][i + 1]].code;
      // 問題が正解の場合
      if(question_data[current_count][i + 1] === question_data[current_count][0]){
        // 回答を正解にする
        question_select_button[i].querySelector('.answer span').classList.add('correct');
      }
      // 問題が不正解の場合
      else{
        // 回答を不正解にする
        question_select_button[i].querySelector('.answer span').classList.add('incorrect');
      }
    }
  }
}

// 結果表示する
const f_result = function(){
  // 正解率
  let correct_rate = correct_counts * 100 / question_counts;
  // コメント
  let comment_text = '';
  // 問題数表示
  result_area.querySelector('.count_4').textContent = question_counts;
  // 正解数表示
  result_area.querySelector('.count_5').textContent = correct_counts;
  // 正解率（小数点2位まで）表示
  result_area.querySelector('.count_6').textContent = correct_rate;
  // 正解率に合わせてコメントを設定
  if(correct_rate === 0){
    comment_text = 'へたくそ やめて かえれ';
  }
  else if(0 < correct_rate && correct_rate < 50){
    comment_text = 'もう少し頑張りましょう';
  }
  else if(50 <= correct_rate && correct_rate < 75){
    comment_text = 'まあまあです';
  }
  else if(75 <= correct_rate && correct_rate < 100){
    comment_text = 'すばらしい！';
  }
  // 100%だと問題数によってコメントが変わる
  else{
    // 10問の場合
    if(question_counts === 10){
      comment_text = 'すっごーい！';
    }
    // 20問の場合
    if(question_counts === 20){
      comment_text = 'えらいっ';
    }
    // 50問の場合
    else{
      comment_text = 'こんな げーむに まじになっちゃって どうするの';
    }
  }
  // コメントを表示
  comment.textContent = comment_text;
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
      // data の内容をJavaScriptのオブジェクトに変換して json_data に格納する
      json_data = JSON.parse(data);
      console.log( 'json_data[0].code:'+json_data[0].code );
    }
  }
},false);


// カラーコード選択ボタンの数だけ繰り返す
for(let i=0; i<color_code_button.length; i++){
  // カラーコード選択ボタンがクリックされた時の処理
  color_code_button[i].addEventListener('click', function(){

    // クリックされたボタンの順番を取得する
    // （本来は for の i を渡せばよいのだがIEではループの最後の数字で確定してしまうため以下の方法で取得する）

    // HTMLCollectionなどを配列に変換できるslice.callメソッドを利用し、color_code_button を配列に変換
    let arrayButton = Array.prototype.slice.call(color_code_button);
    // 配列から指定した要素の順序を取得できるindexOfメソッドを利用し押されたボタンの順番を取得
    let question_index = arrayButton.indexOf(this);
    // 選んだボタンの順番を color_code に設定する 0：Wikipedia、1：カラーコードセラピー
    color_code = question_index;
    // JSONの読み込みを行う
    f_jsonInit();
  },false);
}

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
    // 問題の初期化を行う
    f_questionInit(question_index);
  },false);
}

// 解答選択ボタンの数だけ繰り返す
for(let i=0; i<question_select_button.length; i++){
  // 解答選択ボタンがクリックされた時の処理
  question_select_button[i].addEventListener('click', function(){

    // クリックされたボタンの順番を取得する
    // （本来は for の i を渡せばよいのだがIEではループの最後の数字で確定してしまうため以下の方法で取得する）

    // HTMLCollectionなどを配列に変換できるslice.callメソッドを利用し、question_select_button を配列に変換
    let arrayButton = Array.prototype.slice.call(question_select_button);
    // 配列から指定した要素の順序を取得できるindexOfメソッドを利用し押されたボタンの順番を取得
    let question_index = arrayButton.indexOf(this);
    // ボタンの回答が非表示なら未回答なので処理を行う
    if(question_select_button[question_index].querySelector('.answer').classList.contains('invisible')){
      // 回答処理を行う
      f_questionAnswer(question_index);
    }
  },false);
}

// 「スタートに戻る」ボタン（問題数選択時）が押された時の処理
restart_1.addEventListener('click', function(){
  // 問題数選択エリアから初期エリアに変更
  f_changeArea(2);
},false);

// 「スタートに戻る」（問題時）ボタンが押された時の処理
restart_2.addEventListener('click', function(){
  // 問題エリアから初期エリアに変更
  f_changeArea(3);
},false);

// 「スタートに戻る」（結果発表時）ボタンが押された時の処理
restart_3.addEventListener('click', function(){
  // 結果エリアから初期エリアに変更
  f_changeArea(5);
},false);

// 「次へ」ボタンが押された時の処理
next.addEventListener('click', function(){
  // 最終問題の場合
  if(current_count === question_counts - 1){
    // 問題エリアから結果エリアに変更
    f_changeArea(4);
  }
  // 最終問題以外の場合
  else{
    // 現在の問題の番号を一つ増やす
    current_count++;
    // 問題エリアのまま次の表示を行う
    f_question();
  }
},false);

// 「前へ」ボタンが押された時の処理
prev.addEventListener('click', function(){
  // 現在の問題の番号を一つ減らす
  current_count--;
  // 問題エリアのまま前の表示を行う
  f_question();
},false);
