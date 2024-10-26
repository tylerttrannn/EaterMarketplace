import React from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { InstantSearch, SearchBox, Hits, useInstantSearch } from 'react-instantsearch';
import typesenseSetup from '../../Backend/typsense';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: typesenseSetup.apiKey,
    nodes: [
      {
        host: typesenseSetup.hostId,
        port: 443,
        protocol: 'https'
      }
    ]
  },
  additionalSearchParameters: {
    query_by: 'title',
  }
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

const Hit = ({ hit }) => (
  <div className="bg-slate-700 m-0 p-2 border-b border-gray-600">
    <h2 className="text-lg font-semibold text-white">{hit.title}</h2>
  </div>
);

const CustomHits = () => {
  const { indexUiState } = useInstantSearch();
  const query = indexUiState.query || '';
  
  return query.length > 1 ? (
    <div className="absolute top-full left-0 w-full max-w-xs bg-slate-700 shadow-lg z-10 rounded-lg ">
      <Hits hitComponent={Hit} classNames={{ list: "m-0 p-0" }} />
    </div>
  ) : null;
};

const SearchComponent = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="posts">
      <div className="flex flex-col w-80 items-center relative  bg-slate-700">
        <div className="w-full px-2">
          <SearchBox
            classNames={{
              root: "",
              input: "rounded-lg h-9 w-full border border-gray-300 pl-1 focus:outline-none focus:border-gray-400 mt-1 mb-1", 
              submitIcon: "hidden",
              resetIcon: "hidden"
            }}
          />
          <CustomHits /> {/* Overlaps outside of normal layout */}
        </div>
      </div>
    </InstantSearch>
  );
};

export default SearchComponent;
