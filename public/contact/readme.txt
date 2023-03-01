フォームメール - sformmmail2 の説明
(c)Sapphirus.Biz


【ファイル構成について】
下記の6ファイルで構成されます。
sformmail.php - メインプログラム
sfm_config.php - 設定ファイル
sformmail.css - 共通スタイルシート（CSS）
sfm_form.html - 入力フォーム（htmlファイル）
sfm_confirm.html - 確認画面（htmlファイル）
sfm_completion.html - 送信完了画面（htmlファイル）
sfm_mail_tmpl.php - 送信メール用テンプレート
sfm_reply_tmpl.php - 自動返信メール用テンプレート


【動作について】
■FTPソフト等で、上記のファイルを任意の場所にアップロードします。ブラウザで sformmail.php（デフォルトの場合）へアクセスすると入力フォームを読み込み表示されます。
動作確認として sfm_config.php 内の $mailTo[0] を、受け取ることのできるメールアドレスに設定し、sformmail.php へアクセスしてフォーム入力～送信を確認して下さい。


【入力フォームの設定について】
■フォームの中の input name に「_s」オプションをつけると必須項目の扱いとなります。
例) 
<input type="text" name="age_s" />

■input name に「email」を指定するとメールアドレスとして扱われます。（定義済み）
例）
<input type="text" name="email" />

■input name に「emailcheck」を指定するとメールアドレスの再入力の確認をすることができます。
※「email」を使用していない場合は、「emailcheck」も使用しないで下さい。
例）
<input type="text" name="emailcheck" />

■入力フォーム（sfm_form.html）内のどこかに非表示フィールドとして「mode="CONFIRM"」（CONFIRM は大文字）を必ず設定して下さい。この指定がないと確認画面に移りません。
例）
<input name="mode" type="hidden" value="CONFIRM" />

■同様に確認画面（sfm_confirm.html）には非表示フィールドで「mode="SEND"」（SEND は大文字）を必ず設置して下さい。この指定が無いと送信処理を行うことができません。
例）
<input name="mode" type="hidden" value="SEND" />

■入力フォームもしくは確認画面で「name="autoReply"」を設定すると、入力されたメールアドレスに自動返信することができます。「name="autoReply"」に対して適当な値（value）を指定して下さい。
例）
<input name="autoReply" type="hidden" value="1" />
もしくは <input name="autoReply" type="checkbox" value="受け取る" /> 等
※email または autoReply 項目または reply.php ファイルのどれかが無い場合は無効になります。

■文字エンコードの設定に関してデフォルト設定及び付属の HTML ファイルは「euc-jp」です。
文字エンコードを変更する場合、
sfm_form.html
sfm_confirm.html
sfm_completion.html
の3種類の HTML を文字エンコードの変更できるテキストエディタ等で保存し直して下さい。
※内部では euc-jp で中間処理をしているので、PHP ファイルについては変更しないで下さい。

■受け取るメールアドレス先を選択することができます。まず、設定ファイル（sfm_config.php）にある「$mailTo[0～2]」にそれぞれメールアドレスを記述します。入力フォームに「name="mailToNum"」を設定し値を指定することにより、それぞれ対応したメールアドレスに対し送信することができます。
例）
<select name="mailToNum">
<option value="0">共通</option>
<option value="1">技術</option>
<option value="2">営業</option>
</select>
mailToNum が「1」の場合、$mailTo[1] のメールアドレスに対して送信されます。
※$mailTo[0] は受け取り先として必ず設定して下さい。

■checkbox 等、複数の値を取得することがある場合、name に「food[0]」のように角括弧を付けて、連番にして下さい。また、必須項目の場合は「food_s[0]」のように「_s」を間に指定します。checkbox のような場合の注意として、name に対して一つも選択が無い（値が無い）場合、name 自体が存在しないことになってしまうため、あらかじめ空の name を hidden 等で用意しておく必要があります。
例）
<input name="food" type="hidden" value="none" />
<input name="food[0]" type="checkbox" value="ラーメン" />
<input name="food[1]" type="checkbox" value="カレーライス" />
<input name="food[2]" type="checkbox" value="パスタ" />
※[]を付けることによりPHP内部で複数項目をまとめた配列として処理されます。

■空の値を設定する場合は、value に「""」のように何もない値を設定するか、もしくは「"none"」とすると空データとして扱われます。select や checkbox 等で初期値として何も選択されていない時などに使用して下さい。
例）
<input name="item_select" type="hidden" value="" />
もしくは <input name="item_select" type="hidden" value="none" />


【その他の設定について】
■$maxText は各入力項目に対して処理することのできる最大文字数（半角）です。

■$mailBcc は、フォームから送信されるメールを BCC としても受け取りたい場合に、メールアドレスを指定することによって利用できます。

■$replyBcc は、自動返信されるメールを BCC としても受け取りたい場合に、メールアドレスを指定することによって利用できます。

■$replyAddress は、自動返信メールに対し送信元のアドレスを変更したい場合に、メールアドレスを指定することによって利用できます。

■$replyName は、自動返信メールの送信元メールアドレスに対し名前を付加することができます。日本語もエンコード処理を行いますので使用可能です。

■$returnPath は、メール送信エラーになった場合の受け取り先として変更したい場合に、メールアドレスを指定することによって利用できます。


【メインプログラムの設定について】
プログラムを利用する上で、PHP の仕様によって動作に影響が出た場合に対応するための設定です。

■$refCheck は、リファラによるチェックで外部から直接利用される可能性を防ぎます。

■$ill_char は、文字化けが起こってしまう場合に変更します。

■$use_ssl は、https で利用する場合に設定します。
※ドメインに secure もしくは ssl が含まれる場合は常に設定されます。

■$baseEnc は、HTML で利用するエンコードを指定（必要な場合のみ）
内部では sfm_form.html に合わせた入出力処理を行いますが、うまくエンコードできず文字化けが起こるようでしたら、メインプログラム（sformmail.php）内の「$baseEnc」を使用する文字エンコードに変更して下さい。

■各テンプレートのファイル名を変更したい場合、$temp_html 内の該当ファイル名を変更して下さい。

■入力エラーの表示を変更したい場合、$temp_err 内の該当メッセージを変更して下さい。

■複数項目を結合して表示させたい場合、$name_marge 内に input name と 項目をつなぐ記号を設定します。
例）
<input name="tel_s[0]" type="text" />
<input name="tel_s[1]" type="text" />
<input name="tel_s[2]" type="text" />
のフォームがあり、それぞれ「0000」「1111」「2222」と記入された場合、'tel' => '-' を設定すると tel には「0000-1111-2222」が格納されます。


【その他】
フォームで必要な input 項目をある程度含めたサンプル HTML を用意しました。フォーム HTML を作成する際にご参考頂ければと思います。
※バージョン 2.50 より仕様を変更しました。設定ファイルやテンプレート等の記述を変更しました。ただし、以前のテンプレートもそのまま「sformmail.php」の差し替えで利用できるようになっています。
※バージョン 1.xx とはテンプレート等ファイルの互換性がありません。
