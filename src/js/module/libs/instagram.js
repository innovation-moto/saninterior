import Param from '../../param';

const param = new Param();

export default class getInstagram {
    constructor(){
        this.$container =  $("#p-works-list");
        this.dom;

    }
    init() {

        let _this = this;

        $.ajax({
            url: param.instagram.src,//PHPファイルURL
            type:"POST",
            dataType: "json"
        }).done(function(data){
            //通信成功時の処理
            $.each(data.data,function(i,item){
                var imgurl = item.images.low_resolution.url; //低解像度の画像のURLを取得
                var link = item.link; //リンクを取得

                if(i>7) return;
                _this.dom += "<div class='p-li'><a href='" + link + "' target='_blank'><img src='" + imgurl + "'><span class='p-li-hover'><span class='p-li-hover-bg'></span><span class='text'>DETAIL</span><span class='icon'><img src='../assets/img/common/c-btn_arrow-white.svg' alt=''></span></span></a></div>";
            });
            _this.dom += '<div class="p-li type-instagram-link"><a href="https://www.instagram.com/eventstudio_nagoya/" target="_blank"><span><span class="icon"><img src="../assets/img/works/b-works_icon_ig.svg" alt="INSTAGRAM"></span><span class="text">INSTAGRAM</span></span></a></div>';

        }).fail(function(){
            //通信失敗時の処理
            // html = "<li></li>";
        }).always(function(){
            //通信完了時の処理
            _this.$container.html(_this.dom.replace( /undefined/g,'' ));
        });
    }

}