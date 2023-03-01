import Pararax from './pararax';
import ScrollAnimation from './scrollanimation';
import Contents from './contents';

let pararax;
let scrollAnimation;
let contents;


export default class smoothScrollManager{
    constructor(param){

        pararax = new Pararax();
        //this.animation = Useragnt.ie ? false : new ScrollAnimation(param);
        this.animation = new ScrollAnimation(param);
        // contents = new Contents();

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.fpsRate;
        this.pageID;

        this.$bodyTag;
        this.$root;
        this.$container;
        this.$body;


        this.inc = 0;
        this.nowInc = 0;
        this.prevInc = 0;
        this.dir = "next";

        this.paraPoint = [];

        this.type = "normal";

        this.inertia = (param.browserType === 'ie'|| Useragnt.safari||Useragnt.mobile||Useragnt.tablet)?false:true; /* 慣性スクロールを有効にするか */


        /* 状態監視用のフラグ */
        this.status = {
            comp     : false, /* 慣性スクロールが完了したか */
            deviceSize : ""
        }

    }
    init(pageID){


        this.pageID = pageID;
        this.$bodyTag = document.getElementsByTagName('body');
        this.$root = document.getElementById("l-root");
        this.$container = document.getElementById("l-scroll");
        this.$body = document.getElementById("l-scroll-body");

        this.inc = 0;
        this.nowInc = 0;
        this.prevInc = 0;
        this.dir = "next";

        pararax.init();
        if(!this.inertia) this.$bodyTag[0].classList.add('is-inertia-none');
        // setTimeout(()=>{
        //     this.to(1);
        // }, 1e3);
        // this.to(1);

        if(this.animation) this.animation.init(pageID);

        // document.getElementById('l-pagetop').addEventListener("click", () => {
        //     this.smooth(this.$target);
        // });


        // $("#l-pagetop,#l-footer-pagetop").on("click",function(){
        //     $('html,body').animate({ scrollTop: 0 }, '1');
        // });

    }
    to(inc){
        console.log("test");
        TweenLite.to(window, 0.001, {scrollTo:inc,onComplete:()=>{
                this.status.off = false;
            }});
    }
    reset(){
        this.to(0);
        this.update(0,"prev");
        this.nowInc = 0;
        this.trans();
    }
    update(inc,dir){ /* スクロール方向を決めうちしないならdirは空で渡してください */
        this.inc = inc;
        this.dir = (dir==="")?(this.inc>this.prevInc)?"next":"prev":dir;
        // this.prevInc = this.inc;
        this.mode = "scroll";
        this.status.comp = false;
    }
    move(fpsRate) {

        // if(this.status.comp||inc==undefined) return;
        if(this.inc==undefined||this.status.comp) return;

        if(Math.abs(this.inc - this.nowInc) > 50){ //スクロール位置の差が50px以上の時に分岐
            // 1/60秒ごとに30%ずつ実際のスクロール位置に近づいていく y=0.7^t
            let add = 0.1;
            this.nowInc +=  add * (this.inc - this.nowInc)*fpsRate;
        }else{
            // 1/60秒ごとに10%ずつ実際のスクロール位置に近づいていく y=0.9^t
            let add = 0.1;
            this.nowInc +=  add * (this.inc - this.nowInc)*fpsRate;
        }

        this.trans();

    }
    trans() {

        if(this.inertia){
            this.$body.style.transform = 'translateY(-'+ this.nowInc +'px)'
        }
        /* スクロール連動で動作 */
        pararax.check(this.nowInc,this.dir);
        if(this.animation) this.animation.check(this.nowInc);
        if(
            this.prevInc>this.nowInc-0.1&&this.dir=="next" ||
            this.prevInc<this.nowInc+0.1&&this.dir=="prev"
        ){
            this.onComplete();
        }
        this.prevInc = this.nowInc;
    }

    resize (w,h) {
        this.w = w;
        this.h = h;

        if(this.w > 750){
            if(this.pageID == "craftmanship"){
                TweenMax.set(this.$root,{"height":this.$body.clientWidth + window.innerHeight - window.innerWidth});
            }else{
                TweenMax.set(this.$root,{"height":this.$body.clientHeight});
            }
        }else{
            TweenMax.set(this.$root,{"height":"auto"});
        }



        pararax.resize(this.h);
        if(this.animation) this.animation.resize(this.h);
        // contents.resize(this.h);
    }

    /* -------------------------------------------

      -- Callback

    ------------------------------------------- */

    onComplete(){ /* スクロール動作が終わったら */
        this.status.comp = true;
        // this.nowInc = this.inc;
        // this.move(this.fpsRate)
    }

    /* -------------------------------------------

      -- ステータスいじいじするやつ

    ------------------------------------------- */

    datGUI(){

    }
}
