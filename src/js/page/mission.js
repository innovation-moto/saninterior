export default class solutionManager {
    constructor(effect, param) {

        this.effect = effect;
        this.param = param;
        // this.$;
        this.$target;
        this.$endTarget;
        this.$object;

        this.$container;
        this.scPoint;
        this.scPointEnd;
        this.scNumStart;
        this.scNum;
        this.scNumEndStart;
        this.scNumEnd;
  
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }

    init() {
      this.$container = document.getElementById('mission');
      this.$target = this.$container.querySelectorAll('.js__obj');
      this.$endTarget = this.$container.querySelectorAll('.js__obj-close');
      this.scNumStart = 0;
      this.scNum = this.$target.length;
      this.scNumEndStart = 0;
      this.scNumEnd = this.$endTarget.length;
      this.$object = document.getElementById('p-mission-section__image');

      if(this.$target){
        let _minusPoint;
        _minusPoint = this.h * 0.5 - 200;
        this.scPoint = [];
        for( var i=this.scNumStart; i<this.scNum; i++) {

            let $scp = this.$target[i],
                rect,
                scrH;
                rect = $scp.getBoundingClientRect().top;
                scrH = window.pageYOffset;

            // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
            // rect.top : targetのページ最上部からの距離
            // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
            // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
            this.scPoint[i] = rect + scrH - _minusPoint;
        }
      }
      if(this.$endTarget){
        let _minusPoint;
        _minusPoint = this.h * 0.5;
        this.scPointEnd = [];
        for( var i=this.scNumEndStart; i<this.scNumEnd; i++) {

            let $scp = this.$endTarget[i],
                rect,
                scrH;
                rect = $scp.getBoundingClientRect().top;
                scrH = window.pageYOffset;

            // this.scPointEnd[i] : targetごとのアニメーション発火点（スクロール位置）
            // rect.top : targetのページ最上部からの距離
            // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
            // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
            this.scPointEnd[i] = rect + scrH - _minusPoint;
        }

      }



    }

    render(mouse, scrollInc) {
    }

    resize(w, h) {
      this.w = w;
      this.h = h;

      if(this.$target){
        let _minusPoint;
        _minusPoint = this.h * 0.5 - 200;
        this.scPoint = [];
        for( var i=this.scNumStart; i<this.scNum; i++) {

            let $scp = this.$target[i],
                rect,
                scrH;
                rect = $scp.getBoundingClientRect().top;
                scrH = window.pageYOffset;

            // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
            // rect.top : targetのページ最上部からの距離
            // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
            // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
            this.scPoint[i] = rect + scrH - _minusPoint;
        }
      }
      if(this.$endTarget){
        let _minusPoint;
        _minusPoint = this.h * 0.5;
        this.scPointEnd = [];
        for( var i=this.scNumEndStart; i<this.scNumEnd; i++) {

            let $scp = this.$endTarget[i],
                rect,
                scrH;
                rect = $scp.getBoundingClientRect().top;
                scrH = window.pageYOffset;

            // this.scPointEnd[i] : targetごとのアニメーション発火点（スクロール位置）
            // rect.top : targetのページ最上部からの距離
            // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
            // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
            this.scPointEnd[i] = rect + scrH - _minusPoint;
        }

      }

    }

    scroll(e, inc) {
      console.log(inc, this.scPoint, this.scPointEnd, inc < this.scPoint[0]);
        if(inc < this.scPoint[0] || inc > this.scPointEnd[0]){
          this.$object.classList.remove('active');
        }else{
          this.$object.classList.add('active');
        }
        if(inc > this.scPoint[2]){
          this.$object.classList.remove('obj01');
          this.$object.classList.remove('obj02');
          this.$object.classList.add('obj03');
        }else if(inc > this.scPoint[1]){
          this.$object.classList.remove('obj01');
          this.$object.classList.add('obj02');
          this.$object.classList.remove('obj03');
        }else if(inc > this.scPoint[0]){
          this.$object.classList.add('obj01');
          this.$object.classList.remove('obj02');
          this.$object.classList.remove('obj03');
        }
    }

}