#!/usr/bin/env python3
"""Generate Havenly OG cards (1200x630) with PIL.

Style: cream background, dark green type, gold accent — the site's own
Playfair Display (converted from the @fontsource woff2) + Inter for the
subtitle line. Photo on the right, text on the left.
Run: python3 scripts/gen-og.py
"""
import os
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'static', 'images')
OUT = os.path.join(IMG, 'og')
os.makedirs(OUT, exist_ok=True)
W, H = 1200, 630
CREAM = (247, 242, 234)
PINE = (15, 42, 31)
GOLD = (201, 169, 106)
MUTED = (93, 107, 100)

playfair_woff2 = os.path.join(ROOT, 'static', 'fonts', 'playfair-display-latin-600-normal.woff2')
playfair_ttf = os.path.join(OUT, '.playfair.ttf')
if not os.path.exists(playfair_ttf):
    TTFont(playfair_woff2).save(playfair_ttf)
inter_woff2 = os.path.join(ROOT, 'static', 'fonts', 'inter-latin-400-normal.woff2')
inter_ttf = os.path.join(OUT, '.inter.ttf')
if not os.path.exists(inter_ttf):
    TTFont(inter_woff2).save(inter_ttf)

F_TITLE = ImageFont.truetype(playfair_ttf, 78)
F_BRAND = ImageFont.truetype(playfair_ttf, 46)
F_SUB = ImageFont.truetype(inter_ttf, 32)
F_SMALL = ImageFont.truetype(inter_ttf, 28)


def cover(path, w, h):
    """Crop-fill an image to w x h."""
    im = Image.open(path).convert('RGB')
    iw, ih = im.size
    scale = max(w / iw, h / ih)
    im = im.resize((round(iw * scale), round(ih * scale)), Image.LANCZOS)
    x = (im.width - w) // 2
    y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def card(bg_path, title_lines, subtitle, out_name):
    bg = Image.new('RGB', (W, H), CREAM)
    photo = cover(bg_path, 520, H)
    bg.paste(photo, (W - 520, 0))
    # thin gold divider between text and photo
    d = ImageDraw.Draw(bg)
    d.rectangle([W - 528, 0, W - 520, H], fill=GOLD)
    d.rectangle([64, 74, 64 + 90, 74 + 8], fill=GOLD)
    d.text((64, 96), 'HAVENLY', font=F_BRAND, fill=PINE)
    y = 200
    for line in title_lines:
        d.text((64, y), line, font=F_TITLE, fill=PINE)
        y += 92
    d.text((64, y + 16), subtitle, font=F_SUB, fill=MUTED)
    d.text((64, H - 56), 'havenly.pages.dev', font=F_SMALL, fill=MUTED)
    bg.save(os.path.join(OUT, out_name), quality=92)
    print(out_name, bg.size)


CARDS = [
    (os.path.join(IMG, 'hero-villa.jpg'), ['Discover Your', 'Perfect Home'], 'Modern properties · Prime locations', 'og-default.png'),
    (os.path.join(IMG, 'prop-villa-casablanca.jpg'), ['Homes for Sale', 'in Morocco'], 'Villas · Apartments · Family homes', 'og-properties.png'),
    (os.path.join(IMG, 'interior-living.jpg'), ['More Than Just', 'Real Estate'], 'Trusted agency · Secure transactions', 'og-about.png'),
    (os.path.join(IMG, 'blog-buying-guide.jpg'), ['Guides for Buyers,', 'Sellers & Investors'], 'Real estate advice, written plainly', 'og-blog.png'),
]

for bg, title, sub, name in CARDS:
    card(bg, title, sub, name)
print('done')
