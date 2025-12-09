import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";
import { it } from "node:test";

const CMS_URL = "http://localhost:1337";

// export async function getFeaturedReview() {
//   const reviews = await getReviews();
//   return reviews[0];
// }

export async function getReview(slug) {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body", "date"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });

  // console.log("[getReview]", data);

  const toRet = {
    body: data[0].body,
    image: CMS_URL + data[0].image[0].url,
    slug: data[0].slug,
    subtitle: data[0].subtitle,
    date: data[0].date,
    title: data[0].title,
  };

  return toRet;
}

export async function getReviews(pageSize) {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt", "date"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: pageSize }
  });

  console.log('[getReviews ]', pageSize , data)

  const dataMap = data.map((item) => {
    return {
      body: item.body,
      image: CMS_URL + item.image[0].url,
      slug: item.slug,
      subtitle: item.subtitle,
      title: item.title,
      date: item.date
    };
  });
  return dataMap;
}

export async function getSlugs() {
  // const files = await readdir("./content/reviews");
  // return files
  //   .filter((file) => file.endsWith(".md"))
  //   .map((file) => file.slice(0, -".md".length));

  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 }
  });

  return data.map((item)=> item.slug);
}

async function fetchReviews(parameters) {
  const url =
    CMS_URL +
    "/api/reviews?" +
    qs.stringify(parameters, { encodeValuesOnly: true });
  // console.log("[fetchReviews 1]: ", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CMS returned: ${response.status} fos ${url}`);
  }
  const body = await response.json();
  //console.log("[fetchReviews 2]: ", body);
  return body;
}

function toReview(item) {}
