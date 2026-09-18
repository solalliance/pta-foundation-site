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
- organization.html（組織図）※ 名簿は(案)。常務理事の扱い・嵐山氏の表記(義広/義弘)が要確認
- activation.html（単位PTA活性化事業）※ 募集要項・助成額・申込方法は未支給
- reports.html（活動報告）※ 令和7年度 活動報告書(案)をもとに作成。写真・詳細文は未支給

下層ページは `<body class="page-sub">` でヘッダーを常に白背景＋黒ロゴにし、最上部にページタイトル帯（`.page-hero`）を置いています。
帯の背景写真は `style.css` の `.page-hero--{ページ名}` で指定しています（現在は仮の写真）。

## 今後作成予定のページ

- news.html（お知らせ）
