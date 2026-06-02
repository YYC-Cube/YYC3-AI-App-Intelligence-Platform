import type { ReactNode } from 'react';
import { usePWA } from '../../hooks/usePWA';

interface PWAProviderProps {
  children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const { isOnline, needRefresh, offlineReady, registrationError, updateServiceWorker } = usePWA();

  return (
    <>
      {children}

      {needRefresh && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white shadow-lg">
          <span className="text-sm font-medium">New version available</span>
          <button
            onClick={() => updateServiceWorker()}
            className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Update
          </button>
        </div>
      )}

      {offlineReady && !isOnline && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black shadow-lg">
          ⚡ App ready to work offline!
        </div>
      )}

      {!isOnline && !offlineReady && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
          🔴 You are offline. Some features may be unavailable.
        </div>
      )}

      {registrationError && (
        <div className="fixed bottom-4 left-4 z-50 max-w-md rounded-lg bg-red-600 p-4 text-white shadow-lg">
          <p className="text-sm font-semibold">Service Worker Error</p>
          <p className="mt-1 text-xs opacity-90">{registrationError.message}</p>
        </div>
      )}
    </>
  );
}

export default PWAProvider;
