import { TrendsMain } from './trends/TrendsMain';
import { TrendDetail } from './trends/TrendDetail';
import type { AppData } from '../../types';

interface TrendsModuleProps {
  subPage: string;
  selectedApp: AppData;
  onSubPageChange: (page: string, appData?: AppData) => void;
}

export function TrendsModule({ subPage, selectedApp, onSubPageChange }: TrendsModuleProps) {
  if (subPage === 'detail' && selectedApp) {
    return <TrendDetail app={selectedApp} onBack={() => onSubPageChange('')} />;
  }

  return <TrendsMain onTrendSelect={(app) => onSubPageChange('detail', app)} />;
}
