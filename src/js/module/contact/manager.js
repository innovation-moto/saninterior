export default class contactManager {

    constructor(){

        this.status = {
            flg : false,
            containFlg: false
        }

        this.form = document.getElementById("js__form");
        this.check = document.querySelectorAll(".js__required");
        this.submitBtn = document.getElementById("js__submit");
        this.error = document.getElementsByClassName('error');
        this.errorKana = document.getElementsByClassName('error-kana');
        this.errorEmail = document.getElementsByClassName('error-email');
        this.errorPhone = document.getElementsByClassName('error-phone');
        this.errorPlan = document.getElementsByClassName('error-file');
        // this.method = document.getElementsByClassName('method');
        this.radio = document.querySelectorAll("input");
        this.radioTel = document.querySelectorAll("input[type=tel]");
        this.target = '';
        this.index = 0;
        this.val = '';
        this.methodPhone = document.getElementById('method-phone');
        this.methodFax = document.getElementById('method-fax');
        this.methodEmail = document.getElementById('method-email');
        this.inputPhone = document.getElementById('input-phone');
        this.inputFax = document.getElementById('input-fax');
        this.inputEmail = document.getElementById('input-email');
        
    }
    init(){

        this.validate();
        this.submit();

        //blur
        this.blur();

        //change
        this.change();

        //submit
        this.form.addEventListener("input",() => {
            this.validate();
            this.submit();
        });
        this.form.addEventListener("blur",() => {
            this.validate();
            this.submit();
        });

        //method
        this.form.addEventListener("change",() => {
            this.method();
        });
        this.method();

        //[ 半角へ変換 ]
        for(let i = 0; i < this.radio.length; i++){
            this.radio[i].addEventListener("change",() => {
                let _text  = this.radio[i].value;
                let _han = _text.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
                this.radio[i].value = _han;
            });
        }

        //[ 数字のみ入力 ]
        for(let i = 0; i < this.radioTel.length; i++){
            this.radioTel[i].addEventListener('keypress', (e) => {
                let _k = e.keyCode;
                // 0～9, テンキ―0～9, スペース, backspace, delete, →, ←, 以外は入力キャンセル
                if(!((_k >= 48 && _k <= 57) || (_k >= 96 && _k <= 105) || _k == 32 || _k == 8 || _k == 46 || _k == 39 || _k == 37)) {
                    e.preventDefault();
                }
            });
        }

    }

    submit(){
        if(this.status.flg && this.status.containFlg){
            TweenMax.set(this.submitBtn,{className:"-=disabled"});
            this.submitBtn.disabled = false;
        }else{
            TweenMax.set(this.submitBtn,{className:"+=disabled"});
            this.submitBtn.disabled = true;
        }
    }

    blur(){

        for(let i = 0; i < this.check.length ; i++){
            let _index = i;
            this.check[_index].addEventListener('blur',() => {
                this.target = this.check[_index];
                // this.target = this.check[i];
                this.errorSet();
                this.kanaCheck();
                this.emailCheck();
                this.emailConfirmCheck();
                this.phoneCheck();
                this.fileCheck();
                this.inquiryCheck();
                this.validate();
                this.submit();
            });
        }
    }

    change(){

        for(let i = 0; i < this.check.length ; i++){
            let _index = i;
            this.check[_index].addEventListener('change',() => {
                this.target = this.check[_index];
                // this.target = this.check[i];
                this.errorSet();
                this.kanaCheck();
                this.emailCheck();
                this.emailConfirmCheck();
                this.phoneCheck();
                this.fileCheck();
                this.inquiryCheck();
                this.validate();
                this.submit();
            });
        }

    }

    method(){
        // if(document.getElementById('email').checked){
        //     TweenMax.set([this.inputPhone,this.inputFax,this.inputEmail],{className:"-=is-error"});
        //     TweenMax.set(this.methodEmail,{className:"+=must"});
        //     TweenMax.set([this.methodFax,this.methodPhone],{className:"-=must"});
        //     TweenMax.set(this.inputEmail,{className:"+=js__required"});
        //     TweenMax.set([this.inputFax,this.inputPhone],{className:"-=js__required"});
        // }
        // if(document.getElementById('phone').checked){
        //     TweenMax.set([this.inputPhone,this.inputFax,this.inputEmail],{className:"-=is-error"});
        //     TweenMax.set(this.methodPhone,{className:"+=must"});
        //     TweenMax.set([this.methodFax],{className:"-=must"});
        //     TweenMax.set(this.inputPhone,{className:"+=js__required"});
        //     TweenMax.set([this.inputFax],{className:"-=js__required"});
        // }
        // if(document.getElementById('fax').checked){
        //     TweenMax.set([this.inputPhone,this.inputFax,this.inputEmail],{className:"-=is-error"});
        //     TweenMax.set(this.methodFax,{className:"+=must"});
        //     TweenMax.set([this.methodPhone],{className:"-=must"});
        //     TweenMax.set(this.inputFax,{className:"+=js__required"});
        //     TweenMax.set([this.inputPhone],{className:"-=js__required"});
        // }
        // this.check = document.querySelectorAll(".js__required");
        // this.blur();
        //
        // this.validate();
        // this.submit();
    }


    kanaCheck(){
        let _id = this.target.getAttribute("id");
        let _val = this.target.value;


        if(_id.match(/form-kana/g) || _id.match(/form-company-kana/g)){
            if(_val===""){
                this.errorSet();
                if(_id.match(/form-kana/g)){
                    this.target.nextElementSibling.textContent="※お名前のふりがなを入力してください";
                }else{
                    this.target.nextElementSibling.textContent="※会社名のふりがなを入力してください";
                }
            }else{
                if(!_val.match(/^[ぁ-ろわをんー 　\r\n\t]*$/)){
                    this.reset();
                    TweenMax.set(this.target,{className:"+=is-error-kana"});
                    TweenMax.set(this.target.nextElementSibling,{className:"+=is-error"});
                    this.target.nextElementSibling.textContent="※ひらがなで入力してください";
                }
            }
        }
    }

    emailCheck(){
        let _id = this.target.getAttribute("id");
        let _val = this.target.value;


        if(_id.match(/form-email/g)){
            if(_val===""){
                this.errorSet();
                this.target.nextElementSibling.textContent="※メールアドレスを入力してください";
            }else{
                if(!_val.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                    this.reset();
                    TweenMax.set(this.target,{className:"+=is-error-email"});
                    TweenMax.set(this.target.nextElementSibling,{className:"+=is-error"});
                    this.target.nextElementSibling.textContent="※メールアドレスの形式が異なります";
                }
            }
        }
    }

    emailConfirmCheck(){
        let _id = this.target.getAttribute("id");
        let _val = this.target.value;


        if(_id.match(/form-email-check/g)){
            if(_val===""){
                this.errorSet();
                this.target.nextElementSibling.textContent="※メールアドレスを入力してください";
            }else{
                if(!_val.match(document.getElementById("form-email").value)){
                    this.reset();
                    TweenMax.set(this.target,{className:"+=is-error-email"});
                    TweenMax.set(this.target.nextElementSibling,{className:"+=is-error"});
                    this.target.nextElementSibling.textContent="※メールアドレスが一致しません";
                }
            }
        }
    }


    phoneCheck(){
       let _id = this.target.getAttribute("id");
       let _val = this.target.value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');

       if(_id.match(/form-tel/g)){
           if(_val===""){
               this.errorSet();
               this.target.nextElementSibling.textContent="※電話番号を入力してください";
           }else if(_val.length !== 10 && _val.length !== 11) {
               this.reset();
               TweenMax.set(this.target,{className:"+=is-error-phone"});
               TweenMax.set(this.target.nextElementSibling,{className:"+=is-error"});
               this.target.nextElementSibling.textContent="※電話番号を正しく入力して下さい";
           }else{
               if(!_val.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)){
                   this.reset();
                   TweenMax.set(this.target,{className:"+=is-error-phone"});
                   TweenMax.set(this.target.nextElementSibling,{className:"+=is-error"});
                   this.target.nextElementSibling.textContent="※電話番号を正しく入力して下さい";
               }
           }
       }
    }

    fileCheck(){
        let _id = this.target.getAttribute("id");
        let _val = this.target.value;
        let _maxSize = 50000000000; //値は適当

        if(_id.match(/form-file/g) && _val === "") {
            this.errorSet();
        }
        else if(_id.match(/form-file/g) && _val !== "") {
            let _file = document.getElementById(_id).files;
            let _fileSize = _file.size;
            let _fileName = _val.split('\\').slice(-1)[0];

            document.getElementsByClassName("file-text")[0].textContent=_fileName;

            if(_fileSize > _maxSize){
                this.reset()
                TweenMax.set(this.target,{className:"+=is-error-file"});
                TweenMax.set(this.target.parentNode.nextElementSibling,{className:"+=is-error"}); // ファイルアップロードの部分のみディレクトリ構成が異なる
            }else{
                if(!_val.match(/\.(doc|txt|docx|xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xml|xlam|xla|xlw|xlr|pptx|pptm|ppt|pdf|zip|lzh|exe|cab)$/i)){
                    this.reset();
                    TweenMax.set(this.target,{className:"+=is-error-file"});
                    TweenMax.set(this.target.parentNode.nextElementSibling,{className:"+=is-error"}); // ファイルアップロードの部分のみディレクトリ構成が異なる
                }
            }
        }
    }

    inquiryCheck(){
        let _id = this.target.getAttribute("id");
        let _val = this.target.value;

        if(_id.match(/form-inquiry/g)) {
            if (_val === "") {
                this.errorSet();
            }
        }
    }


    errorSet(){
        this.reset();
        if(this.target.value===""){
            TweenMax.set([this.target,this.target.nextElementSibling],{className:"+=is-error"});
        }
    }


    validate(){
        let i=0;
        while(i < this.check.length){
            if(this.check[i].value === ''){
                this.status.containFlg = false;
                break;
            }else{
                this.status.containFlg = true;
            }
            i++;
        }

        if(document.getElementsByClassName('error').length > 0  || document.getElementsByClassName('error-kana').length > 0 || document.getElementsByClassName('error-email').length > 0 || document.getElementsByClassName('error-phone').length > 0 || document.getElementsByClassName('error-file').length > 0) {
            this.status.flg = false;
        }else{
            this.status.flg = true;
        }
    }

    reset(){
        if(this.error != null) {
            TweenMax.set([this.target, this.target.nextElementSibling], {className: "-=is-error"});
            // ファイルアップロードの部分のみディレクトリ構成が異なるため
            if(this.target.parentNode.nextElementSibling !== null){
                TweenMax.set(this.target.parentNode.nextElementSibling,{className:"-=is-error"});
            }
        }
        if(this.errorKana != null){
            TweenMax.set(this.target,{className:"-=is-error-kana"});
        }
        if(this.errorEmail != null){
            TweenMax.set(this.target,{className:"-=is-error-email"});
        }
        if(this.errorPhone != null){
            TweenMax.set(this.target,{className:"-=is-error-phone"});
        }
        if(this.errorPlan != null) {
            TweenMax.set(this.target, {className: "-=is-error-file"});
        }

    }

    resize(){

    }


}