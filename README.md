A production-ready React hook for data fetching with global caching, in-flight deduplication, and server-side rendering (SSR) support.

## Features

- Global in-memory caching using `Map`
- In-flight request deduplication to avoid redundant fetches
- Server-side rendering support (preload, serialize, hydrate)
- TypeScript support with strict typing
- Manual cache reset utility for development and testing
  -A test file for the `caching-fetch-library` has been created to validate the behavior of the following functions `useCachingFetch`, `preloadCachingFetch`, and cache serialization logic.
  -Added a gitignore file to avoid pushing node_modules to a repository . Other unnecesary files may be added.

## Installation

Clone the project and install dependencies:
git clone https://github.com/fernandev1994/Challange.git
cd repository-directory
npm install
npm start ;

`Run Test
npm run Test

Ad
