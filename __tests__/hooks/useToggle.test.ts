import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../../hooks/useToggle';

describe('useToggle Hook', () => {
  describe('初始状态', () => {
    it('默认应该为关闭状态 (false)', () => {
      const { result } = renderHook(() => useToggle());
      expect(result.current.isOpen).toBe(false);
    });

    it('应该支持自定义初始状态', () => {
      const { result } = renderHook(() => useToggle(true));
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('toggle 函数', () => {
    it('应该能够在开/关之间切换', () => {
      const { result } = renderHook(() => useToggle());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('多次调用应该保持交替', () => {
      const { result } = renderHook(() => useToggle());

      const expectedStates = [true, false, true, false, true];
      expectedStates.forEach((expectedState) => {
        act(() => {
          result.current.toggle();
        });
        expect(result.current.isOpen).toBe(expectedState);
      });
    });
  });

  describe('open 函数', () => {
    it('应该将状态设置为 true', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      // 再次调用应该保持 true
      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('close 函数', () => {
    it('应该将状态设置为 false', () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);

      // 再次调用应该保持 false
      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('组合操作', () => {
    it('open 和 close 应该能够正确配合使用', () => {
      const { result } = renderHook(() => useToggle());

      // 打开
      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      // 关闭
      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);

      // 切换到打开
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(true);
    });
  });
});
