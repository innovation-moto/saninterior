# Alpen

コーディングルール

## 【HTML】—————————————————————————

### 《クラス名について》

#### ■大枠について

レイアウト関係については頭文字に（ l- ）例 l-header
コンポーネント（ボタンなどの部品部分）については（ c- ）例 c-button
各ページ個別スタイルについては（ p- ）例 p-recruit

#### ■詳細について

- タイトルについては（ \_\_title ）例 l-header\_\_title
- テキストについては（ \_\_text ）例 l-header\_\_text
- コピーについては（ \_\_copy ）例 l-header\_\_copy
- 画像については（ \_\_img ）例 l-header\_\_img
- 背景画像については（ \_\_bg ）例 l-header\_\_bg
- イラストなどオブジェクトについては（ \_\_object ）例 l-header\_\_object
- ボタンやニュース一覧などのアイコンについては（ \_\_icon ）例 l-header\_\_icon
- ラインについては（ \_\_line ）例 l-header\_\_line

## 【CSS】—————————————————————————

### 《吐出しについて》

/src/sass/内にて管理
すべて/assets/css/style.cssでまとめて読込み

### 《sass内ディレクトリについて》

- サイトの基礎となるスタイルは　/src/sass/foundation/
- 全ページ共通となるスタイルは　/src/sass/layout/
- ライブラリ独自のスタイルは　/src/sass/lib/
- ボタンなど部品部分のスタイルは　/src/sass/component/
- ページ独自のスタイルは　/src/sass/project/

### 《\_mixinについて》

サイトの各所で使用されているスタイルについては\_mixin.scssにまとめる

## 【image】—————————————————————————

### 《ディレクトリについて》

共通画像については　/src/img/common/
ページ独自画像については　/src/img/ディレクトリ/

## 【javascript】—————————————————————————

### 《ディレクトリについて》

共通部分（モーダルはスライダーなど）については　/src/js/module/
ライブラリについては　/assets/lib.jsに直接記載
ページ独自動作については　/src/js/view/ディレクトリ.js
それぞれファイルは/src/js/app.js先頭部分で読込んでいます


## 使用ライブラリ一覧

### 【JavaScript】

- jQuery v3.2.1 https://jquery.com/
- greensock VERSION: 1.19.0 https://greensock.com/