import 'server-only';
import qs from "qs";
export const CACHE_TAGS_REVIEW = "reviews";

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

  if (data.length === 0) {
    return null;
  }

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

export async function getReviews(pageSize, page) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt", "date"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  });

  //console.log('[getReviews ]', pageSize , data)

  const dataObj = {
    pageCount: meta.pagination.pageCount,
    reviews: data.map((item) => ({
      body: item.body,
      image: CMS_URL + item.image[0].url,
      slug: item.slug,
      subtitle: item.subtitle,
      title: item.title,
      date: item.date,
    })),
  };
  return dataObj;
}

export async function searchReviews(query) {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });

  //console.log('[getSearchableReviews]', data);
  
  //return data.map((item) => item.slug);
  return data.map(( attributes ) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });

  return data.map((item) => item.slug);
}

async function fetchReviews(parameters) {
  const url =
    CMS_URL +
    "/api/reviews?" +
    qs.stringify(parameters, { encodeValuesOnly: true });
  // console.log("[fetchReviews 1]: ", url);
  const response = await fetch(url, {
    //cache: 'no-store'
    //revalidate: 30 // 30 seconds
    next: {
      tags: [CACHE_TAGS_REVIEW],
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned: ${response.status} fos ${url}`);
  }
  const body = await response.json();
  //console.log("[fetchReviews 2]: ", body);
  return body;
}

function toReview(item) {}
