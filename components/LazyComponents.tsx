import { Suspense, lazy } from 'react';
import type { ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function LazyLoad({
  children,
  fallback = (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      <span className="ml-3 text-slate-600">加载中...</span>
    </div>
  ),
}: LazyLoadProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

export const HomeMode = lazy(() =>
  import('../components/nara/HomeMode').then((mod) => ({ default: mod.HomeMode }))
);

export const ChatMode = lazy(() =>
  import('../components/nara/ChatMode').then((mod) => ({ default: mod.ChatMode }))
);

export const LoopMode = lazy(() =>
  import('../components/nara/LoopMode').then((mod) => ({ default: mod.LoopMode }))
);

export const YYCEnterpriseLayout = lazy(() =>
  import('../components/yyc/navigation/YYCEnterpriseLayout').then((mod) => ({
    default: mod.YYCEnterpriseLayout,
  }))
);
