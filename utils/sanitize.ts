const purifyConfig = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
};

export function sanitizeHtml(dirty: string): string {
  if (typeof window !== 'undefined' && window.DOMPurify) {
    return window.DOMPurify.sanitize(dirty, purifyConfig);
  }

  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

export function stripHtml(text: string): string {
  if (typeof text !== 'string') {
    return String(text);
  }

  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function createSafeMarkup(content: string): { __html: string } {
  return { __html: sanitizeHtml(content) };
}

declare global {
  interface Window {
    DOMPurify?: {
      sanitize: (dirty: string, config?: object) => string;
    };
  }
}
