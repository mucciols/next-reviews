import { log } from "node:console";
import { writeFileSync } from "node:fs"
import qs from 'qs'

const url = "http://localhost:1337/api/reviews" + "?" + qs.stringify({
  fields:['slug', 'title', 'subtitle', 'publishedAt'],
  populate: { image:{ fields:['url'] } },
  sort:['publishedAt:desc'],
  //pagination: { pageSize: 1 }
}, { encodeValuesOnly: true })
console.log(url);
const response = await fetch(url);
const body = await response.json();
console.log(body);
const file = 'scripts/strapi-response.json';
//writeFileSync(file, body, 'utf8');