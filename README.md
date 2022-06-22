# Land of Hop, SvelteKit edition

🗓️ 22.06.2022

Version 1.0.0 of the application is officially ready 😃 I finished work with SvelteKit Endpoints. I also added pages with ingredient statistics, advanced search. Did some work on better authentication, performance and accessibility. I tried to implement some third party scripts like Google Analytics, they have a big impact on performance though, which is for me the most essential right now.

My plan for the near future is to connect the app with RateBeer and Untappd somehow. To create brewery pages. To improve statistics pages and overall to improve UI and reliability of the data.

🗓️ 17.02.2022

After small break I am back to SvelteKit world. I started to work with SvelteKit Endpoints. I realized that I do not need middleware API to connect my database with frontend. I built it using Oak / Deno and Fastify / Node servers. That is unnecessarly complex. In SvelteKit I can work with front- and the back-end side of the app very comfortable.

🗓️ 11.11.2021

I have created MVP: list of beverages, beverage details, about, simple statistics and dashboard where I can add and update beverages data and photos. It went very smoothly. I had it done previously in React, so it was just rewrite ready solutions with some minor additions, but anyway I am so impressed that it was so easy and the code is much more readable in Svelte. It is also much more performant.

Now I plan to create some pages to show statistics about beverages styles, ingredients and brands. It will take me a couple enjoyable months for sure.

🗓️ 25.07.2021

I do not love [Next](https://nextjs.org/) anymore, Svelte is the best! Simplicity in which I created first form and header animations are incredible. And the app has amazing performance so far with zero effort. I am discovering new, better world.

🗓️ 19.07.2021

My fifth attempt to build perfect beer catalogue application. I previously worked on it with [Create React App](https://create-react-app.dev/), [Gatsby](https://www.gatsbyjs.com/) and [Next](https://nextjs.org/). Each time it was better experience. Working on Next app gave me a lot of joy. React is not the perfect solution for my needs, though. I really love it, but sometimes it has some issues which tire and discourage me. I mean in general it seems **too complex** for what it is doing. All these discussions about best libraries to handle forms or animations, how to scope CSS, about folder and files structure, paying attension to add `key` property when we `map` lists etc. These issues are not something terrible, but I am looking for something what fundamentally makes developement easier. I already worked with Svelte and Sapper. I abandoned it because I had time when I felt in love in Next, especially in its static site regeneration (SSG). But now I see that SvelteKit appeared, it is very powerful, fulfills my needs. Same time I prefer Svelte simplicity over React. So, that is a bit risky to change so popular, mature framework as Next for SvelteKit, but I believe I will not regret.

## Developing

Install dependencies by

```bash
npm install
```

and start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Live preview

`main` branch: [hop.land](https://hop.land)
