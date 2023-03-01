export default class carouselManager {
    constructor(){

        this.carousel;
        this.mainList = [];
        this.subList = [];
        this.prev = [];
        this.next = [];
        this.now = [];
        this.pager = [];
        this.length = [];
        this.animeFlg = false;

        this.status = {

        }

    }
    init(){

        this.carousel = document.querySelectorAll('.js__carousel');
        this.mainList = [];
        this.subList = [];
        this.prev = [];
        this.next = [];
        this.now = [];
        this.pager = [];
        this.length = [];

        this.status = {
            startX : 0,
            startY : 0,
            moveX : 0,
            moveY : 0,
            dist : 30
        }

        for(var i = 0 ; i < this.carousel.length ; i++){
            this.mainList[i] = this.carousel[i].querySelector('.js__carousel-list');
            if(this.carousel[i].querySelector('.js__carousel-sub')){
                this.subList[i] = this.carousel[i].querySelector('.js__carousel-sub');
            }else{
                this.subList[i] = false;
            }
            this.prev[i] = this.carousel[i].querySelector('.js__carousel-prev');
            this.next[i] = this.carousel[i].querySelector('.js__carousel-next');
            this.now[i] = 0;
            this.length[i] = this.mainList[i].children.length - 1;
            this.pager[i] = this.carousel[i].querySelector('.js__carousel-pager');
        }

        this.animeFlg = false;

        //set
        TweenMax.set('.js__carousel-list .js__carousel-element',{
            x:25,
            display:'none'
        });
        TweenMax.set('.js__carousel-sub .js__carousel-element',{
            opacity:0
        });
        TweenMax.set(document.querySelectorAll('.is-current'),{
            x:0,
            display:'block'
        });

        for(let i = 0 ; i < this.carousel.length ; i++){

            let _index = i;

            //click
            if(this.prev[i]){
                this.prev[i].onclick = () => {
                    if(this.animeFlg) return;
                    if(this.now[_index] === 0){
                        this.now[_index] = this.length[_index];
                    }else{
                        this.now[_index] --;
                    }
                    this.motion(_index);
                };
                this.next[i].onclick = () => {
                    if(this.animeFlg) return;
                    if(this.now[_index] === this.length[_index]){
                        this.now[_index] = 0;
                    }else{
                        this.now[_index] ++;
                    }
                    this.motion(_index);
                };
            }

            for(let j = 0 ; j < this.pager[i].querySelectorAll('li').length ; j++){
                let _pagerIndex = j;
                this.pager[i].querySelectorAll('li')[j].onclick = () => {
                    this.now[_index] = _pagerIndex;
                    this.motion(_index);
                }
            }

            //swipe
            this.mainList[_index].addEventListener('touchstart', (e) => {
                this.status.startX = e.touches[0].pageX;
                this.status.startY = e.touches[0].pageY;
                if(this.status.startX > this.status.startY)
                    e.preventDefault();
            });
            this.mainList[_index].addEventListener('touchmove', (e) => {
                this.status.moveX = e.changedTouches[0].pageX;
                this.status.moveY = e.changedTouches[0].pageY;
                if(this.status.moveX > this.status.moveY)
                    e.preventDefault();
            });
            this.mainList[_index].addEventListener('touchend', (e) => {
                if (this.status.startX > this.status.moveX && this.status.startX > this.status.moveX + this.status.dist) {
                    if(this.animeFlg) return;
                    if(this.now[_index] === this.length[_index]){
                        this.now[_index] = 0;
                    }else{
                        this.now[_index] ++;
                    }
                    this.motion(_index,'next');
                } else if (this.status.startX < this.status.moveX && this.status.startX + this.status.dist < this.status.moveX) {
                    if(this.animeFlg) return;
                    if(this.now[_index] === 0){
                        this.now[_index] = this.length[_index];
                    }else{
                        this.now[_index] --;
                    }
                    this.motion(_index,'prev');
                }
            });
        }

        this.resize();

    }

    motion(_index){

        this.animeFlg = true;

        //pager
        for(let j = 0 ; j < this.pager[_index].querySelectorAll('li').length ; j++){
            TweenMax.set(this.pager[_index].querySelector('.is-current'), {className:"-=is-current"});
            TweenMax.set(this.pager[_index].querySelectorAll('li')[this.now[_index]], {className:"+=is-current"});
        }

        // hide
        TweenMax.staggerTo(this.mainList[_index].querySelector('.is-current').querySelectorAll('.js__carousel-element-child'), .8 ,{
            delay:0.25,
            x:85,
            scale:0.97,
            opacity:0,
            ease: Power3.easeIn,
        },0.01);
        TweenMax.to(this.mainList[_index].querySelector('.is-current'), 1.2 ,{
            x:-100,
            opacity:0,
            ease: Power3.easeIn,
            onComplete:() => {

                let _targetMain = this.mainList[_index].querySelectorAll('.js__carousel-element');
                _targetMain = _targetMain[this.now[_index]];

                TweenMax.set(this.mainList[_index].querySelector('.is-current'), {
                    display: 'none',
                });
                TweenMax.set(_targetMain, {
                    display: 'block',
                });

                TweenMax.staggerFromTo(_targetMain.querySelectorAll('.js__carousel-element-child'), 1 ,{
                    x:-75,
                    scale:0.97,
                    opacity:0,
                },{
                    x:0,
                    scale:1,
                    opacity:1,
                    ease: Power3.easeOut,
                },0.02);
                TweenMax.fromTo(_targetMain, 1.2 , {
                    x:100,
                    opacity:0,
                },{
                    delay:0.1,
                    x:0,
                    opacity:1,
                    ease: Power3.easeOut,
                    onStart:() => {
                        TweenMax.set(this.mainList[_index].querySelector('.is-current'), {className:"-=is-current"});
                        TweenMax.set(_targetMain, {className:"+=is-current"});
                        this.animeFlg = false;
                    },
                    onComplete:() => {
                        this.resize();
                    }
                });
            }
        });

        // show

        //sub
        if(this.subList[_index]){

            //hide
            TweenMax.staggerTo(this.subList[_index].querySelector('.is-current').children, .7 , {
                x: -30,
                opacity:0,
                ease: Power2.easeIn
            },0.05);
            TweenMax.to(this.subList[_index].querySelector('.is-current'), .7 ,{
                delay:0.8,
                opacity:0,
                ease: Power2.easeIn
            });

            //show
            let _targetSub = this.subList[_index].querySelectorAll('.js__carousel-element');
            _targetSub = _targetSub[this.now[_index]];

            TweenMax.fromTo(_targetSub, .9 , {
                opacity:0,
            },{
                delay:0.6,
                opacity:1,
                ease: Power1.easeOut,
                onStart:() => {
                    TweenMax.set(this.subList[_index].querySelector('.is-current'), {className:"-=is-current"});
                    TweenMax.set(_targetSub, {className:"+=is-current"});
                }
            });
            TweenMax.staggerFromTo(_targetSub.children, .9 , {
                x: 50,
                opacity:0,
            },{
                delay:0.6,
                x:0,
                opacity:1,
                ease: Power1.easeOut
            },0.05);
        }

    }

    resize(){



    }


}