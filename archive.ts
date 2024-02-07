/*
// The following is the original hacky version tested using Replit ModelFarm
// to implement the AI portion of things.
import { Octokit } from "@octokit/core";
import * as ai from "@replit/ai-modelfarm";

const octokit = new Octokit();

const response = await octokit.request("GET /repos/nixos/nixpkgs/pulls", {
  per_page: 20,
  state: "merged",
});

const isUsefulPR = async (pull) => {
  const response = await ai.complete({
    model: "text-bison",
    temperature: 0.1,
    maxOutputTokens: 50,
    prompt: `Determine whether the following pull request is useful to the NixOS commumity. A pull request is useful if it fixes a critical security vulnerability, adds a popular package, removes a popular package, or makes a breaking change. Backports and minor fixes are not useful. Respond only with "yes" if the pull request is useful, and "no" if it is not useful. Be strict in your assessment of usefulness, only genuinely useful pull requests should be allowed to keep the quality high.

  \`\`\`
  ${pull.title}
  
  ${pull.body}
  \`\`\`

  Response: `,
  });

  return response.ok && response.value.completion.trim() === "yes";
};

const getPRHeadline = async (pull) => {
  const response = await ai.complete({
    model: "text-bison",
    temperature: 0.8,
    maxOutputTokens: 50,
    prompt: `Write a headline for a news article about the following pull request. The headline should provide context for the change and why it is useful. Do not include issue numbers or links. Do not mention "thumbs up pull requests". Assume the reader already knows that the article is referring to a NixPkgs pull request. Also include a tag explaining why the pull request is useful for the NixOS community; available tags are: "security", "package", "breaking change", "package removal", "package add", "package upgrade". Respond with plain text in the format "title - tag". For example ("OpenSSL critical vulnerability fix - security").

  \`\`\`
  ${pull.body}
  \`\`\`

  Headline: `,
  });

  if (response.ok) {
    return response.value.completion;
  }

  return null;
};

const getAnnouncementHeadline = async (announcement) => {
  const response = await ai.complete({
    model: "text-bison",
    temperature: 0.8,
    maxOutputTokens: 50,
    prompt: `Write a headline for a news article about the following post. The headline should provide context for the change and why it is useful. Do not include issue numbers or links. The headline should provide enough context for a reader to understand what the article is about. Do not sensationalize the headline. Provide useful context as a part of the headline.

\`\`\`
${announcement.title}

${announcement.body}
\`\`\`

Headline: `,
  });

  if (response.ok) {
    return response.value.completion;
  }

  return null;
};

const forumBaseUrl = "https://discourse.nixos.org";
const categoryName = "announcements";
const categoryId = 8;

async function getAnnoucements() {
  try {
    const response = await fetch(`${forumBaseUrl}/c/announcements/8.json`);
    if (!response.ok) {
      throw new Error(
        `HTTP error fetching tag data! status: ${response.status}`,
      );
    }
    const json = await response.json();
    return json.topic_list.topics.slice(1, 11);
  } catch (e) {
    console.error("Error fetching tagged posts from Discourse forum:", e);
  }
}

const announcements = await getAnnoucements();

const news = [];

for (const pull of response.data) {
  if (!(await isUsefulPR(pull))) {
    continue;
  }

  const headline = await getPRHeadline(pull);

  if (headline) {
    console.log(headline);
    news.push(headline);
  }
}

for (const announcement of announcements) {
  const response = await fetch(
    `${forumBaseUrl}/t/${announcement.id}/posts.json`,
  );

  const posts = await response.json();

  const post = posts.post_stream.posts[0];

  const headline = await getAnnouncementHeadline({
    title: announcement.title,
    body: post.cooked,
  });

  if (headline) {
    console.log(headline);
    news.push(headline);
  }
}

const output = await ai.complete({
  model: "text-bison",
  temperature: 0.2,
  maxOutputTokens: 500,
  prompt: `Sort the following headlines for NixOS articles based on their usefulness to the NixOS community. Extreme security vulnerabilities, major package upgrades, and new project announcements are typically the most useful. Only output headlines, do not use formatting, markdown, or a list.

${news.map((item) => "- " + item).join("\n")}}
  
Sorted:

`,
});

if (output.ok) {
  console.log("Results:\n\n");
  console.log(
    output.value.completion
      .trim()
      .split("\n")
      .map((item, i) => i + 1 + ". " + item.trim())
      .join("\n"),
  );
}
*/
