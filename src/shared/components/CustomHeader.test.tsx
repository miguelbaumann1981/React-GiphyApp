import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { CustomHeader } from './CustomHeader';


describe('CustomHeader', () => {
    const title = 'My title';

    test('should render the title correctly', () => {
        render(<CustomHeader title={title} />);
        // screen.debug();
        const result = screen.getByText('My title');
        expect(result).toBeDefined();
    });

    test('should render the description when is provided', () => {
        const desc = 'My description';
        render(<CustomHeader title={title} description={desc} />);
        // screen.debug();
        const result = screen.getByText('My description');
        expect(result).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(desc);
    });

    test('should not render the description when not provided', () => {
        const { container } = render(<CustomHeader title={title} />);
        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);

        const par = divElement?.querySelector('p');
        expect(par).toBeNull();
        
    });
});