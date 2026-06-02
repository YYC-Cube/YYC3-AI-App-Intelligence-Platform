import { renderHook, act } from '@testing-library/react';
import { useSelection } from '../../hooks/useSelection';

interface TestItem {
  id: string;
  name: string;
}

describe('useSelection Hook', () => {
  const item1: TestItem = { id: '1', name: 'Item 1' };
  const item2: TestItem = { id: '2', name: 'Item 2' };
  const item3: TestItem = { id: '3', name: 'Item 3' };

  describe('初始状态', () => {
    it('默认应该没有选中项 (null)', () => {
      const { result } = renderHook(() => useSelection<TestItem>());
      expect(result.current.selectedItem).toBeNull();
    });

    it('应该支持设置初始选中项', () => {
      const { result } = renderHook(() => useSelection<TestItem>(item1));
      expect(result.current.selectedItem).toBe(item1);
    });
  });

  describe('selectItem 函数', () => {
    it('应该能够选择一个项目', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.selectItem(item1);
      });
      expect(result.current.selectedItem).toBe(item1);
    });

    it('应该能够切换到不同的项目', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.selectItem(item1);
      });
      expect(result.current.selectedItem).toBe(item1);

      act(() => {
        result.current.selectItem(item2);
      });
      expect(result.current.selectedItem).toBe(item2);
    });

    it('选择相同的项目应该保持不变', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.selectItem(item1);
      });

      act(() => {
        result.current.selectItem(item1);
      });
      expect(result.current.selectedItem).toBe(item1);
    });
  });

  describe('clearSelection 函数', () => {
    it('应该清除选中的项目', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.selectItem(item1);
      });
      expect(result.current.selectedItem).not.toBeNull();

      act(() => {
        result.current.clearSelection();
      });
      expect(result.current.selectedItem).toBeNull();
    });

    it('在没有选中项时调用应该是安全的', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.clearSelection();
      });
      expect(result.current.selectedItem).toBeNull();
    });
  });

  describe('isSelected 函数', () => {
    it('当前选中的项目应该返回 true', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.selectItem(item1);
      });
      expect(result.current.isSelected(item1)).toBe(true);
    });

    it('非选中的项目应该返回 false', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.selectItem(item1);
      });
      expect(result.current.isSelected(item2)).toBe(false);
      expect(result.current.isSelected(item3)).toBe(false);
    });

    it('没有选中项时应该返回 false', () => {
      const { result } = renderHook(() => useSelection<TestItem>());
      expect(result.current.isSelected(item1)).toBe(false);
    });

    it('清除选择后应该返回 false', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      act(() => {
        result.current.selectItem(item1);
      });
      expect(result.current.isSelected(item1)).toBe(true);

      act(() => {
        result.current.clearSelection();
      });
      expect(result.current.isSelected(item1)).toBe(false);
    });
  });

  describe('对象引用比较', () => {
    it('应该使用引用相等性进行比较', () => {
      const { result } = renderHook(() => useSelection<TestItem>());

      const item1Copy = { ...item1 };

      act(() => {
        result.current.selectItem(item1);
      });

      // 即使内容相同，不同的对象引用也应该返回 false
      expect(result.current.isSelected(item1Copy)).toBe(false);
    });
  });
});
