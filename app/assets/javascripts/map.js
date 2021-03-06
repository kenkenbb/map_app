/* global $ */
/* global app */
/* global google */
/* global navigator */
if (!app) var app = {};


class Map {
  constructor( target ) {
    var self = this;
    this.gmap = null;
    this.markers = [];
    this.current_markers = null;
    
    this.gmap = new google.maps.Map( target.get(0), {
      zoom: 15
    });
    
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( function( position ) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        self.gmap.setCenter(pos);
        
      var my_marker = new google.maps.Marker({
      map : self.gmap,           
      position : pos,
      title: '現在位置',
      animation: google.maps.Animation.DROP  
    });
        
      });
    
    }
    
$(document).on('click', '#display', function(){
  console.log('地図表示');
  var new_latitude = $(this).parents('tr').find('[name="latitude"]').val();
  var new_longitude = $(this).parents('tr').find('[name="longitude"]').val();
  var new_pos = new google.maps.LatLng(new_latitude, new_longitude);
        new google.maps.Marker({
        map: self.gmap,
        position: new_pos,
        animation: google.maps.Animation.DROP,
        icon: {
        url: '/flag2.png',
        scaledSize: new google.maps.Size(24, 24)
        },
        });
        self.gmap.panTo(new_pos);
  });
    
  }
  draw( data ) {
    var self = this;
    // マーカーを削除
    $.each( this.markers, function(i, d) {
      d.setMap(null);
    });
    
    // 検索結果が１件以上の場合
    if ( data.rest && data.rest.length > 0 ) {
      $.each( data.rest, function(i, d) {
        var latitude = d.latitude;
        var longitude = d.longitude;
        var pos = new google.maps.LatLng(latitude, longitude);
        
        // マーカー用のウィンドウを作成
        var marker_info = new google.maps.InfoWindow({
          content: d.name
        });
        
        // マーカーを作成
        var marker = new google.maps.Marker({
          position: pos,
          title: d.name,
          icon: {
          url: '/flag2.png',
          scaledSize: new google.maps.Size(24, 24)
          },
          animation: google.maps.Animation.DROP
        });
        marker.setMap( self.gmap );
        
        // マーカーにイベントを指定
        marker.addListener('click', function() {
          // 開いているマーカーを閉じる
          if ( self.current_marker) {
            self.current_marker.close();
          }
          // マーカーウィンドウを開く
          marker_info.open( self.gmap, marker );
          // 現在開いているマーカーを登録
          self.current_marker = marker_info;
          setTimeout( function() {
            if ( confirm('このお店をお気に入りに保存しますか？') ) {
              app.shop.save( d ).then( function( data ) {
                alert('お店情報を保存しました');
              }, function() {
                alert('お店情報の保存に失敗しました');
              });
            }
          }, 1000 );
        });
        
        // マーカー一覧を保存
        self.markers.push( marker );
      });
    }
  
    
  }
  
  
}