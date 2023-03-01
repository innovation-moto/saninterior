export default class tableManager {
    constructor(param){

        this.$tableWrap;
        this.$tableFixed;
        this.$tableHead;
        this.tableHeadScr;
        this.$tableContent;
        this.tableContentScr;

        this.status = {
        }

        this.param = param;

    }
    init(){

        let scrOption = {
            minScrollbarLength: 50, //min height
            maxScrollbarLength: 50, //max height
            suppressScrollY:true,
            swipeEasing: true,
            wheelSpeed: 1
        }

        this.$tableWrap = document.querySelector('.p-compare__section__table__contents');
        this.$tableFixed = document.getElementById('table-wrap__series-fixed');
        this.$tableHead = document.querySelector('#table-wrap__series .series');
        if(this.param.userAgent === 'sp' || this.param.userAgent === 'tablet'){
            this.tableHeadScr = new PerfectScrollbar(this.$tableHead,scrOption);
        }
        this.$tableContent = document.querySelector('.table-wrap .contents');
        this.tableContentScr = new PerfectScrollbar(this.$tableContent,scrOption);

        this.status = {
            tablePosi : {
                x : 0,
                y : 0,
                end : 0
            },
        }

        // 片方スクロールした時にもう片方もスクロールさせる
        this.$tableHead.addEventListener('scroll', (e) => {
            //this.$tableContent.scrollLeft = this.$tableHead.scrollLeft;
            TweenLite.set(this.$tableContent, {scrollTo:{x:this.$tableHead.scrollLeft, autoKill:true}});
        });
        this.$tableContent.addEventListener('scroll', (e) => {
            //this.$tableHead.scrollLeft = this.$tableContent.scrollLeft;
            TweenLite.set(this.$tableHead, {scrollTo:{x:this.$tableContent.scrollLeft, autoKill:true}});
        });

        TweenMax.set(document.querySelectorAll('.is-current'),{
            x:0,
            display:'block'
        });

        this.resize();

    }

    scroll(_y){

        if(_y > this.status.tablePosi.y){
            if(_y > this.status.tablePosi.end){
                this.$tableFixed.classList.remove('is-fixed');
            }else{
                this.$tableFixed.classList.add('is-fixed');
            }
        }else{
            this.$tableFixed.classList.remove('is-fixed');
        }

    }

    resize(){

        //tableの位置取得
        let _tablePosi = this.$tableWrap.getBoundingClientRect();
        // x軸
        this.status.tablePosi.x = _tablePosi.left;
        TweenMax.set(this.$tableFixed,{
            css:{
                left : this.status.tablePosi.x,
            }
        });
        // y軸
        let _y = window.pageYOffset || document.documentElement.scrollTop;
        this.status.tablePosi.y = _y + _tablePosi.top;

        // y軸終わり
        this.status.tablePosi.end = this.status.tablePosi.y + this.$tableContent.clientHeight + 50;

        //タイトル部分のリサイズ
        document.getElementById('table-wrap__series').style.height = this.$tableFixed.clientHeight+ "px";
        let findTr = document.querySelectorAll('#table-name tr');
        let findTr02 = document.querySelectorAll('#table-contents tr');

        for(let i = 0; i < findTr.length; i++) {
            if(findTr[i].clientHeight <= findTr02[i].clientHeight)
            {
                findTr[i].style.height = findTr02[i].clientHeight + "px";
            }else {
                findTr02[i].style.height = findTr[i].clientHeight + "px";
            }

        }

    }


}