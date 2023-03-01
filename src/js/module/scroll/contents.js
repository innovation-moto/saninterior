import Param from '../../param';

const param = new Param();

/* ---------------------------------------

    -- 要素の表示、非表示を管理

--------------------------------------- */
export default class Contents{
    constructor(){
        this.$scrollDown =  $("#c-scrolldown");
        this.$pageTop =  $("#c-pagetop");

        this.$headNavi =  $("#l-header-navi>ul");
        this.$headBtn =  $("#l-header-btn");

        this.$footer = $("#l-footer");
        this.offset = {
            pagetop : {
                start : 0,
                end   : 0
            },
            scrollDown : this.$footer.offset().top,
        }

        this.status = {
            pagetop    : false,
            scrollDown : true,
        }

        this.h = 0;

        TweenMax.set(this.$pageTop,{
            x:100
        });

    }
    update(inc){

        /* ---------------------------------------------

         -- [ ページトップの表示 ]

        --------------------------------------------- */
        if( this.offset.pagetop.start < inc && this.offset.pagetop.end > inc ){

            if(!this.status.pagetop){
                this.status.pagetop = true;
                TweenMax.to(this.$pageTop,0.48,{
                    x:0
                });
            }
        }else{
            if(this.status.pagetop){
                this.status.pagetop = false;
                TweenMax.to(this.$pageTop,0.48,{
                    x:100
                });
            }
        }
        /* ---------------------------------------------

         -- [ スクロールダウンの表示 ]

        --------------------------------------------- */

        if( this.offset.scrollDown < inc &&param.displayType=="pc" || 10 < inc&&param.displayType=="sp" ){

            if(this.status.scrollDown){
                this.status.scrollDown = false;
                TweenMax.to(this.$scrollDown,0.48,{
                    x:(param.displayType=="pc")?-100:-window.innerWidth
                });
            }
        }else{
            if(!this.status.scrollDown){
                this.status.scrollDown = true;
                TweenMax.to(this.$scrollDown,0.48,{
                    x:0
                });
            }
        }


        // /* ---------------------------------------------
        //
        //  -- [ グローバルナビのボタンの表示 ]
        //
        // --------------------------------------------- */
        //
        // if( this.h < inc){
        //     if(param.displayType!=="pc") return;
        //     TweenMax.to(this.$headNavi,0.48,{
        //         y:-100
        //     });
        //     TweenMax.to(this.$headBtn,0.48,{
        //         y:0
        //     });
        // }else{
        //     if(param.displayType!=="pc") return;
        //     TweenMax.to(this.$headNavi,0.48,{
        //         y:0
        //     });
        //     TweenMax.to(this.$headBtn,0.48,{
        //         y:-100
        //     });
        // }

    }
    resize (winH) {
        this.h = winH;

        param.displayType = ( window.innerWidth>param.breakpoint )?"pc":"sp";


        this.offset.scrollDown = this.$footer.offset().top-this.h;
        this.offset.pagetop = {
            start : this.h,
            end   : this.offset.scrollDown
        };
        // this.offset.campaign = this.$campaignContainer[0] ? this.$campaignContainer.offset().top : '';
        // this.offset.gif0 = this.$gifContainer0[0] ? this.$gifContainer0.offset().top : '';
        // this.offset.gif1 = this.$gifContainer1[0] ? this.$gifContainer1.offset().top : '';
        // this.offset.gif1Height  = this.$gifContainer1[0] ? this.$gifContainer1.innerHeight(): '';
        //
        // for(let i=0; i<this.status.cssAniLEN; i++){
        //     this.offset.cssAni[i] = this.$cssAni.eq(i).offset().top;
        // }


    }
}
