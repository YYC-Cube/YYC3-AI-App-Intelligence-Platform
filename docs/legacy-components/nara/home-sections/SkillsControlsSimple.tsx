import { useState } from 'react';
import { Zap, Brain, Plus, Trash2, Edit2 } from 'lucide-react';

interface SkillsControlsProps {
  language?: 'zh' | 'en';
}

export function SkillsControlsSimple({ language = 'zh' }: SkillsControlsProps) {
  const [skills, setSkills] = useState([
    { id: '1', name: '数据分析', level: 85, category: 'analytics' },
    { id: '2', name: '机器学习', level: 72, category: 'ml' },
    { id: '3', name: '自然语言处理', level: 68, category: 'nlp' },
    { id: '4', name: '图像识别', level: 90, category: 'vision' },
  ]);

  const translations = {
    zh: {
      title: '技能系统',
      add: '添加技能',
      edit: '编辑',
      delete: '删除',
      level: '熟练度',
      category: '类别',
      categories: {
        analytics: '分析',
        ml: '机器学习',
        nlp: '自然语言',
        vision: '视觉',
      },
      status: {
        active: '活跃',
        learning: '学习中',
        mastered: '已掌握',
      },
    },
    en: {
      title: 'Skills System',
      add: 'Add Skill',
      edit: 'Edit',
      delete: 'Delete',
      level: 'Proficiency',
      category: 'Category',
      categories: {
        analytics: 'Analytics',
        ml: 'Machine Learning',
        nlp: 'Natural Language',
        vision: 'Vision',
      },
      status: {
        active: 'Active',
        learning: 'Learning',
        mastered: 'Mastered',
      },
    },
  };

  const t = translations[language];

  const getLevelColor = (level: number) => {
    if (level >= 80) {
      return 'from-green-500 to-emerald-500';
    }
    if (level >= 60) {
      return 'from-blue-500 to-cyan-500';
    }
    return 'from-yellow-500 to-orange-500';
  };

  const getLevelStatus = (level: number) => {
    if (level >= 80) {
      return t.status.mastered;
    }
    if (level >= 60) {
      return t.status.active;
    }
    return t.status.learning;
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          {t.add}
        </button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{skill.name}</div>
                  <div className="text-sm text-slate-600">
                    {t.categories[skill.category as keyof typeof t.categories] || skill.category}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{t.level}</span>
                <span className="font-medium text-slate-900">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${getLevelColor(skill.level)} h-2 rounded-full transition-all`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-xs text-slate-500">状态: {getLevelStatus(skill.level)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <div className="font-medium text-purple-900 mb-1">技能提升建议</div>
            <div className="text-sm text-purple-700">
              继续练习和学习可以提高技能熟练度。建议重点关注自然语言处理技能。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
