import { useState } from 'react';
import { Activity, Cpu, Zap, Database, Network, Shield, Globe } from 'lucide-react';

interface SystemArchitectureControlsProps {
  language?: 'zh' | 'en';
}

export function SystemArchitectureControlsSimple({
  language = 'zh',
}: SystemArchitectureControlsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const translations = {
    zh: {
      title: '系统架构控制',
      overview: '概览',
      components: '组件',
      performance: '性能',
      status: {
        cpu: 'CPU使用率',
        memory: '内存使用',
        network: '网络流量',
        storage: '存储空间',
      },
      metrics: {
        cpu: '45%',
        memory: '62%',
        network: '1.2 GB/s',
        storage: '45%',
      },
    },
    en: {
      title: 'System Architecture Controls',
      overview: 'Overview',
      components: 'Components',
      performance: 'Performance',
      status: {
        cpu: 'CPU Usage',
        memory: 'Memory Usage',
        network: 'Network Traffic',
        storage: 'Storage Space',
      },
      metrics: {
        cpu: '45%',
        memory: '62%',
        network: '1.2 GB/s',
        storage: '45%',
      },
    },
  };

  const t = translations[language];

  const tabs = [
    { id: 'overview', label: t.overview, icon: Activity },
    { id: 'components', label: t.components, icon: Cpu },
    { id: 'performance', label: t.performance, icon: Zap },
  ];

  const metrics = [
    {
      id: 'cpu',
      label: t.status.cpu,
      value: t.metrics.cpu,
      icon: Cpu,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'memory',
      label: t.status.memory,
      value: t.metrics.memory,
      icon: Database,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'network',
      label: t.status.network,
      value: t.metrics.network,
      icon: Network,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'storage',
      label: t.status.storage,
      value: t.metrics.storage,
      icon: Globe,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t.title}</h3>
        <div className="flex gap-2 border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2
                  ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-gradient-to-br ${metric.color} rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">{metric.label}</div>
                  <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${metric.color} h-2 rounded-full`}
                  style={{ width: metric.value }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <div className="font-medium text-blue-900 mb-1">系统状态正常</div>
            <div className="text-sm text-blue-700">所有组件运行正常，性能指标在预期范围内。</div>
          </div>
        </div>
      </div>
    </div>
  );
}
