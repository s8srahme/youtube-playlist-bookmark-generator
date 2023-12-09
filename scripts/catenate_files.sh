#!/bin/bash

# Catenate matched files in matching directory
# Usage: npm run shell:catenate-files <absolute-directory-path> <filename-pattern> <file-extension>

function catenate_files() {
	local filename
	filename="$1/$2.$3"
	find "$1" -type f -name "$2_*" -exec cat {} \; >"$filename"
	sed -i "/^video_title,video_url/d" "$filename"
	sed -i "1i video_title,video_url" "$filename"
	sed -i "/^$/d" "$filename"
}

catenate_files "$@"
