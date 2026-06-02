import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2,
  Pause,
  Play,
  Square,
} from 'lucide-react';
import { useState } from 'react';

interface WorkflowStep {
  id: string;
  nameKey: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress?: number;
  duration?: string;
  outputKey?: string;
  outputParams?: string[];
}

interface Workflow {
  id: string;
  nameKey: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  currentStep?: number;
  totalSteps: number;
  startTime?: Date;
  steps: WorkflowStep[];
  type: 'analysis' | 'optimization' | 'generation' | 'monitoring';
}

const translations = {
  zh: {
    live_loops: '实时执行循环',
    active: '活跃',
    completed: '已完成',
    step: '步骤',
    of: '/',
    types: {
      analysis: '分析',
      optimization: '优化',
      generation: '生成',
      monitoring: '监控',
    },
    workflows: {
      market_analysis: '市场分析流水线',
      ui_optimization: 'UI 组件优化',
      content_gen: '内容生成循环',
      monitoring: '实时用户监控',
      steps: {
        data_coll: '数据收集',
        pattern_rec: '模式识别',
        trend_analysis: '趋势分析',
        insight_gen: '洞察生成',
        report_comp: '报告编译',
        perf_audit: '性能审计',
        a_b_testing: 'A/B 测试',
        deployment: '部署',
      },
      outputs: {
        trend_report: '趋势报告',
        opt_plan: '优化计划',
        content_items: '内容项目',
        alerts: '警报',
      },
    },
    actions: {
      start: '开始',
      pause: '暂停',
      stop: '停止',
      restart: '重新开始',
    },
    status: {
      idle: '空闲',
      running: '运行中',
      paused: '已暂停',
      completed: '已完成',
      failed: '失败',
    },
    time: {
      seconds: '秒',
      minutes: '分钟',
      hours: '小时',
    },
  },
  en: {
    live_loops: 'Live Execution Loops',
    active: 'Active',
    completed: 'Completed',
    step: 'Step',
    of: '/',
    types: {
      analysis: 'Analysis',
      optimization: 'Optimization',
      generation: 'Generation',
      monitoring: 'Monitoring',
    },
    workflows: {
      market_analysis: 'Market Analysis Pipeline',
      ui_optimization: 'UI Component Optimization',
      content_gen: 'Content Generation Loop',
      monitoring: 'Real-time User Monitoring',
      steps: {
        data_coll: 'Data Collection',
        pattern_rec: 'Pattern Recognition',
        trend_analysis: 'Trend Analysis',
        insight_gen: 'Insight Generation',
        report_comp: 'Report Compilation',
        perf_audit: 'Performance Audit',
        a_b_testing: 'A/B Testing',
        deployment: 'Deployment',
      },
      outputs: {
        trend_report: 'Trend Report',
        opt_plan: 'Optimization Plan',
        content_items: 'Content Items',
        alerts: 'Alerts',
      },
    },
    actions: {
      start: 'Start',
      pause: 'Pause',
      stop: 'Stop',
      restart: 'Restart',
    },
    status: {
      idle: 'Idle',
      running: 'Running',
      paused: 'Paused',
      completed: 'Completed',
      failed: 'Failed',
    },
    time: {
      seconds: 'seconds',
      minutes: 'minutes',
      hours: 'hours',
    },
  },
};

interface LoopModeProps {
  language?: 'zh' | 'en';
}

export function LoopModeSimple({ language = 'zh' }: LoopModeProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      nameKey: 'market_analysis',
      status: 'running',
      currentStep: 2,
      totalSteps: 5,
      startTime: new Date(Date.now() - 300000),
      steps: [
        { id: '1-1', nameKey: 'data_coll', status: 'completed', duration: '45s' },
        { id: '1-2', nameKey: 'pattern_rec', status: 'completed', duration: '60s' },
        { id: '1-3', nameKey: 'trend_analysis', status: 'running', progress: 65 },
        { id: '1-4', nameKey: 'insight_gen', status: 'pending' },
        { id: '1-5', nameKey: 'report_comp', status: 'pending' },
      ],
      type: 'analysis',
    },
    {
      id: '2',
      nameKey: 'ui_optimization',
      status: 'completed',
      currentStep: 4,
      totalSteps: 4,
      startTime: new Date(Date.now() - 600000),
      steps: [
        { id: '2-1', nameKey: 'perf_audit', status: 'completed', duration: '30s' },
        { id: '2-2', nameKey: 'a_b_testing', status: 'completed', duration: '120s' },
        { id: '2-3', nameKey: 'deployment', status: 'completed', duration: '45s' },
        { id: '2-4', nameKey: 'deployment', status: 'completed', duration: '20s' },
      ],
      type: 'optimization',
    },
    {
      id: '3',
      nameKey: 'content_gen',
      status: 'idle',
      currentStep: 0,
      totalSteps: 3,
      steps: [
        { id: '3-1', nameKey: 'data_coll', status: 'pending' },
        { id: '3-2', nameKey: 'trend_analysis', status: 'pending' },
        { id: '3-3', nameKey: 'insight_gen', status: 'pending' },
      ],
      type: 'generation',
    },
  ]);

  const t = translations[language];

  const handleWorkflowAction = (
    workflowId: string,
    action: 'start' | 'pause' | 'stop' | 'restart'
  ) => {
    setWorkflows(
      workflows.map((workflow) => {
        if (workflow.id !== workflowId) {
          return workflow;
        }

        switch (action) {
          case 'start':
            return {
              ...workflow,
              status: 'running',
              startTime: new Date(),
              currentStep: 0,
            };
          case 'pause':
            return {
              ...workflow,
              status: 'paused',
            };
          case 'stop':
            return {
              ...workflow,
              status: 'idle',
              currentStep: 0,
            };
          case 'restart':
            return {
              ...workflow,
              status: 'running',
              startTime: new Date(),
              currentStep: 0,
            };
          default:
            return workflow;
        }
      })
    );
  };

  const getWorkflowStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'running':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'paused':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStepStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 border-2 border-slate-300 rounded-full" />;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.live_loops}</h1>
          <p className="text-lg text-slate-600">
            {workflows.filter((w) => w.status === 'running').length} {t.active},{' '}
            {workflows.filter((w) => w.status === 'completed').length} {t.completed}
          </p>
        </div>

        <div className="space-y-6">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {String(t.workflows[workflow.nameKey as keyof typeof t.workflows])}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getWorkflowStatusColor(workflow.status)}`}
                    >
                      {t.status[workflow.status]}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {t.types[workflow.type]}
                    </span>
                  </div>
                  {workflow.status === 'running' && workflow.currentStep !== undefined && (
                    <div className="text-sm text-slate-600">
                      {t.step} {workflow.currentStep} {t.of} {workflow.totalSteps}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {workflow.status === 'idle' && (
                    <button
                      onClick={() => handleWorkflowAction(workflow.id, 'start')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Play className="w-4 h-4" />
                      {t.actions.start}
                    </button>
                  )}
                  {workflow.status === 'running' && (
                    <button
                      onClick={() => handleWorkflowAction(workflow.id, 'pause')}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Pause className="w-4 h-4" />
                      {t.actions.pause}
                    </button>
                  )}
                  {workflow.status === 'paused' && (
                    <>
                      <button
                        onClick={() => handleWorkflowAction(workflow.id, 'start')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Play className="w-4 h-4" />
                        {t.actions.start}
                      </button>
                      <button
                        onClick={() => handleWorkflowAction(workflow.id, 'stop')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Square className="w-4 h-4" />
                        {t.actions.stop}
                      </button>
                    </>
                  )}
                  {(workflow.status === 'completed' || workflow.status === 'failed') && (
                    <button
                      onClick={() => handleWorkflowAction(workflow.id, 'restart')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Play className="w-4 h-4" />
                      {t.actions.restart}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {workflow.steps.map((step, _index) => (
                  <div
                    key={step.id}
                    className={`
                      flex items-center gap-4 p-4 rounded-lg transition-all
                      ${step.status === 'running' ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getStepStatusIcon(step.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900">
                            {t.workflows.steps[step.nameKey as keyof typeof t.workflows.steps] ||
                              step.nameKey}
                          </span>
                          {step.duration && (
                            <span className="text-xs text-slate-500">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {step.duration}
                            </span>
                          )}
                        </div>
                        {step.status === 'running' && step.progress !== undefined && (
                          <div className="mt-2">
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${step.progress}%` }}
                              />
                            </div>
                            <div className="text-xs text-slate-600 mt-1">{step.progress}%</div>
                          </div>
                        )}
                      </div>
                    </div>
                    {step.status !== 'pending' && (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
