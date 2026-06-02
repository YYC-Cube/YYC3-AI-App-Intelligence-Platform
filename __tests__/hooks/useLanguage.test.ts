import { renderHook, act } from '@testing-library/react';
import { useLanguage } from '../../hooks/useLanguage';

describe('useLanguage Hook', () => {
  describe('初始状态', () => {
    it('应该默认使用中文', () => {
      const { result } = renderHook(() => useLanguage());
      expect(result.current.language).toBe('zh');
    });

    it('应该正确设置初始语言', () => {
      const { result } = renderHook(() => useLanguage('en'));
      expect(result.current.language).toBe('en');
    });
  });

  describe('isZh 和 isEn 属性', () => {
    it('中文模式下 isZh 应该为 true', () => {
      const { result } = renderHook(() => useLanguage('zh'));
      expect(result.current.isZh).toBe(true);
      expect(result.current.isEn).toBe(false);
    });

    it('英文模式下 isEn 应该为 true', () => {
      const { result } = renderHook(() => useLanguage('en'));
      expect(result.current.isEn).toBe(true);
      expect(result.current.isZh).toBe(false);
    });
  });

  describe('toggleLanguage 函数', () => {
    it('应该在中文和英文之间切换', () => {
      const { result } = renderHook(() => useLanguage('zh'));

      act(() => {
        result.current.toggleLanguage();
      });
      expect(result.current.language).toBe('en');

      act(() => {
        result.current.toggleLanguage();
      });
      expect(result.current.language).toBe('zh');
    });

    it('多次切换应该保持交替', () => {
      const { result } = renderHook(() => useLanguage('zh'));

      const expectedSequence = ['en', 'zh', 'en', 'zh'];
      expectedSequence.forEach((expectedLang) => {
        act(() => {
          result.current.toggleLanguage();
        });
        expect(result.current.language).toBe(expectedLang);
      });
    });
  });

  describe('稳定性', () => {
    it('不应该影响其他状态', () => {
      const { result } = renderHook(() => useLanguage());

      const initialToggle = result.current.toggleLanguage;

      act(() => {
        result.current.toggleLanguage();
      });

      expect(result.current.toggleLanguage).toBe(initialToggle);
    });
  });
});
