# NixOS Weekly Recap

This week in the NixOS community, significant developments and announcements were made, showcasing the ongoing growth and innovation within the ecosystem. Let's dive into the highlights.

[@edolstra](https://discourse.nixos.org/t/nix-2-20-released/39027) announced the release of **Nix 2.20.0**, marking another significant milestone for the package manager. This new version brings with it a host of improvements and features, detailed in the release notes available through the announcement link. Users are encouraged to download and explore the latest version to take advantage of these enhancements.

The **Google Summer of Code 2024** is on the horizon, and [@Janik](https://discourse.nixos.org/t/call-for-mentors-google-summer-of-code-2024/39031) is calling for mentors within the Nix/Nixpkgs/NixOS community. This initiative offers an excellent opportunity for experienced members to guide newcomers through their open-source journey, contributing to the growth of the community and the individuals involved.

[@piegames](https://discourse.nixos.org/t/call-for-testing-nix-formatter/39179) has put out a **call for testing the Nix formatter**, based on RFC 166. This tool aims to standardize code formatting within the Nix community, and users are invited to test it to identify any potential issues.

The release of a **geospatial-nix flake repository** and a user-friendly Geospatial NIX Web UI was announced by [@imincik](https://discourse.nixos.org/t/geospatial-nix-flake-and-geospatial-nix-web-ui/38974). These tools provide valuable resources for those working with geospatial data, and feedback is requested to further refine these offerings.

On the continuous integration front, [@pnmadelaine](https://discourse.nixos.org/t/typhon-nix-based-continuous-integration/39281) introduced **Typhon**, a Nix-based CI system. This prototype seeks to improve upon existing solutions like Hydra, offering a more extensible and user-friendly experience. The community is encouraged to participate in beta testing and provide feedback.

Virtual machine management gets a boost with **NixVirt**, announced by [@AshleyYakeley](https://discourse.nixos.org/t/nixvirt-manage-virtual-machines/39305). This tool leverages NixOS and Home Manager to simplify the definition and management of virtual machines and networks, utilizing libvirt's capabilities.

For those curious about the contents of their Nix store, [@jakehamilton](https://discourse.nixos.org/t/whats-in-my-store-match-your-nix-store-to-packages-from-nixpkgs/39232) shared **whats-in-my-store**, a tool by snowfallorg. This utility helps users identify which packages from NixPkgs are present in their system's Nix Store, offering insight into the ecosystem of installed software.

Lastly, an important notice about **upcoming garbage collection for cache.nixos.org** was shared by [@zimbatm](https://discourse.nixos.org/t/upcoming-garbage-collection-for-cache-nixos-org/39078). Scheduled for the end of February, this process aims to optimize the repository's performance and reduce costs. Users may need to rebuild ancient store paths, but this effort will overall benefit the community by ensuring the cache's sustainability.

These announcements reflect the vibrant and diverse activities within the NixOS community, from tool development and ecosystem improvements to efforts aimed at education and collaboration. As the community continues to grow and evolve, these innovations and initiatives pave the way for a brighter future for NixOS, its users, and contributors.

This week in the NixOS community and nixpkgs repository, a significant number of updates and new package introductions were successfully merged, showing the continuous effort and contribution from the NixOS community members to keep the ecosystem strong and secure.

One notable update comes from @mweinelt, who brought security updates to Django across multiple versions via two separate pull requests ([#286769](https://github.com/NixOS/nixpkgs/pull/286769) & [#286768](https://github.com/NixOS/nixpkgs/pull/286768)). The updates, brought to Django 3.2, 4.2, and the newly minted 5.0 versions, address a security vulnerability identified as CVE-2024-24680, ensuring applications built with Django on NixOS are safeguarded against this potential threat.

The tooling around infrastructure as code (IaC) was also expanded thanks to @aanderse, who initiated the `terraform-providers.slack` package at version 1.2.2 ([#286819](https://github.com/NixOS/nixpkgs/pull/286819)). Though details were sparse, the update clearly signifies the NixOS community's interest in broadening its DevOps tooling repertoire.

Gamers within the community have a reason to cheer as well. @OPNA2608's successful merge of `celeste64` includes ARM platform support enhancement and dependency optimization, potentially improving the gaming experience for users on diverse architectures.

In terms of development utilities, several introductions and updates were noted. The SEGGER J-Link, nRF Connect, and nRF Command-Line Tools packages saw reintroductions and updates through a single pull request by @StarGate01 ([#255185](https://github.com/NixOS/nixpkgs/pull/255185)), addressing the needs of developers working with nRF and other embedded systems.

For those concerned with web security, @bobby285271 updated `webkitgtk` to version 2.42.5 ([#286612](https://github.com/NixOS/nixpkgs/pull/286612)), addressing three CVEs and ensuring improved web browsing security for applications depending on this crucial web rendering engine.

Further polishing the NixOS tools and libraries, @nessdoor introduced LDAP database support for MIT Kerberos ([#286043](https://github.com/NixOS/nixpkgs/pull/286043)), expanding the authentication system's capabilities within the Nix ecosystem. This change, though shipped with the LDAP flag off by default, invites future exploration and utilization in broader scenarios.

Lastly, the community's dedication to maintaining an up-to-date software landscape was evident with updates such as `rqlite` to version 8.19.0 ([#286529](https://github.com/NixOS/nixpkgs/pull/286529)) and the `rclip` package to version 1.7.24 ([#281048](https://github.com/NixOS/nixpkgs/pull/281048)), showcasing the continuous effort to keep the NixOS ecosystem and its applications secure, efficient, and at the technological forefront.

Each of these contributions, from updates to package introductions, reflects the vibrant activity within the NixOS community. Their combined effect is to ensure that users and developers have access to safe, efficient, and cutting-edge software, reinforcing the Nix ecosystem's position as a vital part of the larger open-source community.