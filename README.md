# Land of Hop

Beer catalogue with beverages I have drunk last few years. This is my playground to test some technologies and, above all, a place where I can prove that it is possible to build quite big application which is highly performant, scalable, has good accessibility etc. More about my motivation and development timeline you will find in the [CHANGELOG](CHANGELOG.md).

## Stack overview

I believe that scalable applications should be as simple as possible. In other words they should stick to the most basic technologies: HTML, CSS, JavaScript. Of course to build larger applications we need help with some dependencies. I believe we should use them carefully and they also should stay close to the basics.

In the Land of Hop I use Svelte and SvelteKit. They are easy, scalable, well documented, close to basics. I use them as a full-stack framework, I mean SvelteKit provides Server Side Rendering, Single Page Application and a middleware connecting the app with database. In the middleware, I mean using SvelteKit Endpoints, I also set authentication. So, this is a full back-end and front-end application, no additional service is needed. I mean I use some other helpers services, but none of them is essential.

The database is MongoDB which stands on paid plan on MongoDB Atlas. I do not use ORM like Prisma or any other tool to modeling the database like Mongoose. It is pure MongoDB. To make the requests and responses shapes reliable I use TypeScript. It is a very simple solution, maybe not the safest, but for now it fulfills my needs. I believe we should always start from simple solutions. There will always be time for making things complex.

There is also a kind of database for images: AWS S3. I connect the app with it through Amazon CloudFront.

Static texts do not come from any database, I use `svelte-intl` powered with JSON files (they live in `src/lib/utils/dictionary/` folder).

I use pure CSS with CSS variables. PostCSS is needed only for media-queries variables. I use just one utility library, `lodash-es`. Besides that all other dependencies are used to a limited extent, like `d3` for charts on statistics pages. Most of them are used only in the admin pages (dashboard) to generate slugs (`slugify`, `nanoid`), authenticate (`jsonwebtoken`), save an images (`potrace`, `sharp`, `svgo`, `buffer-image-size`), validate form fields (`yup`), transform dates (`date-fns`) or get data from other services (web scraping with `puppeteer`). I hope that with such simple tools the application is truly scalable.

## Workspace configuration

I work on Node 16. Install dependencies by:

```bash
npm install
```

To run the project locally you will need an `.env` file with at least one variable: `VITE_MONGODB_URI`. These are credentials to connect SvelteKit Endpoints with MongoDB Atlas. It is top secret. `VITE_JWT_SECRET` is a salt for JSON Web Tokens (for authentication only) and `VITE_GCP_KEY` is Google Key for auto-translations in the admin, dashboard pages.

```bash
VITE_JWT_SECRET = example
VITE_MONGODB_URI = mongodb+srv://<user>:<password>@landofhop.sample.mongodb.net/db
VITE_GCP_KEY = example
```

If you have at least the one environmental variable, you can init a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab

npm run dev -- --open
```

## Folder structure

Let's start from the root folder:

```
.
├── 📁 .vscode
├── 📁 src
├── 📁 static
├── .env.sample
├── .eslintrc.cjs
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── CHANGELOG.md
├── README.md
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── svelte.config.js
└── tsconfig.json
```

We can see here mostly configuration files for ESLint, Prettier, PostCSS, SvelteKit and TypeScript. Nothing fancy, everything is set as simple as possible. SvelteKit is setup with `@sveltejs/adapter-node`. `.vscode` folder contains settings for my local Visual Studio Code, you can ignore it. `static` folder contains static files for the application: favicons, fonts, `robots.txt` and `manifest.json` files. Again, standards. The fun starts in `src` folder:

```
📁 src
├── 📁 lib
├── 📁 routes
├── app.d.ts
├── app.html
└── hooks.ts
```

`app.d.ts` is global TypeScript file where I define types for `locals` and `session` properties. `locals` has `authenticated` as `true` or `false`, `session` quite the same, but instead `authenticated` it is `isLoggedIn`. We will get to there. `app.html` is standard root SvelteKit HTML file. I did not change it. `hooks.ts` is the first file I wrote. I do two things inside it:

- set up code minification for production build,
- check for authentication cookies (with JWT), if they exist I validate them, pass to `getSession` and pass further as `isLoggedIn`

`app.d.ts` is now more understandable, isn't it? `routes` is folder with all routes and `lib` contains everything else, most of the code: components, utils etc. Let's start from `routes` though.

```
📁 routes
├── 📁 api
├── 📁 dashboard
├── 📁 details/[shortId]/[brand]
├── 📁 list
├── 📁 stats
├── __error.svelte
├── __layout.svelte
├── about.svelte
├── advanced-search.svelte
├── index.svelte
└── sitemap.xml.ts
```

`__error.svelte` is a basic SvelteKit 404 page. `__layout.svelte` is a layout, wrapper for all pages where I check authentication status, load some global translations, set favicons in metatags, render `Topbar` and wrap content inside `Main` component. The `Topbar` lives in `src/lib/components/Topbar/` and it is divided into three parts: `Header`, `Navigation` and `Login`.

![enter image description here](https://i.ibb.co/W0nVnbx/topbar.jpg)

Inside `Topbar` -> `Header` we also have `Searchbar`.

![enter image description here](https://i.ibb.co/LRG12kv/searchbar.jpg)

The search input here just passes the search parameter to the URL by `window.history.pushState()`. The place where we listen for search parameter change is `Main`. When we are in search mode, we can see `SearchResults`, otherwise it is regular content (`<slot />`). `Main` also wraps HTML in the `<main>` tag which has defined global styling.

We have here `sitemap.xml.ts` which is site for bots with sitemap: https://hop.land/sitemap.xml. We have all public pages:

- `index.svelte` - main page with last 60 beverages (https://hop.land)
- `list/[order].svelte` - continuation of main page with beverage listing (https://hop.land/list/2 etc.)
- `details/[shortId]/[brand]/[badge].svelte` - with beverage details (e.g. https://hop.land/details/54ffw5/trzech-kumpli/pan-ipani)
- `about.svelte` - about page
- `advanced-search.svelte` - advanced search page
- `stats` - all pages related to statistics (e.g. https://hop.land/stats/ingredients/yeast)

Finally we have `api` folder with SvelteKit Endpoints and `dashboard` with admin pages.

The `api` is pretty essential. There are endpoints connecting the database with the front-end application. On public pages I use this endpoints in files in the `routes` folder inside `<script context="module">`, e.g. in the `index.svelte` I request for - through `apiCall()` utility method - `beverageTotal` and `beverageBasics`. I pass this data to the front-end. Beverage basics data are necessary to render links and images of the first 60 beverages. Beverage total, so count of all beverages in the database, is necessary to render pagination. In some cases, for example in `advanced-search.svelte` or some dashboard pages, I do not call for data inside `<script context="module">`. I do it on the front-end side only. Inside the `api` directory there is an `admin` folder. There are endpoints for admin purposes. Inside the `api` directory there is an `admin` folder. There are endpoints for admin purposes, for example to create new beverages in the database or to update an ingredient data. To use them, you need to be logged in.

There are only three pages inside the dashboard so far: add new beverage, update beverage and update beverage photos. Add new beverage looks like:

![](https://i.ibb.co/YpWQK57/Screenshot-2022-07-10-at-15-42-46.png)

It is quite a big form to fulfill data about a beer. I add and update data about brands, ingredients or places by additional pop up forms. There is also a `__layout.svelte` file where I check if a user is authenticated, if not I redirect to the main page.

🚧 WIP 🚧

## Live preview

I develop the application only by myself, so all changes I add to `develop` branch. When a release is ready, I rebase to `main` branch, and it is production deployed to [hop.land](https://hop.land).
