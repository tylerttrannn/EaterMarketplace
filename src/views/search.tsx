import React, { useEffect, useState, useRef } from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { InstantSearch, SearchBox, useInstantSearch } from 'react-instantsearch';
import typesenseSetup from '../../Backend/typsense';
import { useHits } from 'react-instantsearch';
import { useNavigate } from 'react-router-dom';


export interface HitItem {
  objectID: string;
  title: string;
}

interface HitProps {
  hit: HitItem;
}

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: typesenseSetup.apiKey,
    nodes: [
      {
        host: typesenseSetup.hostId,
        port: 443,
        protocol: 'https',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'title',
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

const Hit: React.FC<HitProps> = ({ hit }) => {

  const navigate = useNavigate();
  return (
    <div
      className="bg-slate-700 m-0 p-2 border-b border-gray-600"
      onClick={() => navigate(`/search/${encodeURIComponent(hit.title)}`)}
    >
      <h2 className="text-lg font-semibold text-white">{hit.title}</h2>
    </div>
  );
};


const CustomHits: React.FC<{ setStoredHits: React.Dispatch<React.SetStateAction<HitItem[]>>; isVisible: boolean }> = ({ setStoredHits, isVisible }) => {
  const { hits } = useHits<HitItem>();
  const { indexUiState } = useInstantSearch();
  const query = indexUiState.query || '';

  useEffect(() => {
    setStoredHits(hits); // Update storedHits in the parent component
  }, [hits, setStoredHits]);

  return isVisible && query.length > 1 ? (
    <div className="absolute top-full left-0 w-full max-w-xs bg-slate-700 shadow-lg z-10 rounded-lg" >
      {hits.map((hit) => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </div>
  ) : null;
};

const SearchComponent = () => {
  const navigate = useNavigate();
  const [storedHits, setStoredHits] = useState<HitItem[]>([]);
  const [isHitsVisible, setIsHitsVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Submitted hits:', storedHits);
      const val = (event.target as HTMLInputElement).value;
      navigate(`/search/${val}`, { state: { storedHits } });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setIsHitsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <InstantSearch searchClient={searchClient} indexName="posts">
      <div ref={searchContainerRef} className="flex flex-col w-80 items-center relative bg-slate-700">
        <div className="w-full px-2">
          <SearchBox
            onFocus={() => setIsHitsVisible(true)} // setting visibvility to true when the box is selected
            onKeyDown={handleKeyDown}
            classNames={{
              root: "",
              input: "rounded-lg h-9 w-full border border-gray-300 pl-1 focus:outline-none focus:border-gray-400 mt-1 mb-1", 
              submitIcon: "hidden",
              resetIcon: "hidden",
            }}
          />
          <CustomHits setStoredHits={setStoredHits} isVisible={isHitsVisible} />
        </div>
      </div>
    </InstantSearch>
  );
};


export default SearchComponent;
