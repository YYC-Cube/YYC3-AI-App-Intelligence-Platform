import { Activity, Brain, Code, Database, Lock, Settings, Wrench, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { DeploymentControlsSimple } from './home-sections/DeploymentControlsSimple';
import { MemoryControlsSimple } from './home-sections/MemoryControlsSimple';
import { SecurityControlsSimple } from './home-sections/SecurityControlsSimple';
import { SkillsControlsSimple } from './home-sections/SkillsControlsSimple';
import { SystemArchitectureControlsSimple } from './home-sections/SystemArchitectureControlsSimple';

interface Section {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  hasControls?: boolean;
}

const sections: Section[] = [
  {
    id: 'architecture',
    icon: Activity,
    color: 'from-blue-500 to-cyan-500',
    hasControls: true,
  },
  {
    id: 'foundation',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'security',
    icon: Lock,
    color: 'from-red-500 to-orange-500',
    hasControls: true,
  },
  {
    id: 'memory',
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
    hasControls: true,
  },
  {
    id: 'skills',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    hasControls: true,
  },
  {
    id: 'domain',
    icon: Code,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 'deployment',
    icon: Wrench,
    color: 'from-pink-500 to-rose-500',
    hasControls: true,
  },
];

interface HomeModeProps {
  language?: 'zh' | 'en';
}

export function HomeModeSimple({ language = 'zh' }: HomeModeProps) {
  const [activeSection, setActiveSection] = useState<string>('architecture');
  const [showControls, setShowControls] = useState(false);

  const translations = {
    zh: {
      title: 'NARA 主页',
      subtitle: 'AI 操作系统控制台',
      sections: {
        architecture: '系统架构',
        foundation: '基础设置',
        security: '安全控制',
        memory: '内存管理',
        skills: '技能系统',
        domain: '领域知识',
        deployment: '部署配置',
      },
      status: {
        online: '在线',
        active: '活跃',
        idle: '空闲',
      },
      actions: {
        configure: '配置',
        view: '查看',
        manage: '管理',
      },
    },
    en: {
      title: 'NARA Home',
      subtitle: 'AI Operating System Console',
      sections: {
        architecture: 'System Architecture',
        foundation: 'Foundation Settings',
        security: 'Security Controls',
        memory: 'Memory Management',
        skills: 'Skills System',
        domain: 'Domain Knowledge',
        deployment: 'Deployment Configuration',
      },
      status: {
        online: 'Online',
        active: 'Active',
        idle: 'Idle',
      },
      actions: {
        configure: 'Configure',
        view: 'View',
        manage: 'Manage',
      },
    },
  };

  const t = translations[language];

  const renderControls = () => {
    switch (activeSection) {
      case 'architecture':
        return <SystemArchitectureControlsSimple language={language} />;
      case 'security':
        return <SecurityControlsSimple language={language} />;
      case 'memory':
        return <MemoryControlsSimple language={language} />;
      case 'skills':
        return <SkillsControlsSimple language={language} />;
      case 'deployment':
        return <DeploymentControlsSimple language={language} />;
      default:
        return (
          <div className="p-8 text-center text-slate-500">
            <p>{t.sections[activeSection as keyof typeof t.sections] || 'Unknown'}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
          <p className="text-lg text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <div
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setShowControls(section.hasControls || false);
                }}
                className={`
                  relative p-6 rounded-xl cursor-pointer transition-all duration-300
                  bg-gradient-to-br ${section.color}
                  ${isActive ? 'shadow-lg scale-105' : 'shadow-md hover:scale-102'}
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {t.sections[section.id as keyof typeof t.sections] || section.id}
                    </h3>
                  </div>
                  {section.hasControls && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowControls(!showControls);
                      }}
                      aria-label="Toggle controls"
                      title="Toggle controls"
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm font-medium text-white">{t.status.online}</span>
                  </div>
                  <p className="text-sm text-white/70">
                    {section.hasControls ? t.actions.configure : t.actions.view}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {showControls && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {t.sections[activeSection as keyof typeof t.sections] || 'Unknown'} -{' '}
                {t.actions.configure}
              </h2>
              <button
                onClick={() => setShowControls(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close controls"
                title="Close controls"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            {renderControls()}
          </div>
        )}
      </div>
    </div>
  );
}
