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
