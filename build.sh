#!/bin/sh
# index.html — artifact uchun yoziladi: unda <!doctype>, <html>, <head> yoʻq,
# chunki Claude artifact sahifani nashr paytida oʻzi shu qobiqqa oʻraydi.
# GitHub Pages uchun esa toʻliq hujjat kerak, shuning uchun shu skript
# index.html dan docs/index.html ni yasaydi. Saytni yangilash:
#   sh build.sh && git commit -am "yangilandi" && git push

set -e
cd "$(dirname "$0")"
mkdir -p docs
cp assets/* docs/

{
  cat <<'HEAD'
<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#1f4f4a">
<meta name="description" content="100 ta ingliz tilidagi notoʻgʻri feʻlni yodlash uchun mashq sayti. Oʻzbek tilida.">
<link rel="icon" href="logo.svg" type="image/svg+xml">
<link rel="alternate icon" href="favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="icon-192.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:title" content="Irregular Verbs Trainer">
<meta property="og:description" content="100 ta notoʻgʻri feʻlni yodlash uchun mashq sayti — oʻzbek tilida.">
<meta property="og:url" content="https://ruzmatjs.github.io/irregular-verbs/">
<meta property="og:image" content="https://ruzmatjs.github.io/irregular-verbs/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
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
