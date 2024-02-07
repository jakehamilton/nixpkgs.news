# NixOS Weekly Recap

Welcome to this week's round-up of announcements and activities within the NixOS community and the NixPkgs package repository. Our community has seen a flurry of innovation and collaborative efforts, ranging from enhancing security measures to streamlining virtual machine management. Let’s dive into the key highlights.

Starting with an exciting call to action, Janik announced the [Call for mentors: Google Summer of Code 2024](https://discourse.nixos.org/t/call-for-mentors-google-summer-of-code-2024/39031), aimed at enriching the open-source newcomer's experience through the guidance of seasoned community members. This initiative marks a brilliant opportunity for mentorship and knowledge sharing within our community.

On the innovation front, AshleyYakeley introduced [NixVirt: manage virtual machines](https://discourse.nixos.org/t/nixvirt-manage-virtual-machines/39305), a tool poised to revolutionize the way we define virtual machines and networks using libvirt, directly from NixOS and Home Manager configurations. This development aims to simplify virtual machine management within our ecosystem significantly.

In the realm of continuous integration, pnmadelaine unveiled [Typhon: Nix-based continuous integration](https://discourse.nixos.org/t/typhon-nix-based-continuous-integration/39281), a prototype that seeks to alleviate some of the frustrations with existing systems by offering a more adaptable and fully declarative solution. The community is encouraged to dive in and provide feedback on this promising project.

A new tool that stands to save significant evaluation time, [Whats-in-my-store: Match your Nix Store to packages from NixPkgs](https://discourse.nixos.org/t/whats-in-my-store-match-your-nix-store-to-packages-from-nixpkgs/39232) by jakehamilton, was also introduced. This tool aims to help users match their Nix Store contents to packages from NixPkgs, representing a step forward in package management and user insights.

Piegames called upon the community for input on the [Call for testing: Nix formatter](https://discourse.nixos.org/t/call-for-testing-nix-formatter/39179), a tool aimed at enhancing code consistency across Nix files. Early adopters are urged to run extensive tests to help refine this essential tool.

We also saw the release of [Nix 2.20](https://discourse.nixos.org/t/nix-2-20-released/39027) shared by edolstra, bringing a host of improvements to the Nix package manager. Concurrently, zimbatm announced an [Upcoming Garbage Collection for cache.nixos.org](https://discourse.nixos.org/t/upcoming-garbage-collection-for-cache-nixos-org/39078), aimed at optimizing storage and reducing costs. Community feedback on data worth preserving is welcomed.

Other noteworthy contributions include flandweber's [Git-verify: in-band commit verification](https://discourse.nixos.org/t/git-verify-in-band-commit-verification/38991) discussion, and imincik's announcement of the [Geospatial NIX flake and Geospatial NIX Web UI](https://discourse.nixos.org/t/geospatial-nix-flake-and-geospatial-nix-web-ui/38974), offering updated geospatial packages and user-friendly capabilities to the community.

### NixOS Weekly Pull Requests

The Python ecosystem within NixOS saw a significant addition with [python3Packages.qemu: init at 0.6.1.0a1](https://github.com/NixOS/nixpkgs/pull/285760), broadening the utility of QEMU within Python environments.

Gamers have a lot to look forward to with the update of RetroArch to version 1.17.0, reflected in [retroarch: 1.16.0.3 -> 1.17.0; libretro: update cores](https://github.com/NixOS/nixpkgs/pull/286312), promising a richer gaming experience on NixOS.

Database enthusiasts will welcome the automatic update of Neo4j to version 5.16.0, a testament to the community's dedication to maintaining up-to-date and reliable packages.

Other highlights include the introduction of a powerful disk usage analyzer, pdu, in [parallel-disk-usage (pdu): init at 0.9.0](https://github.com/NixOS/nixpkgs/pull/280371), and an update to the documentation tool, nix-doc, to version 0.6.5, ensuring users have access to the latest information on [nix-doc: 0.6.4 -> 0.6.5](https://github.com/NixOS/nixpkgs/pull/286218).

This week has showcased our community's relentless drive to innovate, collaborate, and improve, underscored by a diverse range of updates and new developments. Stay tuned for more updates as we continue to shape the future of NixOS together.
