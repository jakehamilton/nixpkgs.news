{
  lib,
  writeScriptBin,
  buildNpmPackage,
  ...
}: let
  json = lib.importJSON (lib.snowfall.fs.get-file "package.json");
in
  buildNpmPackage {
    pname = "nixpkgs-news";
    inherit (json) version;

    src = lib.snowfall.fs.get-file "/";

    npmDepsHash = "sha256-da0Wq9AIE1SSCYwdLGQua7MhFktsZ1DXLI7uEEUZ09E=";

    npmFlags = [ "--ignore-scripts" ];

    installPhase = ''
      mkdir -p $out/libexec/nixpkgs-news

      cp -r ./dist/* $out/libexec/nixpkgs-news/
    '';
  }
