# NixOS Weekly Recap

Welcome to this week's edition of the NixOS Weekly Recap, where we've witnessed a remarkable surge of innovation, important software releases, and heartfelt calls for collaboration within our community. This week has surely been a testament to the vibrant spirit and technical prowess that defines the NixOS ecosystem. Let's delve into the particulars that have made the headlines.

## Announcement Recap

### Community-wide Movements and Collaborative Calls

- [**Call for mentors: Google Summer of Code 2024**](https://discourse.nixos.org/t/call-for-mentors-google-summer-of-code-2024/39031): An inspiring summon for experienced members to mentor the next generation of Nix contributors, signaling a step forward in community growth and professional development.

- [**Typhon: Nix-based continuous integration**](https://discourse.nixos.org/t/typhon-nix-based-continuous-integration/39281): Unveiling an avant-garde CI tool that promises to revolutionize how we think about continuous integration within the Nix ecosystem, marking a significant leap toward extensibility and customization.

- [**NixVirt: manage virtual machines**](https://discourse.nixos.org/t/nixvirt-manage-virtual-machines/39305): Introducing an integrated solution for VM management that leverages NixOS and Home Manager modules, offering seamless management of virtual environments.

- [**Whats-in-my-store: Match your Nix Store to packages from NixPkgs**](https://discourse.nixos.org/t/whats-in-my-store-match-your-nix-store-to-packages-from-nixpkgs/39232): A tool aiming to bridge the gap between the Nix store and NixPkgs, enhancing package management efficiency for users.

- [**Call for testing: Nix formatter**](https://discourse.nixos.org/t/call-for-testing-nix-formatter/39179): An invitation for community members to test the nixfmt-rfc-style format, facilitating a smoother rollout and ensuring consistency across Nix files.

- [**Nix 2.20 released**](https://discourse.nixos.org/t/nix-2-20-released/39027): Announcing the latest version of Nix, complete with enhancements that promise to elevate the Nix development experience.

- [**Upcoming Garbage Collection for cache.nixos.org**](https://discourse.nixos.org/t/upcoming-garbage-collection-for-cache-nixos-org/39078): A significant move aiming to balance storage costs and performance, ensuring the sustainability of our services.

- [**Git-verify: in-band commit verification**](https://discourse.nixos.org/t/git-verify-in-band-commit-verification/38991): Introducing a security measure that enhances the reliability of NixOS configurations, emphasizing our commitment to safety and flexibility.

- [**Geospatial NIX flake and Geospatial NIX Web UI**](https://discourse.nixos.org/t/geospatial-nix-flake-and-geospatial-nix-web-ui/38974): A groundbreaking contribution to the geospatial community, showcasing the adaptability of Nix in specialized domains.

## Pull Request Recap

### Library Updates and Package Enhancements

- **Library Updates**: The [`mpdecimal: 2.5.1 -> 4.0.0`](https://github.com/NixOS/nixpkgs/pull/281577) upgrade promises numerous improvements for users requiring high precision arithmetic operations, while [`ttyplot`](https://github.com/NixOS/nixpkgs/pull/284898) sees an update that maintains its status as an essential real-time data visualization tool.

### Noteworthy Package Additions and Modifications

- **New Packages**: The introduction of [`parallel-disk-usage (pdu): init at 0.9.0`](https://github.com/NixOS/nixpkgs/pull/280371) offers an efficient disk usage analyzer, and the enhancement in [`xdg-utils: wrap with gdbus`](https://github.com/NixOS/nixpkgs/pull/286391) signifies an adaptation to evolving user requirements.

### Engagements in Gaming and Automation

- **Gaming Updates**: The [`vbam: 2.1.8 -> 2.1.9`](https://github.com/NixOS/nixpkgs/pull/286227) pull request ensures that our community's retro gaming enthusiasts are well catered to, with the latest version of this cherished emulator.

- **Automation Enhancements**: For users of ArchiSteamFarm, the [`nixos/archisteamfarm: allow bots.*.passwordFile to be null`](https://github.com/NixOS/nixpkgs/pull/284978) update introduces an improved method for secure password configuration, echoing our continuous efforts to advance user experience and security.

## Wrapping Up

This week has undoubtedly been charged with significant achievements, reflective of our community's unwavering dedication to advancing the Nix ecosystem. From facilitating collaboration through projects like the Google Summer of Code to introducing cutting-edge CI tools, enhancing VM management, and rolling out software releases, the vibrancy and innovation within the NixOS community never cease to amaze. We extend our deepest gratitude to all contributors for their relentless efforts and invite the entire community to look forward to what lies ahead in our shared journey of growth and innovation.
