// すべての<dl>をまとめて qa として取得
const qa = document.querySelectorAll('dl.qa');
// <dl>の数だけ繰り返す
for(let i=0; i<qa.length; i++){
  // <dl>すべてに .invisible のクラスを追加（transitionの設定はないので最初のみ一瞬で非表示）
  qa[i].classList.add('invisible');
}

// すべての<dt>をまとめて questions として取得
const questions = document.querySelectorAll('dl.qa dt');
// <dt>の数だけ繰り返す
for(let i=0; i<questions.length; i++){
  // <dt>がクリックされた時の処理
  questions[i].addEventListener('click', function(){
    // クリックされた<dt>の親の<dl>が .unselected か .invisible のクラスを持っていたら
    if(this.parentNode.classList.contains('unselected') ||
      this.parentNode.classList.contains('invisible')){
      // 親の<dl>の .invisible のクラスを削除
      this.parentNode.classList.remove('invisible');
      // 親の<dl>の .unselected のクラスを削除
      this.parentNode.classList.remove('unselected');
      // 親の<dl>に .selected のクラスを追加
      this.parentNode.classList.add('selected');
    }
    // クリックされた<dt>の親の<dl>が .unselected か .invisible のクラスを持っていなかったら
    else{
      // 親の<dl>の .selected のクラスを削除
      this.parentNode.classList.remove('selected');
      // 親の<dl>に .unselected のクラスを追加
      this.parentNode.classList.add('unselected');
    }
  },false);
}
// すべてのボタンをまとめて buttons として取得
const buttons = document.querySelectorAll('.button_area p');
// ボタンの数だけ繰り返す
for(let i=0; i<buttons.length; i++){
  // ボタンにマウスが乗った時
  buttons[i].addEventListener('mouseenter', function(){
    // ボタンに .hover のクラスを追加
    this.classList.add('hover');
  },false);
  // ボタンからマウスが降りた時
  buttons[i].addEventListener('mouseleave', function(){
    // ボタンの .hover のクラスを削除
    this.classList.remove('hover');
  },false);
  // ボタンの上でマウスを押した時
  buttons[i].addEventListener('mousedown', function(){
    // ボタンに .click のクラスを追加
    this.classList.add('click');
  },false);
  // ボタンの上で押したマウスを離す時
  buttons[i].addEventListener('mouseup', function(){
    // ボタンの .click のクラスを削除
    this.classList.remove('click');
  },false);
  // ボタンをクリックした時
  buttons[i].addEventListener('click', function(){
    let qa_name;
    // 押したボタンが .open なら変数に selected を代入
    if(this.classList.contains('open')){
      qa_name = 'selected';
    }
    // 押したボタンが .open でないなら変数に unselected を代入
    else{
      qa_name = 'unselected';
    }
    // すべての<dt>から .selected も .unselected も .invisible も削除して 代入された変数をクラスにして追加
    for(let i=0; i<questions.length; i++){
      questions[i].parentNode.classList.remove('invisible');
      questions[i].parentNode.classList.remove('selected');
      questions[i].parentNode.classList.remove('unselected');
      questions[i].parentNode.classList.add(qa_name);
    }
  },false);
}