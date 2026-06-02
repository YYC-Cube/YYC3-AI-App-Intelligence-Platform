import { ExplorerMain } from './explorer/ExplorerMain';
import { AppDetail } from './explorer/AppDetail';
import type { AppData } from '../../types';

interface ExplorerModuleProps {
  subPage: string;
  selectedApp: AppData;
  onSubPageChange: (page: string, appData?: AppData) => void;
}

export function ExplorerModule({ subPage, selectedApp, onSubPageChange }: ExplorerModuleProps) {
  if (subPage === 'detail' && selectedApp) {
    return <AppDetail app={selectedApp} onBack={() => onSubPageChange('')} />;
  }

  return <ExplorerMain onAppSelect={(app) => onSubPageChange('detail', app)} />;
}
