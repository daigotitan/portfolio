// #i_form を v_form として取得
const v_form = document.getElementById('i_form');
// すべてのテキスト一行入力系をまとめて a_textInputs として取得
const a_textInputs = document.querySelectorAll('.textInput');

// 一行テキスト #i_text を v_textInput として取得
const v_textInput= document.querySelector('#i_text');
// 電話番号 #i_tel を v_telInput として取得
const v_telInput = document.querySelector('#i_tel');
// Eメール #i_email を v_emailInput として取得
const v_emailInput = document.querySelector('#i_email');
// すべてのチェックボックス（name が n_checkbox）をまとめて a_checkboxes として取得
const a_checkboxes = document.getElementsByName('n_checkbox');
// ラジオボタン（name が n_radio）をまとめて a_radios として取得
const a_radios = document.getElementsByName('n_radio');
// プルダウンメニュー #i_select を v_select として取得
const v_select = document.getElementById('i_select');
// ダイアログで表示ボタン #i_dialog を v_dialog として取得
const v_dialog = document.getElementById('i_dialog');
// すべての <output> をまとめて a_outputs として取得
const a_outputs = document.querySelectorAll('output');
// const a_resultLists = document.querySelectorAll('.dialog dd');

// .textInput の数だけ繰り返す
for(let i=0; i<a_textInputs.length; i++){
  // 即時関数でクロージャを作成して引数に i を渡して n として使用。
  // このやり方でないと繰り返しを使ってのイベントの取得がうまく行かない。特にIE
  (function(n){
    // 文字入力型のインプット要素からフォーカスが外れた時
    a_textInputs[n].addEventListener('blur', function(){
      // 関数に現在の要素(this)と番号と内容を渡して内容を確認する
      f_checkTextInput(this, n, a_textInputs[n].value);
    },false);
  })(i);
}

// 各チェック内容を確認する関数。引数(要素, 番号, 内容)
const f_checkTextInput = function(v_input, v_index, v_value){
  let v_text;
  let v_comment = '';
  // 何らかの入力があった場合
  if(v_value){
    // 電話番号の場合
    if(v_index === 1){
      // ハイフンなどは空にする
      v_text = v_value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
      // 電話番号がフォーマット通りか正規表現のチェック
      if (!v_text.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
        v_comment = '<p>電話番号のフォーマットで入力してください。</p>';
      }
    }
    // Eメールの場合
    else if(v_index === 2){
      v_text = v_value;
      // Eメールのアドレスがフォーマット通りか正規表現のチェック
      if (!v_text.match(/^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/)) {
        v_comment = '<p>Eメールのフォーマットで入力してください。</p>';
      }
    }
  }
  // 何も入力されていない場合
  else{
    // 電話番号の場合
    if(v_index === 1){
      v_comment = '<p>電話番号を入力してください。</p>';
    }
    // Eメールアドレスの場合
    else if(v_index === 2){
      v_comment = '<p>Eメールアドレスを入力してください。</p>';
    }
    // その他のテキスト（v_index:0 1行の <input>、v_index:3 <textarea>）
    else{
      v_comment = '<p>テキストを入力してください。</p>';
    }
  }
  // 問題があった場合は注意を表示。なければ文字列があった場合も上書きで消される
  v_input.parentNode.parentNode.querySelector('output').innerHTML = v_comment;
}

// プルダウンメニューの内容が変更された時
v_select.addEventListener('change', function(){
    f_checkSelectInput();
  },false);

// プルダウンメニューからフォーカズが外れた時
v_select.addEventListener('blur', function(){
    f_checkSelectInput();
  },false);

// プルダウンメニューの内容を確認する関数
const f_checkSelectInput = function(){
  let v_comment = '';
  // 内容が変更されていないと中身がデフォルトでは先頭の空っぽが選択されている
  if(!v_select.value){
    v_comment = '<p>プルダウンメニューを選択してください。';
  }
  // 問題があった場合は注意を表示。なければ文字列があった場合も上書きで消される。
  document.querySelector('.c_select output').innerHTML = v_comment;
}

// ラジオボタンの内容を確認する関数（選択された時点で必ず値が入るので change や blur での確認は不要）
// IEではうまくいかなかった
const f_checkRadioInput = function(){
  console.log(v_form.n_radio.value);
  let v_comment = '';
  // 一度も選択されていなければ中身は空っぽ
  if(!v_form.n_radio.value){
    v_comment = '<p>ラジオボタンをチェックしてください。</p>';
  }
  // 問題があった場合は注意を表示。なければ文字列があった場合も上書きで消される。
  document.querySelector('.c_radio output').innerHTML = v_comment;
}

// 「ダイアログに表示する」ボタンが押された時
v_dialog.addEventListener('click', function(){
  let v_bool = true;
  // 各テキストの内容を確認する
  for(let i=0; i<a_textInputs.length; i++){
    f_checkTextInput(a_textInputs[i], i, a_textInputs[i].value);
  }
  // ラジオボタンの内容を確認する
  f_checkRadioInput();
  // プルダウンメニューの内容を確認する
  f_checkSelectInput();
  // すべての<output>の内容を確認
  for(let i=0; i<a_outputs.length; i++){
    // <output>に注意が出ている場合はフラグをOFFにしてその場で中断
    if(a_outputs[i].innerHTML){
      console.log('不合格');
      v_bool = false;
      break;
    }
  }
  // フラグがON（すべての注意が出ていない）場合
  if(v_bool){
    console.log('合格');
    // window.open('dialog.html','Dialog','width=300,height=200,scrollbars=yes');
  }

  console.log(v_textInput.value);
  for(let i=0; i<a_checkboxes.length; i++){
    console.log(i + ' : ' + a_checkboxes[i].checked + ' : ' + a_checkboxes[i].value);
  }
  for(let i=0; i<a_checkboxes.length; i++){
    console.log(i + ' : ' + a_radios[i].checked + ' : ' + a_radios[i].value);
  }
  console.log(v_form.n_radio.value);
  for(let i=0; i<v_form.n_checkbox.length; i++){
    console.log('a_radios : ' + i + ' : ' + a_radios[i].checked + ' : ' + a_radios[i].value);
    console.log('v_form : ' + i + ' : ' + v_form.n_checkbox[i].checked + ' : ' + v_form.n_checkbox[i].value);
  }

},false);




// エンターキー(キーコード:13)を押されたときに勝手に送信させない
document.onkeypress = f_enter;
function f_enter(){
  if( window.event.keyCode == 13 ){
    return false;
  }
}

