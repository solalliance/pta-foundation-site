# 一般財団法人 北九州教育財団 Webサイト

静的HTML / CSS / JS で構成したサイトです。

- 担当: 安田
- 現状: トップページと下層ページ（優先度A・B）を作成済み。残りは情報を入手しながら作成します。

## 構成

```
index.html   トップページ
style.css    スタイル
js/main.js   スクリプト
images/      画像(logo_yoko.png: 横ロゴ / logo_yoko_white.png: 白文字版・透過ヘッダーとフッター用 / favicon.png)
```

## 確認用URL（クライアント共有用）

GitHub Pages で公開しています。URL は Settings > Pages で確認できます。
検索エンジンに登録されないよう、各ページに `noindex` を設定しています。

## 更新時のルール(キャッシュ対策)

クライアントのブラウザに古い CSS / JS が残らないよう、読み込みに `?v=日時` を付けています。
**CSS や JS を変更したら、コミット前に必ず以下を実行してください**(全 HTML の版番号が更新されます)。

```
sh tools/bump-cache.sh
```

HTML だけの変更なら実行は不要です。新しい HTML を作るときは、既存ページの `<link>` / `<script>` をコピーすれば同じ版番号が付きます。

## 作成済みのページ

- index.html（トップ）
- greeting.html（ご挨拶）
- history.html（沿革）
- donation.html（ご寄付について）※ WEB申込フォームのURL待ち
- contact.html（お問い合わせ）※ フォームの送信先待ち（項目のみ配置）
- privacy.html（プライバシーポリシー）※ 制定日は公開時に記入。フッター下部からリンク
- organization.html（組織図）※ 名簿は(案)。常務理事(李 学昌 氏)・嵐山 義広 氏の表記は確認済み
- activation.html（単位PTA活性化事業）※ 募集要項・助成額・申込方法は未支給
- reports.html（活動報告アーカイブ）※ 記事5件。写真は実物、本文はダミー。キーワード+カテゴリー+年度で絞り込み
- report-*.html（活動報告の記事ページ 5件）※ 本文・開催概要はダミー
- activation-reports.html（活性化事業報告アーカイブ）※ 記事6件すべてダミー（各校の報告・写真が未支給）
- activation-report-*.html（活性化事業報告の記事ページ 6件）※ すべてダミー
- news.html（新着情報）※ 仮の形。お知らせ3件は「サンプル」表示付きのダミー、会議予定は令和8年度 活動計画(案)より。更新者・更新方法が決まったら作り替える

下層ページは `<body class="page-sub">` でヘッダーを常に白背景＋黒ロゴにし、最上部にページタイトル帯（`.page-hero`）を置いています。
帯の背景写真は `style.css` の `.page-hero--{ページ名}` で指定しています（現在は仮の写真）。

## アーカイブ一覧の絞り込み

`reports.html` / `activation-reports.html` の絞り込みは `js/main.js` で処理しています（外部ライブラリなし）。
記事カードに付けた属性で動きます。記事を追加するときは同じ属性を付けてください。

- `data-text`: 検索対象の文字列（タイトル・カテゴリー・年度・抜粋をつなげたもの）
- `data-category` / `data-year`: セレクトの絞り込み用。セレクト側は `data-archive-filter="category"` のように対応付ける
- 件数表示は `[data-archive-count]`、0件時のメッセージは `[data-archive-empty]`

## 記事用の写真

クライアント提供の元データは `記事資料/`（Git管理外）。サイトで使う分は `images/reports/` に
長辺1200pxで書き出しています（例: `lecture-saito-01.jpg`）。

## 今後作成予定のページ

- なし（news.html は仮の形で作成済み。更新方法が決まったら作り替える）
