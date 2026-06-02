import type { AppData } from '../../types';
import { MarketDetail } from './markets/MarketDetail';
import { MarketDiscovery } from './markets/MarketDiscovery';
import { MarketsMain } from './markets/MarketsMain';

interface MarketsModuleProps {
  subPage: string;
  selectedApp: AppData;
  onSubPageChange: (page: string, appData?: AppData) => void;
}

export function MarketsModule({ subPage, selectedApp, onSubPageChange }: MarketsModuleProps) {
  switch (subPage) {
    case 'detail':
      return (
        <MarketDetail
          market={selectedApp as unknown as Parameters<typeof MarketDetail>[0]['market']}
          onBack={() => onSubPageChange('')}
        />
      );
    case 'discovery':
      return (
        <MarketDiscovery
          onBack={() => onSubPageChange('')}
          onMarketSelect={(market) => onSubPageChange('detail', market as unknown as AppData)}
        />
      );
    default:
      return (
        <MarketsMain
          onMarketSelect={(market) => onSubPageChange('detail', market as unknown as AppData)}
          onDiscoverySelect={() => onSubPageChange('discovery')}
        />
      );
  }
}
