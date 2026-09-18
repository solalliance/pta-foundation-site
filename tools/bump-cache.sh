#!/bin/sh
# CSS / JS のキャッシュ対策: 全 HTML の style.css / main.js などの読み込みに ?v=日時 を付け直す
# 使い方: sh tools/bump-cache.sh  (コミット前に実行)
cd "$(dirname "$0")/.." || exit 1
VER=$(date +%Y%m%d%H%M)
for f in *.html; do
  [ -f "$f" ] || continue
  # 既存の ?v=... を除去してから付け直す(.css / .js の href / src が対象)
  sed -i '' -E \
    -e 's/((href|src)="[^"?]+\.(css|js))\?v=[0-9]+"/\1"/g' \
    -e 's/((href|src)="[^"?]+\.(css|js))"/\1?v='"$VER"'"/g' \
    "$f"
done
echo "cache version -> $VER"
grep -hoE '(href|src)="[^"]+\.(css|js)\?v=[0-9]+"' *.html | sort -u
