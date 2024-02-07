{
  mkShell,
  nodejs,
  bun,
}:
mkShell {
  packages = [nodejs bun];
}
