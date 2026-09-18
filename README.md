# 一般財団法人 北九州教育財団 Webサイト

静的HTML / CSS / JS で構成したサイトです。

- 担当: 安田
- 現状: トップページ（index.html）のみ。下層ページは今後、情報を入手しながら作成します。

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

## 今後作成予定のページ

- greeting.html（ご挨拶）
- organization.html（組織図）
- history.html（沿革）
- activation.html（単位PTA活性化事業）
- reports.html（活動報告）
- donation.html（ご寄付について）
- news.html（お知らせ）
- contact.html（お問い合わせ）
