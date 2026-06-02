import { AlertCircle, Database, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { logger } from '../../../utils/logger';

interface MemoryControlsProps {
  language?: 'zh' | 'en';
}

export function MemoryControlsSimple({ language = 'zh' }: MemoryControlsProps) {
  const [memoryItems, setMemoryItems] = useState([
    { id: '1', name: '用户数据', size: '2.4 GB', type: 'cache' },
    { id: '2', name: '系统日志', size: '1.8 GB', type: 'logs' },
    { id: '3', name: '临时文件', size: '3.2 GB', type: 'temp' },
  ]);

  const translations = {
    zh: {
      title: '内存管理',
      usage: '使用情况',
      actions: '操作',
      clear: '清理',
      optimize: '优化',
      refresh: '刷新',
      total: '总计',
      available: '可用',
      used: '已使用',
      types: {
        cache: '缓存',
        logs: '日志',
        temp: '临时文件',
      },
    },
    en: {
      title: 'Memory Management',
      usage: 'Usage',
      actions: 'Actions',
      clear: 'Clear',
      optimize: 'Optimize',
      refresh: 'Refresh',
      total: 'Total',
      available: 'Available',
      used: 'Used',
      types: {
        cache: 'Cache',
        logs: 'Logs',
        temp: 'Temp Files',
      },
    },
  };

  const t = translations[language];

  const _totalSize = memoryItems.reduce((acc, item) => {
    const size = parseFloat(item.size);
    return acc + size;
  }, 0);

  const handleClear = (id: string) => {
    setMemoryItems(memoryItems.filter((item) => item.id !== id));
  };

  const handleRefresh = () => {
    logger.info('Refreshing memory data...');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {t.refresh}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">{t.total}</div>
          <div className="text-2xl font-bold text-blue-900">16 GB</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-600 mb-1">{t.available}</div>
          <div className="text-2xl font-bold text-green-900">8.6 GB</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-sm text-purple-600 mb-1">{t.used}</div>
          <div className="text-2xl font-bold text-purple-900">7.4 GB</div>
        </div>
      </div>

      <div className="space-y-3">
        {memoryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 border border-slate-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Database className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <div className="font-medium text-slate-900">{item.name}</div>
                <div className="text-sm text-slate-600">
                  {t.types[item.type as keyof typeof t.types] || item.type} • {item.size}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleClear(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Clear item"
              title="Clear item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <div className="font-medium text-yellow-900 mb-1">内存使用建议</div>
            <div className="text-sm text-yellow-700">
              建议定期清理缓存和临时文件以保持系统性能。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
