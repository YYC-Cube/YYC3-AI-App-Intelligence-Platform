import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  const testKey = 'test-local-storage-key';

  beforeEach(() => {
    localStorage.clear();
  });

  describe('初始状态', () => {
    it('应该使用初始值当localStorage中没有数据时', () => {
      const { result } = renderHook(() => useLocalStorage(testKey, 'initial value'));

      expect(result.current[0]).toBe('initial value');
    });

    it('应该从localStorage读取已存储的数据', () => {
      localStorage.setItem(testKey, JSON.stringify('stored value'));

      const { result } = renderHook(() => useLocalStorage(testKey, 'initial value'));

      expect(result.current[0]).toBe('stored value');
    });

    it('应该支持对象类型的初始值', () => {
      const initialObj = { name: 'test', count: 0 };
      const { result } = renderHook(() => useLocalStorage(testKey, initialObj));

      expect(result.current[0]).toEqual(initialObj);
    });

    it('应该支持数组类型的初始值', () => {
      const initialArray = [1, 2, 3];
      const { result } = renderHook(() => useLocalStorage(testKey, initialArray));

      expect(result.current[0]).toEqual(initialArray);
    });
  });

  describe('setValue 函数', () => {
    it('应该能够更新值', () => {
      const { result } = renderHook(() => useLocalStorage(testKey, 'initial'));

      act(() => {
        result.current[1]('updated value');
      });

      expect(result.current[0]).toBe('updated value');
      expect(localStorage.getItem(testKey)).toBe(JSON.stringify('updated value'));
    });

    it('应该支持函数式更新', () => {
      const { result } = renderHook(() => useLocalStorage(testKey, 0));

      act(() => {
        result.current[1]((prev) => (prev as number) + 1);
      });
      expect(result.current[0]).toBe(1);

      act(() => {
        result.current[1]((prev) => (prev as number) + 1);
      });
      expect(result.current[0]).toBe(2);
    });

    it('应该将值持久化到localStorage', () => {
      const { result } = renderHook(() =>
        useLocalStorage<Record<string, string> | null>(testKey, null)
      );

      act(() => {
        result.current[1]({ key: 'value' });
      });

      expect(localStorage.getItem(testKey)).toBe(JSON.stringify({ key: 'value' }));
    });
  });

  describe('错误处理', () => {
    it('应该处理损坏的JSON数据', () => {
      localStorage.setItem(testKey, 'invalid json');

      const { result } = renderHook(() => useLocalStorage(testKey, 'fallback'));

      // 应该回退到初始值
      expect(result.current[0]).toBe('fallback');
    });
  });
});
