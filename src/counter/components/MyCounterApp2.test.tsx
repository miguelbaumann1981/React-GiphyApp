import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { MyCounterApp } from './MyCounterApp';

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({ 
        counter: 20, 
        handleAdd: handleAddMock, 
        handleSubtract: handleSubtractMock, 
        handleReset: handleResetMock 
    })
}));


describe('MyCounterApp2', () => {

    test('should render the component', () => {
        render(<MyCounterApp />);
        screen.debug();
        expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(`Counter: 20`);
        expect(screen.getByRole('button', {name: '+1'})).toBeDefined();
        expect(screen.getByRole('button', {name: '-1'})).toBeDefined();
        expect(screen.getByRole('button', {name: 'Reset'})).toBeDefined();
    });

    test('should call handleAdd if button is clicked', () => {
        render(<MyCounterApp />);
        const button = screen.getByRole('button', {name: '+1'});
        fireEvent.click(button);
        expect(handleAddMock).toHaveBeenCalled();
        expect(handleAddMock).toHaveBeenCalledTimes(1);
        expect(handleSubtractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
    });
});