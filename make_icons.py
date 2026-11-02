# assets/logo.svg bilan bir xil geometriyadan PNG fayllarni yasaydi.
# Ishga tushirish:  python make_icons.py
# Chiqish:  assets/icon-512.png, icon-192.png, icon-32.png, favicon.ico,
#           avatar-512.png (Telegram uchun), og.png (havola koʻrinishi uchun)

import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "assets")
os.makedirs(OUT, exist_ok=True)

TEAL = (31, 79, 74)
CREAM = (246, 243, 236)
GOLD = (224, 169, 79)
MUTED = (111, 101, 82)

SS = 4  # silliq chet uchun 4 barobar katta chizib, keyin kichraytiramiz


def draw_mark(d, s, ox=0, oy=0):
    """256 birlik koordinatada logo belgisi: ikki sakrash va uch nuqta."""
    def p(v):
        return v * s

    w = max(1, int(round(11 * s)))
    # sakrashlar (yuqori yarim ellips)
    d.arc([ox + p(62), oy + p(92), ox + p(128), oy + p(220)], 180, 360, fill=CREAM, width=w)
    d.arc([ox + p(128), oy + p(118), ox + p(194), oy + p(194)], 180, 360, fill=CREAM, width=w)
    # nuqtalar: V1, V2 krem; V3 oltin
    for cx, color in ((62, CREAM), (128, CREAM), (194, GOLD)):
        d.ellipse([ox + p(cx - 14), oy + p(156 - 14), ox + p(cx + 14), oy + p(156 + 14)], fill=color)


def icon(size, radius=56, circle=False):
    big = size * SS
    im = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    s = big / 256.0
    if circle:
        d.ellipse([0, 0, big - 1, big - 1], fill=TEAL)
    elif radius:
        d.rounded_rectangle([0, 0, big - 1, big - 1], radius=radius * s, fill=TEAL)
    else:
        d.rectangle([0, 0, big - 1, big - 1], fill=TEAL)
    draw_mark(d, s)
    return im.resize((size, size), Image.LANCZOS)


def font(paths, size):
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            continue
    return ImageFont.load_default()


SERIF = ["C:/Windows/Fonts/georgiab.ttf", "C:/Windows/Fonts/timesbd.ttf"]
SANS = ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"]


def og():
    """Telegram va boshqa joylarda havola koʻrinishi uchun 1200x630 rasm."""
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(im)

    mark = icon(230)
    im.paste(mark, (96, 166), mark)

    title = font(SERIF, 82)
    sub = font(SANS, 36)
    small = font(SANS, 30)

    d.text((376, 178), "Irregular Verbs", font=title, fill=TEAL)
    d.text((376, 268), "Trainer", font=title, fill=TEAL)
    d.text((380, 378), "100 ta notoʻgʻri feʻl — oʻzbekcha mashq", font=sub, fill=MUTED)
    d.text((380, 428), "ruzmatjs.github.io/irregular-verbs", font=small, fill=GOLD)

    d.rectangle([0, H - 10, W, H], fill=TEAL)
    return im


icon(512).save(os.path.join(OUT, "icon-512.png"))
icon(192).save(os.path.join(OUT, "icon-192.png"))
icon(32, radius=8).save(os.path.join(OUT, "icon-32.png"))
icon(512, radius=0).save(os.path.join(OUT, "avatar-512.png"))
icon(256, radius=48).save(
    os.path.join(OUT, "favicon.ico"),
    sizes=[(16, 16), (32, 32), (48, 48)],
)
og().save(os.path.join(OUT, "og.png"))

for f in sorted(os.listdir(OUT)):
    print(f, os.path.getsize(os.path.join(OUT, f)), "bayt")
