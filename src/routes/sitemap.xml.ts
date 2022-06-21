import { format } from 'date-fns';

import { getDbCollections } from '$lib/utils/api';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';

export async function get() {
  const { basics } = await getDbCollections();

  // -----------------------------------
  // Beverage lists pages

	const total: number = await basics.count();
  const pagesCount = Math.ceil(total / BEVERAGES_ON_PAGE);
  const beverageListArray = new Array(pagesCount).fill('').map((_, index) => index + 1).slice(1);
  const lastAddedBeverage = await basics.findOne({}, { sort: { _id: -1 }});

  const beverageListsPages = `
    <url>
      <loc>https://hop.land</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    ${ beverageListArray.map(page => `
      <url>
        <loc>https://hop.land/list/${page}</loc>
        <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
      </url>
    `)}
  `;

  // -----------------------------------
  // Beverage details pages

  const beverageDetailsArray = await basics.find({}, {
    projection: {
      _id: 0,
      added: 1,
      badge: 1,
      'brand.badge': 1,
      shortId: 1
    }
  }).toArray();

  const beverageDetailsPages = beverageDetailsArray.map(({ added, badge, brand, shortId }) => `
    <url>
      <loc>https://hop.land/details/${shortId}/${brand.badge}/${badge}</loc>
      <lastmod>${format(new Date(added), 'yyyy-MM-dd')}</lastmod>
    </url>
  `);

  // -----------------------------------
  // Static pages

  const staticPages = `
    <url>
      <loc>https://hop.land/about</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    <url>
      <loc>https://hop.land/stats</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    <url>
      <loc>https://hop.land/stats/styles</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    <url>
      <loc>https://hop.land/stats/ingredients/water</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    <url>
      <loc>https://hop.land/stats/ingredients/malt</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    <url>
      <loc>https://hop.land/stats/ingredients/hop</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    <url>
      <loc>https://hop.land/stats/ingredients/yeast</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    <url>
      <loc>https://hop.land/stats/ingredients/addition</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
  `;

  return {
    headers: {
      'Content-Type': 'application/xml'
    },
    body: `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${beverageListsPages}
        ${beverageDetailsPages}
        ${staticPages}
      </urlset>
    `.trim()
  };
}
