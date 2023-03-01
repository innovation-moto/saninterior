import Param from '../../param';

const param = new Param();

export default class GoogleMapManager {
    constructor(){

        this.lat = 35.671773;
        this.lng = 139.719192;
        this.id = "p-company-map-google";
        this.icon = "../assets/img/company/b-map_pin_logo.svg";

        this.maps;

        this.maplatlng;

        this.option = {
            style : [
                // グレースケール
                {stylers: [{saturation: '-100'}]},
                // /* ベースの色 */
                // {elementType: 'geometry', stylers: [{color: '#f0f0f0'}]},
                // {elementType: 'labels.text.stroke', stylers: [{color: '#fffff'}]},
                // {elementType: 'labels.text.fill', stylers: [{color: '#444444'}]},
                // /* 場所に合わせた色 */
                // {
                //     featureType: 'administrative.locality',
                //     elementType: 'labels.text.fill',
                //     stylers: [{color: '#765a31'}]
                // },
                // {
                //     featureType: 'poi',
                //     elementType: 'labels.text.fill',
                //     stylers: [{color: '#d59563'}]
                // },
                // /* 公園 */
                // {
                //     featureType: 'poi.park',
                //     elementType: 'geometry',
                //     stylers: [{color: '#dad0c1'}]
                // },
                // {
                //     featureType: 'poi.park',
                //     elementType: 'labels.text.fill',
                //     stylers: [{color: '#dad0c1'}]
                // },
                // /* 道 */
                // {
                //     featureType: 'road',
                //     elementType: 'geometry',
                //     stylers: [{color: '#ffffff'}]
                // },
                // {
                //     featureType: 'road',
                //     elementType: 'geometry.stroke',
                //     stylers: [{color: '#cbcbcb'}]
                // },
                // {
                //     featureType: 'road',
                //     elementType: 'labels.text.fill',
                //     stylers: [{color: '#444444'}]
                // },
                // {
                //     featureType: 'road.highway',
                //     elementType: 'geometry',
                //     stylers: [{color: '#dbc9ad'}]
                // },
                // {
                //     featureType: 'road.highway',
                //     elementType: 'geometry.stroke',
                //     stylers: [{color: '#d5c1a2'}]
                // },
                // {
                //     featureType: 'road.highway',
                //     elementType: 'labels.text.fill',
                //     stylers: [{color: '#444444'}]
                // },
                // /* アイコン */
                // {
                //     "elementType": "labels.icon",
                //     "stylers": [
                //         { "hue": "#bbae9a" },
                //         { "lightness": 0 }
                //     ]
                // },
            ],
            map:[]
        }





    }
    init(){


        this.maplatlng = new google.maps.LatLng(this.lat,this.lng);

        this.option.map = {
            zoom: (Useragnt.pc)?17:16,
            center: this.maplatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            draggable:false
        };


        this.maps = new google.maps.Map(document.getElementById(this.id), this.option.map);

        var _icon = {
            url : this.icon,
            scaledSize :  (Useragnt.pc)?new google.maps.Size(70,90):new google.maps.Size(70*0.8,90*0.8)
            // ↑ここで画像のサイズを指定
        }

        var _marker = new google.maps.Marker({
            position: this.maplatlng,
            map: this.maps,
            icon: _icon
        });

        var _styledMapOptions = { name: '所在地' }
        var _mapStyle = new google.maps.StyledMapType(this.option.style, _styledMapOptions);

        this.maps.mapTypes.set(this.id, _mapStyle);
        this.maps.setMapTypeId(this.id);
        _marker.setMap(this.maps);

    }

    resize(){



    }


}