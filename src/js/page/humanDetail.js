export default class humanDetailManager {
    constructor(effect,param) {

        this.effect = effect;
        this.param = param;



        this.sectionOffset = [];

    }
    init(){


        this.h = window.innerHeight;
        for(let i=0, k = document.querySelectorAll('.p-human-section').length; i<k; i++){
            var myMain = document.querySelectorAll('.p-human-section')[i];
            var rect = myMain.getBoundingClientRect();
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var myTop = rect.top + scrollTop;
            this.sectionOffset[i] = myTop -this.h/2;
        }

    }
    show(){

    }
    hide(){

    }
    render(mouse,scrollInc){
    }
    resize(w,h){

        //this.kvH = this.$kv.clientHeight;

        for(let i=0, k = document.querySelectorAll('.p-human-section').length; i<k; i++){
            var myMain = document.querySelectorAll('.p-human-section')[i];
            var rect = myMain.getBoundingClientRect();
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var myTop = rect.top + scrollTop;
            this.sectionOffset[i] = myTop - h/2;
        }

    }
    scroll(inc){
        //side naviのactive
        for(let i =0, k = document.querySelectorAll('.p-lowlayer-fix__nav span').length; i<k; i++){
            document.querySelectorAll('.p-lowlayer-fix__nav span')[i].classList.remove('active');
        }
        if(this.sectionOffset[1] < inc){
            TweenMax.to(document.querySelectorAll('.p-lowlayer-kv__scroll')[0],.3,{opacity: 0})
            document.querySelectorAll('.p-lowlayer-fix__nav span')[2].classList.add('active');
        }else if(this.sectionOffset[0] < inc){
            TweenMax.to(document.querySelectorAll('.p-lowlayer-kv__scroll')[0],.3,{opacity: 0})
            document.querySelectorAll('.p-lowlayer-fix__nav span')[1].classList.add('active');
        }else{
            TweenMax.to(document.querySelectorAll('.p-lowlayer-kv__scroll')[0],.3,{opacity: 1})
            document.querySelectorAll('.p-lowlayer-fix__nav span')[0].classList.add('active');
        }
    }
}