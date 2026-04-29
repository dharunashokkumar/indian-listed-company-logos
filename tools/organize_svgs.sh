#!/usr/bin/env bash
set -euo pipefail

root_dir="${1:-.}"
root_dir="${root_dir%/}"

if [[ ! -d "$root_dir" ]]; then
  printf 'Directory not found: %s\n' "$root_dir" >&2
  exit 1
fi

mkdir -p "$root_dir/nse" "$root_dir/bse"

moved_nse=0
moved_bse=0
skipped=0

while IFS= read -r -d '' file; do
  name="${file##*/}"
  lower_name="${name,,}"

  case "$lower_name" in
    nse_*.svg)
      target_dir="$root_dir/nse"
      bucket="nse"
      ;;
    bse_*.svg)
      target_dir="$root_dir/bse"
      bucket="bse"
      ;;
    *)
      ((skipped+=1))
      continue
      ;;
  esac

  target="$target_dir/$name"
  if [[ -e "$target" ]]; then
    printf 'Skipping existing file: %s\n' "$target" >&2
    ((skipped+=1))
    continue
  fi

  mv -- "$file" "$target"

  if [[ "$bucket" == "nse" ]]; then
    ((moved_nse+=1))
  else
    ((moved_bse+=1))
  fi
done < <(find "$root_dir" -maxdepth 1 -type f \( -iname 'NSE_*.svg' -o -iname 'BSE_*.svg' \) -print0)

printf 'Moved NSE: %d\n' "$moved_nse"
printf 'Moved BSE: %d\n' "$moved_bse"
printf 'Skipped: %d\n' "$skipped"
