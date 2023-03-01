
export default class backgroundManager{
    constructor(param){
      this.param = param;

      this.$bg;
      this.$lineWrap;
      this.$line2Wrap;
      this.$circleWrap;
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.docH = document.getElementById("l-scroll").offsetHeight;

      this.lineSpeed = 7;
      this.unitSize;
      

    }
    init(pageID){
      let _this = this;

      this.$bg = document.querySelector('.l-bg');
      this.$lineWrap = document.querySelector('.l-bg .line-wrap');
      this.$line2Wrap = document.querySelector('.l-bg .line2-wrap');
      this.$circleWrap = document.querySelector('.l-bg .circle-wrap');
      this.unitSize = this.w > 750 ? 90 : 66;

      this.lineSpeed = this.docH / 1700 * 10;
      console.log(this.lineSpeed);

      this.addLine();
      this.addLine2();
      this.addCircle();

      window.onblur = function() { window.blurred = true; console.log('blur',window.blurred) };
      window.onfocus = function() { window.blurred = false; };

    }
    resize(w,h){
      this.w = w;
      this.h = h;
      this.lineSpeed = this.docH / 1700 * 10;
      this.docH = document.getElementById("l-scroll").offsetHeight;
      this.unitSize = this.w > 750 ? 90 : 66;

    }

    addLine(){ //右上から左下に流れる線のランダム描写
      let _this = this;
      
      setTimeout(function(_this){
        if ( !window.blurred ) {
            let PosX = Math.floor((Math.random() * _this.docH - _this.w / 2 )/ _this.unitSize) * _this.unitSize;
          let line = document.createElement('div');
          line.classList.add('line');
          line.style.marginLeft = PosX + 'px';
          let lineSpan = document.createElement('span');
          lineSpan.style.animationDuration = _this.lineSpeed + 's';
          line.append(lineSpan);
          _this.$lineWrap.append(line);
          TweenMax.to(line, _this.lineSpeed,{
            opacity: 1,
            onComplete: function(){
                line.remove();
            }
          });
        }

        _this.addLine();
      },1500,_this)
      
    }
    addLine2(){ //左上から右下に流れる線のランダム描写
      let _this = this;
      
      setTimeout(function(_this){
        console.log(window.blurred);
        if ( !window.blurred ) {
          let PosX = Math.floor(-(Math.random() * _this.docH + _this.w / 2 )/ _this.unitSize) * _this.unitSize;
          let line = document.createElement('div');
          line.classList.add('line');
          line.classList.add('line2');
          line.style.marginLeft = PosX + 'px';
          let lineSpan = document.createElement('span');
          lineSpan.style.animationDuration = _this.lineSpeed + 's';
          line.append(lineSpan);
          _this.$line2Wrap.append(line);

          TweenMax.to(line, _this.lineSpeed,{
            opacity: 1,
            onComplete: function(){
                line.remove();
            }
          });
        }

        _this.addLine2();
      },1500,_this)

    }
    addCircle(){ //薄青の円のランダム描写
      let _this = this;
      
      setTimeout(function(_this){
        if ( !window.blurred ) {
          let PosX = Math.floor(Math.random() * _this.w) -220;
          let PosY = Math.floor(Math.random() * _this.docH) -220;
          let circle = document.createElement('div');
          circle.classList.add('circle');
          circle.style.marginTop = PosY + 'px';
          circle.style.marginLeft = PosX + 'px';
          _this.$circleWrap.append(circle);

          TweenMax.set(circle, {
            opacity: 0
          });
          TweenMax.to(circle, 2,{
            opacity: 1,
            onComplete: function(){
              TweenMax.to(circle, 6,{
                opacity: 0,
                delay: 6,
                onComplete: function(){
                  circle.remove();
                }
              });
            }
          });
        }

        _this.addCircle();
      },1000,_this)
      
    }
}
