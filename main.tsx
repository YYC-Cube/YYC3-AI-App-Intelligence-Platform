import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { logger } from './utils/logger';
import './styles/globals.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found in DOM');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary
      onError={(error, errorInfo) => {
        logger.error('Application error:', error, errorInfo);
      }}
    >
      <Router />
    </ErrorBoundary>
  </React.StrictMode>
);
