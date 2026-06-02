import { useState, useCallback } from 'react';

interface SelectionReturn<T> {
  selectedItem: T | null;
  selectItem: (item: T) => void;
  clearSelection: () => void;
  isSelected: (item: T) => boolean;
}

export function useSelection<T>(initialItem: T | null = null): SelectionReturn<T> {
  const [selectedItem, setSelectedItem] = useState<T | null>(initialItem);

  const selectItem = useCallback((item: T) => {
    setSelectedItem(item);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const isSelected = useCallback((item: T) => selectedItem === item, [selectedItem]);

  return {
    selectedItem,
    selectItem,
    clearSelection,
    isSelected,
  };
}
