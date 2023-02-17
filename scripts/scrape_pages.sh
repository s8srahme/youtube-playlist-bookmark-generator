#!/bin/bash

# Scrape URLs from all files in specified directory
# Usage: command [DIRECTORY_PATH] [PROJECT_ROOT_PATH]

function scrape_pages() {
	local directory_path="$1"
	local project_root_path="$2"

	cd "$project_root_path" || return

	for filepath in "$directory_path"/*; do
		regex="[^/]*$"
		filename="$(echo "$filepath" | grep -oP "$regex")"

		echo "Started scraping data => $filename"
		npm start "$filename"
	done
}

scrape_pages "$@"
