import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitize from "sanitize-html";
import Markdown from "markdown-it";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

const parser = new Markdown();

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/archive/${post.slug}/`,
      content: sanitize(parser.render(post.body)),
    })),
  });
}
