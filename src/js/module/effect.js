import Util from './libs/util';

const util = new Util();

export default class effectManager {
    constructor(param){
        this.param = param;
        this.w = window.innerWidth;
        this.h = window.innerHeight;  
    }
/* ----------------------------------

 --  ちょっと奥からopacityで出すやつ

---------------------------------- */
    showSimple($target,type){

        switch (type){
            case "set": //初期設定

                let i = 0;
                while(i < $target.length) {
                    TweenMax.set($target[i].querySelectorAll('.js__simple-object'),{
                        opacity:0,
                        z:-50,
                        pointerEvents: 'none',
                    });
                    i=(i+1)|0;
                }

                break;

            case "show": //表示動作

                i = 0;
                while(i < $target.length) {
                    TweenMax.staggerTo($target[i].querySelectorAll('.js__simple-object'),1.2, {
                        opacity:1,
                        z: 0,
                        pointerEvents: 'auto',
                        ease: this.param.ease,
                    },0.1 );
                    i=(i+1)|0;
                }
                break;

            case "hide": //非表示動作

                i = 0;
                while(i < $target.length) {
                    TweenMax.staggerTo($target[i].querySelectorAll('.js__simple-object'),.9, {
                        opacity:0,
                        z:-50,
                        ease: this.param.ease,
                    },0.1);
                    i=(i+1)|0;
                }

                break;
        }

    }
/* ----------------------------------

 --  タイトルの1文字ずつ表示

---------------------------------- */
    textAnimation($target,type,delay = 0.1,callback) {

        switch (type){
            case "set": //初期設定

            let chars;

                let i = 0;

                while(i < $target.length) {

                    let $t;

                    // icon
                    // $t = $target[i].querySelector('.js__tsc-icon');
                    // if($t){
                    //     TweenMax.set($t.children[0], {opacity:0, x: -80, y: 80 ,'height':'300%'});
                    //     TweenMax.set($t.children[1], {opacity:0, x: 80, y: -80 ,'height':'300%'});
                    // }

                    // text
                    $t = $target[i].querySelector('.js__split');
                    console.log('$t',$t);

                    if($t) {
                        let text = new SplitText($t, {type: "words,chars"});
                        chars = text.chars;

                        $t.children[0].classList.add('first');
                        $t.children[0].style.opacity = 1;

                        let j = 0;

                        let $c = $t.querySelectorAll('.js__clone.first>*>*');

                        j = 0;
                        while(j < $c.length) {
                            if (j % 2 == 0) {
                                TweenMax.set($c[j], {
                                    x: -20,
                                    y: 20,
                                    opacity:0,
                                });
                            } else {
                                TweenMax.set($c[j], {
                                    x: 20,
                                    y: -20,
                                    opacity:0,
                                });
                            }
                            // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                            j=(j+1)|0;
                        }

                        if(this.param.browserType !== 'ie' && this.param.userAgent !== 'sp'){

                            $c = $t.querySelectorAll('.js__clone.last>*>*');

                            j = 0;
                            while(j < $c.length) {
                                if (j % 2 == 0) {
                                    TweenMax.set($c[j], {
                                        x: -20,
                                        y: 20,
                                        opacity:0,
                                    });
                                } else {
                                    TweenMax.set($c[j], {
                                        x: 20,
                                        y: -20,
                                        opacity:0,
                                    });
                                }
                                // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                                j=(j+1)|0;
                            }

                        }

                    }

                    // sub
                    $t = $target[i].querySelector('.js__split2');

                    if($t) {
                        let text = new SplitText($t, {type: "words,chars"});
                        chars = text.chars;

                        $t.children[0].classList.add('first');
                        $t.children[0].style.opacity = 1;

                        let j = 0;

                        let $c = $t.querySelectorAll('.js__clone.first>*>*');

                        j = 0;
                        while(j < $c.length) {
                            if (j % 2 == 0) {
                                TweenMax.set($c[j], {
                                    x: -20,
                                    y: 20,
                                    opacity:0,
                                });
                            } else {
                                TweenMax.set($c[j], {
                                    x: 20,
                                    y: -20,
                                    opacity:0,
                                });
                            }
                            // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                            j=(j+1)|0;
                        }

                        if(this.param.browserType !== 'ie' && this.param.userAgent !== 'sp'){

                            $c = $t.querySelectorAll('.js__clone.last>*>*');

                            j = 0;
                            while(j < $c.length) {
                                if (j % 2 == 0) {
                                    TweenMax.set($c[j], {
                                        x: -20,
                                        y: 20,    
                                        opacity:0,
                                    });
                                } else {
                                    TweenMax.set($c[j], {
                                        x: 20,
                                        y: -20,
                                        opacity:0,
                                    });
                                }
                                // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                                j=(j+1)|0;
                            }

                        }

                    }

                    i=(i+1)|0;

                }

                break;
            case "show": //表示動作

                let j = 0;

                while(j < $target.length) {

                let $t;

                // icon
                $t = $target[j].querySelector('.js__tsc-icon');
                if($t){
                    TweenMax.staggerTo([$t.children[0],$t.children[1]], 1.2 , {
                        delay: delay,
                        x: 0,
                        y: 0,
                        opacity:1,
                        'height': '100%',
                        ease: this.param.ease,
                    },0.1);
                }

                // text
                $t = $target[j].querySelectorAll('.js__clone.first>*>*');
                TweenMax.staggerTo($t, 1.1 , {
                    delay: delay,
                    x: 0,
                    y: 0,
                    opacity:.4,
                    ease: this.param.ease
                },0.05);
                TweenMax.staggerTo($t, .6 , {
                    delay:delay + 0.8,
                    opacity:1,
                    ease: Sine.easeOut,
                    onComplete: callback,
                },0.05);

                i = 0;
                while(i < $t.length) {
                    TweenMax.set($t[i], { delay:0.05 * i, className:'+=is-done' });
                    i=(i+1)|0;
                }

                if(this.param.browserType !== 'ie' && this.param.userAgent !== 'sp'){
                    $t = $target[j].querySelectorAll('.js__clone.last>*>*');
                    TweenMax.staggerTo($t, 1.1 , {
                        delay: delay,
                        x: 0,
                        y: 0,
                        opacity:.4,
                        ease: this.param.ease
                    },0.05);
                    TweenMax.staggerTo($t, 1.1 , {
                        delay:delay + 0.7,
                        x: -12,
                        y: 12,
                        opacity:0,
                        ease: Sine.easeOut
                    },0.05);

                    i = 0;
                    while(i < $t.length) {
                        TweenMax.set($t[i], { delay:0.05 * i, className:'+=is-done' });
                        i=(i+1)|0;
                    }
                }

                // sub
                $t = $target[j].querySelector('.js__tsc-title-sub');
                if($t){
                    TweenMax.to($t, .6 , {
                        delay:delay + 0.7,
                        x: 0,
                        y: 0,
                        opacity:1,
                        ease: this.param.ease,
                    });
                }

                j=(j+1)|0;

                }

                break;
            case "hide": //非表示動作

                break;
        }

    }
/* ----------------------------------

 --  センテンス内の要素を出すやつ

---------------------------------- */
    slanting($target,type){

        switch (type){

            case "set": //初期設定

                TweenMax.set($target.querySelectorAll('.js__slanting-object')[0],{
                    x:200,y:-200,opacity:0
                });
                TweenMax.set($target.querySelectorAll('.js__slanting-object')[1],{
                    x:-200,y:200,opacity:0
                });
                TweenMax.set($target.querySelector('.js__slanting-main'),{
                    opacity:0
                });

                break;

            case "show": //表示動作

                let i = 0;

                while(i < $target.length) {
                    let _index = i;
                    let _delay = 0.8;
                    if($target[i].getAttribute('data-delay')){
                        _delay = $target[i].getAttribute('data-delay');
                    }
                    TweenMax.to($target[i].querySelectorAll('.js__slanting-object'),0.9, {
                        delay:_delay,
                        x:0,
                        y:0,
                        opacity:1,
                        ease: this.param.ease,
                        onComplete: () => {
                            TweenMax.to($target[_index].querySelector('.js__slanting-main'),1.2,{
                                opacity:1,
                                ease: 'Power1.easeOut',
                            });
                            TweenMax.to($target[_index].querySelectorAll('.js__slanting-object')[0],0.6, {
                                x:20,y:-20,opacity:0,
                                ease: Sine.easeOut,
                            });
                            TweenMax.to($target[_index].querySelectorAll('.js__slanting-object')[1],0.6, {
                                x:-20,y:20,opacity:0,
                                ease: Sine.easeOut,
                            });
                        }
                    });
                    i=(i+1)|0;
                }

                break;
            case "hide": //非表示動作

                break;
        }

    }

/* ----------------------------------

 --  センテンス内の四角い半透明のボックスを出すやつ（あまり意味がなかったらやめてもいいかも）

---------------------------------- */
    square($target,type){

        switch (type){
            case "set": //初期設定

                TweenMax.set($target,{x:$target.dataset.x,y:$target.dataset.y,opacity:0});

                break;
            case "show": //表示動作

                TweenMax.to($target,0.9, {
                    delay:0.6,
                    x:0,
                    y:0,
                    opacity:1,
                    ease: this.param.ease,
                });

                break;
            case "hide": //非表示動作

                break;
        }

    }

/* ----------------------------------

 --  下からフェードイン

---------------------------------- */
slideUp($target,type){

    switch (type){
        case "set": //初期設定

            TweenMax.set($target,{
                opacity:0,
                y: 50,
            });

            break;

        case "show": //表示動作

            TweenMax.to($target,.8,{
                opacity:1,
                y: 0,
                ease: this.param.easeSlideUp,
            });

            break;

        case "hide": //非表示動作

            break;
    }

}

/* ----------------------------------

 --  右から連鎖的にフェードイン

---------------------------------- */
slideRightChain($target,type,delay = 0.1,stagger = 0.2,time = 1.1){

    switch (type){
        case "set": //初期設定

            TweenMax.set($target,{
                opacity:0,
                x: -100,
            });

            break;

        case "show": //表示動作

            TweenMax.staggerTo($target,time,{
                delay: delay,
                opacity:1,
                x: 0,
                ease: this.param.easeSlideUp,
            },stagger);

            break;

        case "hide": //非表示動作

            break;
    }

}

/* ----------------------------------

 --  ヘッドラインのタイトル出現

---------------------------------- */
headlineTitle($target,type){

    switch (type){
        case "set": //初期設定

        TweenMax.set($target.querySelectorAll('.glitter'),{
            opacity:0,
            x: 50,
            y: -50,
        });
        TweenMax.set($target.querySelectorAll('.line'),{
            opacity:0,
            scaleX: 0.1
        });
        console.log($target.querySelectorAll('.en'));
        this.textAnimation($target.querySelectorAll('.en'), 'set')
        this.textAnimation($target.querySelectorAll('.jp'), 'set')

            break;

        case "show": //表示動作
        TweenMax.to($target.querySelectorAll('.glitter'),1.2,{
            opacity:1,
            x: 0,
            y: 0,
            ease: this.param.ease,
        });
        TweenMax.to($target.querySelectorAll('.line'),1.2,{
            opacity:1,
            scaleX: 1,
            ease: this.param.ease,
        });
        this.textAnimation($target.querySelectorAll('.en'), 'show')
        this.textAnimation($target.querySelectorAll('.jp'), 'show')

            break;

        case "hide": //非表示動作

            break;
    }

}

    /* ----------------------------------

     --  TOPだけで使うやつ

    ---------------------------------- */
    showTurn($target,type){

        switch (type){
            case "set": //初期設定

                let i = 0;
                while(i < $target.length) {
                    TweenMax.set($target[i].querySelectorAll('.js__turn-object'),{
                        opacity:0,
                        z:-50,
                    });
                    i=(i+1)|0;
                }

                break;

            case "show": //表示動作

                i = 0;
                while(i < $target.length) {
                    TweenMax.staggerTo($target[i].querySelectorAll('.js__turn-object'),.9, {
                        opacity:1,
                        z: 0,
                        ease: this.param.ease,
                    },1.7);
                    TweenMax.staggerTo($target[i].querySelectorAll('.js__turn-object'),.9, {
                        delay:1.7,
                        opacity:0,
                        z: -50,
                        ease: this.param.ease,
                    },1.7);
                    i=(i+1)|0;
                }
                break;

            case "hide": //非表示動作

                break;
        }

    }

    /* ----------------------------------

    --  TOP、solutionの回転出現パターン

    ---------------------------------- */
    topSolution($target,type){

        switch (type){
            case "set": //初期設定

            TweenMax.set($target.querySelectorAll('.solution-obj01__inner'), {
                x:-200, y:0
            });
            TweenMax.set($target,{
                opacity:0,
            });
                break;

            case "show": //表示動作
            TweenMax.to($target,.6,{
                opacity:1,
                ease: this.param.ease,
                delay: .6,
            });
            // $target.classList.remove('pos1');
            // $target.classList.add('pos2');

            this.w = window.innerWidth;
            this.h = window.innerHeight;

            if(this.w <= 750){
                TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, {bezier:{curviness:1.5, values:[{x:-100, y:0},{x:-87, y:-25},{x:-50, y: -44}, {x:0, y:-50}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:-50},{x:50, y:-44},{x:87, y: -25}, {x:100, y:0}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, {bezier:{curviness:1.5, values:[{x:100, y:0},{x:87, y:25},{x:50, y: 44}, {x:0, y:50}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:50},{x:-50, y:44},{x:-87, y: 25}, {x:-100, y:0}]}/*bezier end*/, ease:this.param.ease});
    
            }else{
                TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, {bezier:{curviness:1.5, values:[{x:-200, y:0},{x:-173, y:-50},{x:-100, y: -87}, {x:0, y:-100}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:-100},{x:100, y:-87},{x:173, y: -50}, {x:200, y:0}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, {bezier:{curviness:1.5, values:[{x:200, y:0},{x:173, y:50},{x:100, y: 87}, {x:0, y:100}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:100},{x:-100, y:87},{x:-173, y: 50}, {x:-200, y:0}]}/*bezier end*/, ease:this.param.ease});
    
            }
      

                break;

            case "hide": //非表示動作

                break;
        }

    }

    /* ----------------------------------

    --  solutionページでの回転出現パターン

    ---------------------------------- */
    solutionSolution($target,type){

        switch (type){
            case "set": //初期設定

            TweenMax.set($target,{
                opacity:0,
            });
                break;

            case "show": //表示動作
            TweenMax.to($target,.6,{
                opacity:1,
                ease: this.param.ease,
                delay: .6,
            });
            // $target.classList.remove('pos1');
            // $target.classList.add('pos2');

            this.w = window.innerWidth;
            this.h = window.innerHeight;

            if(this.w <= 750){
                TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, {bezier:{curviness:1.5, values:[{x:100*0.94, y:0},{x:87*0.94, y:25*0.87},{x:50*0.94, y: 44*0.87}, {x:0, y:50*0.87}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:50*0.87},{x:-50*0.94, y:44*0.87},{x:-87*0.94, y: 25*0.87}, {x:-100*0.94, y:0}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, {bezier:{curviness:1.5, values:[{x:-100*0.94, y:0},{x:-87*0.94, y:-25*0.87},{x:-50*0.94, y: -44*0.87}, {x:0, y:-50*0.87}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:-50*0.87},{x:50*0.94, y:-44*0.87},{x:87*0.94, y: -25*0.87}, {x:100*0.94, y:0}]}/*bezier end*/, ease:this.param.ease});
    
            }else{
                TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, {bezier:{curviness:1.5, values:[{x:-200*0.94, y:0},{x:-173*0.94, y:-50*0.87},{x:-100*0.94, y: -87*0.87}, {x:0, y:-100*0.87}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:-100*0.87},{x:100*0.94, y:-87*0.87},{x:173*0.94, y: -50*0.87}, {x:200*0.94, y:0}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, {bezier:{curviness:1.5, values:[{x:200*0.94, y:0},{x:173*0.94, y:50*0.87},{x:100*0.94, y: 87*0.87}, {x:0, y:100*0.87}]}/*bezier end*/, ease:this.param.ease});
                TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, {bezier:{curviness:1.5, values:[{x:0, y:100*0.87},{x:-100*0.94, y:87*0.87},{x:-173*0.94, y: 50*0.87}, {x:-200*0.94, y:0}]}/*bezier end*/, ease:this.param.ease});
    
            }
      

                break;

            case "hide": //非表示動作

                break;
        }

    }



}
