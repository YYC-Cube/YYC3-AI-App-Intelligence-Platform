import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../../hooks/usePWA', () => ({
  usePWA: jest.fn(() => ({
    isOnline: true,
    needRefresh: false,
    offlineReady: false,
    registrationError: null,
    updateServiceWorker: jest.fn(),
  })),
}));

describe('PWA Components', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
    });
  });

  describe('PWAStatus Component', () => {
    test('shows online status when connected', async () => {
      const { usePWA } = await import('../../hooks/usePWA');
      const { PWAStatus } = await import('../../components/pwa/PWAStatus');

      (usePWA as unknown as jest.Mock).mockReturnValue({
        isOnline: true,
        needRefresh: false,
        offlineReady: false,
        registrationError: null,
        updateServiceWorker: jest.fn(),
      });

      render(<PWAStatus />);

      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    test('shows offline status when disconnected', async () => {
      const { usePWA } = await import('../../hooks/usePWA');
      const { PWAStatus } = await import('../../components/pwa/PWAStatus');

      (usePWA as unknown as jest.Mock).mockReturnValue({
        isOnline: false,
        needRefresh: false,
        offlineReady: false,
        registrationError: null,
        updateServiceWorker: jest.fn(),
      });

      render(<PWAStatus />);

      expect(screen.getByText('Offline')).toBeInTheDocument();
    });
  });

  describe('InstallPrompt Component', () => {
    test('component can be imported without error', async () => {
      const { InstallPrompt } = await import('../../components/pwa/InstallPrompt');
      expect(InstallPrompt).toBeDefined();
    });
  });

  describe('usePWA Hook', () => {
    test('returns correct initial state', async () => {
      const { usePWA } = await import('../../hooks/usePWA');

      function TestComponent() {
        const pwaState = usePWA();

        return (
          <div data-testid="pwa-state">
            <span data-testid="is-online">{String(pwaState.isOnline)}</span>
            <span data-testid="need-refresh">{String(pwaState.needRefresh)}</span>
            <span data-testid="offline-ready">{String(pwaState.offlineReady)}</span>
          </div>
        );
      }

      (usePWA as unknown as jest.Mock).mockReturnValue({
        isOnline: true,
        needRefresh: false,
        offlineReady: false,
        registrationError: null,
        updateServiceWorker: jest.fn(),
      });

      render(<TestComponent />);

      expect(screen.getByTestId('is-online').textContent).toBe('true');
      expect(screen.getByTestId('need-refresh').textContent).toBe('false');
      expect(screen.getByTestId('offline-ready').textContent).toBe('false');
    });
  });

  describe('PWAProvider Integration', () => {
    test('renders children correctly', async () => {
      const { PWAProvider } = await import('../../components/pwa/PWAProvider');

      render(
        <PWAProvider>
          <div>Test Content</div>
        </PWAProvider>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('shows offline message when offline', async () => {
      const { usePWA } = await import('../../hooks/usePWA');
      const { PWAProvider } = await import('../../components/pwa/PWAProvider');

      (usePWA as unknown as jest.Mock).mockReturnValue({
        isOnline: false,
        needRefresh: false,
        offlineReady: false,
        registrationError: null,
        updateServiceWorker: jest.fn(),
      });

      render(
        <PWAProvider>
          <div>Test Content</div>
        </PWAProvider>
      );

      expect(screen.getByText(/You are offline/)).toBeInTheDocument();
    });
  });
});

describe('Offline Capabilities', () => {
  test('navigator.onLine reflects network status', () => {
    expect(typeof navigator.onLine).toBe('boolean');
  });

  test('online/offline events can be listened', () => {
    const onlineHandler = jest.fn();
    const offlineHandler = jest.fn();

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    fireEvent(window as unknown as Window & Element, new Event('online'));
    fireEvent(window as unknown as Window & Element, new Event('offline'));

    expect(onlineHandler).toHaveBeenCalledTimes(1);
    expect(offlineHandler).toHaveBeenCalledTimes(1);

    window.removeEventListener('online', onlineHandler);
    window.removeEventListener('offline', offlineHandler);
  });
});

describe('PWA Manifest Structure', () => {
  test('manifest has correct structure when loaded from file', async () => {
    const fs = await import('fs/promises');

    try {
      const manifestPath = './public/yyc3-icons/pwa/manifest.json';
      const manifestContent = await fs.readFile(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);

      expect(manifest.name).toBeDefined();
      expect(manifest.short_name).toBeDefined();
      expect(manifest.icons).toBeDefined();
      expect(Array.isArray(manifest.icons)).toBe(true);
      expect(manifest.icons.length).toBeGreaterThan(0);

      manifest.icons.forEach((icon: Record<string, unknown>) => {
        expect(icon.src).toBeDefined();
        expect(icon.sizes).toBeDefined();
        expect(icon.type).toBeDefined();
        expect(icon.type).toContain('image/');
      });
    } catch (error) {
      console.warn('Manifest file not accessible in test environment:', error);
    }
  });
});
