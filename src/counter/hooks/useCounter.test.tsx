import { act, renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useCounter } from './useCounter';


describe('useCounter', () => {
    
    test('should initialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.counter).toBe(10);
    });

    test('should initialize with value 20', () => {
        const initValue = 20;
        const { result } = renderHook(() => useCounter(initValue));
        expect(result.current.counter).toBe(initValue);
    });

    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.handleAdd();
        })
        expect(result.current.counter).toBe(11);
    });

    test('should decrement counter when handleSubtract is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.handleSubtract();
        })
        expect(result.current.counter).toBe(9);
    });

    test('should decrement counter when handleSubtract is called and init value is 20', () => {
        const initValue = 20;
        const { result } = renderHook(() => useCounter(initValue));
        act(() => {
            result.current.handleSubtract();
        })
        expect(result.current.counter).toBe(19);
    });

    test('should reset to initial value when handleReset is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.handleSubtract();
        });
        act(() => {
            result.current.handleReset();
        });
        expect(result.current.counter).toBe(10);
    });

});