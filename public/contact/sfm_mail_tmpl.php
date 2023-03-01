<?php

/*--------------------------------------------------------------------------
	フォームメール - sformmmail2
	(c)Sapphirus.Biz

	※このスクリプトの文字エンコードは euc-jp から変更しないで下さい。
--------------------------------------------------------------------------*/

// 受け取る時のSubject（件名）
$mailSubject = 'お問合わせ';

//送信メッセージ
$mailMessage = <<< EOD
下記内容にてお問い合わせがありました。

お問合わせ内容: {$sfm_mail->type}
資料送付: {$sfm_mail->document}
会社名: {$sfm_mail->company}
フリガナ: {$sfm_mail->company_furigana}
支社・営業所名: {$sfm_mail->officename}
部署名: {$sfm_mail->divisionname}
役職名: {$sfm_mail->position}
氏名: {$sfm_mail->name}
フリガナ: {$sfm_mail->name_furigana}
郵便番号: {$sfm_mail->zip2}
都道府県名: {$sfm_mail->pref21}
市区町村・番地: {$sfm_mail->addr21}
ビル名など: {$sfm_mail->addr22}
電話番号: {$sfm_mail->tel}
メールアドレス: {$sfm_mail->email}

質問事項等: 
{$sfm_mail->text}

--

EOD;

?>
