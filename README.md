# blush

A [Bluesky](https://bsky.app)-compatible client that aims to become something more!

## current state

trying to get a hang of atproto! no logins and no video are the biggest problems right now, as well as a general lack of polish, but the idea is there. logins will require a massive refactor (basically a rewrite) as I want to get session management right early on, and also make sure SSR works. I'll probably add a hacky login system to this one to get to grips with it though, and also get a better feel for the UX I want.

the next big thing is wrapping atcute in a thing that plays nicer with typescript and saves me from union discriminating hell. honestly might move to rust just to avoid that pain, but I do really like svelte and don't want to stop using it either :c

I think I might just replace atcute('s types) with my own typegen that can work in both rust and typescript

## goals
 - blazing fast! as fast as mcmaster-carr's website!
 - but still extremely dynamic! interaction should be a joy!
 - keep up with and suggest improvements to atproto/bluesky
 - take measures to encourage decentralization of the atproto ecosystem
 - customizable: people should be able to have fun with their profiles
 - modular: eventually, this client should just be glue code and a coat of paint, with most of the logic reusable in other atproto tools
 - embeddable: posts embeds should show up beautifully on places like discord
 - opinionated: this is a product of my opinions and beliefs, it's not intended to be a generic experience, and to that end the community will sometimes disagree with what I do, and sometimes, I will not listen to them and do it anyway
 - tight integration with the rest of the future dere.social ecosystem, including but not limited to management for hosted pdses, chat, new appviews and facets, did methods, etc.--this will never be at the cost of cutting off other parts of the ecosystem, though.

## non-goals
 - targeting other mediums: while I plan to make clients for other appviews as well, and share code between them, this one is first and foremost a microblogging client! I believe in links, and this client will do all it can to *enhance* links, but your experience will be far nicer on a client crafted with love for your medium <3
 - being unprofitable: this should become a sustainable project that can pay for the livelihood of those involved deeply in it
 - targeting older systems/browsers: this client is for modern, up-to-date browsers! if you don't update your stuff it will explode!