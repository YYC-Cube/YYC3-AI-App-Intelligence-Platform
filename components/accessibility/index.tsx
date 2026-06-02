import { useEffect, useRef } from 'react';

interface SkipNavProps {
  mainContentId?: string;
  label?: string;
}

export function SkipNav({
  mainContentId = 'main-content',
  label = 'Skip to main content',
}: SkipNavProps) {
  return (
    <a
      href={`#${mainContentId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
    >
      {label}
    </a>
  );
}

interface AnnouncerProps {
  message: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
  role?: 'status' | 'alert' | 'log' | 'marquee' | 'timer';
  ariaAtomic?: boolean;
}

export function Announcer({
  message,
  ariaLive = 'polite',
  role = 'status',
  ariaAtomic = true,
}: AnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announcerRef.current) {
      announcerRef.current.setAttribute('role', role || 'status');
      announcerRef.current.setAttribute('aria-live', ariaLive || 'polite');
      announcerRef.current.setAttribute(
        'aria-atomic',
        String(ariaAtomic !== undefined ? ariaAtomic : true)
      );
    }
  }, [role, ariaLive, ariaAtomic]);

  useEffect(() => {
    if (announcerRef.current) {
      announcerRef.current.textContent = '';
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      }, 100);
    }
  }, [message]);

  return <div ref={announcerRef} className="sr-only" />;
}

interface FocusTrapProps {
  active?: boolean;
  children: React.ReactNode;
}

export function FocusTrap({ active = true, children }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
}

interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function VisuallyHidden({ children, as: Component = 'span' }: VisuallyHiddenProps) {
  return <Component className="sr-only">{children}</Component>;
}
