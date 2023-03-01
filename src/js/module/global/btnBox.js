export default class btnBox {
    constructor($t){

        this.$target = $t;
        this.baseW;

    }
    enter(){

        this.baseW = this.$target.getElementsByClassName("line")[0].clientWidth;
        TweenMax.to(this.$target.getElementsByClassName("line"),0.6,{
            x:this.$target.clientWidth/2,
            width:this.$target.clientWidth/2,
            ease: Power2.easeOut,
        })
        TweenMax.to(this.$target.getElementsByClassName("line"),0.4,{
            delay:0.3,
            x:this.$target.clientWidth + 20,
            width:0,
            ease: Power2.easeOut,
            onComplete:()=>{
                TweenMax.set(this.$target.getElementsByClassName("line"),{width:0,x:-10})
            }
        })
        TweenMax.to(this.$target.getElementsByClassName("panel"),0.6,{
            width:0,
            ease: Power2.easeOut,
            onComplete:()=>{
                TweenMax.set(this.$target.getElementsByClassName("panel"),{width:0,x:this.$target.clientWidth})
            }
        })
    }
    leave(){
        TweenMax.killChildTweensOf(this.$target,{x:true});
        TweenMax.to(this.$target.getElementsByClassName("line"),0.6,{
            width:this.baseW,
            x:0,
            ease: Power2.easeOut
        })
        TweenMax.to(this.$target.getElementsByClassName("panel"),0.6,{
            width:this.$target.clientWidth,
            x:0,
            ease: Power2.easeOut
        })

    }
}
