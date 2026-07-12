/**
 * @fileoverview YYC³ AI Intelligence Platform - Route Configuration
 * @description Centralized routing with lazy-loaded modules and enterprise/client splits
 * @audit-fix [C1-FIX] — Route system restructuring for full URL reachability
 * @audit-phase P0
 * @audit-date 2026-04-21
 * @version 1.1.0
 * @author YYC³ Team
 */
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import TestPage from './TestPage';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      <span className="text-slate-600 text-sm">加载中...</span>
    </div>
  </div>
);

const EnterpriseApp = React.lazy(() => import('./EnterpriseApp'));
const ClientApp = React.lazy(() => import('./ClientApp'));
const LoginFlow = React.lazy(() =>
  import('./components/LoginFlow').then((mod) => ({ default: mod.LoginFlow }))
);

const LoginFlowWrapper = () => {
  const handleComplete = () => {
    window.location.href = '/client';
  };
  return <LoginFlow onComplete={handleComplete} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginFlowWrapper />
      </Suspense>
    ),
  },
  {
    path: '/enterprise/*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EnterpriseApp />
      </Suspense>
    ),
  },
  {
    path: '/client/*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ClientApp />
      </Suspense>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
