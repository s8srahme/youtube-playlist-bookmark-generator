#!/bin/bash

# Catenate matched files in specified directory
# Usage: command [DIRECTORY_PATH] [FILENAME_PATTERN] [FILE_EXTENSION]

function catenate_files() {
	local filename
	filename="$1/$2.$3"
	find "$1" -type f -name "$2_*" -exec cat {} \; > "$filename"
	sed -i "/^video_url,time_added/d"
	sed -i "/^$/d" "$filename"
}

catenate_files "$@"
