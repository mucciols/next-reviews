
import qs from 'qs'

const url = "http://localhost:1337/api/reviews/" 
   +  "?" + qs.stringify({
  //filters: { id: { $eq: 9 } },
  filters: { slug: { $eq: 'Stardew-Valley' } },
  fields:['slug', 'title', 'subtitle', 'publishedAt'],
  populate: { image:{ fields:['url'] } },
  pagination: { pageSize: 1, withCount: false }
}, { encodeValuesOnly: true })
//console.log(url);
const response = await fetch(url);
const body = await response.json();
//console.log(body);
const file = 'scripts/strapi-response.json';
//writeFileSync(file, body, 'utf8');