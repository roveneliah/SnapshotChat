## "The Watercooler" — Krause House Governance Suite
The Watercooler is an iterative effort to build fully opt-in automated voting with arbitrarily complex rulesets.
We believe automated voting (dynamic delegation) is a legitimate path towards better voter turnout with more intelligent voting.

#### Phase 1: Curation (NOW)
Before we can automate voting, voters need to curate *who* are high signal sources / delegations.  In Phase 1, we are building a forum where Jerrys can post opinions on votes, follow other posters, and curate their feed (sort + filter) based on limited on-chain data.

#### Phase 2: Delegation
While we hope to offer "drag and drop" voting logics of arbitrary complexity, we will start with simple voting logics like:
1. Fixed Delegation to Individual
2. Rule-based Delegation to Individual (ex: vote no if they vote no)
3. Rule-based Delegation to Groups (ex: vote no if anyone from a group votes no)

#### Phase 3: Extensibility (Up for Debate) 
Once we have a useful set of delegation rules for out community, we intend to allow them to compose their own voting logics using simple primitives.  This is largely a UX problem, and this may or may not be feasible for the end-user.  At worst, we can open up the development of voting logics to developers.


## Contributing
1. Checkout the project board in this repo, and look for a `Todo` or `Need a Hand` issue.
2. Read on Contributor Guidelines (COMING SOON)
3. Once you've read our roadmap above, read out to the devs on our Discord to chat about what you're interested in working on (and comp).


## Development
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
