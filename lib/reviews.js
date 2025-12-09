import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReview(slug) {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content);
  return { slug, title, date, image, body };
}

export async function getReviews() {
  // const files = await readdir("./content/reviews");
  // const slugs = files
  //   .filter((file) => file.endsWith(".md"))
  //   .map((file) => file.slice(0, -".md".length));

  // const slugs = await getSlugs();
  // const reviews = [];
  // for (const slug of slugs) {
  //   const review = await getReview(slug)
  //   reviews.push(review);
  // }
  // reviews.sort((a,b) => a.date.localeCompare(b.date));
  // return reviews;

  const url = CMS_URL +  "/api/reviews?" +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        sort: ["publishedAt:desc"],
        //pagination: { pageSize: 1 }
      },
      { encodeValuesOnly: true }
    );
  //console.log(url);
  const response = await fetch(url);
  const body = await response.json();
  //console.log('[getReviews]', body)
  const { data } = await body;

  console.log("[getReviews 1]", data);

  const dataMap = data.map((item) => {
    return {
      body: item.body,
      image: CMS_URL + item.image[0].url,
      slug: item.slug,
      subtitle: item.subtitle,
      title: item.title,
    };
  });
  console.log("[getReviews 2]", dataMap);

  return dataMap;
}

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}
