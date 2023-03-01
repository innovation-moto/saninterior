export default class solutionManager {
    constructor(effect, param) {

        this.effect = effect;
        this.param = param;
        // this.$;
        this.$map;
        this.zoom;
        this.iconSize = {};

    }

    init() {
        let _this = this;

        if(window.innerWidth < 750){
            this.zoom = 16;
            this.iconSize.x = 31.5;
            this.iconSize.y = 49;
            this.iconSize.anchorX = 15.75;
            this.iconSize.anchorY = 42;
        }else{
            this.zoom = 17;
            this.iconSize.x = 42;
            this.iconSize.y = 66;
            this.iconSize.anchorX = 21;
            this.iconSize.anchorY = 60;
        }
        this.$map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
            center: { // 地図の中心を指定
                lat: 35.326299, // 緯度
                lng: 139.360875 // 経度
            },
            zoom: _this.zoom, // 地図のズームを指定
            disableDefaultUI: true,
            styles:
            [
                {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#0080ff"
                        },
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#0080ff"
                        },
                        {
                            "saturation": "24"
                        },
                        {
                            "lightness": "4"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#0066ff"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#0080ff"
                        },
                        {
                            "saturation": "32"
                        },
                        {
                            "lightness": "28"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "saturation": "0"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#0066ff"
                        },
                        {
                            "saturation": "32"
                        },
                        {
                            "lightness": "-8"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#0066ff"
                        },
                        {
                            "lightness": "-8"
                        },
                        {
                            "saturation": "8"
                        }
                    ]
                }
            ]
        });

        var myLatlng = new google.maps.LatLng(35.326299,139.360875);
        console.log(_this.iconSize);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: this.$map,
            title:"日本エアフィルター",
            icon: {
                url: "../assets/img/about/b-access_pointaicon.png",
                size: new google.maps.Size(63, 98),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(_this.iconSize.anchorX, _this.iconSize.anchorY),
                scaledSize: new google.maps.Size(_this.iconSize.x, _this.iconSize.y),
            },
        }); 

    }

    render(mouse, scrollInc) {
    }

    resize(w, h) {
    }

}