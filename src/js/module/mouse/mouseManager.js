/* ---------------------------------------

    -- マウス動作に合わせていい感じに値を返すやつ

--------------------------------------- */

export default class MouseManager{
    constructor(inc){

        /* ポインターの位置情報 */
        this.pointer = {
            x : 0,
            y : 0
        }
        /* 慣性動作後の値 */
        this.obj = {
            x : 0,
            y : 0
        }

        /* 設定はここ */
        this.conf = {
            ease : 0.2,
        }

        this.status={
            deviceSize : "pc",
            fit :{
                out : false
            }
        }

    }
    move(type){ /* domにスタイル付けるなら("set",$target) | 値が欲しいだけなら()なし */

        this.obj.x += (this.pointer.x-this.obj.x)*this.conf.ease;
        this.obj.y += (this.pointer.y-this.obj.y)*this.conf.ease;
    }
    fit($target){

        if(this.status.deviceSize=="sp"||Useragnt.mobile||Useragnt.tablet) return;

        let _w = $target.clientWidth,
            _h = $target.clientHeight,
            _rect = $target.getBoundingClientRect(),
            _x = _rect.left,
            _y = _rect.top,
            _fx = (this.pointer.x - _x) / _w - 0.5,
            _fy = (this.pointer.y - _y) / _h - 0.5;

        // console.log("fitHoverMove",_x,_y,_fx,_fy,_rect,this.state.mouse.x)
        TweenLite.to($target.getElementsByClassName("js__m-fit"),0.2,{
            x:_fx * _w * 0.5,
            y:_fy * _h * 0.5
        });



    }
    update(x,y){

        if(Useragnt.pc){
            this.pointer.x = x;
            this.pointer.y = y;
        }else{
            this.pointer.x = x;
            this.pointer.y = -y;
        }
    }
}