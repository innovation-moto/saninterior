export default class gnavi {
    constructor(param){

        // this.effect = effect;
        this.param = param;

        this.$header;
        this.$body;
        this.$container;
        this.$navi;
        this.$trigger;
        this.$link;
        this.$hasChild;
        //this.$naviInner;
        //this.$naviInnerOther;

        this.$searchTrigger;
        this.$searchContent;

        this.$hover;
        this.$hoverBg;

        this.webgl;

        this.status = {
            mode : "close",
            motFlg : false, // 動作中か監視
            searchmode : "close",
            searchmotFlg : false,
            displayType : "",
        }

    }
    init(webgl){

        this.webgl = webgl;

        this.$body = document.getElementById("l-wrapper");

        this.$header = document.getElementById("l-header");
        // this.$container = document.getElementById("l-header-content");
        this.$navi = document.getElementById("l-header-menu__inner");
        this.$naviInner = document.getElementById("l-header-nav");
        //this.$naviInner = document.querySelectorAll("#l-header-nav .item");
        this.$naviBg = document.getElementById("l-header-menu__bg");
        // this.$naviOverlay = document.getElementById("l-header-menu__overlay");
        this.$trigger = document.getElementById("l-header-menu-btn");
        // this.$hover = document.getElementsByClassName("js__gnavi-hover");
        this.$close = document.getElementById("l-header-nav-close");
        this.$link = this.$navi.getElementsByTagName("a");
        this.$hasChild = document.querySelectorAll("#l-header-nav li.hasChild");

        this.$searchTrigger = document.getElementById("l-header-navi__search");
        this.$searchContent = document.getElementById("l-header-navi__search-content");

        //this.effect.show(this.$container.getElementsByClassName("js__op-show"),"set");

        //this.$hoverBg = document.getElementsByClassName("bgfont");

        // for( let i in this.$hoverBg ){
        //     if(this.$hoverBg[i].nodeType!=1) continue; // dom要素以外は処理止める
        //     this.effect.svgGlitch(this.$hoverBg[i],"set");
        // }


        // PC 背景のsvgを表示するアニメーション
        // for(let i in this.$hover){
        //     if(this.$hover[i].nodeType!=1) continue; // dom要素以外は処理止める


        //     this.$hover[i].addEventListener("mouseenter",(e)=>{

        //         let _id = "l-header-content-bg_" + e.target.getAttribute("data-target");

        //         this.effect.svgGlitchSimple(document.getElementById(_id),"show");

        //         TweenMax.to(this.$hover[i].getElementsByClassName("line"),0.4,{
        //             width:'100%',
        //             ease: Power2.easeOut
        //         })

        //     })
        //     this.$hover[i].addEventListener("mouseleave",(e)=>{

        //         let _id = "l-header-content-bg_" + e.target.getAttribute("data-target");

        //         this.effect.svgGlitchSimple(document.getElementById(_id),"out");

        //         TweenMax.to(this.$hover[i].getElementsByClassName("line"),0.4,{
        //             x : '100%',
        //             ease: Power2.easeOut,
        //             onComplete: () => {
        //                 TweenMax.set(this.$hover[i].getElementsByClassName("line"),{x : '0%', width : '0%'});
        //             }
        //         })

        //     })


        // }


        // メニューをオープン
        // this.$trigger.addEventListener("click",()=>{
        //
        //     if(this.status.motFlg) return;
        //     this.status.motFlg = true;
        //
        //     if(this.status.mode == "close"){
        //         this.open(webgl);
        //     }else{
        //         this.close(webgl);
        //     }
        //
        // })

        //gnaviの開閉
        this.$trigger.addEventListener("click",()=>{
            if(this.$trigger.classList.contains("is-close")){
                this.$header.classList.remove("active");
                this.$trigger.classList.remove("is-close");
                TweenMax.to(this.$navi,.6,{
                    yPercent:-100,opacity:0,display: 'none',
                    ease: this.param.ease
                });
                //this.$body.classList.remove('is-locked');
            }else{
                TweenMax.set(this.$navi,{
                    opacity:1,display: 'block',
                });
                TweenMax.set(this.$naviInner,{
                    yPercent:-100,opacity:0,display: 'none',
                });
                TweenMax.set(this.$naviBg,{
                    opacity:0
                });
                // TweenMax.set(this.$naviOverlay,{
                //     xPercent:100,opacity:0
                // });
                TweenMax.to(this.$naviBg,.3,{
                    opacity:1,
                    ease: this.param.ease
                });
                TweenMax.to(this.$naviInner,.6,{
                    yPercent:0,opacity:1,display: 'block',
                    ease: this.param.ease,
                    delay: 0.3,
                });
                // TweenMax.staggerTo(this.$naviInner,.6,{
                //     delay: .3,
                //     xPercent:0,opacity:1,
                //     ease: this.param.ease
                // },.02);
                this.$trigger.classList.add("is-close")
                this.$header.classList.add("active");
                //this.$body.classList.add('is-locked');
            }

        });

        //閉じるボタンクリック時
        this.$close.addEventListener("click",()=>{
            this.$header.classList.remove("active");
            this.$trigger.classList.remove("is-close");
            TweenMax.to(this.$navi,.6,{
                opacity:0,display: 'none',
            });
        });

        //黒背景クリック時
        this.$naviBg.addEventListener("click",()=>{
            this.$header.classList.remove("active");
            this.$trigger.classList.remove("is-close");
            TweenMax.to(this.$navi,.6,{
                opacity:0,display: 'none',
            });
        });

        // リンクをクリックした際
        for(let i in this.$link){
            if(this.$link[i].nodeType!=1) continue; // dom要素以外は処理止める
            this.$link[i].addEventListener("click",()=>{
                this.$trigger.classList.remove("is-close")
                this.$header.classList.remove("active");
                TweenMax.to(this.$navi,.6,{
                    opacity:0,display: 'none',
                });

            });
        }

    }
    open(webgl){
        this.status.mode = "open";

        webgl.cover.show(0.35);
        this.effect.show(this.$trigger.getElementsByClassName("js__sp-show"),"out");
        // TweenMax.set(this.$navi, {
        //     display:'block',
        // });
        setTimeout(()=>{
            // webgl.top.hide();
            this.$header.classList.add("is-full");
            this.effect.show(this.$container.getElementsByClassName("js__op-show"),"show");
            this.$trigger.classList.add("is-close");
            this.$trigger.getElementsByClassName("text")[0].textContent = "CLOSE";
            this.effect.show(this.$trigger.getElementsByClassName("js__sp-show"),"show");
            setTimeout(()=>this.status.motFlg = false,5e2);

        },8e2);

    }
    close(webgl){
        this.status.mode = "close";

        this.effect.show(this.$container.getElementsByClassName("js__op-show"),"out2");
        this.effect.show(this.$trigger.getElementsByClassName("js__sp-show"),"out2");
        setTimeout(()=>{
            webgl.cover.out(1);
            this.$trigger.classList.remove("is-close");
            this.$trigger.getElementsByClassName("text")[0].textContent = "MENU";
            this.effect.show(this.$trigger.getElementsByClassName("js__sp-show"),"show");
            // webgl.top.status.active = true;
            setTimeout(()=>{
                // webgl.top.show(0.3);
                // TweenMax.set(this.$navi, {
                //     display:'none',
                // });
                this.$header.classList.remove("is-full");
                this.status.motFlg = false;
            },5e2);


        },5e2);
    }
    searchOpen() {
        this.status.searchmode = "open";
        this.$searchTrigger.classList.add('is-open');
        TweenMax.fromTo(this.$searchContent,0.6, {
            opacity:0,
            display:'none',
        },{
            opacity:1,
            display:'block',
            ease: "Power2.easeOut",
            onComplete:() => {
                this.status.searchmotFlg = false;
            }
        });
    }
    searchClose() {
        this.status.searchmode = "close";
        this.$searchTrigger.classList.remove('is-open');
        TweenMax.to(this.$searchContent,0.4, {
            opacity:0,
            display:'none',
            ease: "Power2.easeOut",
            onComplete:() => {
                this.status.searchmotFlg = false;
            }
        });
    }
    resize(displayType,pageID,scInc){

        if(displayType!=this.status.displayType){
            this.status.displayType = displayType;
            if(this.status.mode == "open"||this.status.displayType=="sp"){
                this.close(this.webgl);
            }else if(this.status.displayType=="pc"&&pageID!=="top"||this.status.displayType=="pc"&&pageID=="top"&&scInc>window.innerHeight / 10){
                this.effect.show(this.$container.getElementsByClassName("js__op-show"),"show");
            }
        }

    }
    render(_y){

        if(_y > window.innerHeight){
            this.$header.classList.remove('is-white');
        }else{
            this.$header.classList.add('is-white');
        }

    }
}
