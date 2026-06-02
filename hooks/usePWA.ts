import { useCallback, useEffect, useState } from 'react';
import registerSW from 'virtual:pwa-register';
import { logger } from '../utils/logger';

export interface PWAState {
  isOnline: boolean;
  needRefresh: boolean;
  offlineReady: boolean;
  registrationError: Error | null;
  updateServiceWorker: () => void;
}

const intervalMS = 60 * 60 * 1000;

export function usePWA(): PWAState {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [registrationError, setRegistrationError] = useState<Error | null>(null);

  const updateServiceWorker = useCallback(() => {
    if (window.__SW_UPDATE__) {
      window.__SW_UPDATE__(true);
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    try {
      const updateSW = registerSW({
        onNeedRefresh() {
          setNeedRefresh(true);
        },
        onOfflineReady() {
          setOfflineReady(true);
        },
        onRegisteredSW(_swUrl: string, registration: ServiceWorkerRegistration | undefined) {
          logger.info('Service Worker registered:', registration?.scope);

          if (registration) {
            setInterval(() => {
              registration.update();
            }, intervalMS);
          }
        },
        onRegisterError(error: Error) {
          console.error('❌ Service Worker registration error:', error);
          setRegistrationError(error);
        },
      });

      (window as unknown as Record<string, unknown>).__SW_UPDATE__ = updateSW;
    } catch (error) {
      logger.error('Failed to register Service Worker:', error);
      setRegistrationError(error instanceof Error ? error : new Error(String(error)));
    }
  }, []);

  return {
    isOnline,
    needRefresh,
    offlineReady,
    registrationError,
    updateServiceWorker,
  };
}

declare global {
  interface Window {
    __SW_UPDATE__?: (reloadPage?: boolean) => Promise<void>;
  }
}
