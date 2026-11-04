#!/bin/sh
# index.html va words.html — artifact uchun yoziladi: ularda <!doctype>, <html>, <head> yoʻq,
# chunki Claude artifact sahifani nashr paytida oʻzi shu qobiqqa oʻraydi.
# GitHub Pages uchun esa toʻliq hujjat kerak, shuning uchun shu skript
# ulardan docs/ ichidagi sahifalarni yasaydi. Saytni yangilash:
#   sh build.sh && git commit -am "yangilandi" && git push

set -e
cd "$(dirname "$0")"
mkdir -p docs
cp assets/* docs/

SITE="https://ruzmatjs.github.io/irregular-verbs/"

# page <manba> <natija> <sarlavha> <tavsif> <manzil>
page() {
  {
    cat <<HEAD
<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#1f4f4a">
<meta name="description" content="$4">
<link rel="icon" href="logo.svg" type="image/svg+xml">
<link rel="alternate icon" href="favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="icon-192.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:title" content="$3">
<meta property="og:description" content="$4">
<meta property="og:url" content="$5">
<meta property="og:image" content="${SITE}og.png">
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
    sed -n '1,/^<\/style>$/p' "$1"
    printf '</head>\n<body>\n'
    sed -n '/^<header class="top">/,$p' "$1"
    printf '</body>\n</html>\n'
  } > "$2"
  echo "$2 tayyor ($(wc -l < "$2") qator)"
}

page index.html docs/index.html "Irregular Verbs Trainer" \
  "100 ta ingliz tilidagi notoʻgʻri feʻlni yodlash uchun mashq sayti. Oʻzbek tilida." "$SITE"
page words.html docs/words.html "A1 Vocabulary Trainer" \
  "A1 kursining 24 ta unitidagi 1372 ta inglizcha soʻzni yodlash uchun mashq sayti. Oʻzbek tilida." "${SITE}words.html"
