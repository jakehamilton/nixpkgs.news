# NixOS Weekly Recap

This week has been a whirlwind of activity within the NixOS community. With a plethora of announcements and pull requests, the ecosystem continues to grow and evolve. From community calls to new tools and significant updates, let's dive into the highlights of this week.

The community is rallying behind the [Call for mentors: Google Summer of Code 2024](https://discourse.nixos.org/t/call-for-mentors-google-summer-of-code-2024/39031), as shared by @Janik. The goal is to find and support mentors willing to guide newcomers through the intricacies of Nix/Nixpkgs/NixOS projects. This initiative not only strengthens the community's foundation but also offers mentors a unique opportunity to sharpen their mentoring skills and make a difference.

On the innovation front, @pnmadelaine has introduced [Typhon](https://discourse.nixos.org/t/typhon-nix-based-continuous-integration/39281), a prototype aiming to reimagine the current landscape of Nix-based continuous integration. Typhon, armed with a Rust core and a supportive webapp, looks to offer a more customizable and extensible CI solution than currently available alternatives. 

In parallel, @AshleyYakeley's unveiling of [NixVirt](https://discourse.nixos.org/t/nixvirt-manage-virtual-machines/39305) marks a significant leap in virtual machine management within the Nix ecosystem. This tool engages NixOS and Home Manager modules to provide an intuitive and Nix-like experience in managing virtual domains and networks through libvirt.

A noteworthy tool aiming to demystify package management complexities is [Whats-in-my-store](https://discourse.nixos.org/t/whats-in-my-store-match-your-nix-store-to-packages-from-nixpkgs/39232) by @jakehamilton. Designed to map out the Nix Store against NixPkgs or a flake, this tool offers a promising approach to handling package management more effectively, although with an acknowledgement of potential time-intensiveness during the evaluation process.

The community is also summoned to partake in the testing phase of a [Nix formatter](https://discourse.nixos.org/t/call-for-testing-nix-formatter/39179) following the discussions in RFC 166. @piegames calls for community engagement to iron out bugs and enhance the formatter's effectiveness.

Moreover, with the [release of Nix 2.20](https://discourse.nixos.org/t/nix-2-20-released/39027), outlined by @edolstra, the community is encouraged to stay updated by reviewing the plethora of enhancements and fixes introduced in this version.

Lastly, @zimbatm's announcement regarding the [Upcoming Garbage Collection for cache.nixos.org](https://discourse.nixos.org/t/upcoming-garbage-collection-for-cache-nixos-org/39078) signifies an important step in optimizing the repository's performance, emphasizing cost-saving measures without significantly impacting the user experience.

### NixOS Weekly Pull Requests

The repository has seen a variety of contributions this week. Starting with the Python ecosystem, python3Packages.qemu version 0.6.1.0a1 has been [introduced](https://github.com/NixOS/nixpkgs/pull/285760), promising an enriched Python package landscape within NixOS.

The disk usage analyzer, [parallel-disk-usage (pdu) version 0.9.0](https://github.com/NixOS/nixpkgs/pull/280371), marks a notable addition to command-line tools, anticipated to bring efficiency to storage management.

For the gaming community, an [update and refactor of shipwright to version 8.0.4](https://github.com/NixOS/nixpkgs/pull/282688) introduces game-changing features including ROM selections and gamecontrollerdb updates.

Improvements in infrastructure and tools continue with significant updates like the introduction of "obsidian-export" at [version 23.12.0](https://github.com/NixOS/nixpkgs/pull/283233) and "openrocket" at [version 23.09](https://github.com/NixOS/nixpkgs/pull/283850), alongside advancements in networking with [ntopng version 6.0](https://github.com/NixOS/nixpkgs/pull/284855).

Each contribution this week reflects the community's dedication towards an enriching, secure, and highly functional software management ecosystem. The collaborative spirit evident in these initiatives ensures a vibrant future for NixOS, inviting all to engage, contribute, and grow together.
