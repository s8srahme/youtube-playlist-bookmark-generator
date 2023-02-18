#!/bin/bash

# Clean, split, scrape, catenate and bookmark all files in specified directory
# Usage: command [ABSOLUTE_PROJECT_ROOT_PATH]

function load_modules() {
	local root_directory_path="$1"
	local takeout_directory_path="$1/takeout"
	local chunks_directory_path="$1/chunks"
	local datasets_directory_path="$1/datasets"
	local bookmarks_directory_path="$1/bookmarks"
	local regex="[^/]*$"

	cd "$root_directory_path" || return

	# rm -rf "$chunks_directory_path" "$datasets_directory_path" "$bookmarks_directory_path"
	# mkdir "$chunks_directory_path" "$datasets_directory_path" "$bookmarks_directory_path"
	# mv "$takeout_directory_path"/subscriptions.csv "$root_directory_path"

	# echo "Cleaning files..."
	# npm run shell:clean-files "$takeout_directory_path"
	# echo "Finished cleaning files"

	# echo "Splitting files..."
	# cp "$takeout_directory_path"/* "$chunks_directory_path"
	# npm run shell:split-files "$chunks_directory_path" csv 20
	# echo "Finished splitting files"

	for filepath in "$chunks_directory_path"/*; do
		filename="$(echo "$filepath" | grep -oP "$regex")"
		echo "Started scraping data => $filename"
		npm start --scrape "$filename"
	done

	# echo "Catenating files..."
	# for filepath in "$chunks_directory_path"-backup/*; do
	# 	filename="$(echo "$filepath" | grep -oP "$regex")"
	# 	npm run shell:catenate "$dataset_directory_path" "$filename" csv
	# done
	# echo "Finished catenating files"

	# for filepath in "$dataset_directory_path"/*; do
	# 	filename="$(echo "$filepath" | grep -oP "$regex")"
	# 	echo "Started bookmarking data => $filename"
	# 	npm start --bookmark "$filename"
	# done
}

load_modules "$@"