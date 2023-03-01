/* ---------------------------------------

    -- スクロール連動はここ

--------------------------------------- */
export default class Pararax{
    constructor(){
        this.$prarax = document.querySelectorAll('.js__psc');
        this.start = false;/* trueで処理が開始される */
        this.paraPoint = [];
        this.paraNum = this.$prarax.length;


        this.prevDir = "";/* scrollManagerから引き継いだ方向を保存する */

        /*  ステータスをセット */
        this.status = [];

        for(var i=0; this.paraNum>i; i++){
            var $p = this.$prarax[i];

            this.status[i] = {
                rate : $p.dataset.rate,
                type : ""
            }

            if($p.classList.contains("js__dir-y")){
                this.status[i].type = "dir-y";
            }else if($p.classList.contains("js__dir-y-minus")){
                this.status[i].type = "dir-y-minus";
            }else if($p.classList.contains("js__dir-x")){
                this.status[i].type = "dir-x";
            }else if($p.classList.contains("js__scale")){
                this.status[i].type = "scale";
            }else if($p.classList.contains("js__type-town")){
                this.status[i].type = "type-town";
            }else if($p.classList.contains("js__type-bike")){
                this.status[i].type = "type-bike";
            }else if($p.classList.contains("js__type-cloud")){
                this.status[i].type = "type-cloud";
            }else{
                this.status[i].type = "dir-default";
            }

        }

    }
    init(){
        // console.log(this.$prarax)
        this.start = (this.$prarax[0])?true:false;
    }
    check(inc,dir){
        if(!this.start) return;
        // console.log('check', this.status);

        let _zInc = Math.sin(inc/300)/6;

        for(var i=0; this.paraNum>i; i++){
            if(this.paraPoint[i]===undefined) return;
            if(this.paraPoint[i].start < inc && this.paraPoint[i].end > inc  ) {
                var $p = this.$prarax[i];

                var pInc = ( inc - this.paraPoint[i].base ) * this.status[i].rate;
                // console.log(inc, this.paraPoint[i].base);

                switch (this.status[i].type){
                    case "dir-y":
                        TweenMax.set(this.$prarax[i],{
                            "y":-pInc
                        });
                        break;
                    case "dir-y-minus":
                        TweenMax.set(this.$prarax[i],{
                            "y":pInc
                        });
                        break;
                    case "dir-x":
                        TweenMax.set(this.$prarax[i],{
                            "x":-pInc
                        });
                        break;
                    case "scale":
                        TweenMax.set(this.$prarax[i],{
                            "scale": 1 - pInc/1000
                        });
                        break;
                    case "type-town":
                        // let _inc = pInc*Math.sin(pInc/20);
                        TweenMax.set(this.$prarax[i],{
                            "y":pInc,
                            // "x":_inc
                        });
                        break;
                    case "type-bike":
                        // let _inc = pInc*Math.sin(pInc/20);
                        if(this.prevDir===""||this.prevDir!==dir){
                            this.$prarax.classList.remove("is-"+this.prevDir);
                            this.$prarax.classList.add("is-"+dir);
                        }
                        this.prevDir = dir;
                        TweenMax.set(this.$prarax[i],{
                            "y":pInc,
                            // "x":_inc
                        });
                        break;
                    case "type-cloud":
                        TweenMax.set(this.$prarax[i],{
                            "y":-pInc*2,
                            "z":_zInc
                            // "x":_inc
                        });
                        break;
                    default :
                        TweenMax.set(this.$prarax[i],{
                            "x":-pInc/2
                        });
                        break;
                }

            }

        }
    }

    resize (winH) {
        this.paraPoint = [];
        for (var i = 0; i < this.paraNum; i++) {

            let $p = this.$prarax[i];
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let offsetTop = $p.getBoundingClientRect().top + scrollTop;

            if(document.getElementsByTagName('body')[0].getAttribute("id") == "craftmanship"){
                let offsetLeft = $p.getBoundingClientRect().left + scrollTop;
                this.paraPoint[i] = {
                    base  : offsetLeft,
                    start : offsetLeft - window.innerWidth * 1.5,
                    end   : offsetLeft + window.innerWidth * 1.5,
                }
                // console.log(this.paraPoint);
            }else{
                this.paraPoint[i] = {
                    base  : offsetTop,
                    start : offsetTop - winH*1.5,
                    end   : offsetTop + winH*1.5,
                }
    
            }


        }
    }


}