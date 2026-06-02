import { CrossAnalysisMain } from './cross-analysis/CrossAnalysisMain';
import { CrossAnalysisReport } from './cross-analysis/CrossAnalysisReport';
import { CrossAnalysisCompetitive } from './cross-analysis/CrossAnalysisCompetitive';
import { CrossAnalysisStrategy } from './cross-analysis/CrossAnalysisStrategy';
import type { AppData } from '../../types';

interface CrossAnalysisModuleProps {
  subPage: string;
  selectedApp: AppData;
  onSubPageChange: (page: string, appData?: AppData) => void;
}

export function CrossAnalysisModule({
  subPage,
  selectedApp,
  onSubPageChange,
}: CrossAnalysisModuleProps) {
  switch (subPage) {
    case 'report':
      return (
        <CrossAnalysisReport
          app={selectedApp}
          onBack={() => onSubPageChange('')}
          onStrategyView={() => onSubPageChange('strategy', selectedApp)}
        />
      );
    case 'competitive':
      return (
        <CrossAnalysisCompetitive
          onBack={() => onSubPageChange('')}
          onAppSelect={(app) => onSubPageChange('report', app)}
        />
      );
    case 'strategy':
      return (
        <CrossAnalysisStrategy
          app={selectedApp}
          onBack={() => onSubPageChange('report', selectedApp)}
        />
      );
    default:
      return (
        <CrossAnalysisMain
          onReportSelect={(app) => onSubPageChange('report', app)}
          onCompetitiveView={() => onSubPageChange('competitive')}
          onStrategyView={() => onSubPageChange('strategy')}
        />
      );
  }
}
