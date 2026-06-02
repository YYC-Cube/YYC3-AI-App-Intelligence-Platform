import type { AppData } from '../../types';
import { FeatureComparison } from './features/FeatureComparison';
import { FeaturePrioritizer } from './features/FeaturePrioritizer';
import { FeaturesMain } from './features/FeaturesMain';

interface FeaturesModuleProps {
  subPage: string;
  selectedApp: Partial<AppData>;
  onSubPageChange: (page: string, appData?: Partial<AppData>) => void;
}

export function FeaturesModule({ subPage, selectedApp, onSubPageChange }: FeaturesModuleProps) {
  switch (subPage) {
    case 'comparison':
      return (
        <FeatureComparison category={selectedApp?.category} onBack={() => onSubPageChange('')} />
      );
    case 'prioritizer':
      return <FeaturePrioritizer onBack={() => onSubPageChange('')} />;
    default:
      return (
        <FeaturesMain
          onComparisonSelect={(category) => onSubPageChange('comparison', { category })}
          onPrioritizerSelect={() => onSubPageChange('prioritizer')}
        />
      );
  }
}
