import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return initial value', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should update value and localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('updated'));
  });
});
