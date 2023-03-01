export default class news {
    constructor($t){

        this.$target = $t;
        this.baseW;

    }
    enter(){

        TweenMax.to(this.$target.getElementsByClassName("info-icon"),0.4,{
            x:10,
            ease: Power2.easeOut,
        })

    }
    leave(){

        TweenMax.to(this.$target.getElementsByClassName("info-icon"),0.4,{
            x:0,
            ease: Power2.easeIn,
        })

    }
}
