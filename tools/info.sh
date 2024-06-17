#!/usr/bin/env nix-shell
#!nix-shell -i bash -p jq

nixpkgs="github:nixos/nixpkgs"

nix flake prefetch ${nixpkgs}

echo "-----------------------------"

# Loop through each argument and call a command on it
for name in "$@"; do
	meta=$(nix eval --json "${nixpkgs}#${name}.meta")

	description=$(echo "${meta}" | jq -r '.description')
	homepage=$(echo "${meta}" | jq -r '.homepage')

	echo ""
	echo "Name: ${name}"
	echo "Homepage: ${homepage}"
	echo "Description: ${description}"
	echo ""
	echo "-----------------------------"
done
