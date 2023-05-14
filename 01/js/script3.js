// すべての<dd>をまとめて answers として取得
const answers = document.querySelectorAll('dl.qa dd');
// <dd>の数だけ繰り返す
for(let i=0; i<answers.length; i++){
  // <dd>すべてに .invisible のクラスを追加
  answers[i].classList.add('invisible');
}

// すべての<dt>をまとめて questions として取得
const questions = document.querySelectorAll('dl.qa dt');
// <dt>の数だけ繰り返す
for(let i=0; i<questions.length; i++){
  // <dt>がクリックされた時の処理
  questions[i].onclick = function(){
    // クリックされた<dt>が .selected のクラスを持っていたら削除、なければ追加する
    this.classList.toggle('selected');
    // クリックされた<dt>の親の<dl>の子の<dd>が .invisible のクラスを持っていたら削除、なければ追加する
    this.parentNode.querySelector('dd').classList.toggle('invisible');
  }
}
