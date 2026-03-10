import { useRef, useState } from 'react';
import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';


export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifsGiphy, setGifsGiphy] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {

    if (gifsCache.current[term]) {
        setGifsGiphy(gifsCache.current[term]);
        return;
    }

    const gifs = await getGifsByQuery(term);
    setGifsGiphy(gifs);
  };

  const handleSearch = async (query: string) => {
    const value: string = query.trim().toLowerCase();
    if (value.length === 0) return;

    if (previousTerms.includes(value)) return;

    setPreviousTerms([value, ...previousTerms].slice(0, 8));

    const gifs = await getGifsByQuery(value);
    setGifsGiphy(gifs);

    gifsCache.current[query] = gifs;
  };

  return {
    previousTerms,
    gifsGiphy,
    handleTermClicked,
    handleSearch,
  };
};
