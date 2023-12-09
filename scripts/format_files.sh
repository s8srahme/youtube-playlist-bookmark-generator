#!/bin/bash

# Format all file data in matching directory
# Usage: npm run shell:format-files <absolute-source-directory-path> <absolute-destination-directory-path>

function format_files() {
	local regex="[^/]*$"
	local source_directory_path="$1"
	local destination_directory_path="$2"

	for filepath in "$source_directory_path"/*; do
		local filename
		filename="$(echo "$filepath" | grep -oP "$regex")"

		local new_filename
		new_filename="$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')"

		cp "$source_directory_path/$filename" "$destination_directory_path/$new_filename"

		sed -i "1,4d" "$destination_directory_path/$new_filename"
		sed -i "/^$/d" "$destination_directory_path/$new_filename"
		sed -i "s|^|https://www.youtube.com/watch?v=|" "$destination_directory_path/$new_filename"
		sed -i "1i video_url,time_added" "$destination_directory_path/$new_filename"
	done
}

format_files "$@"
