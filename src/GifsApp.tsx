import { GifsList } from './gifs/components/GifsList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchGif } from './shared/components/SearchGif';
import { useGifs } from './gifs/hooks/useGifs';



export const GifsApp = () => {

  const { previousTerms, gifsGiphy, handleTermClicked, handleSearch } = useGifs();

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
