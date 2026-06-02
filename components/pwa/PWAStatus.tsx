import React from 'react';
import { usePWA } from '../../hooks/usePWA';

interface PWAStatusProps {
  className?: string;
  showDetails?: boolean;
}

export function PWAStatus({ className = '', showDetails = false }: PWAStatusProps) {
  const { isOnline, needRefresh, offlineReady, registrationError } = usePWA();

  const statusColor = registrationError
    ? 'bg-red-500'
    : !isOnline
      ? 'bg-yellow-500'
      : offlineReady
        ? 'bg-green-500'
        : 'bg-blue-500';

  const statusText = registrationError
    ? 'SW Error'
    : !isOnline
      ? 'Offline'
      : offlineReady
        ? 'Ready'
        : needRefresh
          ? 'Update'
          : 'Online';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-sm ${statusColor} ${className}`}
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          isOnline && !registrationError ? 'bg-white' : 'bg-red-200 animate-pulse'
        }`}
      />
      <span>{statusText}</span>

      {showDetails && (
        <span className="ml-1 opacity-75">
          {isOnline ? '🟢' : '🔴'}
          {offlineReady ? ' ⚡' : ''}
          {needRefresh ? ' 🔄' : ''}
          {registrationError ? ' ❌' : ''}
        </span>
      )}
    </div>
  );
}

export default PWAStatus;
