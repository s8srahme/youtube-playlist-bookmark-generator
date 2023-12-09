#!/bin/bash

# Rename all file extensions in matching directory
# Usage: npm run shell:rename-extensions <absolute-directory-path> <old-extension> <new-extension>

function rename_files() {
	for filepath in "$1"/*."$2"; do
		mv -- "$filepath" "${filepath%."$2"}.$3"
	done
}

rename_files "$@"
