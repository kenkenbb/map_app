/* global $ */
/* global app */
/* global Map */
/* global Search */
/* global Shop */

if (!app) var app = {};

(function(){
  window.addEventListener('load', function() {
    // 初期化
    var map = new Map( $('#app #map') );
    var search = new Search( $('#app #search form') );
    var shop = new Shop();
    // 参照を保持
    app.map = map;
    app.search = search;
    app.shop = shop;
    
    app.search.on( 'search', function( data ) {
      app.map.draw( data );
    });
    
    // Promiseを使わない場合の書き方。このresultは検索結果ではない。
    // 理由：shop.searchの中でAJAX通信を行うため、returnで
    // 結果を返せない＝非同期通信だから。
    // var result = app.shop.search( 'スターバックス', pos zoom );
    
    // したがって、Promiseを使わない場合、コールバック関数を引数に追加する。
    // app.shop.search( 'スターバックス', pos zoom, function(){ ... } );
    
    // いわゆるコールバック地獄っていうのは、このようなfunction()をたくさん入れ子に
    // 書くために、コードが読みにくくなる、という話。
    
    // Promiseを使うと、
    // app.shop.search( 'スターバックス', pos zoom ).then( function(){} , function(){} );
    // というコードで完結する、っていうのが今風の書き方。
    
    
  });
})();