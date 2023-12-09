#!/bin/bash

# Print text with colors
# Usage: cecho <option> <text>;
#				 <option> is '-e', '-s', '-w' or '-i'

function cecho() {
	#  C O L O R S
	local ERROR="\033[1;31m"
	local SUCCESS="\033[0;32m" # [0 means not bold
	local WARNING="\033[1;33m" # [1 means bold
	local INFO="\033[1;34m"
	local NC="\033[0m" # No color

	#  A R G U M E N T S
	local OPTION="$1"
	local TEXT="$2"

	if [[ "$OPTION" == "-e" ]]; then
		printf "${ERROR}❌  ${TEXT} ${NC}"
	elif [[ "$OPTION" == "-s" ]]; then
		printf "${SUCCESS}✅  ${TEXT} ${NC}"
	elif [[ "$OPTION" == "-w" ]]; then
		printf "${WARNING}⏳  ${TEXT} ${NC}"
	elif [[ "$OPTION" == "-i" ]]; then
		printf "${INFO}❕  ${TEXT} ${NC}"
	fi
}

# Convert playlist data files to bookmark files in matching directory. Do not append / at the end of directory path arguments.
# Usage: npm run shell:main <absolute-source-directory-path> <absolute-destination-directory-path>

function main() {
	#  A R G U M E N T S
	local source_directory_path="$1"
	local destination_directory_path="$2"

	#  D I R E C T O R Y  P A T H S
	local ids_directory_path="$destination_directory_path/ids"
	local urls_directory_path="$destination_directory_path/urls"
	local urls_chunks_directory_path="$destination_directory_path/urls_chunks"
	local titles_directory_path="$destination_directory_path/titles"
	local titles_chunks_directory_path="$destination_directory_path/titles_chunks"
	local bookmarks_directory_path="$destination_directory_path/bookmarks"

	local regex="[^/]*$"

	#  I N I T I A L I Z E  F I L E S  &  F O L D E R S
	cecho -w "Preparing files & folders..."
	if [ ! -d "$source_directory_path" ]; then
		cecho -e "stderr: cannot read $source_directory_path/*: No such file or directory"
		return
	fi
	if [ ! -d "$destination_directory_path" ]; then
		mkdir -p "$destination_directory_path"
	fi
	rm -rf "$ids_directory_path" "$urls_directory_path" "$urls_chunks_directory_path" "$titles_directory_path" "$titles_chunks_directory_path" "$bookmarks_directory_path"
	mkdir "$ids_directory_path" "$urls_directory_path" "$urls_chunks_directory_path" "$titles_directory_path" "$titles_chunks_directory_path" "$bookmarks_directory_path"
	cp "$source_directory_path"/* "$ids_directory_path"
	cecho -s "Finished preparing files & folders"

	#  F O R M A T  A L L  F I L E  D A T A
	cecho -w "Formatting files..."
	npm run shell:format-files "$ids_directory_path" "$urls_directory_path"
	cecho -s "Finished formatting files"

	#  S P L I T  F I L E S  I N T O  C H U N K S
	cecho -w "Splitting files..."
	cp "$urls_directory_path"/* "$urls_chunks_directory_path"
	npm run shell:split-files "$urls_chunks_directory_path" csv 20
	cecho -s "Finished splitting files"

	#  S C R A P E  T I T L E S  F R O M  U R L S
	for filepath in "$urls_chunks_directory_path"/*; do
		filename="$(echo "$filepath" | grep -oP "$regex")"
		cecho -w "Started scraping titles => $filename"
		npm start scrape "$filename" "$destination_directory_path"
		cecho -s "Finished scraping titles => $filename"
	done

	#  C A T E N A T E  C H U N K S  I N T O  F I L E S
	cecho -w "Catenating files..."
	cp "$titles_chunks_directory_path"/* "$titles_directory_path"
	for filepath in "$ids_directory_path"/*; do
		filename="$(basename "${filepath}" .csv)"
		npm run shell:catenate-files "$titles_directory_path" "$filename" csv
	done
	find "$titles_directory_path" -type f -regex ".+_[0-9]+\.csv" -exec rm {} \;
	cecho -s "Finished catenating files"

	#  G E N E R A T I N G  B O O K M A R K S
	for filepath in "$titles_directory_path"/*; do
		filename="$(echo "$filepath" | grep -oP "$regex")"
		cecho -w "Started generating bookmarks => $filename"
		npm start bookmark "$filename" "$destination_directory_path"
		cecho -s "Finished generating bookmarks => $filename"
	done

	#  P U T  F I N I S H I N G  T O U C H E S
	cp "$bookmarks_directory_path"/* "$destination_directory_path"
	rm -rf "$ids_directory_path" "$urls_directory_path" "$urls_chunks_directory_path" "$titles_directory_path" "$titles_chunks_directory_path" "$bookmarks_directory_path"
}

main "$@"
