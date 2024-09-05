import { useSidebar } from '@/hooks/useSideBar';
import { renderHook, act } from '@testing-library/react';

describe('useSidebar', () => {
  it('should initialize with isMinimized as false', () => {
    const { result } = renderHook(() => useSidebar());
    expect(result.current.isMinimized).toBe(false);
  });

  it('should toggle isMinimized when toggle is called', () => {
    const { result } = renderHook(() => useSidebar());

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isMinimized).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isMinimized).toBe(false);
  });
});
