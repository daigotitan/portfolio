$(function(){

  // オブジェクトを変数にあてる
  let $buttons = $('.buttonlist li'); // 各ボタン
  let $monsters = $('.monsterlist li'); // モンスターリスト
  let $all = $('.all'); // 全種ボタン
  let monsterWidth = $monsters.outerWidth(); // モンスター画像の幅 160px

  // 各ボタンを押した場合の処理
  $buttons.click(function(){
    // アクティブじゃないボタンを押した時のみ作動
    if(!($(this).hasClass('active'))){
      // 全種ボタンを押した場合
      if(($(this).hasClass('all'))){
        // 全モンスターに実行
        $monsters.each(function(){
          // CSSで表示設定をし、幅を設定した160pxにアニメーションで変更
          $(this).css({display:'block'}).stop().animate({width:monsterWidth},1500);
          // アニメーションでモンスターの中身の要素すべて（画像）の不透明度をあげる
          $(this).find('*').stop().animate({opacity:'1'},1500);
        });
      }
      // 全種以外のボタンを押した場合
      else{
        // 押したボタンのクラスを取得（モンスターと同じだから）して変数にする
        let activeclass = $(this).attr('class');
        // 全モンスターに実行
        $monsters.each(function(){
          // モンスターが押されたボタンと同じクラスの場合
          if($(this).hasClass(activeclass)){
            // CSSで表示設定をし、幅を設定した160pxにアニメーションで変更
            $(this).css({display:'block'}).stop().animate({width:monsterWidth},1500);
            // アニメーションでモンスターの中身の要素すべて（画像）の不透明度をあげる
            $(this).find('*').stop().animate({opacity:'1'},1500);
          }
          // モンスターが押されたボタンのクラスじゃない場合
          else{
            // アニメーションでモンスターの中身の要素すべて（画像）の不透明度をさげる
            $(this).find('*').stop().animate({opacity:'0'},1000);
            // 幅を0にアニメーションで変更
            $(this).stop().animate({width:'0'},1000,function(){
              // CSSで非表示にする
              $(this).css({display:'none'});
            });
          }
        });
      }
      // 全部のボタンをアクティブじゃないようにする
      $buttons.removeClass('active');
      // 押されたボタンだけアクティブにする
      $(this).addClass('active');
    }
  });

  // 起動時は全種ボタンをアクティブにする
  $all.addClass('active');

});