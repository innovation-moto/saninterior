export default class btn {
    constructor($t){

        this.$target = $t;
        this.baseW;

    }
    enter(){

        this.baseW = this.$target.getElementsByClassName("c-btn-line")[0].clientWidth;
        TweenMax.to(this.$target.getElementsByClassName("c-btn-line"),0.8,{
            x:this.$target.clientWidth*1.2,
            width:this.$target.clientWidth,
            ease: Power2.easeOut,
            onComplete:()=>{
                TweenMax.set(this.$target.getElementsByClassName("c-btn-line"),{width:this.baseW,x:-this.$target.clientWidth})
            }
        })

    }
    leave(){
        TweenMax.killChildTweensOf(this.$target,{x:true});
        TweenMax.to(this.$target.getElementsByClassName("c-btn-line"),0.6,{
            width:this.baseW,
            x:0,
            ease: Power2.easeOut
        })

    }
}
