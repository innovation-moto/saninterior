<?php header("Content-Type:text/html;charset=utf-8"); ?>
<?php //error_reporting(E_ALL | E_STRICT);
##-----------------------------------------------------------------------------------------------------------------##
#
#  PHPメールプログラム　フリー版 最終更新日2018/07/27
#　改造や改変は自己責任で行ってください。
#	
#  HP: http://www.php-factory.net/
#
#  重要！！サイトでチェックボックスを使用する場合のみですが。。。
#  チェックボックスを使用する場合はinputタグに記述するname属性の値を必ず配列の形にしてください。
#  例　name="当サイトをしったきっかけ[]"  として下さい。
#  nameの値の最後に[と]を付ける。じゃないと複数の値を取得できません！
#
##-----------------------------------------------------------------------------------------------------------------##
if (version_compare(PHP_VERSION, '5.1.0', '>=')) {//PHP5.1.0以上の場合のみタイムゾーンを定義
	date_default_timezone_set('Asia/Tokyo');//タイムゾーンの設定（日本以外の場合には適宜設定ください）
}
/*-------------------------------------------------------------------------------------------------------------------
* ★以下設定時の注意点　
* ・値（=の後）は数字以外の文字列（一部を除く）はダブルクオーテーション「"」、または「'」で囲んでいます。
* ・これをを外したり削除したりしないでください。後ろのセミコロン「;」も削除しないください。
* ・また先頭に「$」が付いた文字列は変更しないでください。数字の1または0で設定しているものは必ず半角数字で設定下さい。
* ・メールアドレスのname属性の値が「Email」ではない場合、以下必須設定箇所の「$Email」の値も変更下さい。
* ・name属性の値に半角スペースは使用できません。
*以上のことを間違えてしまうとプログラムが動作しなくなりますので注意下さい。
-------------------------------------------------------------------------------------------------------------------*/


//---------------------------　必須設定　必ず設定してください　-----------------------

//サイトのトップページのURL　※デフォルトでは送信完了後に「トップページへ戻る」ボタンが表示されますので
$site_top = "http://www.php-factory.net/";

//管理者のメールアドレス ※メールを受け取るメールアドレス(複数指定する場合は「,」で区切ってください 例 $to = "aa@aa.aa,bb@bb.bb";)
$to = "info@honnow-tokyo.com";

//自動返信メールの送信元メールアドレス
//必ず実在するメールアドレスでかつ出来る限り設置先サイトのドメインと同じドメインのメールアドレスとすることを強く推奨します
$from = "info@honnow-tokyo.com";

//フォームのメールアドレス入力箇所のname属性の値（name="○○"　の○○部分）
$Email = "Email";
//---------------------------　必須設定　ここまで　------------------------------------


//---------------------------　セキュリティ、スパム防止のための設定　------------------------------------

//スパム防止のためのリファラチェック（フォーム側とこのファイルが同一ドメインであるかどうかのチェック）(する=1, しない=0)
//※有効にするにはこのファイルとフォームのページが同一ドメイン内にある必要があります
$Referer_check = 0;

//リファラチェックを「する」場合のドメイン ※設置するサイトのドメインを指定して下さい。
//もしこの設定が間違っている場合は送信テストですぐに気付けます。
$Referer_check_domain = "php-factory.net";

/*セッションによるワンタイムトークン（CSRF対策、及びスパム防止）(する=1, しない=0)
※ただし、この機能を使う場合は↓の送信確認画面の表示が必須です。（デフォルトではON（1）になっています）
※【重要】ガラケーは機種によってはクッキーが使えないためガラケーの利用も想定してる場合は「0」（OFF）にして下さい（PC、スマホは問題ないです）*/
$useToken = 1;
//---------------------------　セキュリティ、スパム防止のための設定　ここまで　------------------------------------


//---------------------- 任意設定　以下は必要に応じて設定してください ------------------------


// 管理者宛のメールで差出人を送信者のメールアドレスにする(する=1, しない=0)
// する場合は、メール入力欄のname属性の値を「$Email」で指定した値にしてください。
//メーラーなどで返信する場合に便利なので「する」がおすすめです。
$userMail = 1;

// Bccで送るメールアドレス(複数指定する場合は「,」で区切ってください 例 $BccMail = "aa@aa.aa,bb@bb.bb";)
$BccMail = "";

// 管理者宛に送信されるメールのタイトル（件名）
$subject = "HONNOWへのお問い合わせ";

// 送信確認画面の表示(する=1, しない=0)
$confirmDsp = 0;

// 送信完了後に自動的に指定のページ(サンクスページなど)に移動する(する=1, しない=0)
// CV率を解析したい場合などはサンクスページを別途用意し、URLをこの下の項目で指定してください。
// 0にすると、デフォルトの送信完了画面が表示されます。
$jumpPage = 0;

// 送信完了後に表示するページURL（上記で1を設定した場合のみ）※httpから始まるURLで指定ください。（相対パスでも基本的には問題ないです）
$thanksPage = "https://honnow-tokyo.com/contact";

// 必須入力項目を設定する(する=1, しない=0)
$requireCheck = 1;

/* 必須入力項目(入力フォームで指定したname属性の値を指定してください。（上記で1を設定した場合のみ）
値はシングルクォーテーションで囲み、複数の場合はカンマで区切ってください。フォーム側と順番を合わせると良いです。 
配列の形「name="○○[]"」の場合には必ず後ろの[]を取ったものを指定して下さい。*/
$require = array('お名前','Email');


//----------------------------------------------------------------------
//  自動返信メール設定(START)
//----------------------------------------------------------------------

// 差出人に送信内容確認メール（自動返信メール）を送る(送る=1, 送らない=0)
// 送る場合は、フォーム側のメール入力欄のname属性の値が上記「$Email」で指定した値と同じである必要があります
$remail = 1;

//自動返信メールの送信者欄に表示される名前　※あなたの名前や会社名など（もし自動返信メールの送信者名が文字化けする場合ここは空にしてください）
$refrom_name = "";

// 差出人に送信確認メールを送る場合のメールのタイトル（上記で1を設定した場合のみ）
$re_subject = "送信ありがとうございました";

//フォーム側の「名前」箇所のname属性の値　※自動返信メールの「○○様」の表示で使用します。
//指定しない、または存在しない場合は、○○様と表示されないだけです。あえて無効にしてもOK
$dsp_name = 'お名前';

//自動返信メールの冒頭の文言 ※日本語部分のみ変更可
$remail_text = <<< TEXT

お問い合わせありがとうございました。
早急にご返信致しますので今しばらくお待ちください。

送信内容は以下になります。

TEXT;


//自動返信メールに署名（フッター）を表示(する=1, しない=0)※管理者宛にも表示されます。
$mailFooterDsp = 0;

//上記で「1」を選択時に表示する署名（フッター）（FOOTER～FOOTER;の間に記述してください）
$mailSignature = <<< FOOTER

──────────────────────
株式会社 HONNOW ／ HONNOW Inc.　
代表取締役 谷村紀明
〒107-0062 東京都港区南青山4丁目17番18号 1-a　
E-mail:info@honnow-tokyo.com
URL: https://honnow-tokyo.com/
──────────────────────

FOOTER;


//----------------------------------------------------------------------
//  自動返信メール設定(END)
//----------------------------------------------------------------------

//メールアドレスの形式チェックを行うかどうか。(する=1, しない=0)
//※デフォルトは「する」。特に理由がなければ変更しないで下さい。メール入力欄のname属性の値が上記「$Email」で指定した値である必要があります。
$mail_check = 1;

//全角英数字→半角変換を行うかどうか。(する=1, しない=0)
$hankaku = 0;

//全角英数字→半角変換を行う項目のname属性の値（name="○○"の「○○」部分）
//※複数の場合にはカンマで区切って下さい。（上記で「1」を指定した場合のみ有効）
//配列の形「name="○○[]"」の場合には必ず後ろの[]を取ったものを指定して下さい。
$hankaku_array = array('電話番号','金額');

//-fオプションによるエンベロープFrom（Return-Path）の設定(する=1, しない=0)　
//※宛先不明（間違いなどで存在しないアドレス）の場合に 管理者宛に「Mail Delivery System」から「Undelivered Mail Returned to Sender」というメールが届きます。
//サーバーによっては稀にこの設定が必須の場合もあります。
//設置サーバーでPHPがセーフモードで動作している場合は使用できませんので送信時にエラーが出たりメールが届かない場合は「0」（OFF）として下さい。
$use_envelope = 0;

//機種依存文字の変換
/*たとえば㈱（かっこ株）や①（丸1）、その他特殊な記号や特殊な漢字などは変換できずに「？」と表示されます。それを回避するための機能です。
確認画面表示時に置換処理されます。「変換前の文字」が「変換後の文字」に変換され、送信メール内でも変換された状態で送信されます。（たとえば「㈱」の場合、「（株）」に変換されます） 
必要に応じて自由に追加して下さい。ただし、変換前の文字と変換後の文字の順番と数は必ず合わせる必要がありますのでご注意下さい。*/

//変換前の文字
$replaceStr['before'] = array('①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','№','㈲','㈱','髙');
//変換後の文字
$replaceStr['after'] = array('(1)','(2)','(3)','(4)','(5)','(6)','(7)','(8)','(9)','(10)','No.','（有）','（株）','高');

//------------------------------- 任意設定ここまで ---------------------------------------------


// 以下の変更は知識のある方のみ自己責任でお願いします。

//----------------------------------------------------------------------
//  関数実行、変数初期化
//----------------------------------------------------------------------
//トークンチェック用のセッションスタート
if($useToken == 1 && $confirmDsp == 1){
	session_name('PHPMAILFORMSYSTEM');
	session_start();
}
$encode = "UTF-8";//このファイルの文字コード定義（変更不可）
if(isset($_GET)) $_GET = sanitize($_GET);//NULLバイト除去//
if(isset($_POST)) $_POST = sanitize($_POST);//NULLバイト除去//
if(isset($_COOKIE)) $_COOKIE = sanitize($_COOKIE);//NULLバイト除去//
if($encode == 'SJIS') $_POST = sjisReplace($_POST,$encode);//Shift-JISの場合に誤変換文字の置換実行
$funcRefererCheck = refererCheck($Referer_check,$Referer_check_domain);//リファラチェック実行

//変数初期化
$sendmail = 0;
$empty_flag = 0;
$post_mail = '';
$errm ='';
$header ='';

if($requireCheck == 1) {
	$requireResArray = requireCheck($require);//必須チェック実行し返り値を受け取る
	$errm = $requireResArray['errm'];
	$empty_flag = $requireResArray['empty_flag'];
}
//メールアドレスチェック
if(empty($errm)){
	foreach($_POST as $key=>$val) {
		if($val == "confirm_submit") $sendmail = 1;
		if($key == $Email) $post_mail = h($val);
		if($key == $Email && $mail_check == 1 && !empty($val)){
			if(!checkMail($val)){
				$errm .= "<p class=\"error_messe\">【".$key."】はメールアドレスの形式が正しくありません。</p>\n";
				$empty_flag = 1;
			}
		}
	}
}
  
if(($confirmDsp == 0 || $sendmail == 1) && $empty_flag != 1){
	
	//トークンチェック（CSRF対策）※確認画面がONの場合のみ実施
	if($useToken == 1 && $confirmDsp == 1){
		if(empty($_SESSION['mailform_token']) || ($_SESSION['mailform_token'] !== $_POST['mailform_token'])){
			exit('ページ遷移が不正です');
		}
		if(isset($_SESSION['mailform_token'])) unset($_SESSION['mailform_token']);//トークン破棄
		if(isset($_POST['mailform_token'])) unset($_POST['mailform_token']);//トークン破棄
	}
	
	//差出人に届くメールをセット
	if($remail == 1) {
		$userBody = mailToUser($_POST,$dsp_name,$remail_text,$mailFooterDsp,$mailSignature,$encode);
		$reheader = userHeader($refrom_name,$from,$encode);
		$re_subject = "=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($re_subject,"JIS",$encode))."?=";
	}
	//管理者宛に届くメールをセット
	$adminBody = mailToAdmin($_POST,$subject,$mailFooterDsp,$mailSignature,$encode,$confirmDsp);
	$header = adminHeader($userMail,$post_mail,$BccMail,$to);
	$subject = "=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($subject,"JIS",$encode))."?=";
	
	//-fオプションによるエンベロープFrom（Return-Path）の設定(safe_modeがOFFの場合かつ上記設定がONの場合のみ実施)
	if($use_envelope == 0){
		mail($to,$subject,$adminBody,$header);
		if($remail == 1 && !empty($post_mail)) mail($post_mail,$re_subject,$userBody,$reheader);
	}else{
		mail($to,$subject,$adminBody,$header,'-f'.$from);
		if($remail == 1 && !empty($post_mail)) mail($post_mail,$re_subject,$userBody,$reheader,'-f'.$from);
	}
}
else if($confirmDsp == 1){ 

/*　▼▼▼送信確認画面のレイアウト※編集可　オリジナルのデザインも適用可能▼▼▼　*/
?>
<!DOCTYPE html>
<html lang="ja">
<head>

    <meta charset="UTF-8">
    

    <title itemprop="name">お問い合わせ｜honnow webサイト</title itemprop="name">
    <meta name="robots" content="noindex">
    <meta itemprop="description" name="description" content="">
    <meta property="og:description" content="">
    <meta property="og:type" content="website">
    <meta property="og:url" content="contact">
    <meta property="og:image" content="">
    <meta property="og:site_name" content="お問い合わせ｜honnow webサイト">
    <meta property="og:title" content="お問い合わせ｜honnow webサイト">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="お問い合わせ｜honnow webサイト">
    <meta name="twitter:description" content="">
    <meta name="twitter:image" content="">
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="../assets/img/meta/favicon.ico">
    <link rel="apple-touch-icon-precomposed" href="" />
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" href="">
    <meta name="apple-mobile-web-app-title" content="OKS">
    <meta name="msapplication-TileImage" content="" />
    <!-- <link href="https://fonts.googleapis.com/css?family=Heebo:400,700&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500" rel="stylesheet">
    <link rel="stylesheet" href="https://use.typekit.net/yul0gfu.css">
    <link rel="stylesheet" href="../assets/css/style.css?4">
    <link rel="stylesheet" href="../assets/css/animsition.css?5">
    <script src="../assets/js/head.js?1"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css">

    <!-- <script src="https://ajaxzip3.github.io/ajaxzip3.js"></script> -->

    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1, maximum-scale=1, minimum-scale=1">
    <meta name="format-detection" content="telephone=no">

    <link rel="canonical" href="contact">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <script>
        let viewportContent;
        if (Useragnt.mobile) {
            viewportContent = "width=device-width, initial-scale=1, viewport-fit=cover";
        } else if (Useragnt.tablet) {
            viewportContent = "width=1280";
        } else {
            viewportContent = "width=1280";
        }
        document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
    </script>

    <link href="https://fonts.googleapis.com/css?family=Prompt:300,400,500,600&display=swap" rel="stylesheet">
</head>


<body id="contact" class="lowlayer">
<div id="wrapper">
<div id="l-root">
    <header class="l-header pc">
  <h1>
    <a href="/"><img src="../assets/img/common/logo.svg" alt="honnow"></a>
  </h1>
  <nav>
    <ul>
      <li><a href="../work/" class="work">WORK</a></li>
      <li><a href="../about/" class="about">ABOUT</a></li>
      <li><a href="../shop/" class="shop">SHOP</a></li>
      <li><a href="../contact/" class="contact">CONTACT</a></li>
    </ul>
  </nav>
  <div class="open-overlay sp">
    <span class="bar-top"></span>
    <span class="bar-bottom"></span>
  </div>
</header>
<header class="l-header sp">
  <h1>
    <a href="/"><img src="../assets/img/common/logo.svg" alt="honnow"></a>
  </h1>
  <div id="navArea">
    <nav>
      <div class="inner">
        <ul>
          <li><a href="../work/" class="work">WORK</a></li>
          <li><a href="../about/" class="about">ABOUT</a></li>
          <li><a href="../shop/" class="shop">SHOP</a></li>
          <li><a href="../contact/" class="contact">CONTACT</a></li>
        </ul>
      </div>
    </nav>
    <div class="btn-trigger toggle_btn sp" id="btn15">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- <div class="toggle_btn sp">
      <span class="bar-top"></span>
      <span class="bar-bottom"></span>
      <span class="bar-bottom"></span>
    </div> -->
    <div id="mask"></div>
  </div>
</header>


    <div id="l-scroll">
    <div id="l-scroll-body">

    <main id="main">
        <div id="l-load">
        <div class="l-load-contents" data-namespace="contact">

<!-- ▲ Headerやその他コンテンツなど　※自由に編集可 ▲-->

<!-- ▼************ 送信内容表示部　※編集は自己責任で ************ ▼-->
<div id="formWrap">
<?php if($empty_flag == 1){ ?>
<div align="center">
<h4>入力にエラーがあります。下記をご確認の上「戻る」ボタンにて修正をお願い致します。</h4>
<?php echo $errm; ?><br /><br /><input type="button" value=" 前画面に戻る " onClick="history.back()">
</div>
<?php }else{ ?>
<h3>確認画面</h3>
<p align="center">以下の内容で間違いがなければ、「送信する」ボタンを押してください。</p>
<form action="<?php echo h($_SERVER['SCRIPT_NAME']); ?>" method="POST">
<table class="formTable">
<?php echo confirmOutput($_POST);//入力内容を表示?>
</table>
<p align="center"><input type="hidden" name="mail_set" value="confirm_submit">
<input type="hidden" name="httpReferer" value="<?php echo h($_SERVER['HTTP_REFERER']);?>">
<input type="submit" value="　送信する　">
<input type="button" value="前画面に戻る" onClick="history.back()"></p>
</form>
<?php } ?>
</div><!-- /formWrap -->
<!-- ▲ *********** 送信内容確認部　※編集は自己責任で ************ ▲-->

<!-- ▼ Footerその他コンテンツなど　※編集可 ▼-->
       </div>
        </div>


        <footer class="l-footer">
 <div class="l-footer__top">
  <ul class="l-footer__top__list">
   <li>
    <div class="l-footer__block">
     <h4>CONTACT</h4>
     <p><a href="mailto:info@honnow-tokyo.com" class="mail">info@honnow-tokyo.com</a></p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>OFFICE</h4>
     <p>1-a, 4-17-18 Minamiaoyama<br>
     Minato-ku, Tokyo<br>
     107-0062 JAPAN</p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>SOCIAL</h4>
     <ul class="sns">
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_fb.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_tw.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_insta.svg" alt="" class=""></a>
      </li>
     </ul>
    </div>
   </li>
  </ul>
 </div>
 <div class="l-footer__bottom">
  <p>COPYRIGHT © HONNOW INC. ALL RIGHTS RESERVED.</p>
 </div>
</footer>


    </main><!-- /#l-body -->

    <!-- <div class="l-bg">
        <div class="line-wrap">
        </div>
        <div class="line2-wrap">
        </div>
        <div class="circle-wrap">
        </div>
    </div> -->
          

    </div></div>

    <!-- <div id="l-pagetop"><a href="#">PAGE TOP</a></div> -->

    

    


</div><!-- /#root -->
</div><!-- /#wrapper -->

<!-- <script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=default%2CArray.from%2CArray.prototype.includes%2CArray.prototype.find%2CObject.assign"></script> -->
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.1/dat.gui.min.js"></script> -->
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCM_hW1ixVp7CIEfSAd6TI1TRZ5XFq1zjc"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../assets/js/lib.js?1"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.12.1/plugins/CSSRulePlugin.min.js"></script>
<!-- <script src="../assets/js/masonry.pkgd.min.js?2"></script> -->
<!-- <script src="../assets/js/imagesloaded.pkgd.min.js?2"></script> -->
<script src="../assets/js/animsition.js?3"></script>
<!-- <script src="../assets/js/app2.js?8"></script> -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134899671-1"></script> -->
<!-- <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-134899671-1');
</script> -->
<script>
if (navigator.userAgent.indexOf('Android') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('Android');
}
/*===========================================
 動画制御
=============================================*/
$(function () {
    //video要素の取得
    var video = document.getElementById("video");
    //videoボタンの取得
    var video_btn = document.getElementById("video-btn");
    //状態保存
    var btn_status = 0;
    //画面クリックで再生・ポーズ
    video_btn.addEventListener("click", function () {
        // サムネイル画像を非表示
        $(".l-details__movie__thumbnail").css({
            "transition": "all .3s",
            "display":"none"
        });
        // 再生ボタンを非表示
        $(".l-details__movie__video-btn").css({
            "display": "none",
            "transition": "all .3s"
        });
        // 自動再生する
        video.autoplay = true;
        // 繰り返し再生する
        video.loop = false;
        // true：無音で再生 / false：音ありで再生
        video.muted = false;
        // 再生位置を指定する（秒）
        video.currentTime = 0;

    });

    $('#video-btn').click(function () {
        vidplay();
    });

    function vidplay() {
        var $video = $('#video');
        var video = $video.get(0);
        $video.parent().toggleClass('stop')
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

     if ($('#work').length) {
        $(".l-header nav ul li a.work").addClass("active");
    } else if ($('#about').length) {
        $(".l-header nav ul li a.about").addClass("active");
    } else if ($('#shop').length) {
        $(".l-header nav ul li a.shop").addClass("active");
    } else if ($('#contact').length) {
        $(".l-header nav ul li a.contact").addClass("active");
    } else {
        $(".l-header nav ul li a").removeClass("active");
    }
});

	var ua = navigator.userAgent;
	
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) {
		 //gnav
		var $nav = $('#navArea');
		var $btn = $('.toggle_btn');
		var $mask = $('#mask');
		var open = 'open'; // class
		// menu open close
		$btn.on('click', function () {
			if (!$nav.hasClass(open)) {
				$nav.addClass(open);
			} else {
				$nav.removeClass(open);
			}
		});
		// mask close
		$mask.on('click', function () {
			$nav.removeClass(open);
		});
		$('.btn-trigger').on('click', function () {
			$(this).toggleClass('active');
			return false;
		});
	}else{
		
	}
</script>

</body>
</html>
<?php
/* ▲▲▲送信確認画面のレイアウト　※オリジナルのデザインも適用可能▲▲▲　*/
}

if(($jumpPage == 0 && $sendmail == 1) || ($jumpPage == 0 && ($confirmDsp == 0 && $sendmail == 0))) { 

/* ▼▼▼送信完了画面のレイアウト　編集可 ※送信完了後に指定のページに移動しない場合のみ表示▼▼▼　*/
?>
	<!DOCTYPE html>
<html lang="ja">
<head>

    <meta charset="UTF-8">
    

    <title itemprop="name">お問い合わせ｜honnow webサイト</title itemprop="name">
    <meta name="robots" content="noindex">
    <meta itemprop="description" name="description" content="">
    <meta property="og:description" content="">
    <meta property="og:type" content="website">
    <meta property="og:url" content="contact">
    <meta property="og:image" content="">
    <meta property="og:site_name" content="お問い合わせ｜honnow webサイト">
    <meta property="og:title" content="お問い合わせ｜honnow webサイト">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="お問い合わせ｜honnow webサイト">
    <meta name="twitter:description" content="">
    <meta name="twitter:image" content="">
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="../assets/img/meta/favicon.ico">
    <link rel="apple-touch-icon-precomposed" href="" />
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" href="">
    <meta name="apple-mobile-web-app-title" content="OKS">
    <meta name="msapplication-TileImage" content="" />
    <!-- <link href="https://fonts.googleapis.com/css?family=Heebo:400,700&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500" rel="stylesheet">
    <link rel="stylesheet" href="https://use.typekit.net/yul0gfu.css">
    <link rel="stylesheet" href="../assets/css/style.css?4">
    <link rel="stylesheet" href="../assets/css/animsition.css?5">
    <script src="../assets/js/head.js?1"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css">

    <!-- <script src="https://ajaxzip3.github.io/ajaxzip3.js"></script> -->

    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1, maximum-scale=1, minimum-scale=1">
    <meta name="format-detection" content="telephone=no">

    <link rel="canonical" href="contact">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <script>
        let viewportContent;
        if (Useragnt.mobile) {
            viewportContent = "width=device-width, initial-scale=1, viewport-fit=cover";
        } else if (Useragnt.tablet) {
            viewportContent = "width=1280";
        } else {
            viewportContent = "width=1280";
        }
        document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
    </script>

    <link href="https://fonts.googleapis.com/css?family=Prompt:300,400,500,600&display=swap" rel="stylesheet">
</head>


<body id="contact" class="lowlayer">
<div id="wrapper">
<div id="l-root">
    <header class="l-header pc">
  <h1>
    <a href="/"><img src="../assets/img/common/logo.svg" alt="honnow"></a>
  </h1>
  <nav>
    <ul>
      <li><a href="../work/" class="work">WORK</a></li>
      <li><a href="../about/" class="about">ABOUT</a></li>
      <li><a href="../shop/" class="shop">SHOP</a></li>
      <li><a href="../contact/" class="contact">CONTACT</a></li>
    </ul>
  </nav>
  <div class="open-overlay sp">
    <span class="bar-top"></span>
    <span class="bar-bottom"></span>
  </div>
</header>
<header class="l-header sp">
  <h1>
    <a href="/"><img src="../assets/img/common/logo.svg" alt="honnow"></a>
  </h1>
  <div id="navArea">
    <nav>
      <div class="inner">
        <ul>
          <li><a href="../work/" class="work">WORK</a></li>
          <li><a href="../about/" class="about">ABOUT</a></li>
          <li><a href="../shop/" class="shop">SHOP</a></li>
          <li><a href="../contact/" class="contact">CONTACT</a></li>
        </ul>
      </div>
    </nav>
    <div class="btn-trigger toggle_btn sp" id="btn15">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- <div class="toggle_btn sp">
      <span class="bar-top"></span>
      <span class="bar-bottom"></span>
      <span class="bar-bottom"></span>
    </div> -->
    <div id="mask"></div>
  </div>
</header>


    <div id="l-scroll">
    <div id="l-scroll-body">

    <main id="main">
        <div id="l-load">
        <div class="l-load-contents" data-namespace="contact">
									<section class="l-contact">
  <h2>CONTACT</h2>

<?php if($empty_flag == 1){ ?>
	<div align="center" style="height:calc(100vh - 392px);padding:0 20px;">
<h4 style="margin-bottom:40px;">入力にエラーがあります。<br>下記をご確認の上「戻る」ボタンにて<br class="sp">修正をお願い致します。</h4>
<div style="color:red"><?php echo $errm; ?></div>
<br /><br /><div class="c-contact__button">
        <input type="button" value=" 前画面に戻る " onClick="history.back()">
      </div>
</div>
</section>
</div>
        </div>


        <footer class="l-footer">
 <div class="l-footer__top">
  <ul class="l-footer__top__list">
   <li>
    <div class="l-footer__block">
     <h4>CONTACT</h4>
     <p><a href="mailto:info@honnow-tokyo.com" class="mail">info@honnow-tokyo.com</a></p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>OFFICE</h4>
     <p>1-a, 4-17-18 Minamiaoyama<br>
     Minato-ku, Tokyo<br>
     107-0062 JAPAN</p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>SOCIAL</h4>
     <ul class="sns">
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_fb.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_tw.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_insta.svg" alt="" class=""></a>
      </li>
     </ul>
    </div>
   </li>
  </ul>
 </div>
 <div class="l-footer__bottom">
  <p>COPYRIGHT © HONNOW INC. ALL RIGHTS RESERVED.</p>
 </div>
</footer>


    </main><!-- /#l-body -->

    <!-- <div class="l-bg">
        <div class="line-wrap">
        </div>
        <div class="line2-wrap">
        </div>
        <div class="circle-wrap">
        </div>
    </div> -->
          

    </div></div>

    <!-- <div id="l-pagetop"><a href="#">PAGE TOP</a></div> -->

    

    


</div><!-- /#root -->
</div><!-- /#wrapper -->

<!-- <script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=default%2CArray.from%2CArray.prototype.includes%2CArray.prototype.find%2CObject.assign"></script> -->
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.1/dat.gui.min.js"></script> -->
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCM_hW1ixVp7CIEfSAd6TI1TRZ5XFq1zjc"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../assets/js/lib.js?1"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.12.1/plugins/CSSRulePlugin.min.js"></script>
<!-- <script src="../assets/js/masonry.pkgd.min.js?2"></script> -->
<!-- <script src="../assets/js/imagesloaded.pkgd.min.js?2"></script> -->
<script src="../assets/js/animsition.js?3"></script>
<!-- <script src="../assets/js/app2.js?8"></script> -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134899671-1"></script> -->
<!-- <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-134899671-1');
</script> -->
<script>
if (navigator.userAgent.indexOf('Android') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('Android');
}
/*===========================================
 動画制御
=============================================*/
$(function () {
    //video要素の取得
    var video = document.getElementById("video");
    //videoボタンの取得
    var video_btn = document.getElementById("video-btn");
    //状態保存
    var btn_status = 0;
    //画面クリックで再生・ポーズ
    video_btn.addEventListener("click", function () {
        // サムネイル画像を非表示
        $(".l-details__movie__thumbnail").css({
            "transition": "all .3s",
            "display":"none"
        });
        // 再生ボタンを非表示
        $(".l-details__movie__video-btn").css({
            "display": "none",
            "transition": "all .3s"
        });
        // 自動再生する
        video.autoplay = true;
        // 繰り返し再生する
        video.loop = false;
        // true：無音で再生 / false：音ありで再生
        video.muted = false;
        // 再生位置を指定する（秒）
        video.currentTime = 0;

    });

    $('#video-btn').click(function () {
        vidplay();
    });

    function vidplay() {
        var $video = $('#video');
        var video = $video.get(0);
        $video.parent().toggleClass('stop')
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

     if ($('#work').length) {
        $(".l-header nav ul li a.work").addClass("active");
    } else if ($('#about').length) {
        $(".l-header nav ul li a.about").addClass("active");
    } else if ($('#shop').length) {
        $(".l-header nav ul li a.shop").addClass("active");
    } else if ($('#contact').length) {
        $(".l-header nav ul li a.contact").addClass("active");
    } else {
        $(".l-header nav ul li a").removeClass("active");
    }
});

	var ua = navigator.userAgent;
	
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) {
		 //gnav
		var $nav = $('#navArea');
		var $btn = $('.toggle_btn');
		var $mask = $('#mask');
		var open = 'open'; // class
		// menu open close
		$btn.on('click', function () {
			if (!$nav.hasClass(open)) {
				$nav.addClass(open);
			} else {
				$nav.removeClass(open);
			}
		});
		// mask close
		$mask.on('click', function () {
			$nav.removeClass(open);
		});
		$('.btn-trigger').on('click', function () {
			$(this).toggleClass('active');
			return false;
		});
	}else{
		
	}
</script>

</body>
</html>
<?php }else{ ?>
	<div align="center" style="height:calc(100vh - 530px);padding:0 20px;">
送信ありがとうございました。<br />
送信は正常に完了しました。<br /><br />
<!-- <a href="<?php //echo $site_top ;?>">トップページへ戻る&raquo;</a> -->
</div>
<?php //copyright(); ?>
<!--  CV率を計測する場合ここにAnalyticsコードを貼り付け -->
</section>
</div>
        </div>


        <footer class="l-footer">
 <div class="l-footer__top">
  <ul class="l-footer__top__list">
   <li>
    <div class="l-footer__block">
     <h4>CONTACT</h4>
     <p><a href="mailto:info@honnow-tokyo.com" class="mail">info@honnow-tokyo.com</a></p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>OFFICE</h4>
     <p>1-a, 4-17-18 Minamiaoyama<br>
     Minato-ku, Tokyo<br>
     107-0062 JAPAN</p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>SOCIAL</h4>
     <ul class="sns">
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_fb.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_tw.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_insta.svg" alt="" class=""></a>
      </li>
     </ul>
    </div>
   </li>
  </ul>
 </div>
 <div class="l-footer__bottom">
  <p>COPYRIGHT © HONNOW INC. ALL RIGHTS RESERVED.</p>
 </div>
</footer>


    </main><!-- /#l-body -->

    <!-- <div class="l-bg">
        <div class="line-wrap">
        </div>
        <div class="line2-wrap">
        </div>
        <div class="circle-wrap">
        </div>
    </div> -->
          

    </div></div>

    <!-- <div id="l-pagetop"><a href="#">PAGE TOP</a></div> -->

    

    


</div><!-- /#root -->
</div><!-- /#wrapper -->

<!-- <script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=default%2CArray.from%2CArray.prototype.includes%2CArray.prototype.find%2CObject.assign"></script> -->
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.1/dat.gui.min.js"></script> -->
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCM_hW1ixVp7CIEfSAd6TI1TRZ5XFq1zjc"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../assets/js/lib.js?1"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.12.1/plugins/CSSRulePlugin.min.js"></script>
<!-- <script src="../assets/js/masonry.pkgd.min.js?2"></script> -->
<!-- <script src="../assets/js/imagesloaded.pkgd.min.js?2"></script> -->
<script src="../assets/js/animsition.js?3"></script>
<!-- <script src="../assets/js/app2.js?8"></script> -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134899671-1"></script> -->
<!-- <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-134899671-1');
</script> -->
<script>
if (navigator.userAgent.indexOf('Android') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('Android');
}
/*===========================================
 動画制御
=============================================*/
$(function () {
    //video要素の取得
    var video = document.getElementById("video");
    //videoボタンの取得
    var video_btn = document.getElementById("video-btn");
    //状態保存
    var btn_status = 0;
    //画面クリックで再生・ポーズ
    video_btn.addEventListener("click", function () {
        // サムネイル画像を非表示
        $(".l-details__movie__thumbnail").css({
            "transition": "all .3s",
            "display":"none"
        });
        // 再生ボタンを非表示
        $(".l-details__movie__video-btn").css({
            "display": "none",
            "transition": "all .3s"
        });
        // 自動再生する
        video.autoplay = true;
        // 繰り返し再生する
        video.loop = false;
        // true：無音で再生 / false：音ありで再生
        video.muted = false;
        // 再生位置を指定する（秒）
        video.currentTime = 0;

    });

    $('#video-btn').click(function () {
        vidplay();
    });

    function vidplay() {
        var $video = $('#video');
        var video = $video.get(0);
        $video.parent().toggleClass('stop')
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

     if ($('#work').length) {
        $(".l-header nav ul li a.work").addClass("active");
    } else if ($('#about').length) {
        $(".l-header nav ul li a.about").addClass("active");
    } else if ($('#shop').length) {
        $(".l-header nav ul li a.shop").addClass("active");
    } else if ($('#contact').length) {
        $(".l-header nav ul li a.contact").addClass("active");
    } else {
        $(".l-header nav ul li a").removeClass("active");
    }
});

	var ua = navigator.userAgent;
	
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) {
		 //gnav
		var $nav = $('#navArea');
		var $btn = $('.toggle_btn');
		var $mask = $('#mask');
		var open = 'open'; // class
		// menu open close
		$btn.on('click', function () {
			if (!$nav.hasClass(open)) {
				$nav.addClass(open);
			} else {
				$nav.removeClass(open);
			}
		});
		// mask close
		$mask.on('click', function () {
			$nav.removeClass(open);
		});
		$('.btn-trigger').on('click', function () {
			$(this).toggleClass('active');
			return false;
		});
	}else{
		
	}
</script>

</body>
</html>
<?php 
/* ▲▲▲送信完了画面のレイアウト 編集可 ※送信完了後に指定のページに移動しない場合のみ表示▲▲▲　*/
  }
}
//確認画面無しの場合の表示、指定のページに移動する設定の場合、エラーチェックで問題が無ければ指定ページヘリダイレクト
else if(($jumpPage == 1 && $sendmail == 1) || $confirmDsp == 0) { 
	if($empty_flag == 1){ ?>
	<!DOCTYPE html>
<html lang="ja">
<head>

    <meta charset="UTF-8">
    

    <title itemprop="name">お問い合わせ｜honnow webサイト</title itemprop="name">
    <meta name="robots" content="noindex">
    <meta itemprop="description" name="description" content="">
    <meta property="og:description" content="">
    <meta property="og:type" content="website">
    <meta property="og:url" content="contact">
    <meta property="og:image" content="">
    <meta property="og:site_name" content="お問い合わせ｜honnow webサイト">
    <meta property="og:title" content="お問い合わせ｜honnow webサイト">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="お問い合わせ｜honnow webサイト">
    <meta name="twitter:description" content="">
    <meta name="twitter:image" content="">
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="../assets/img/meta/favicon.ico">
    <link rel="apple-touch-icon-precomposed" href="" />
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" href="">
    <meta name="apple-mobile-web-app-title" content="OKS">
    <meta name="msapplication-TileImage" content="" />
    <!-- <link href="https://fonts.googleapis.com/css?family=Heebo:400,700&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500" rel="stylesheet">
    <link rel="stylesheet" href="https://use.typekit.net/yul0gfu.css">
    <link rel="stylesheet" href="../assets/css/style.css?4">
    <link rel="stylesheet" href="../assets/css/animsition.css?5">
    <script src="../assets/js/head.js?1"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css">

    <!-- <script src="https://ajaxzip3.github.io/ajaxzip3.js"></script> -->

    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1, maximum-scale=1, minimum-scale=1">
    <meta name="format-detection" content="telephone=no">

    <link rel="canonical" href="contact">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <script>
        let viewportContent;
        if (Useragnt.mobile) {
            viewportContent = "width=device-width, initial-scale=1, viewport-fit=cover";
        } else if (Useragnt.tablet) {
            viewportContent = "width=1280";
        } else {
            viewportContent = "width=1280";
        }
        document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
    </script>

    <link href="https://fonts.googleapis.com/css?family=Prompt:300,400,500,600&display=swap" rel="stylesheet">
</head>


<body id="contact" class="lowlayer">
<div id="wrapper">
<div id="l-root">
    <header class="l-header pc">
  <h1>
    <a href="/"><img src="../assets/img/common/logo.svg" alt="honnow"></a>
  </h1>
  <nav>
    <ul>
      <li><a href="../work/" class="work">WORK</a></li>
      <li><a href="../about/" class="about">ABOUT</a></li>
      <li><a href="../shop/" class="shop">SHOP</a></li>
      <li><a href="../contact/" class="contact">CONTACT</a></li>
    </ul>
  </nav>
  <div class="open-overlay sp">
    <span class="bar-top"></span>
    <span class="bar-bottom"></span>
  </div>
</header>
<header class="l-header sp">
  <h1>
    <a href="/"><img src="../assets/img/common/logo.svg" alt="honnow"></a>
  </h1>
  <div id="navArea">
    <nav>
      <div class="inner">
        <ul>
          <li><a href="../work/" class="work">WORK</a></li>
          <li><a href="../about/" class="about">ABOUT</a></li>
          <li><a href="../shop/" class="shop">SHOP</a></li>
          <li><a href="../contact/" class="contact">CONTACT</a></li>
        </ul>
      </div>
    </nav>
    <div class="btn-trigger toggle_btn sp" id="btn15">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- <div class="toggle_btn sp">
      <span class="bar-top"></span>
      <span class="bar-bottom"></span>
      <span class="bar-bottom"></span>
    </div> -->
    <div id="mask"></div>
  </div>
</header>


    <div id="l-scroll">
    <div id="l-scroll-body">

    <main id="main">
        <div id="l-load">
        <div class="l-load-contents" data-namespace="contact">
									<section class="l-contact">
  <h2>CONTACT</h2>
<div align="center" style="height:calc(100vh - 392px);padding:0 20px;"><h4 style="margin-bottom:40px;">入力にエラーがあります。<br>下記をご確認の上「戻る」ボタンにて修正をお願い致します。</h4><div style="color:red"><?php echo $errm; ?></div><br /><br /><div class="c-contact__button">
        <input type="button" value=" 前画面に戻る " onClick="history.back()">
      </div></div>
							</section>
</div>
        </div>


        <footer class="l-footer">
 <div class="l-footer__top">
  <ul class="l-footer__top__list">
   <li>
    <div class="l-footer__block">
     <h4>CONTACT</h4>
     <p><a href="mailto:info@honnow-tokyo.com" class="mail">info@honnow-tokyo.com</a></p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>OFFICE</h4>
     <p>1-a, 4-17-18 Minamiaoyama<br>
     Minato-ku, Tokyo<br>
     107-0062 JAPAN</p>
    </div>
   </li>
   <li>
    <div class="l-footer__block">
     <h4>SOCIAL</h4>
     <ul class="sns">
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_fb.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_tw.svg" alt="" class=""></a>
      </li>
      <li>
       <a href="#"><img src="../assets/img/common/icon_footer_insta.svg" alt="" class=""></a>
      </li>
     </ul>
    </div>
   </li>
  </ul>
 </div>
 <div class="l-footer__bottom">
  <p>COPYRIGHT © HONNOW INC. ALL RIGHTS RESERVED.</p>
 </div>
</footer>


    </main><!-- /#l-body -->

    <!-- <div class="l-bg">
        <div class="line-wrap">
        </div>
        <div class="line2-wrap">
        </div>
        <div class="circle-wrap">
        </div>
    </div> -->
          

    </div></div>

    <!-- <div id="l-pagetop"><a href="#">PAGE TOP</a></div> -->

    

    


</div><!-- /#root -->
</div><!-- /#wrapper -->

<!-- <script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=default%2CArray.from%2CArray.prototype.includes%2CArray.prototype.find%2CObject.assign"></script> -->
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.1/dat.gui.min.js"></script> -->
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCM_hW1ixVp7CIEfSAd6TI1TRZ5XFq1zjc"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../assets/js/lib.js?1"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.12.1/plugins/CSSRulePlugin.min.js"></script>
<!-- <script src="../assets/js/masonry.pkgd.min.js?2"></script> -->
<!-- <script src="../assets/js/imagesloaded.pkgd.min.js?2"></script> -->
<script src="../assets/js/animsition.js?3"></script>
<!-- <script src="../assets/js/app2.js?8"></script> -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134899671-1"></script> -->
<!-- <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-134899671-1');
</script> -->
<script>
if (navigator.userAgent.indexOf('Android') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('Android');
}
/*===========================================
 動画制御
=============================================*/
$(function () {
    //video要素の取得
    var video = document.getElementById("video");
    //videoボタンの取得
    var video_btn = document.getElementById("video-btn");
    //状態保存
    var btn_status = 0;
    //画面クリックで再生・ポーズ
    video_btn.addEventListener("click", function () {
        // サムネイル画像を非表示
        $(".l-details__movie__thumbnail").css({
            "transition": "all .3s",
            "display":"none"
        });
        // 再生ボタンを非表示
        $(".l-details__movie__video-btn").css({
            "display": "none",
            "transition": "all .3s"
        });
        // 自動再生する
        video.autoplay = true;
        // 繰り返し再生する
        video.loop = false;
        // true：無音で再生 / false：音ありで再生
        video.muted = false;
        // 再生位置を指定する（秒）
        video.currentTime = 0;

    });

    $('#video-btn').click(function () {
        vidplay();
    });

    function vidplay() {
        var $video = $('#video');
        var video = $video.get(0);
        $video.parent().toggleClass('stop')
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

     if ($('#work').length) {
        $(".l-header nav ul li a.work").addClass("active");
    } else if ($('#about').length) {
        $(".l-header nav ul li a.about").addClass("active");
    } else if ($('#shop').length) {
        $(".l-header nav ul li a.shop").addClass("active");
    } else if ($('#contact').length) {
        $(".l-header nav ul li a.contact").addClass("active");
    } else {
        $(".l-header nav ul li a").removeClass("active");
    }
});

	var ua = navigator.userAgent;
	
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) {
		 //gnav
		var $nav = $('#navArea');
		var $btn = $('.toggle_btn');
		var $mask = $('#mask');
		var open = 'open'; // class
		// menu open close
		$btn.on('click', function () {
			if (!$nav.hasClass(open)) {
				$nav.addClass(open);
			} else {
				$nav.removeClass(open);
			}
		});
		// mask close
		$mask.on('click', function () {
			$nav.removeClass(open);
		});
		$('.btn-trigger').on('click', function () {
			$(this).toggleClass('active');
			return false;
		});
	}else{
		
	}
</script>

</body>
</html>
<?php 
	}else{ header("Location: ".$thanksPage); }
}

// 以下の変更は知識のある方のみ自己責任でお願いします。

//----------------------------------------------------------------------
//  関数定義(START)
//----------------------------------------------------------------------
function checkMail($str){
	$mailaddress_array = explode('@',$str);
	if(preg_match("/^[\.!#%&\-_0-9a-zA-Z\?\/\+]+\@[!#%&\-_0-9a-zA-Z]+(\.[!#%&\-_0-9a-zA-Z]+)+$/", "$str") && count($mailaddress_array) ==2){
		return true;
	}else{
		return false;
	}
}
function h($string) {
	global $encode;
	return htmlspecialchars($string, ENT_QUOTES,$encode);
}
function sanitize($arr){
	if(is_array($arr)){
		return array_map('sanitize',$arr);
	}
	return str_replace("\0","",$arr);
}
//Shift-JISの場合に誤変換文字の置換関数
function sjisReplace($arr,$encode){
	foreach($arr as $key => $val){
		$key = str_replace('＼','ー',$key);
		$resArray[$key] = $val;
	}
	return $resArray;
}
//送信メールにPOSTデータをセットする関数
function postToMail($arr){
	global $hankaku,$hankaku_array;
	$resArray = '';
	foreach($arr as $key => $val) {
		$out = '';
		if(is_array($val)){
			foreach($val as $key02 => $item){ 
				//連結項目の処理
				if(is_array($item)){
					$out .= connect2val($item);
				}else{
					$out .= $item . ', ';
				}
			}
			$out = rtrim($out,', ');
			
		}else{ $out = $val; }//チェックボックス（配列）追記ここまで
		
		if (version_compare(PHP_VERSION, '5.1.0', '<=')) {//PHP5.1.0以下の場合のみ実行（7.4でget_magic_quotes_gpcが非推奨になったため）
			if(get_magic_quotes_gpc()) { $out = stripslashes($out); }
		}
		
		//全角→半角変換
		if($hankaku == 1){
			$out = zenkaku2hankaku($key,$out,$hankaku_array);
		}
		if($out != "confirm_submit" && $key != "httpReferer") {
			$resArray .= "【 ".h($key)." 】 ".h($out)."\n";
		}
	}
	return $resArray;
}
//確認画面の入力内容出力用関数
function confirmOutput($arr){
	global $hankaku,$hankaku_array,$useToken,$confirmDsp,$replaceStr;
	$html = '';
	foreach($arr as $key => $val) {
		$out = '';
		if(is_array($val)){
			foreach($val as $key02 => $item){ 
				//連結項目の処理
				if(is_array($item)){
					$out .= connect2val($item);
				}else{
					$out .= $item . ', ';
				}
			}
			$out = rtrim($out,', ');
			
		}else{ $out = $val; }//チェックボックス（配列）追記ここまで
		
		if (version_compare(PHP_VERSION, '5.1.0', '<=')) {//PHP5.1.0以下の場合のみ実行（7.4でget_magic_quotes_gpcが非推奨になったため）
			if(get_magic_quotes_gpc()) { $out = stripslashes($out); }
		}
		
		$out = nl2br(h($out));//※追記 改行コードを<br>タグに変換
		$key = h($key);
		$out = str_replace($replaceStr['before'], $replaceStr['after'], $out);//機種依存文字の置換処理
		
		//全角→半角変換
		if($hankaku == 1){
			$out = zenkaku2hankaku($key,$out,$hankaku_array);
		}
		
		$html .= "<tr><th>".$key."</th><td>".$out;
		$html .= '<input type="hidden" name="'.$key.'" value="'.str_replace(array("<br />","<br>"),"",$out).'" />';
		$html .= "</td></tr>\n";
	}
	//トークンをセット
	if($useToken == 1 && $confirmDsp == 1){
		$token = sha1(uniqid(mt_rand(), true));
		$_SESSION['mailform_token'] = $token;
		$html .= '<input type="hidden" name="mailform_token" value="'.$token.'" />';
	}
	
	return $html;
}

//全角→半角変換
function zenkaku2hankaku($key,$out,$hankaku_array){
	global $encode;
	if(is_array($hankaku_array) && function_exists('mb_convert_kana')){
		foreach($hankaku_array as $hankaku_array_val){
			if($key == $hankaku_array_val){
				$out = mb_convert_kana($out,'a',$encode);
			}
		}
	}
	return $out;
}
//配列連結の処理
function connect2val($arr){
	$out = '';
	foreach($arr as $key => $val){
		if($key === 0 || $val == ''){//配列が未記入（0）、または内容が空のの場合には連結文字を付加しない（型まで調べる必要あり）
			$key = '';
		}elseif(strpos($key,"円") !== false && $val != '' && preg_match("/^[0-9]+$/",$val)){
			$val = number_format($val);//金額の場合には3桁ごとにカンマを追加
		}
		$out .= $val . $key;
	}
	return $out;
}

//管理者宛送信メールヘッダ
function adminHeader($userMail,$post_mail,$BccMail,$to){
	$header = '';
	if($userMail == 1 && !empty($post_mail)) {
		$header="From: $post_mail\n";
		if($BccMail != '') {
		  $header.="Bcc: $BccMail\n";
		}
		$header.="Reply-To: ".$post_mail."\n";
	}else {
		if($BccMail != '') {
		  $header="Bcc: $BccMail\n";
		}
		$header.="Reply-To: ".$to."\n";
	}
		$header.="Content-Type:text/plain;charset=iso-2022-jp\nX-Mailer: PHP/".phpversion();
		return $header;
}
//管理者宛送信メールボディ
function mailToAdmin($arr,$subject,$mailFooterDsp,$mailSignature,$encode,$confirmDsp){
	$adminBody="「".$subject."」からメールが届きました\n\n";
	$adminBody .="＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
	$adminBody.= postToMail($arr);//POSTデータを関数からセット
	$adminBody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n";
	$adminBody.="送信された日時：".date( "Y/m/d (D) H:i:s", time() )."\n";
	#$adminBody.="送信者のIPアドレス：".@$_SERVER["REMOTE_ADDR"]."\n";
	#z$adminBody.="送信者のホスト名：".getHostByAddr(getenv('REMOTE_ADDR'))."\n";
	if($confirmDsp != 1){
		$adminBody.="問い合わせのページURL：".@$_SERVER['HTTP_REFERER']."\n";
	}else{
		$adminBody.="問い合わせのページURL：".@$arr['httpReferer']."\n";
	}
	if($mailFooterDsp == 1) $adminBody.= $mailSignature;
	return mb_convert_encoding($adminBody,"JIS",$encode);
}

//ユーザ宛送信メールヘッダ
function userHeader($refrom_name,$to,$encode){
	$reheader = "From: ";
	if(!empty($refrom_name)){
		$default_internal_encode = mb_internal_encoding();
		if($default_internal_encode != $encode){
			mb_internal_encoding($encode);
		}
		$reheader .= mb_encode_mimeheader($refrom_name)." <".$to.">\nReply-To: ".$to;
	}else{
		$reheader .= "$to\nReply-To: ".$to;
	}
	$reheader .= "\nContent-Type: text/plain;charset=iso-2022-jp\nX-Mailer: PHP/".phpversion();
	return $reheader;
}
//ユーザ宛送信メールボディ
function mailToUser($arr,$dsp_name,$remail_text,$mailFooterDsp,$mailSignature,$encode){
	$userBody = '';
	if(isset($arr[$dsp_name])) $userBody = h($arr[$dsp_name]). " 様\n";
	$userBody.= $remail_text;
	$userBody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
	$userBody.= postToMail($arr);//POSTデータを関数からセット
	$userBody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
	$userBody.="送信日時：".date( "Y/m/d (D) H:i:s", time() )."\n";
	if($mailFooterDsp == 1) $userBody.= $mailSignature;
	return mb_convert_encoding($userBody,"JIS",$encode);
}
//必須チェック関数
function requireCheck($require){
	$res['errm'] = '';
	$res['empty_flag'] = 0;
	foreach($require as $requireVal){
		$existsFalg = '';
		foreach($_POST as $key => $val) {
			if($key == $requireVal) {
				
				//連結指定の項目（配列）のための必須チェック
				if(is_array($val)){
					$connectEmpty = 0;
					foreach($val as $kk => $vv){
						if(is_array($vv)){
							foreach($vv as $kk02 => $vv02){
								if($vv02 == ''){
									$connectEmpty++;
								}
							}
						}
						
					}
					if($connectEmpty > 0){
						$res['errm'] .= "<p class=\"error_messe\">【".h($key)."】は必須項目です。</p>\n";
						$res['empty_flag'] = 1;
					}
				}
				//デフォルト必須チェック
				elseif($val == ''){
					$res['errm'] .= "<p class=\"error_messe\">【".h($key)."】は必須項目です。</p>\n";
					$res['empty_flag'] = 1;
				}
				
				$existsFalg = 1;
				break;
			}
			
		}
		if($existsFalg != 1){
				$res['errm'] .= "<p class=\"error_messe\">【".$requireVal."】が未選択です。</p>\n";
				$res['empty_flag'] = 1;
		}
	}
	
	return $res;
}
//リファラチェック
function refererCheck($Referer_check,$Referer_check_domain){
	if($Referer_check == 1 && !empty($Referer_check_domain)){
		if(strpos($_SERVER['HTTP_REFERER'],$Referer_check_domain) === false){
			return exit('<p align="center">リファラチェックエラー。フォームページのドメインとこのファイルのドメインが一致しません</p>');
		}
	}
}
function copyright(){
	echo '<a style="display:block;text-align:center;margin:15px 0;font-size:11px;color:#aaa;text-decoration:none" href="http://www.php-factory.net/" target="_blank">- PHP工房 -</a>';
}
//----------------------------------------------------------------------
//  関数定義(END)
//----------------------------------------------------------------------
?>