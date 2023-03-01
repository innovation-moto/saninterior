import effectManager from '../effect';

let effect;

/* ---------------------------------------

    -- スクロール位置で発火するやつはここ

--------------------------------------- */
export default class ScrollAnimationCraftmanship{
    constructor(param){

        effect = new effectManager(param);

        this.$container;
        this.$target;
        this.scPoint = [];
        this.scNum;
        this.scFlag = [];
        this.pageID;
        this.$lowlayerKv;

        this.status = {
            init : false,
            comp : false /* 全部処理が終わったか */
        }

        this.conf = {
            page : ["top","stance"] /* 対象のページを記入 */
        }

        this.w = window.innerWidth;
        this.h = window.innerHeight;

    }

    init(pageID){
        let _this = this;
        this.pageID = pageID;
        this.status.init = true;
        this.scPoint = [];
        this.scNumStart = 0;
        this.$container = document.getElementById(pageID);
        this.$target = this.$container.querySelectorAll('.js__tsc');
        this.scNum = this.$target.length;
        this.$lowlayerKv =  document.getElementById('l-lowlayer-kv');


        effect.textAnimation(this.$container.querySelectorAll('.js__tsc-title'),"set");

        let _$square = this.$container.querySelectorAll('.js__square-object');
        for(let n in _$square){
            if(_$square[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.square(_$square[n],"set");
        }

        let _$slideUp = this.$container.querySelectorAll('.js__slideup');
        for(let n in _$slideUp){
            if(_$slideUp[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.slideUp(_$slideUp[n],"set");
        }

        let _$slideRightChain = this.$container.querySelectorAll('.js__slide-right-chain');
        for(let n in _$slideRightChain){
            if(_$slideRightChain[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.slideRightChain(_$slideRightChain[n],"set");
        }

        let _$slideRightChainText = this.$container.querySelectorAll('.js__slide-right-chain-text');
        for(let n in _$slideRightChainText){
            if(_$slideRightChainText[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.slideRightChain(_$slideRightChainText[n],"set");
        }

        let _$slideRightChainSlow = this.$container.querySelectorAll('.js__slide-right-chain-slow');
        for(let n in _$slideRightChainSlow){
            if(_$slideRightChainSlow[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.slideRightChain(_$slideRightChainSlow[n],"set");
        }

        let _$headlineTitle = this.$container.querySelectorAll('.js__headline-title');
        for(let n in _$headlineTitle){
            if(_$headlineTitle[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.headlineTitle(_$headlineTitle[n],"set");
        }

        let _$topSolution = this.$container.querySelectorAll('.js__top-solution');
        for(let n in _$topSolution){
            if(_$topSolution[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.topSolution(_$topSolution[n],"set");
        }

        let _$solutionSolution = this.$container.querySelectorAll('.js__solution-solution');
        for(let n in _$solutionSolution){
            if(_$solutionSolution[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.solutionSolution(_$solutionSolution[n],"set");
        }

        let _$lineIcon = this.$container.querySelectorAll('.js__line-icon');
        for(let n in _$lineIcon){
            if(_$lineIcon[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.lineIcon(_$lineIcon[n],"set");
        }

        let _$slanting = this.$container.querySelectorAll('.js__slanting');
        for(let n in _$slanting){
            if(_$slanting[n].nodeType!=1) continue; // dom要素以外は処理止める
            effect.slanting(_$slanting[n],"set");
        }

        effect.showSimple(this.$container.querySelectorAll('.js__tsc-show'),"set");
        this.resize(this.h, 1)

        if(this.$target){
            let _minusPoint;
            // if(this.pageID == 'mission'){
            //     _minusPoint = this.h * 0.5 - 200;
            // }else{
                _minusPoint = this.h * 0.7;
            // }
            this.scPoint = [];
            for( var i=this.scNumStart; i<this.scNum; i++) {

                let $scp = this.$target[i],
                    rect,
                    scrH;
                if(window.innerWidth > 750 && this.pageID == 'craftmanship'){
                    rect = $scp.getBoundingClientRect().left;
                    scrH = window.pageXOffset;
                }else{
                    rect = $scp.getBoundingClientRect().top;
                    scrH = window.pageYOffset;
                }
    
                //console.log(rect.top , scrInit , _minusPoint)

                // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
                // rect.top : targetのページ最上部からの距離
                // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
                // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
                this.scPoint[i] = rect + scrH - _minusPoint;
            }

        }

        if(this.$lowlayerKv){
            this.status.init = false;
            let _$split = this.$lowlayerKv.querySelector('.js__tsc-title');
            if(_$split) effect.textAnimation(_$split,"show",null,function(){
                setTimeout(function(){
                    _this.status.init = true;
                    _this.check(0);
                    },800);
            });
        }

    }
    check(inc){

        if(!this.status.init) return;

        if(this.$target[0]){
            for(var i=0; this.scNum>i; i++){

                if(this.scPoint[i] < inc && !this.scFlag[i]) {

                    let $scp = this.$target[i];
                    if(!$scp.classList.contains("is-show")){
                        $scp.classList.add("is-show");
                        this.scFlag[i] = true;

                        this.show($scp);

                        if(i==this.$target.length-1) this.status.comp = true;


                    }

                }

            }

        }

    }

    show($scp){

        let _$split = $scp.querySelectorAll('.js__tsc-title');
        if(_$split) effect.textAnimation(_$split,"show");

        let _$square = $scp.querySelectorAll('.js__square-object');
        if(_$square) effect.square(_$square,"show");

        let _$slideUp = $scp.querySelectorAll('.js__slideup');
        if(_$slideUp.length) effect.slideUp(_$slideUp,"show");

        let _$slideRightChain = $scp.querySelectorAll('.js__slide-right-chain');
        if(_$slideRightChain.length) effect.slideRightChain(_$slideRightChain,"show");

        let _$slideRightChainText = $scp.querySelectorAll('.js__slide-right-chain-text');
        if(_$slideRightChainText.length) effect.slideRightChain(_$slideRightChainText,"show");

        let _$slideRightChainSlow = $scp.querySelectorAll('.js__slide-right-chain-slow');
        if(_$slideRightChainSlow.length) effect.slideRightChain(_$slideRightChainSlow,"show",0.3,0.2,3.3);

        let _$headlineTitle = $scp.querySelector('.js__headline-title');
        if(_$headlineTitle) effect.headlineTitle(_$headlineTitle,"show");

        let _$topSolution = $scp.querySelector('.js__top-solution');
        if(_$topSolution) effect.topSolution(_$topSolution,"show");

        let _$solutionSolution = $scp.querySelector('.js__solution-solution');
        if(_$solutionSolution) effect.solutionSolution(_$solutionSolution,"show");

        let _$lineIcon = $scp.querySelector('.js__line-icon');
        if(_$lineIcon) effect.lineIcon(_$lineIcon,"show");

        let _$slanting = $scp.querySelectorAll('.js__slanting');
        if(_$slanting) effect.slanting(_$slanting,"show");

    }

    resize (winH, scrInit = null) {

        if(!this.status.init) return;

        if(this.$target){
            let _minusPoint;
            // if(this.pageID == 'mission'){
            //     _minusPoint = winH * 0.5 - 200;
            // }else{
                _minusPoint = winH * 0.7;
            // }
            this.scPoint = [];
            for( var i=this.scNumStart; i<this.scNum; i++) {

                let $scp = this.$target[i],
                    rect,
                    scrH;
                if(window.innerWidth > 750 && this.pageID == 'craftmanship'){
                    rect = $scp.getBoundingClientRect().left;
                    scrH = window.pageXOffset;
                }else{
                    rect = $scp.getBoundingClientRect().top;
                    scrH = window.pageYOffset;
                }
    
                //console.log(rect.top , scrInit , _minusPoint)

                // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
                // rect.top : targetのページ最上部からの距離
                // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
                // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
                this.scPoint[i] = rect + scrH - _minusPoint;
            }

        }

    }
}