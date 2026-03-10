import { useEffect, useState } from 'react';

interface Props {
    buttonText: string;
    onQuery: (query: string) => void;
    placeholder?: string;
}


export const SearchGif = ({buttonText, onQuery, placeholder = 'Buscar' }: Props) => {

    const [query, setQuery] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onQuery(query);
        }, 700);
        
        return () => {
            clearTimeout(timeoutId);
        }
    }, [query, onQuery])

    const handleSearch = () => {
        onQuery(query);
        setQuery('');
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

  return (
    <div className='search-container'>
        <input 
            type='text' 
            placeholder={placeholder} 
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>{buttonText}</button>
      </div>
  )
}


