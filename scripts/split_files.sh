#!/bin/bash

# Split all files in specified directory
# Usage: command [ABSOLUTE_DIRECTORY_PATH] [FILE_EXTENSION] [NUMBER_OF_LINES_PER_FILE]

function split_files() {
	cd "$1" || return

	for filepath in "$1"/*; do
		local filename
		filename="$(basename "$filepath" ".$2")_"
		split -l "$3" --numeric-suffixes "$filepath" "$filename"
	done

	for filepath in "$1"/*; do
		if [[ $filepath =~ .csv ]]; then
			rm "$filepath"
		else
			if ! [[ $filepath =~ "00" ]]; then
				echo 'video_url,time_added' | cat - "$filepath" > temp && mv temp "$filepath"
			fi
			mv "$filepath" "$filepath.$2"
		fi
	done
}

split_files "$@"
