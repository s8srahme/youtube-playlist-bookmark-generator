#!/bin/bash

# Create files in specified location
# Usage: command [DIRECTORY_PATH] [FILE_NAME] [EXTENSION] [COUNT]

function prepend_zero() {
	length_of_number=${#1}

	if [[ $1 =~ ^[0-9]+(\.[0-9]+)?$ ]] && [ "$length_of_number" -eq 1 ] && [ "$1" -gt 1 ] && [ "$1" -lt 10 ]; then
		local formatted_number="0$1"
		echo "$formatted_number"
	fi
}

function create_files() {
	if [ "$4" -eq 1 ]; then
		touch "$1/$2.$3"
	elif [ "$4" -lt 1 ]; then
		echo "COUNT param must be 1 or greater"
	elif [ "$4" -gt 1 ]; then
		for count in $(eval echo "{1..$4}"); do
			file_index=$((count + 1))
			formatted_index="$(prepend_zero "$file_index")"
			touch "$1/$2_$formatted_index.$3"
		done
	else
		echo "COUNT param is invalid"
	fi
}

create_files "$@"
