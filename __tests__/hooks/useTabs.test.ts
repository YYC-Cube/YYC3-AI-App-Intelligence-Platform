import { renderHook, act } from '@testing-library/react';
import { useTabs } from '../../hooks/useTabs';

describe('useTabs Hook', () => {
  describe('初始状态', () => {
    it('应该正确设置初始Tab', () => {
      const { result } = renderHook(() => useTabs('home'));
      expect(result.current.activeTab).toBe('home');
    });

    it('应该支持字符串类型的Tab ID', () => {
      const { result } = renderHook(() => useTabs('settings'));
      expect(result.current.activeTab).toBe('settings');
    });
  });

  describe('setActiveTab 函数', () => {
    it('应该能够切换到新的Tab', () => {
      const { result } = renderHook(() => useTabs('home'));

      act(() => {
        result.current.setActiveTab('profile');
      });
      expect(result.current.activeTab).toBe('profile');
    });

    it('应该支持多次切换', () => {
      const { result } = renderHook(() => useTabs('tab1'));

      act(() => {
        result.current.setActiveTab('tab2');
      });
      act(() => {
        result.current.setActiveTab('tab3');
      });
      expect(result.current.activeTab).toBe('tab3');
    });
  });

  describe('isActive 函数', () => {
    it('当前激活的Tab应该返回 true', () => {
      const { result } = renderHook(() => useTabs('home'));
      expect(result.current.isActive('home')).toBe(true);
    });

    it('非激活的Tab应该返回 false', () => {
      const { result } = renderHook(() => useTabs('home'));
      expect(result.current.isActive('profile')).toBe(false);
    });

    it('切换后应该更新 isActive 状态', () => {
      const { result } = renderHook(() => useTabs('home'));

      expect(result.current.isActive('home')).toBe(true);

      act(() => {
        result.current.setActiveTab('profile');
      });

      expect(result.current.isActive('home')).toBe(false);
      expect(result.current.isActive('profile')).toBe(true);
    });
  });

  describe('泛型支持', () => {
    it('应该支持联合类型作为Tab ID', () => {
      const { result } = renderHook(() => useTabs<'a' | 'b' | 'c'>('a'));

      expect(result.current.activeTab).toBe('a');

      act(() => {
        result.current.setActiveTab('b');
      });
      expect(result.current.activeTab).toBe('b');
    });
  });
});
