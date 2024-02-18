# nixpkgs.news

<a href="https://nixos.wiki/wiki/Flakes" target="_blank">
	<img alt="Nix Flakes Ready" src="https://img.shields.io/static/v1?logo=nixos&logoColor=d8dee9&label=Nix%20Flakes&labelColor=5e81ac&message=Ready&color=d8dee9&style=for-the-badge">
</a>
<a href="https://github.com/snowfallorg/lib" target="_blank">
	<img alt="Built With Snowfall" src="https://img.shields.io/static/v1?logoColor=d8dee9&label=Built%20With&labelColor=5e81ac&message=Snowfall&color=d8dee9&style=for-the-badge">
</a>

<p>
<!--
	This paragraph is not empty, it contains an em space (UTF-8 8195) on the next line in order
	to create a gap in the page.
-->
  
</p>

> An experiment to make Nix ecosystem news more accessible.

## Development

If you are using [`direnv`](https://direnv.net), run `direnv allow` after cloning
this repository to automatically enable the development shell. If you are not
using `direnv`, then you must manually run `nix develop` in after cloning this
repository in order to activate the development shell.

The development shell provides the following packages:

- NodeJS
- Bun

Node is used for normal development tasks, but Bun is used to execute `tools/*` scripts
due to Node choking on some useful features. Ideally we would switch over to Bun fully,
but there isn't currently a Nix builder for projects using `bun.lockb` files.

To start developing, run `npm install` to get dependencies and then `npm run dev` to start
the development server.

## Usage

This project is intended to be consumed by a NixOS system. First, add this repository
as an input to your flake.

```nix
{
    description = "My Nix flake";

    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";

        nixpkgs-news = {
            url = "github:jakehamilton/nixpkgs.news";
            inputs.nixpkgs.follows = "nixpkgs";
        };
    };
}
```

Then you can serve the website's files statically using a server like nginx in your
system configuration.

```nix
{
    inputs, # Make the nixpkgs-news input available in your configuration.
    ...
}:
{
    services.nginx = {
        enable = true;
        recommendedProxySettings = true;

        virtualHosts."example.com" = {
            locations."/" = {
                root = inputs.nixpkgs-news.packages.nixpkgs-news;
            };
        };
    };
}
```
