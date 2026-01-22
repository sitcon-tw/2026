#!/usr/bin/env bash
set -euo pipefail

IN_DIR="${1:-.}"
OUT_DIR="${2:-./out}"

mkdir -p "$OUT_DIR"

# 支援常見格式（可自行增減）
find "$IN_DIR" -maxdepth 1 -type f \( \
  -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" -o -iname "*.webp" \
\) -print0 | while IFS= read -r -d '' f; do
  base="$(basename "$f")"
  name="${base%.*}"
  out="$OUT_DIR/$name.webp"

  # 先自動轉正方向，再用 cover 方式縮放到 >=240x240，最後中心裁成 240x240
  magick "$f" -auto-orient \
    -background none \
    -resize "240x240^" \
    -gravity center \
    -extent 240x240 \
    -quality 80 \
    "$out"

  echo "OK  $base -> $(basename "$out")"
done

