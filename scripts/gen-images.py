#!/usr/bin/env python3
"""Generate responsive image variants for Havenly (static/images/).

For each source JPG, emit resized JPEG (q82, progressive) + WebP (q80)
variants at the widths the templates actually display — never upscaled.
Naming: <stem>-<w>.jpg / <stem>-<w>.webp next to the original.

Widths per image (display size x DPR, capped at the original):
  hero + property mains : 400 / 800 / 1200 / 1600
  city / blog / interior : 400 / 800 / 1200
  agent portraits       : 400 / 800
  avatars (44-56px)     : 192
  gallery thumbs (96px): 288
Re-run safely: existing variants are overwritten, originals untouched.
"""
import os
import sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(HERE, "..", "static", "images")

PLAN = {
    "hero-villa.jpg": [400, 800, 1200, 1600],
    "prop-villa-casablanca.jpg": [400, 800, 1200, 1600],
    "prop-luxury-apartment.jpg": [400, 800, 1200, 1600],
    "prop-family-home.jpg": [400, 800, 1200, 1600],
    "prop-seaside-agadir.jpg": [400, 800, 1200, 1600],
    "prop-penthouse-rabat.jpg": [400, 800, 1200, 1600],
    "prop-townhouse-marrakech.jpg": [400, 800, 1200, 1600],
    "city-casablanca.jpg": [400, 800, 1200],
    "city-rabat.jpg": [400, 800, 1200],
    "city-marrakech.jpg": [400, 800, 1200],
    "city-agadir.jpg": [400, 800, 1200],
    "city-tangier.jpg": [400, 800, 1200],
    "blog-buying-guide.jpg": [400, 800, 1200],
    "blog-investing.jpg": [400, 800, 1200],
    "blog-staging.jpg": [400, 800, 1200],
    "interior-living.jpg": [400, 800, 1200],
    "agent-yasmine.jpg": [400, 800],
    "agent-omar.jpg": [400, 800],
    "agent-sofia.jpg": [400, 800],
    "avatar-sarah.jpg": [192],
    "avatar-karim.jpg": [192],
    "avatar-fatima.jpg": [192],
}
# Extra tiny thumbs (gallery 96px + advisor 56px, ~3x DPR) for images that
# also appear as small thumbnails. Keyed by source stem.
THUMBS = {
    "prop-villa-casablanca": [288],
    "prop-luxury-apartment": [288],
    "prop-family-home": [288],
    "prop-seaside-agadir": [288],
    "prop-penthouse-rabat": [288],
    "prop-townhouse-marrakech": [288],
    "interior-living": [288],
    "hero-villa": [288],
    "blog-staging": [288],
    "blog-buying-guide": [288],
    "blog-investing": [288],
    "agent-yasmine": [192],
}


def variants_for(name):
    stem = name[:-4]
    widths = sorted(set(PLAN.get(name, [])) | set(THUMBS.get(stem, [])))
    return stem, widths


def main():
    made = 0
    skipped = 0
    for name in sorted(os.listdir(IMG_DIR)):
        if not name.endswith(".jpg") or name in ("og",):
            continue
        path = os.path.join(IMG_DIR, name)
        if not os.path.isfile(path):
            continue
        stem, widths = variants_for(name)
        if not widths:
            continue
        im = Image.open(path)
        w0, h0 = im.size
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGB")
        for w in widths:
            if w >= w0:
                skipped += 1
                continue
            h = round(h0 * w / w0)
            resized = im.resize((w, h), Image.LANCZOS)
            jpg_out = os.path.join(IMG_DIR, f"{stem}-{w}.jpg")
            webp_out = os.path.join(IMG_DIR, f"{stem}-{w}.webp")
            resized.save(jpg_out, "JPEG", quality=82, optimize=True, progressive=True)
            resized.save(webp_out, "WebP", quality=80, method=6)
            made += 2
    print(f"variants written: {made} files ({skipped} widths skipped: >= original)")


if __name__ == "__main__":
    main()
