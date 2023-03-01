export default class Param {
    constructor(){

        this.root = "/";
        // this.root = "/recruit/";

        this.breakpoint = 750;
        if(Useragnt.mobile){
            this.userAgent = "sp";
        }else if(Useragnt.tablet){
            this.userAgent = "tablet";
        }else{
            this.userAgent = "pc";
        }
        this.displayType = ( window.innerWidth>this.breakpoint)?"pc":"sp";
        if(document.querySelector("html").classList.contains('ie') || document.querySelector("html").classList.contains('edge')){
            this.browserType = 'ie';
        }else if(document.querySelector("html").classList.contains('safari') && document.querySelector("html").classList.contains('pc')){
            this.browserType = 'safari';
        }else{
            this.browserType = 'other';
        }

        this.ease = CustomEase.create("custom", "M0,0,C0.158,0,0.308,0.047,0.344,0.332,0.412,0.88,0.554,0.946,1,1");

        this.easeSlideUp = Expo.easeOut;

        this.webgl = {
            top : {
                mainvisual : {
                    sence : [
                        {
                            illust : "./assets/video/top/movie01-illust.mp4",
                            bg : "./assets/video/top/movie01-bg.mp4",
                            body : "./assets/video/top/body-bg01_w.mp4",
                        }
                    ]
                }
            }
        }
        this.status = {

        }
        this.instagram = {
            src : "https://www.eventstudio.jp/getInstagram.php"
        }

    }
}
