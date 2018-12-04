/* global $ */
/* global app */
/* global Map */
/* global Search */
/* global Shop */

if (!app) var app = {};

(function(){
   document.addEventListener('turbolinks:load', function() {
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

  });
  
  
  
})();