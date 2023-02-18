#!/bin/bash

# Clean all files in specified directory
# Usage: command [DIRECTORY_PATH]

function clean_files() {
	local regex="[^/]*$"
	local directory_path="$1"

	for filepath in "$directory_path"/*; do
		local filename
		filename="$(echo "$filepath" | grep -oP "$regex")"

		local new_filename
		new_filename="$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')"

		if [[ "$filename" != "$new_filename" ]]; then
			mv "$directory_path/$filename" "$directory_path/$new_filename"
		fi

		sed -i "1,4d" "$directory_path/$new_filename"
		sed -i "/^$/d" "$directory_path/$new_filename"
		sed -i "s|^|https://www.youtube.com/watch?v=|" "$directory_path/$new_filename"
		sed -i "1i video_id,time_added" "$directory_path/$new_filename"
	done

}

clean_files "$@"
