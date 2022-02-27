import algoliasearch from "algoliasearch/lite";
import { useEffect, useState } from "react";

export const useGetSearchResults = (query) => {
  // config search client
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  );
  const index = searchClient.initIndex("krausehouse-profiles");

  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const search = async (query) => {
      const result = await index.search(query);
      const hits = result.hits;
      return hits;
    };

    search(query).then(setSearchResults);
  }, [query]);

  return searchResults;
};
