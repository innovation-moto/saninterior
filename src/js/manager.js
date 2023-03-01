import Param from './param';
import Util from './module/libs/util';
import swiper from './module/libs/swiper';
import effectManager from './module/effect';
import tableManager from './module/table/manager';
import modalManager from './module/modal/manager';
import tabManager from './module/tab/manager';
import gnaviManager from './module/global/gnavi';
import topManager from './page/top';
import missionManager from './page/mission';
import craftmanshipManager from './page/craftmanship';
import solutionManager from './page/solution';
import aboutManager from './page/about';
import scrollManager from './module/scroll/scrollManager';
import backgroundManager from './module/backgroundManager';

const util = new Util();

export default class Manager {
    constructor() {

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        /* fps計測用 */
        // this.fps = new Stats();
        // this.fps.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        // document.body.appendChild( this.fps.dom );

        /* fps低下対策 */
        this.fpsRate;

        /* class用 */
        this.param = new Param();
        this.effect;
        this.gnavi;
        this.scroll;
        this.tab;
        this.swiper;

        this.page; /* ページごとに読み込むのもを入れる */
        this.lowlayer; //下層ページ共通で読み込むもの

        //設定
        this.conf = {
            lowlayerExclude: ["top"] // lowlayerを読み込まないページ
        };

        /* ステータス */
        this.status = {
            loaded: false,
            loadedAddClass: false,
            paceDone: false, // ローダーライブラリ pace用
            pageID: "",
            execution: "",
            transFlg: false, //画面遷移監視用のフラグ
            scr: {
                inc: 0
            },
            touch: {
                nowInc: 0,
                inc: 0
            }
        }

        this.$header;
        this.$footer;
        this.$kv;
        this.$footerPagetop;
        this.$pagetop;
        this.$footerThreshold;

    }
    init(execution) {
        /* 初期化 */

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.status.pageID = document.getElementsByTagName('body')[0].getAttribute("id");
        this.status.execution = execution;
        TweenMax.set(document.getElementById("l-root"), {
            opacity: 1
        });
        //$('html,body').animate({ scrollTop: 0 }, '1');
        //TweenMax.to(window, '1', { scrollTo : { y : 0, autoKill : false }});

        if (this.status.execution == "landing") {
            // 非同期遷移で書き換えないもの。初回読み込みのみ実行
            this.loadCommon();
        } else {
            // 画面遷移時は一部更新
            this.resize();
        }

        //here
        this.loadPage();


    }
    loadCommon() {
        /* 共通で読み込むもの */

        this.effect = new effectManager(this.param);
        this.gnavi = new gnaviManager(this.param);
        this.scroll = new scrollManager(this.param);
        this.background = new backgroundManager(this.param);

        this.$header = document.getElementById('l-header');
        this.$footer = document.getElementById('l-footer');
        this.$kv = document.querySelector('.l-kv');

        this.scroll.init(this.status.pageID);
        this.background.init(this.status.pageID);
        setTimeout(() => {
            this.resize(this.h);
            if (this.status.execution === "landing") this.render();
        }, 1e2);

        this.gnavi.init();

        //footerのpagetopボタン
        // this.$pagetop = document.getElementById("l-pagetop");
        this.$footerPagetop = document.getElementById("l-footer-pagetop");
        console.log(this.$footerPagetop);
        // this.$pagetop.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     event.stopPropagation();

        //     // スクロールする
        //     TweenLite.to(window, 0.5, {scrollTo:{y:0,autoKill:false}});

        // });
        this.$footerPagetop.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            // スクロールする
            TweenLite.to(window, 0.5, {scrollTo:{y:0,autoKill:false}});

        });

    }
    loadPage() {
        /* ページごとに分岐するもの */

        this.status.loaded = true;
        document.body.classList.add("is-loaded");

        //recruitのタブ挙動のため
        let urlHash = location.hash;
        if (urlHash) {
            location.hash = '';
        }

        // safariでピンチインアウトを殺す処理
        if (document.body.getAttribute("id") !== "zoom") {
            /* "passive" が使えるかどうかを検出 */
            var passiveSupported = false;
            try {
                document.addEventListener("test", null, Object.defineProperty({}, "passive", {
                    get: function () {
                        passiveSupported = true;
                    }
                }));
            } catch (err) {}

            /* リスナーを登録 */
            document.addEventListener('touchstart', function listener(e) {
                /* do something */
                // ピンチイン殺す
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            }, passiveSupported ? {
                passive: false
            } : false);
            document.addEventListener('touchmove', function listener(e) {
                /* do something */
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            }, passiveSupported ? {
                passive: false
            } : false);
        }


        switch (this.status.pageID) {
            case "top":
                this.page = new topManager(this.effect, this.param, util, this.scroll);
                this.page.init();
                break;
            case "mission":
                this.page = new missionManager(this.effect, this.param, util, this.scroll);
                this.page.init();
                break;
            case "solution":
                this.page = new solutionManager(this.effect, this.param, util, this.scroll);
                this.page.init();
                this.swiper = new swiper(this.effect, this.param, util, this.scroll);
                this.swiper.init();
                break;
            case "about":
                this.page = new aboutManager(this.effect, this.param, util, this.scroll);
                this.page.init();
                break;
        }


    }
    render() {

        if (!requestAnimationFrame) {
            setTimeout(() => this.render, 1000 / 60);
        } else {
            requestAnimationFrame(this.render.bind(this));
        }

        this.fpsRate = util.updateTimeRatio();

        //this.fps.begin();

        this.scroll.move(this.fpsRate);

        this.status.loaded = true;
        if (this.status.loaded && !this.status.loadedAddClass) {
            this.status.loadedAddClass = true;
            document.body.classList.add("is-loaded");
        }

        //this.fps.end();

    }
    resize() {

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.param.displayType = (window.innerWidth > this.param.breakpoint) ? "pc" : "sp";
        this.scroll.resize(this.w,this.h);
        //this.page.resize();
        this.status.scr.inc = window.scrollY || window.pageYOffset;
        this.$footerThreshold = this.$footer.getBoundingClientRect().top + this.status.scr.inc;

        this.background.resize(this.w,this.h);

        switch (this.status.pageID) {
            case 'top':
                if (this.page) this.page.resize(this.w, this.h);
                break;
            case 'mission':
                if (this.page) this.page.resize(this.w, this.h);
                break;
            case 'solution':
                this.swiper.resize();
                break;
        }

        if (this.$kv) {
            if (this.status.scr.inc <= this.$kv.offsetHeight) {
                this.$header.classList.add("onKv")
                // this.$pagetop.classList.add("onKv");
                this.$footerPagetop.classList.add("onKv");
            } else {
                this.$header.classList.remove("onKv")
                // this.$pagetop.classList.remove("onKv");
                this.$footerPagetop.classList.remove("onKv");
            }
        }

    }

    wheel(e) {

        let _delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);

    }
    scrolls(e) {

        this.status.scr.inc = window.scrollY || window.pageYOffset;
        switch (this.status.pageID) {
            case 'top':
                if (this.page) this.page.scroll(e, this.status.scr.inc);
                break;
            case 'mission':
                if (this.page) this.page.scroll(e, this.status.scr.inc);
                break;
    
        }



        if (this.$kv) {
            if (this.status.scr.inc <= this.$kv.offsetHeight) {
                this.$header.classList.add("onKv")
                // this.$pagetop.classList.add("onKv");
                this.$footerPagetop.classList.add("onKv");
            } else {
                this.$header.classList.remove("onKv");
                // this.$pagetop.classList.remove("onKv");
                this.$footerPagetop.classList.remove("onKv");
            }
        }

        if(this.$footer) {
            if(this.status.scr.inc + this.h - this.$footerThreshold < 90){
                // this.$pagetop.classList.add("fixed");
                this.$footerPagetop.classList.add("fixed");
            }else{
                // this.$pagetop.classList.remove("fixed");
                this.$footerPagetop.classList.remove("fixed");
            }
        }


    }
    touchmove(e) {


    }
    touchStart(e) {


    }
    touchEnd(e) {

    }
    show() {


    }
    // 画面遷移用に演出
    out() {



    }
}