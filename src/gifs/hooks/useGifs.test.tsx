import { describe, test, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useGifs } from './useGifs';
import * as gifsActions from '../actions/get-gifs-by-query.action';


describe('useGifs', () => {

    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());
        expect(result.current.gifsGiphy.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('pikachu');
        });
        expect(result.current.gifsGiphy.length).toBe(10);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleTermClicked('pikachu');
        });
        expect(result.current.gifsGiphy.length).toBe(10);
    });

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleTermClicked('pikachu');
        });
        expect(result.current.gifsGiphy.length).toBe(10);
        
        vi.spyOn(gifsActions, 'getGifsByQuery').mockRejectedValue(new Error('this is a custom error'));

        await act(async () => {
            await result.current.handleTermClicked('pikachu');
        });
        expect(result.current.gifsGiphy.length).toBe(10);
    });

    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);
        await act(async () => {
            await result.current.handleSearch('pikachu1');
        });
        await act(async () => {
            await result.current.handleSearch('pikachu2');
        });
         await act(async () => {
            await result.current.handleSearch('pikachu3');
        });
         await act(async () => {
            await result.current.handleSearch('pikachu4');
        });
         await act(async () => {
            await result.current.handleSearch('pikachu5');
        });
         await act(async () => {
            await result.current.handleSearch('pikachu6');
        });
         await act(async () => {
            await result.current.handleSearch('pikachu7');
        });
         await act(async () => {
            await result.current.handleSearch('pikachu8');
        });
        await act(async () => {
            await result.current.handleSearch('pikachu9');
        });
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
        'pikachu9',
        'pikachu8',
        'pikachu7',
        'pikachu6',
        'pikachu5',
        'pikachu4',
        'pikachu3',
        'pikachu2'
        ]);
    });

});