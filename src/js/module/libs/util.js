export default class Util {
    constructor(){

        /* updateTimeRatio 用 */
        this.time;
        this.FPS_60_SEC = 1000 / 60;
    }

    radian(degree){
        return degree * Math.PI / 180;
    }

    // 角度に変換
    // -----------------------------------
    degree(radian){
        return radian * 180 / Math.PI
    }
    random(min,max){
        return Math.random() * (max - min) + min;
    }
    range(val){
        return this.random(-val, val);
    }

    // 値のマッピング
    // -----------------------------------
    // @num     : マッピングする値
    // @toMin   : 変換後の最小値
    // @toMax   : 変換後の最大値
    // @fromMin : 変換前の最小値
    // @fromMax : 変換前の最大値
    // -----------------------------------
    map(num, toMin, toMax, fromMin, fromMax){
        if(num <= fromMin) return toMin;
        if(num >= fromMax) return toMax;

        let p = (toMax - toMin) / (fromMax - fromMin)
        return ((num - fromMin) * p) + toMin
    }

    // ランダムな数(int)
    // -----------------------------------
    // @min : 最小値(int)
    // @max : 最大値(int)
    // return : min(含む)からmax(含む)までのランダムな数(int)
    // -----------------------------------
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    // 1/@rangeの確率でtrueを取得
    // -----------------------------------
    // @range : 2以上の分母(int)
    // return : true or false(boolean)
    // -----------------------------------
    hit(range){
        if (range < 2 || !range){
            range = 2
        }
        return (this.randomInt(0, range - 1) == 0)
    }

    // fpsのタイムレートを算出
    updateTimeRatio() {
        let _lastTime = this.time;
        let _timeRatio = 1;
        if(_lastTime > 0) {
            let _dTime = new Date().getTime() - _lastTime;
            _timeRatio = _dTime / this.FPS_60_SEC;
        }
        this.time = new Date().getTime();

        return _timeRatio;
    }


}