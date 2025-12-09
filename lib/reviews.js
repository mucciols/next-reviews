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
  // const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  // const {
  //   content,
  //   data: { title, date, image },
  // } = matter(text);
  // const body = marked(content);
  // return { slug, title, date, image, body };

  const url =
    CMS_URL +
    "/api/reviews?" +
    qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 1, withCount: false },
      },
      { encodeValuesOnly: true }
    );
  const response = await fetch(url);
  const body = await response.json();
  const { data } = await body;
  console.log('[getReview 1] data  ', data[0])

  const toRet = {
      body: data[0].body,
      image: CMS_URL + data[0].image[0].url,
      slug: data[0].slug,
      subtitle: data[0].subtitle,
      title: data[0].title,
    }

  console.log('[getReview 2] toRet', toRet)

  return toRet;

  // const dataMap = data.map((item) => {
  //   return {
  //     body: item.body,
  //     image: CMS_URL + item.image[0].url,
  //     slug: item.slug,
  //     subtitle: item.subtitle,
  //     title: item.title,
  //   };
  // });

  // console.log('[getReviews 2]', dataMap)
  // return dataMap;
}

export async function getReviews() {
  const url =
    CMS_URL +
    "/api/reviews?" +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        sort: ["publishedAt:desc"],
        //pagination: { pageSize: 1 }
      },
      { encodeValuesOnly: true }
    );
  const response = await fetch(url);
  const body = await response.json();
  const { data } = await body;
  const dataMap = data.map((item) => {
    return {
      body: item.body,
      image: CMS_URL + item.image[0].url,
      slug: item.slug,
      subtitle: item.subtitle,
      title: item.title,
    };
  });

  //console.log('[getReviews]', dataMap)
  return dataMap;
}

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}
