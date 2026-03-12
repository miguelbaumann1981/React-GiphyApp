import { describe, expect, test, vi } from 'vitest';
import { SearchGif } from './SearchGif';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


describe('SearchGif', () => {
    test('should render search bar correctly', () => {
        const { container } = render(<SearchGif buttonText='Search' onQuery={() => {}} />);
        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });

    test('should call onQuery with the correct value after 700 ms', async () => {
        const onQuery = vi.fn();
        render(<SearchGif buttonText='Search' onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'test'}});
        // await new Promise(resolve => setTimeout(resolve, 701));
       await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    });

    test('should call only once with the last value - debounce', async () => {
        const onQuery = vi.fn();
        render(<SearchGif buttonText='Search' onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 't'}});
        fireEvent.change(input, {target: {value: 'te'}});
        fireEvent.change(input, {target: {value: 'tes'}});
        fireEvent.change(input, {target: {value: 'test'}});
         await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    });

    test('should call onQuery when button clicked with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchGif buttonText='Search' onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'test'}});
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });

    test('should call onQuery when button clicked with the input value', () => {
        const value = 'Buscar gif';
        render(<SearchGif buttonText='Search' placeholder={value} onQuery={() => {}} />);
        expect(screen.getByPlaceholderText(value)).toBeDefined();
    });

});