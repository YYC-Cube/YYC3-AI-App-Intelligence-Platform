import { useState } from 'react';
import { LayoutDashboard, BarChart3, Edit3 } from 'lucide-react';
import { YYCLogo } from '../../YYCLogo';

export function YYCEnterpriseLayoutSimple() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 p-4">
        <YYCLogo variant="short" size="medium" />
        <nav className="mt-6 space-y-2">
          <button
            onClick={() => setActiveModule('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeModule === 'dashboard'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveModule('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeModule === 'analytics'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveModule('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeModule === 'settings'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}
          </h1>
          <p className="text-slate-600">Welcome to YYC³ AI Intelligence Platform</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              This is a simplified version for testing. The full enterprise layout will be restored
              once the motion components are fixed.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
