import type { AppData } from '../../types';
import { IdeaDetail } from './ideas/IdeaDetail';
import { IdeasMain } from './ideas/IdeasMain';

interface IdeasModuleProps {
  subPage: string;
  selectedApp: AppData;
  onSubPageChange: (page: string, appData?: AppData) => void;
}

export function IdeasModule({ subPage, selectedApp, onSubPageChange }: IdeasModuleProps) {
  switch (subPage) {
    case 'detail':
      return (
        <IdeaDetail
          idea={selectedApp as unknown as Parameters<typeof IdeaDetail>[0]['idea']}
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <IdeasMain onIdeaSelect={(idea) => onSubPageChange('detail', idea as unknown as AppData)} />
      );
  }
}
