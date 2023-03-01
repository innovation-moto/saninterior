
let ua = navigator.userAgent.toLowerCase();

export default class modalManager {
    constructor(table,param){

        this.$trigger01;
        this.$trigger02;
        this.$targetWrap;
        this.$target01;
        this.$target02;
        this.$back01;
        this.$back02;
        this.$bg;
        this.$header;

        this.status = {
            mode : "close",
            Inc : 0
        }

        this.table = table;
        this.param = param;

    }
    init(){
        this.$trigger01 = document.querySelectorAll(".modal-link");
        this.$trigger02 = document.querySelectorAll(".modal-link02");
        this.$targetWrap = document.querySelectorAll(".p-compare__modal");
        this.$target01 = document.getElementsByClassName(".modal");
        this.$target02 = document.getElementById("modal02");
        this.$back01 = document.getElementById("back01");
        this.$back02 = document.getElementById("back02");
        this.$bg = document.getElementById("modal-bg");
        this.$header = document.getElementById("l-header");

        for(let i in this.$trigger01) {
            if (this.$trigger01[i].nodeType != 1) continue; // dom要素以外は処理止める
            this.$trigger01[i].addEventListener("click",() => {
                if(this.status.mode === "close") {
                    this.open01();
                    this.status.mode = "open";
                    this.$back01.addEventListener("click",() => {
                        this.close();
                        this.status.mode = "close";
                    });
                    this.$bg.addEventListener("click",() => {
                        this.close();
                        this.status.mode = "close";
                    });
                }else {
                    this.close();
                    this.status.mode = "close";
                }
                return false;
            });
        }

        for(let i in this.$trigger02) {
            if (this.$trigger02[i].nodeType != 1) continue; // dom要素以外は処理止める
            this.$trigger02[i].addEventListener("click",() => {
                if(this.status.mode == "close") {
                    this.open02();
                    this.status.mode = "open";
                    this.$back02.addEventListener("click",() => {
                        this.close();
                        this.status.mode = "close";
                    });
                    this.$bg.addEventListener("click",() => {
                        this.close();
                        this.status.mode = "close";
                    });
                }else {
                    this.close();
                    this.status.mode = "close";
                }
                return false;
            });
        }

    }

    resize(){

    }

    open01() {
        this.noScroll();
        if(ua.indexOf('iphone') > -1) {
            this.$target01.style.height = '70vh';
        }
        TweenMax.set(this.$targetWrap[0], {
            visibility : 'visible',
        });
        TweenMax.set(this.$target01, {
            opacity : 1,
        });
        TweenMax.to([this.$back01, this.$bg], .5, {
            display : 'block',
            opacity : 1,
            ease : Power2.easeOut
        });
        this.$header.style.zIndex = '0';
    }
    open02() {
        this.noScroll();
        if(ua.indexOf('iphone') > -1) {
            this.$target02.style.height = '70vh';
        }
        TweenMax.set(this.$targetWrap[1], {
            visibility : 'visible',
        });
        TweenMax.set(this.$target02, {
            opacity : 1,
        });
        TweenMax.to([this.$back02, this.$bg], .5, {
            display : 'block',
            opacity : 1,
            ease : Power2.easeOut
        });
        this.$header.style.zIndex = '0';
    }
    close(){
        this.possiblescroll();
        TweenMax.to([this.$target01, this.$target02], .5, {
            opacity : 0,
            ease : Power2.easeOut
        });
        TweenMax.to([this.$back01, this.$back02, this.$bg], .5, {
            display : 'none',
            opacity : 0,
            ease : Power2.easeOut,
            onComplete: () => {
                TweenMax.set([this.$targetWrap[0],this.$targetWrap[1]], {
                    visibility : 'hidden',
                });
            }
        });
        this.$header.style.zIndex = '999';
    }

    noScroll() {

        if(this.param.displayType !== 'sp') return;

        this.status.Inc = 0;
        this.status.Inc = window.pageYOffset || document.documentElement.scrollTop;
        document.getElementById('top').classList.add('hidden');
        document.getElementById('l-scroll-body').style.transform = 'translateY(-' + this.status.Inc + 'px)';
    }

    possiblescroll(){

        if(this.param.displayType !== 'sp') return;

        document.getElementById('l-scroll-body').style.transform = '';
        document.getElementById('top').classList.remove('hidden');
        window.scrollTo(0,this.status.Inc);
        this.table.resize();

    }

    resize(_w,_h){

        if(_w > 750){
            TweenMax.set(this.$target01, {
                css:{
                    left:(_w-this.$target01.clientWidth)/2,
                    top:(_h-this.$target01.clientHeight)/2,
                }
            });
            TweenMax.set(this.$target02, {
                css:{
                    left:(_w-this.$target02.clientWidth)/2,
                    top:(_h-this.$target02.clientHeight)/2,
                }
            });
        }else{
            this.$target01.style.top = '';
            this.$target01.style.left = '';
            this.$target02.style.top = '';
            this.$target02.style.left = '';
        }


    }


}