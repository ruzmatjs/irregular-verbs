#!/bin/sh
# index.html — artifact uchun yoziladi: unda <!doctype>, <html>, <head> yoʻq,
# chunki Claude artifact sahifani nashr paytida oʻzi shu qobiqqa oʻraydi.
# GitHub Pages uchun esa toʻliq hujjat kerak, shuning uchun shu skript
# index.html dan docs/index.html ni yasaydi. Saytni yangilash:
#   sh build.sh && git commit -am "yangilandi" && git push

set -e
cd "$(dirname "$0")"
mkdir -p docs

{
  cat <<'HEAD'
<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
  :root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
  body{margin:0;font:14px system-ui,sans-serif}
  img{max-width:100%}
  [hidden]{display:none!important}
</style>
HEAD
  sed -n '1,/^<\/style>$/p' index.html
  printf '</head>\n<body>\n'
  sed -n '/^<header class="top">/,$p' index.html
  printf '</body>\n</html>\n'
} > docs/index.html

echo "docs/index.html tayyor ($(wc -l < docs/index.html) qator)"
