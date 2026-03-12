import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getGifsByQuery } from './get-gifs-by-query.action';
import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from '../api/giphy.api';
import { giphyResponseMock } from '../../../tests/mocks/giphy.response.data';


describe('getGifsByQuery', () => {
    
    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        // mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    })


    // test('should return a list of gifs', async () => {
    //     const gifs = await getGifsByQuery('pikachu');
    //     const [gif1] = gifs;
    //     expect(gifs.length).toBe(10);
    //     expect(gif1).toEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String)
    //     });
    // });

    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphyResponseMock);
        const gifs = await getGifsByQuery('pikachu');
        expect(gifs.length).toBe(10);
        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        }); 
    });

    test('should return an empty list of gifs if quuery is empty', async () => {
        // mock.onGet('/search').reply(200, giphyResponseMock);
        mock.restore();
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);
    });

    test('should handle error when API returns an error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        mock.onGet('/search').reply(400, {
            data: {
                mesage: 'Bad Request'
            }
        });
        const gifs = await getGifsByQuery('pikachu');
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    });

});