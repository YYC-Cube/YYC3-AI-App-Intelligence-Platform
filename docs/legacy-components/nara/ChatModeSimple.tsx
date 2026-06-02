import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Menu,
  MoreVertical,
  Plus,
  Send,
} from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  status?: 'completed' | 'running' | 'failed';
}

interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  status: 'idle' | 'processing' | 'completed' | 'error';
  lastActivity: Date;
  projectId?: string;
}

const translations = {
  zh: {
    new_chat: '新对话',
    chat_sessions: '对话会话',
    ungrouped: '未分组',
    input_placeholder: '描述您的任务或询问状态...',
    projects: {
      p1: '营销活动',
      p2: '产品发布',
      p3: '内容策略',
    },
    sessions: {
      market_analysis: '市场分析任务',
      ui_optimization: 'UI/UX 优化',
      content_gen: '内容生成',
      comp_research: '竞争对手研究',
      new_task: '新任务',
    },
    system_messages: {
      processing: '我正在分析...',
      analyzing: '正在处理：\n\n1. 数据收集\n2. 特征映射\n3. 情感分析\n\n预计时间：2分钟',
      complete:
        '优化完成！结果如下：\n\n✓ 步骤从7减少到4\n✓ 添加进度指示器\n✓ 实施智能默认值\n✓ 创建A/B测试变体\n\n预期转化率提升：+28%',
      welcome: '新会话已开始。今天我能为您做什么？',
    },
    status: {
      processing: '处理中',
      completed: '已完成',
      error: '错误',
    },
    actions: {
      send: '发送',
      new: '新建',
      more: '更多',
    },
  },
  en: {
    new_chat: 'New Chat',
    chat_sessions: 'Chat Sessions',
    ungrouped: 'Ungrouped',
    input_placeholder: 'Describe your task or ask for status...',
    projects: {
      p1: 'Marketing Campaign',
      p2: 'Product Launch',
      p3: 'Content Strategy',
    },
    sessions: {
      market_analysis: 'Market Analysis Task',
      ui_optimization: 'UI/UX Optimization',
      content_gen: 'Content Generation',
      comp_research: 'Competitor Research',
      new_task: 'New Task',
    },
    system_messages: {
      processing: 'I am analyzing...',
      analyzing:
        'Processing:\n\n1. Data collection\n2. Feature mapping\n3. Sentiment analysis\n\nEstimated time: 2 minutes',
      complete:
        'Optimization complete! Results:\n\n✓ Reduced steps from 7 to 4\n✓ Added progress indicators\n✓ Implemented smart defaults\n✓ Created A/B test variants\n\nExpected conversion improvement: +28%',
      welcome: 'New session started. What can I help you with today?',
    },
    status: {
      processing: 'Processing',
      completed: 'Completed',
      error: 'Error',
    },
    actions: {
      send: 'Send',
      new: 'New',
      more: 'More',
    },
  },
};

interface ChatModeProps {
  language?: 'zh' | 'en';
}

export function ChatModeSimple({ language = 'zh' }: ChatModeProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      name: translations[language].sessions.market_analysis,
      messages: [
        {
          id: '1-1',
          role: 'user',
          content: '分析当前市场趋势',
          timestamp: new Date(),
          status: 'completed',
        },
        {
          id: '1-2',
          role: 'assistant',
          content: translations[language].system_messages.analyzing,
          timestamp: new Date(),
          status: 'running',
        },
      ],
      status: 'processing',
      lastActivity: new Date(),
    },
    {
      id: '2',
      name: translations[language].sessions.ui_optimization,
      messages: [
        {
          id: '2-1',
          role: 'assistant',
          content: translations[language].system_messages.complete,
          timestamp: new Date(),
          status: 'completed',
        },
      ],
      status: 'completed',
      lastActivity: new Date(),
    },
  ]);

  const [activeSessionId, setActiveSessionId] = useState('1');
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const t = translations[language];
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const handleSendMessage = () => {
    if (!inputValue.trim()) {
      return;
    }

    const newMessage: Message = {
      id: `${activeSessionId}-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      status: 'completed',
    };

    setSessions(
      sessions.map((session) => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, newMessage],
            lastActivity: new Date(),
            status: 'processing',
          };
        }
        return session;
      })
    );

    setInputValue('');
  };

  return (
    <div className="flex h-full">
      <aside
        className={`
        ${isSidebarOpen ? 'w-80' : 'w-0'}
        transition-all duration-300
        border-r border-slate-200 bg-white
        overflow-hidden
      `}
      >
        <div className="p-4 border-b border-slate-200">
          <button
            type="button"
            className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t.new_chat}</span>
          </button>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {t.chat_sessions}
          </div>
          <div className="space-y-2">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`
                  w-full text-left p-3 rounded-lg transition-all
                  ${
                    activeSessionId === session.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-slate-50 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900">{session.name}</span>
                  {session.status === 'processing' && (
                    <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                  )}
                  {session.status === 'completed' && (
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  )}
                  {session.status === 'error' && <AlertCircle className="w-3 h-3 text-red-600" />}
                </div>
                <div className="text-xs text-slate-500">{session.messages.length} messages</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900">{activeSession?.name}</h2>
            <button
              type="button"
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="More options"
              title="More options"
            >
              <MoreVertical className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {activeSession?.messages.map((message) => (
            <div
              key={message.id}
              className={`
                flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}
              `}
            >
              <div
                className={`
                  max-w-[70%] p-4 rounded-lg
                  ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }
                `}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                  <Clock className="w-3 h-3" />
                  {message.timestamp.toLocaleTimeString()}
                  {message.status === 'running' && <Loader2 className="w-3 h-3 animate-spin" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t.input_placeholder}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.actions.send}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
