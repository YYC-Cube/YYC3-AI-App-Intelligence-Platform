import { useState } from 'react';
import { Shield, Lock, Key, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';

interface SecurityControlsProps {
  language?: 'zh' | 'en';
}

export function SecurityControlsSimple({ language = 'zh' }: SecurityControlsProps) {
  const [_showPassword, _setShowPassword] = useState(false);

  const translations = {
    zh: {
      title: '安全控制',
      authentication: '身份验证',
      encryption: '加密设置',
      access: '访问控制',
      status: {
        secure: '安全',
        warning: '警告',
        insecure: '不安全',
      },
      settings: {
        twoFactor: '双因素认证',
        encryption: '端到端加密',
        password: '密码强度',
        access: '访问权限',
      },
      levels: {
        high: '高',
        medium: '中',
        low: '低',
      },
    },
    en: {
      title: 'Security Controls',
      authentication: 'Authentication',
      encryption: 'Encryption Settings',
      access: 'Access Control',
      status: {
        secure: 'Secure',
        warning: 'Warning',
        insecure: 'Insecure',
      },
      settings: {
        twoFactor: 'Two-Factor Authentication',
        encryption: 'End-to-End Encryption',
        password: 'Password Strength',
        access: 'Access Permissions',
      },
      levels: {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
      },
    },
  };

  const t = translations[language];

  const securityItems = [
    {
      id: 'twoFactor',
      label: t.settings.twoFactor,
      status: 'secure',
      icon: Key,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'encryption',
      label: t.settings.encryption,
      status: 'secure',
      icon: Lock,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'password',
      label: t.settings.password,
      status: 'warning',
      icon: Eye,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'access',
      label: t.settings.access,
      status: 'secure',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'insecure':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    return t.status[status as keyof typeof t.status] || status;
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-4">{t.title}</h3>

      <div className="space-y-4">
        {securityItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-gradient-to-br ${item.color} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{item.label}</div>
                    <div className="text-sm text-slate-600">{getStatusText(item.status)}</div>
                  </div>
                </div>
                {getStatusIcon(item.status)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <div className="font-medium text-green-900 mb-1">安全状态良好</div>
            <div className="text-sm text-green-700">大部分安全设置已启用，建议定期检查和更新。</div>
          </div>
        </div>
      </div>
    </div>
  );
}
