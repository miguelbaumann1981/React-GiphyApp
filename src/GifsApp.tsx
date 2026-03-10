import { useState } from 'react';
import { GifsList } from './gifs/components/GifsList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchGif } from './shared/components/SearchGif';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import type { Gif } from './gifs/interfaces/gif.interface';



export const GifsApp = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifsGiphy, setGifsGiphy] = useState<Gif[]>([]);

    const handleTermClicked = (term: string) => {
        console.log(term)
    };

    const handleSearch = async (query: string) => {
        const value: string = query.trim().toLowerCase();
        if (value.length === 0) return;
       
        if (previousTerms.includes(value)) return;
        
        setPreviousTerms([value, ...previousTerms].slice(0,8));

        const gifs = await getGifsByQuery(value);
        setGifsGiphy(gifs);
    }


  return (
    <>
      {/* Header */}
      <CustomHeader
        title='Buscador de Gifs'
        description='Descubre y comparte el gif perfecto'
      />

      {/* Search */}
      <SearchGif 
        buttonText='Buscar' 
        placeholder='Buscar gifs...'
        onQuery={handleSearch} 
        />

      {/* Results */}
      <PreviousSearches 
        searches={previousTerms}
        onLabelClick={handleTermClicked} 
        />

      {/* Gifs */}
      <GifsList 
        gifs={gifsGiphy} 
        />
    </>
  );
};
