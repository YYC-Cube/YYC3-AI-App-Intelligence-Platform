import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Globe,
  Pause,
  Play,
  Rocket,
  RotateCw,
  Server,
} from 'lucide-react';
import { useState } from 'react';
import { logger } from '../../../utils/logger';

interface DeploymentControlsProps {
  language?: 'zh' | 'en';
}

export function DeploymentControlsSimple({ language = 'zh' }: DeploymentControlsProps) {
  const [deployments, _setDeployments] = useState([
    {
      id: '1',
      name: '生产环境',
      status: 'running',
      url: 'https://app.yyc3.com',
      lastDeploy: '2024-01-15 14:30',
      version: 'v2.4.1',
    },
    {
      id: '2',
      name: '测试环境',
      status: 'stopped',
      url: 'https://test.yyc3.com',
      lastDeploy: '2024-01-14 09:15',
      version: 'v2.4.0',
    },
    {
      id: '3',
      name: '开发环境',
      status: 'running',
      url: 'https://dev.yyc3.com',
      lastDeploy: '2024-01-15 16:45',
      version: 'v2.4.2',
    },
  ]);

  const translations = {
    zh: {
      title: '部署配置',
      status: {
        running: '运行中',
        stopped: '已停止',
        deploying: '部署中',
        failed: '失败',
      },
      info: {
        url: 'URL',
        lastDeploy: '最后部署',
        version: '版本',
      },
      actions: {
        deploy: '部署',
        stop: '停止',
        restart: '重启',
        viewLogs: '查看日志',
      },
      summary: {
        total: '总部署',
        running: '运行中',
        stopped: '已停止',
      },
    },
    en: {
      title: 'Deployment Configuration',
      status: {
        running: 'Running',
        stopped: 'Stopped',
        deploying: 'Deploying',
        failed: 'Failed',
      },
      info: {
        url: 'URL',
        lastDeploy: 'Last Deploy',
        version: 'Version',
      },
      actions: {
        deploy: 'Deploy',
        stop: 'Stop',
        restart: 'Restart',
        viewLogs: 'View Logs',
      },
      summary: {
        total: 'Total Deployments',
        running: 'Running',
        stopped: 'Stopped',
      },
    },
  };

  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'stopped':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'deploying':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'stopped':
        return <Clock className="w-4 h-4" />;
      case 'deploying':
        return <RotateCw className="w-4 h-4 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleAction = (id: string, action: string) => {
    logger.debug(`Action ${action} for deployment ${id}`);
  };

  const runningCount = deployments.filter((d) => d.status === 'running').length;
  const stoppedCount = deployments.filter((d) => d.status === 'stopped').length;

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-4">{t.title}</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">{t.summary.total}</div>
          <div className="text-2xl font-bold text-blue-900">{deployments.length}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-600 mb-1">{t.summary.running}</div>
          <div className="text-2xl font-bold text-green-900">{runningCount}</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">{t.summary.stopped}</div>
          <div className="text-2xl font-bold text-slate-900">{stoppedCount}</div>
        </div>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div key={deployment.id} className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{deployment.name}</div>
                  <div className="text-sm text-slate-600">{deployment.version}</div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(deployment.status)}`}
              >
                {getStatusIcon(deployment.status)}
                {t.status[deployment.status as keyof typeof t.status] || deployment.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">{t.info.url}:</span>
                <a href={deployment.url} className="text-blue-600 hover:underline">
                  {deployment.url}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">{t.info.lastDeploy}:</span>
                <span className="text-slate-900">{deployment.lastDeploy}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {deployment.status === 'running' ? (
                <>
                  <button
                    onClick={() => handleAction(deployment.id, 'stop')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                    {t.actions.stop}
                  </button>
                  <button
                    onClick={() => handleAction(deployment.id, 'restart')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                    {t.actions.restart}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleAction(deployment.id, 'deploy')}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  {t.actions.deploy}
                </button>
              )}
              <button
                onClick={() => handleAction(deployment.id, 'logs')}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors"
              >
                <Server className="w-4 h-4" />
                {t.actions.viewLogs}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
