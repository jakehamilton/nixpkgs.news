#!/usr/bin/env node

// NOTE: This script is intended to be run with Bun. NodeJS chokes on several things
// in this file:
// - littlelog not using `.mjs` while relying on ESM
// - __dirname not being defined since it is unsupported with ESM
// - top level await

import fs from "fs/promises";
import path from "path";

import dotenv from "dotenv";
import { convert } from "html-to-text";
import { Octokit } from "@octokit/rest";
import littlelog from "@littlethings/log";

const log = littlelog.child("update-news");

log.info("Updating news");

log.trace("Loading environment variables");

const { parsed: env } = dotenv.config({
	path: path.resolve(__dirname, "../.env"),
	override: true,
});

if (!env.OPENAI_API_KEY) {
	log.fatal("OpenAI API key is missing");
	process.exit(1);
}

if (!env.GITHUB_TOKEN) {
	log.fatal("GitHub token is missing");
	process.exit(1);
}

const octokit = new Octokit({
	auth: env.GITHUB_TOKEN,
});

const ROOT_DIRECTORY = path.resolve(__dirname, "../");

const DISCOURSE_URL = "https://discourse.nixos.org";
const DISCOURSE_ANNOUNCEMENTS_CATEGORY_NAME = "announcements";
const DISCOURSE_ANNOUNCEMENTS_CATEGORY_ID = 8;

const GITHUB_ORG = "nixos";
const GITHUB_REPO = "nixpkgs";

const PULL_REQUEST_DELIMITER = "## Things done";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A function that returns a date object for Sunday at 00:00 for the current week.
const getWeekStart = () => {
	let date = new Date();

	if (date.getDay() === 0) {
		date = new Date(Date.now() - 1_000 * 60 * 60 * 24 * 7);
	}

	date.setDate(date.getDate() - date.getDay());

	return date;
};

const WEEK_START = getWeekStart();

const getDiscourseAnnouncements = async () => {
	log.info("Fetching announcements");
	const response = await fetch(
		`${DISCOURSE_URL}/c/${DISCOURSE_ANNOUNCEMENTS_CATEGORY_NAME}/${DISCOURSE_ANNOUNCEMENTS_CATEGORY_ID}.json`,
	);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch announcements. Status: ${response.status}`,
		);
	}

	const json = await response.json();

	return json.topic_list.topics.filter((topic) => {
		return Date.parse(topic.created_at) > WEEK_START;
	});
};

const getDiscourseAnnouncementPost = async (announcement) => {
	log.info(`Fetching post for announcement ${announcement.title.trim()}`);
	const response = await fetch(`${DISCOURSE_URL}/t/${announcement.id}.json`);
	if (!response.ok) {
		throw new Error(`Failed to fetch announcement. Status: ${response.status}`);
	}

	const json = await response.json();
	return json.post_stream.posts[0];
};

const getGitHubClosedPullRequests = async () => {
	let results = [];

	let page = 1;
	while (true) {
		log.info("Fetching pull requests", { results: results.length, page });
		const response = await octokit.rest.pulls.list({
			owner: GITHUB_ORG,
			repo: GITHUB_REPO,
			state: "closed",
			sort: "updated",
			direction: "desc",
			per_page: 50,
			page: page++,
		});

		results = results.concat(response.data);

		// await sleep(1_000);

		const last = response.data[response.data.length - 1];

		if (
			// results.length > 200 ||
			!last ||
			// !last.merged_at ||
			Date.parse(last.merged_at) < WEEK_START
		) {
			break;
		}
	}

	const merged = results.filter(
		(pr) => pr.merged_at && Date.parse(pr.merged_at) > WEEK_START,
	);

	return Promise.all(
		merged.map(async (pull) => {
			log.info("Summarizing pull request", { title: pull.title.trim() });

			return {
				...pull,
				// Pull requests to NixPkgs contain a section with a checklist for handling
				// review. This section isn't useful for our purposes so we remove it along
				// with any html comments contained in the body.
				title: pull.title.trim(),
				body: pull.body
					.split(PULL_REQUEST_DELIMITER)[0]
					.replace(/<\!--.*?-->/g, "")
					.trim(),
			};
		}),
	);
};

const announcements = await getDiscourseAnnouncements();

const announcementsWithPosts = await Promise.all(
	announcements.map(async (announcement) => {
		const post = await getDiscourseAnnouncementPost(announcement);

		log.info("Summarizing post", { title: announcement.title.trim() });

		return {
			...announcement,
			post: {
				...post,
				body: convert(post.cooked),
			},
			link: `${DISCOURSE_URL}/t/${announcement.slug}/${announcement.id}`,
		};
	}),
);

let pulls = await getGitHubClosedPullRequests();

pulls = pulls.sort((a, b) => {
	if (a.user.login === "r-ryantm") {
		if (b.user.login === "r-ryantm") {
			return 0;
		}

		return 1;
	}

	if (b.user.login === "r-ryantm") {
		return -1;
	}

	return 0;
});

log.info({ pulls: pulls.length, announcements: announcements.length });

const contents = `
# Announcements

${announcementsWithPosts
		.map((announcement) =>
			`
<details>
	<summary>
		&lt;${announcement.post.username}&gt; ${announcement.title.trim()}
	</summary>

[${announcement.link}](${announcement.link})

${announcement.post.body}
</details>
			`.trim(),
		)
		.join("\n\n")}



# Pull Requests

${pulls
		.map((pull) =>
			`
<details>
	<summary>
			&lt;${pull.user.login}&gt; ${pull.title.trim()}
	</summary>

[${pull.user.login}](https://github.com/${pull.user.login}): [Pull Request](${pull.html_url
				})

\[${pull.user.login}\](https://github.com/${pull.user.login
				}): \[Pull Request\](${pull.html_url})

${pull.body}

</details>
	`.trim(),
		)
		.join("\n\n")}
`;

await fs.writeFile(path.resolve(ROOT_DIRECTORY, `updates.md`), contents);
