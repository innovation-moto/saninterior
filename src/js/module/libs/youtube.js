import Param from '../../param';

const param = new Param();

export default class YoutubeManager {
    constructor(){

        this.player;

        this.width = $("#"+param.youtube.domID).innerWidth();
        this.height = $("#"+param.youtube.domID).innerHeight();

        this.status = {
            load : false,
            play : false,
            pause : true
        }

    }
    init(){

        this.player = new YT.Player(param.youtube.domID, {
            width: this.width,
            height: this.height,
            videoId: param.youtube.id,
            playerVars: {
                'autoplay' : 1,
                'html5': 1,
                'modestbranding': 1,
                'controls':0,
                'rel':0,
                'enablejsapi':1,
                'showinfo':0
            },
            // events: {
            //     'onReady': _this.onPlayerReady,
            //     'onStateChange': _this.onPlayerStateChange
            // }
        });
        // this.player.playVideo();

    }

    play(){
    }

    resize(){

        if($("#"+param.youtube.domID)[0]){
            this.width = $("#"+param.youtube.domID).innerWidth();
            this.height = $("#"+param.youtube.domID).innerHeight();
        }



    }


}