/* global $ */
/* global app */
/* global Event */

if (!app) var app = {};

class Search {
  constructor( target ) {
    console.log('---------------------')
    console.log(target);
    var self = this;
    this.search_form = target;
    this.listeners = [];
    
    $( this.search_form ).submit(function() {
      var keyword = $(this).find('[name="keyword"]').val();
      console.log('hogehoge');
      console.log(keyword);
      var pos = app.map.gmap.getCenter();
      var zoom = app.map.gmap.getZoom();
      self.search( keyword, pos, zoom ).then( function( data ) {
        self.dispatch( 'search', data );
      }, function() {
        alert('検索に失敗しました');
      });
      return false;
    });
  }
  search( keyword, pos, zoom ) {
    return new Promise( function( resolve, reject ) {
      app.shop.search( keyword, pos, zoom ).then( function( data ) {
        resolve( data );
      }, function() {
        reject();
      });
    });
  }
  on( type, listener ) {
    this.listeners.push( { 'type': type, 'listener': listener } );
  }
  dispatch( type, data ) {
  console.log(`type=${type}, data=${data}`);
    for ( var p = 0; p < this.listeners.length; p++ ) {
      var o = this.listeners[p];
      if ( o.type == type ) {
        o.listener.call( this, data );
      }
    }
  }
}