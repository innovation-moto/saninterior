<?php

/*--------------------------------------------------------------------------
	フォームメール - sformmmail2
	(c)Sapphirus.Biz

	※このスクリプトの文字エンコードは euc-jp から変更しないで下さい。
--------------------------------------------------------------------------*/

// 自動返信のSubject（件名）
$replySubject = 'お問合わせを承りました - 岡谷システム株式会社';

//送信メッセージ
$replyMessage = <<< EOD

岡谷システムのwebサイトよりご連絡いただき、誠にありがとうございます。
以下の内容でお問い合わせを受け付けましたので、内容を確認次第、追って数営業日以内にご連絡差し上げます。

※なお、本アドレスに返信することはできませんのでご了承ください。万が一こちらから連絡がない場合はシステムエラーの可能性もあります。その場合は大変お手数ですが以下までご連絡いただけますと幸いです。

岡谷システム株式会社
052-222-0718 / 


＜以下送信いただいた内容です＞


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

EOD;

?>
