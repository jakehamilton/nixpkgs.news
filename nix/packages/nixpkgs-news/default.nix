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

    npmDepsHash = "sha256-pTSVr2yxP7PgwKU7rEvgpmMgMmB101RC+Ay1PYBsrP4=";

    npmFlags = ["--ignore-scripts"];

    installPhase = ''
      mkdir -p $out

      cp -r ./dist/* $out/
    '';
  }
