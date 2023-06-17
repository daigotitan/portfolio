$(function(){

  // 親チェックボックスすべて取得
	var $parentItem = $('p input[type=checkbox]');
  // 子チェックボックスすべて取得
	var $childrenItem = $('li input[type=checkbox]');

  // 親チェックボックスに変化があった場合
  $parentItem.on('change', function(){
    // すべての子の状態が親と同じになる
    parentToChildren($(this));
  });

  // 子チェックボックスに変化があった場合
  $childrenItem.on('change', function(){
    // 子のチェック状態に合わせて画像のボーダーの設定をする
    borderOnOff($(this));
    // すべての子の状態に合わせて親の状態も変わる
    childrenToParent($(this));
  });

  // すべての子の状態が親と同じになる関数
  function parentToChildren($thisParentItem){
    // 対象の親の子チェックボックスを取得
    var $categoryChildrenItem = $thisParentItem.closest('div').find('li input[type=checkbox]');
    // 取得した子チェックボックスすべてチェック
    $categoryChildrenItem.each(function(){
      // 親がチェックON状態の時
      if($thisParentItem.prop('checked')){
        // 子はチェック状態ONになる
        $(this).prop('checked', true);
        // ボーダーのクラスを追加
        $(this).closest('li').addClass('on');
      }
      // 親がチェックOFF状態の時
      else{
        // 子はチェック状態OFFになる
        $(this).prop('checked', false);
        // ボーダーのクラスが削除されもとに戻る
        $(this).closest('li').removeClass('on');
      }
    });
  }

  // すべての子の状態に合わせて親の状態も変わる関数
  function childrenToParent($thisChildrenItem){
    // 対象の子の親チェックボックスを取得
    var $categoryParentItem = $thisChildrenItem.closest('div').find('p input[type=checkbox]');
    // 親チェックボックスの子をすべて取得
    var $categoryChildrenItem = $thisChildrenItem.closest('div').find('li input[type=checkbox]');
    // 親は一度はチェック状態OFFになる
    $categoryParentItem.prop('checked', false);
    // 対象の全部の子のチェック
    $categoryChildrenItem.each(function(){
      // 子のチェック状態がONの場合
      if($(this).prop('checked')){
        // 親はチェック状態ONになる
        $categoryParentItem.prop('checked', true);
        // 繰り返しを抜ける
        return false;
      }
    });
  }

  // 子のチェック状態に合わせて画像のボーダーの設定をする関数
  function borderOnOff($thisChildrenItem) {
    // ONならボーダーのクラスを追加
    if($thisChildrenItem.prop('checked')){
      $thisChildrenItem.closest('li').addClass('on');
    }
    // OFFならボーダーのクラスを削除
    else {
      $thisChildrenItem.closest('li').removeClass('on');
    }
  }

});