import { useCallback, useState } from 'react';

interface UseTabsReturn<T extends string> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  isActive: (tab: T) => boolean;
}

export function useTabs<T extends string = string>(initialTab: T): UseTabsReturn<T> {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  const isActive = useCallback((tab: T) => activeTab === tab, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    isActive,
  };
}
