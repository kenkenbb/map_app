/* global $ */
/* global app */

if (!app) var app = {};

class Shop {
  constructor( ) {
  }
  search( keyword, pos, zoom ) {
    var range;
    if (zoom >= 20) {
      range = 5;
    } else if (zoom >= 15 ) {
      range = 4;
    } else if (zoom >= 10 ) {
      range = 3;
    } else if (zoom >= 5 ) {
      range = 2;
    } else {
      range = 1;
    }
    
    return new Promise( function( resolve, reject ) {
    $.ajax({
      url: 'https://api.gnavi.co.jp/RestSearchAPI/v3/',
      method: 'GET',
      dataType: 'json',
      data: {
        keyid: '44e9e81b09c6b2412ccb2fda72ec9960',
        freeword: keyword,
        latitude: pos.lat(),
        longitude: pos.lng(),
        range: range
      }

      }).done( function(data) {
        console.log(`検索は通信成功, data=${data[0]}`);
        resolve( data );
      }).fail( function() {
        reject();
      });
    });
  }
  save( data ) {
    return new Promise( function( resolve, reject ) {
      // 店舗情報を保存
      $.ajax({
        url: '/favorites.json',
        method: 'POST',
        dataType: 'json',
        data: {
           favorite: {
            shop_id: data.id,
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
            url: data.url,
            image_url: data.image_url,
            address: data.address,
            tel: data.tel
          }
        }
      }).done( function( data ) {
        resolve( data );
      }).fail( function() {
        reject();
      });
    });
  }
}