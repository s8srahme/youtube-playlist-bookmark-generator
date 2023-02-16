#!/bin/bash

# Rename all file extensions in specified directory
# Usage: command [DIRECTORY_PATH] [OLD_EXTENSION] [NEW_EXTENSION]

function rename_files() {
	for file in "$1"/*."$2"; do
		mv -- "$file" "${file%."$2"}.$3"
	done
}

rename_files "$@"
