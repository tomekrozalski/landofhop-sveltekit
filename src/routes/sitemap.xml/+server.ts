import { format } from 'date-fns';
import type { RequestHandler } from '@sveltejs/kit';
import { basics } from '$db/mongo';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import type { RawBasics } from '$types/RawBasics';

export const GET: RequestHandler = async function ({ setHeaders }) {
	// -----------------------------------
	// Beverage lists pages

	const total: number = await basics.countDocuments();
	const pagesCount = Math.ceil(total / BEVERAGES_ON_PAGE);
	const beverageListArray = new Array(pagesCount)
		.fill('')
		.map((_, index) => index + 1)
		.slice(1);
	const lastAddedBeverage = (await basics.findOne({}, { sort: { _id: -1 } })) as RawBasics;

	const beverageListsPages = `
    <url>
      <loc>https://hop.land</loc>
      <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
    </url>
    ${beverageListArray.map(
			(page) => `
      <url>
        <loc>https://hop.land/list/${page}</loc>
        <lastmod>${format(new Date(lastAddedBeverage.added), 'yyyy-MM-dd')}</lastmod>
      </url>
    `
		)}
  `;

	// -----------------------------------
	// Beverage details pages

	const beverageDetailsArray = await basics
		.find(
			{},
			{
				projection: {
					_id: 0,
					added: 1,
					badge: 1,
					'brand.badge': 1,
					shortId: 1
				}
			}
		)
		.toArray();

	const beverageDetailsPages = beverageDetailsArray.map(
		({ added, badge, brand, shortId }) => `
    <url>
      <loc>https://hop.land/details/${shortId}/${brand.badge}/${badge}</loc>
      <lastmod>${format(new Date(added), 'yyyy-MM-dd')}</lastmod>
    </url>
  `
	);

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

	setHeaders({
		'Content-Type': 'application/xml'
	});

	return new Response(
		`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${beverageListsPages}
        ${beverageDetailsPages}
        ${staticPages}
      </urlset>
    `.trim()
	);
};
