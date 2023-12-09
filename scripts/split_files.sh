#!/bin/bash

# Split all files in matching directory into smaller chunks
# Usage: npm run shell:split-files <absolute-directory-path> <file-extension> <number-of-lines-per-line>

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
				echo 'video_url,time_added' | cat - "$filepath" >temp && mv temp "$filepath"
			fi
			mv "$filepath" "$filepath.$2"
		fi
	done
}

split_files "$@"
