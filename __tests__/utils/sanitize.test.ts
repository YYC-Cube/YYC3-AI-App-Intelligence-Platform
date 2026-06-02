import { createSafeMarkup, sanitizeHtml, stripHtml } from '../../utils/sanitize';

describe('XSS Sanitize Utils', () => {
  describe('sanitizeHtml', () => {
    it('应该移除 <script> 标签', () => {
      const dirty = '<script>alert("xss")</script>安全内容';
      const clean = sanitizeHtml(dirty);

      expect(clean).not.toContain('<script>');
      expect(clean).toContain('安全内容');
    });

    it('应该移除事件属性 (onclick等)', () => {
      const dirty = '<div onclick="alert(\'xss\')">点击</div>';
      const clean = sanitizeHtml(dirty);

      expect(clean).not.toContain('onclick');
      expect(clean).toContain('点击');
    });

    it('应该拦截 javascript: 协议', () => {
      const dirty = '<a href="javascript:alert(1)">链接</a>';
      const clean = sanitizeHtml(dirty);

      expect(clean).not.toContain('javascript:');
      expect(clean).toContain('链接');
    });

    it('应该保留安全的HTML标签 (b, i, a)', () => {
      const safe = '<b>粗体</b><i>斜体</i><a href="/link">链接</a>';
      const result = sanitizeHtml(safe);

      expect(result).toContain('<b>粗体</b>');
      expect(result).toContain('<i>斜体</i>');
      expect(result).toContain('<a');
    });

    it('应该处理空字符串', () => {
      const result = sanitizeHtml('');
      expect(result).toBe('');
    });

    it('应该处理纯文本输入', () => {
      const text = '这是一段普通文本';
      const result = sanitizeHtml(text);

      expect(result).toBe(text);
    });
  });

  describe('stripHtml', () => {
    it('应该移除所有HTML标签', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      const text = stripHtml(html);

      expect(text).toBe('Hello World');
    });

    it('应该处理嵌套标签', () => {
      const html = '<div><p><span>Nested</span></p></div>';
      const text = stripHtml(html);

      expect(text).toBe('Nested');
    });

    it('应该保留文本中的空格和换行', () => {
      const html = '<p>Line1</p><p>Line2</p>';
      const text = stripHtml(html);

      expect(text).toContain('Line1');
      expect(text).toContain('Line2');
    });
  });

  describe('createSafeMarkup', () => {
    it('应该返回包含 __html 属性的对象', () => {
      const content = '<p>Safe</p>';
      const result = createSafeMarkup(content);

      expect(result).toHaveProperty('__html');
      expect(typeof result.__html).toBe('string');
    });

    it('应该清理后的内容不包含危险代码', () => {
      const dangerous = '<script>alert("xss")</script><p>Safe</p>';
      const result = createSafeMarkup(dangerous);

      expect(result.__html).not.toContain('<script>');
      expect(result.__html).toContain('Safe');
    });
  });
});
