#!/usr/bin/env node

// NOTE: This script is intended to be run with Bun. NodeJS chokes on several things
// in this file:
// - littlelog not using `.mjs` while relying on ESM
// - __dirname not being defined since it is unsupported with ESM
// - top level await

import fs from "fs/promises";
import path from "path";

import dotenv from "dotenv";
import OpenAI from "openai";
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
const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const BLOG_CONTENT_DIRECTORY = path.resolve(__dirname, "../src/content/blog");

const OPENAI_MODEL = "gpt-4-turbo-preview";

const DISCOURSE_URL = "https://discourse.nixos.org";
const DISCOURSE_ANNOUNCEMENTS_CATEGORY_NAME = "announcements";
const DISCOURSE_ANNOUNCEMENTS_CATEGORY_ID = 8;

const GITHUB_ORG = "nixos";
const GITHUB_REPO = "nixpkgs";

const PULL_REQUEST_DELIMITER =
	"## Things done\r\n\r\n<!-- Please check what applies. Note that these are not hard requirements but merely serve as information for reviewers. -->";

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

const summarize = async ({ title = null, body }) => {
	const response = await openai.chat.completions.create({
		model: OPENAI_MODEL,
		max_tokens: 1_000,
		messages: [
			title
				? {
					role: "user",
					content: `Summarize the following post in a maximum of one paragraph. Include all important information.

This post is titled:

\`\`\`
${title}
\`\`\`

The post body is:

\`\`\`
${body}
\`\`\`
`,
				}
				: {
					role: "user",
					content: `Summarize the following text:

${body}`,
				},
		],
	});

	if (response.choices.length === 0) {
		throw new Error("No response from OpenAI");
	}

	return response.choices[0].message.content.trim();
};

const recapAnnouncements = async (announcements) => {
	const response = await openai.chat.completions.create({
		model: OPENAI_MODEL,
		max_tokens: 4_000,
		messages: [
			{
				role: "user",
				content: `Write the body of a news article for the Nix community about the following posts. Only talk about the posts mentioned and do NOT write an introduction or conclusion. This article is a weekly recap of the announcements and activity in the Nix community and on the NixPkgs package repository. All pull requests mentioned have been successfully merged. Ensure that the article is interesting to read and useful as if it were a newspaper for the Nix ecosystem. Do NOT output HTML. ONLY output Markdown text. You MUST include the link and name for each announcement post. Do NOT create markdown titles. Do NOT refer to any authors using pronouns, only use their username. Every announcement MUST be addressed. You MUST include VALID links to announcements.

# Announcements

${announcements
						.map(
							(announcement) =>
								`<!-- Announcement -->
Author:
${announcement.post.username}

Link:
${announcement.link}

Title:
${announcement.title}

Body:
${announcement.post.body}
<!-- End of announcement -->`,
						)
						.join("\n\n")}
`,
			},
		],
	});

	if (response.choices.length === 0) {
		throw new Error("No response from OpenAI");
	}

	return response.choices[0].message.content.trim();
};

const recapPulls = async (pulls) => {
	const response = await openai.chat.completions.create({
		model: OPENAI_MODEL,
		max_tokens: 4_000,
		messages: [
			{
				role: "user",
				content: `Write the body of a news article for the following posts about NixPkgs. Only talk about the posts mentioned and do NOT write an introduction or conclusion. This article is a weekly recap of the announcements and activity in the Nix community and on the NixPkgs package repository. All pull requests mentioned have been successfully merged. Ensure that the article is interesting to read and useful as if it were a newspaper for the Nix ecosystem. Do NOT output HTML. ONLY output Markdown text. Every pull request title MUST be a link to the pull request. Every user name MUST be a link to that user's GitHub profile. Your output is half of the article, focusing on only pull request activity. Do NOT create markdown titles. Do NOT refer to any authors using pronouns, only use their username. You MUST include VALID links to pull requests.

# Pull Requests

${pulls
						.map(
							(pull) =>
								`<!-- Pull request -->
Author:
${pull.user.login}

Link:
${pull.html_url}

Title:
${pull.title}

Body:
${pull.body}
<!-- End of pull request -->`,
						)
						.join("\n\n")}
`,
			},
		],
	});

	if (response.choices.length === 0) {
		throw new Error("No response from OpenAI");
	}

	return response.choices[0].message.content.trim();
};

const recap = async (announcements, pulls) => {
	log.info("Recapping announcements");
	const announcementRecap = announcements
		? await recapAnnouncements(announcements)
		: "";
	console.log(announcementRecap);
	log.info("Recapping pull requests");
	const pullRecap = pulls ? await recapPulls(pulls) : "";
	console.log(pullRecap);

	log.info("Creating full article");
	const response = await openai.chat.completions.create({
		model: OPENAI_MODEL,
		max_tokens: 4_096,
		messages: [
			{
				role: "user",
				content: `Write a news article for the Nix community using the following update information. The article is a weekly recap of the announcements and activity in the Nix community. All pull request and announcement titles must be links. Do NOT output HTML. ONLY output Markdown text. The article should order announcements and pull request information in the best way for the Nix community. Order information in the article based on importance. Major changes, important bug fixes, and community events have higher priority. Remove any mentions of the user "r-ryantm". Do NOT refer to any authors using pronouns, only use their username. Do NOT write a conclusion, your only goal is to inform. Do not repeat yourself. Use correct punctuation. Maintain any existing links to announcements and pull requests. Only write paragraphs. Do NOT output any titles. Do NOT output any lists. Do NOT output any HTML. Do NOT output any Markdown titles.

Announcements Recap:
${announcementRecap.split("\n\n").join(" ").split("\n").join(" ")}

Pull Requests Recap:
${pullRecap.split("\n\n").join(" ").split("\n").join(" ")}
`,
			},
		],
	});

	if (response.choices.length === 0) {
		throw new Error("No response from OpenAI");
	}

	return response.choices[0].message.content.trim();
};

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

		for (const pull of response.data) {
			if (
				pull.title.toLowerCase().startsWith("[backport") ||
				pull.title.toLowerCase().startsWith("[staging-") ||
				// It's possible that we don't want _any_ pull requests that start with a
				// bracket, but we'll see how it goes.
				pull.title.toLowerCase().startsWith("[")
			) {
				continue;
			}

			const isUseful = await isPullUseful(pull);

			log.info("Checking pull request usefulness", {
				title: pull.title.trim(),
				isUseful,
			});

			if (isUseful) {
				results.push(pull);
			}

			await sleep(1_000);
		}

		const last = response.data[response.data.length - 1];

		if (
			results.length > 20 ||
			!last ||
			!last.merged_at ||
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
				body: await summarize({
					title: pull.title.trim(),
					body: pull.body
						.split(PULL_REQUEST_DELIMITER)[0]
						.replace(/<\!--.*?-->/g, "")
						.trim(),
				}),
			};
		}),
	);
};

const isPullUseful = async (pull) => {
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		max_tokens: 5,
		messages: [
			{
				role: "user",
				content: `Determine whether the following pull request is useful to the Nix commumity. A pull request is useful if it fixes a CRITICAL security vulnerability, provides a MAJOR version upgrade (from the semver version Major.Minor.Patch), removes a popular package, or creates (init) a new package. Respond only with "yes" if the pull request is useful, and "no" if it is not useful. Only important pull requests that are for major upgrades, security fixes, popular packages, or new packages should be allowed.

\`\`\`
${pull.title}

${pull.body}
\`\`\`
`,
			},
		],
	});

	if (response.choices.length === 0) {
		throw new Error("No response from OpenAI");
	}

	return response.choices[0].message.content.trim().toLowerCase() === "yes";
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
				body: await summarize({ body: convert(post.cooked) }),
			},
			link: `${DISCOURSE_URL}/t/${announcement.slug}/${announcement.id}`,
		};
	}),
);

const pulls = await getGitHubClosedPullRequests();

log.info({ pulls: pulls.length, announcements: announcements.length });

log.info("Creating article");
const article = await recap(announcementsWithPosts, pulls);

const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();

const date = `${year}-${month < 10 ? "0" + month : month}-${day}`;

const contents = `---
title: "Nix Weekly Recap: ${date}"
pubDate: "${date}"
description: Weekly recap of the announcements and activity in the Nix community and on the NixPkgs package repository.
---

${article
		.replace(/^(?:# )?Nix Weekly Recap/, "")
		.replaceAll("’", "`")
		.trim()}`;

await fs.writeFile(
	path.resolve(BLOG_CONTENT_DIRECTORY, `${date}.md`),
	contents,
);
