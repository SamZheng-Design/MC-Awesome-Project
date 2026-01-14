import { Hono } from 'hono'
import { html, raw } from 'hono/html'
import { agentsPageContent } from './pages-agents'
import { demoPageContent } from './pages-demo'
import { workflowPageContent, submitPageContent, dealsPageContent } from './pages-other'

const pages = new Hono()

// 通用页面模板 - 滴灌通品牌色彩版
const baseLayout = (title: string, content: string, activeNav: string = '') => html`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - MIFC智能评估系统</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap');
    body { font-family: 'Noto Sans SC', 'Inter', sans-serif; }
    
    /* 滴灌通品牌色彩 */
    :root {
      --mc-primary: #00D29E;      /* 主色-薄荷绿 */
      --mc-primary-dark: #00B88A; /* 主色深 */
      --mc-secondary: #629C85;    /* 辅助色-深绿 */
      --mc-accent: #49754D;       /* 强调色-墨绿 */
      --mc-light: #D9EDDF;        /* 浅色背景 */
      --mc-cream: #F3EED9;        /* 米黄高亮 */
      --mc-bg: #F5F9F7;           /* 页面背景 */
    }
    
    .gradient-bg { 
      background: linear-gradient(135deg, #00D29E 0%, #00B88A 50%, #629C85 100%); 
    }
    .mc-bg { background-color: var(--mc-bg); }
    .mc-primary { color: var(--mc-primary); }
    .mc-primary-bg { background-color: var(--mc-primary); }
    .mc-light-bg { background-color: var(--mc-light); }
    .mc-cream-bg { background-color: var(--mc-cream); }
    .mc-accent { color: var(--mc-accent); }
    
    .card-shadow { 
      box-shadow: 0 4px 12px -2px rgba(0, 210, 158, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04); 
    }
    .card-shadow:hover {
      box-shadow: 0 8px 24px -4px rgba(0, 210, 158, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.06);
    }
    .agent-card:hover { transform: translateY(-2px); transition: all 0.2s; }
    .pulse-dot { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .progress-ring { transition: stroke-dashoffset 0.5s; }
    
    /* Markdown样式 - 滴灌通配色 */
    .markdown-content h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937; }
    .markdown-content h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; margin-top: 1rem; color: var(--mc-accent); }
    .markdown-content h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
    .markdown-content p { margin-bottom: 0.75rem; line-height: 1.7; }
    .markdown-content ul, .markdown-content ol { margin-left: 1.5rem; margin-bottom: 0.75rem; }
    .markdown-content li { margin-bottom: 0.25rem; }
    .markdown-content code { background: var(--mc-light); padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; color: var(--mc-accent); }
    .markdown-content pre { background: #1a2e23; color: #f0fdf4; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
    .markdown-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    .markdown-content th, .markdown-content td { border: 1px solid var(--mc-light); padding: 0.5rem; text-align: left; }
    .markdown-content th { background: var(--mc-light); font-weight: 600; color: var(--mc-accent); }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    
    /* 滴灌通Logo样式 */
    .mc-logo { height: 32px; width: auto; }
    
    /* 导航栏激活状态 */
    .nav-active { background: rgba(255,255,255,0.2); border-bottom: 2px solid white; }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { 
              50: '#ecfdf5', 
              100: '#d1fae5', 
              200: '#a7f3d0',
              300: '#6ee7b7',
              400: '#34d399',
              500: '#00D29E',  /* 滴灌通主色 */
              600: '#00B88A', 
              700: '#047857',
              800: '#065f46',
              900: '#064e3b'
            },
            mc: {
              primary: '#00D29E',
              secondary: '#629C85',
              accent: '#49754D',
              light: '#D9EDDF',
              cream: '#F3EED9',
              bg: '#F5F9F7'
            },
            success: '#00D29E',
            danger: '#EF4444',
            warning: '#F59E0B'
          }
        }
      }
    }
  </script>
</head>
<body class="mc-bg min-h-screen">
  <!-- 导航栏 - MIFC风格 -->
  <nav class="gradient-bg text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <!-- MIFC Logo -->
          <a href="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <!-- Logo主体 - 现代几何设计 -->
              <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-sm">
                <!-- 背景圆角矩形 -->
                <rect x="1" y="1" width="40" height="34" rx="6" fill="white" fill-opacity="0.15"/>
                <rect x="1" y="1" width="40" height="34" rx="6" stroke="white" stroke-opacity="0.3" stroke-width="1"/>
                <!-- M -->
                <path d="M6 28V8H9L13 18L17 8H20V28H17V14L13 24L9 14V28H6Z" fill="white"/>
                <!-- I -->
                <path d="M22 28V8H25V28H22Z" fill="white"/>
                <!-- F -->
                <path d="M28 28V8H37V11H31V16H36V19H31V28H28Z" fill="white"/>
                <!-- C -->
                <path d="M42 14C42 10.5 40 8 37 8H36V11H37C38.5 11 39 12 39 14V22C39 24 38.5 25 37 25H36V28H37C40 28 42 25.5 42 22V14Z" fill="white"/>
                <!-- 装饰点 -->
                <circle cx="38" cy="5" r="2" fill="#F3EED9"/>
              </svg>
            </div>
            <div class="hidden sm:flex flex-col border-l border-white/30 pl-3">
              <span class="font-bold text-sm tracking-wide">智能评估</span>
              <span class="text-[10px] opacity-70 tracking-widest">INTELLIGENT</span>
            </div>
          </a>
          <div class="hidden md:flex space-x-1">
            <a href="/" class="px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium ${activeNav === 'dashboard' ? 'nav-active' : ''}">
              <i class="fas fa-chart-pie mr-2"></i>工作台
            </a>
            <a href="/agents" class="px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium ${activeNav === 'agents' ? 'nav-active' : ''}">
              <i class="fas fa-robot mr-2"></i>智能体
            </a>
            <a href="/workflow" class="px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium ${activeNav === 'workflow' ? 'nav-active' : ''}">
              <i class="fas fa-project-diagram mr-2"></i>工作流
            </a>
            <a href="/deals" class="px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium ${activeNav === 'deals' ? 'nav-active' : ''}">
              <i class="fas fa-folder-open mr-2"></i>标的管理
            </a>
            <a href="/submit" class="px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium ${activeNav === 'submit' ? 'nav-active' : ''}">
              <i class="fas fa-plus-circle mr-2"></i>提交申请
            </a>
            <a href="/demo" class="px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium ${activeNav === 'demo' ? 'nav-active' : ''}">
              <i class="fas fa-play-circle mr-2"></i>演示
            </a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-xs opacity-75 bg-white/10 px-2 py-1 rounded">v2.0</span>
        </div>
      </div>
    </div>
  </nav>

  <!-- 主内容 -->
  <main class="max-w-7xl mx-auto px-4 py-6">
    ${raw(content)}
  </main>

  <!-- Toast通知 -->
  <div id="toast-container" class="fixed bottom-4 right-4 z-50 space-y-2"></div>

  <script>
    // Toast通知函数 - 滴灌通配色
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const bgColor = type === 'success' ? 'bg-[#00D29E]' : type === 'error' ? 'bg-red-500' : type === 'info' ? 'bg-[#629C85]' : 'bg-amber-500';
      const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
      
      toast.className = bgColor + ' text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transform translate-x-full transition-transform duration-300';
      toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
      
      container.appendChild(toast);
      setTimeout(() => toast.classList.remove('translate-x-full'), 100);
      setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    // API调用封装
    async function apiCall(url, options = {}) {
      try {
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json', ...options.headers },
          ...options
        });
        const data = await response.json();
        if (!data.success) {
          // 提供更友好的错误信息
          const errorMsg = data.error || '请求失败';
          console.error('API错误:', url, errorMsg);
          throw new Error(errorMsg);
        }
        return data;
      } catch (error) {
        // 只有非静默模式才显示toast
        if (!options.silent) {
          showToast(error.message, 'error');
        }
        throw error;
      }
    }

    // 初始化数据库（静默模式，不显示错误）
    async function initDB() {
      try {
        const result = await fetch('/api/init-db', { method: 'POST' });
        const data = await result.json();
        if (data.success) {
          console.log('数据库初始化:', data.message);
        }
      } catch (e) {
        // 静默处理，数据库可能已初始化
        console.log('数据库检查完成');
      }
    }
    
    // 页面加载时初始化
    document.addEventListener('DOMContentLoaded', initDB);
  </script>
</body>
</html>
`

// ============================================
// Dashboard主页
// ============================================
pages.get('/', (c) => {
  const content = `
    <!-- 欢迎横幅 - MIFC风格 -->
    <div class="bg-gradient-to-r from-[#00D29E] to-[#629C85] rounded-2xl p-6 mb-8 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-2">欢迎使用 MIFC 智能评估系统</h1>
          <p class="opacity-90">AI驱动的投资标的全流程风险评估解决方案</p>
        </div>
        <div class="hidden md:flex items-center space-x-2">
          <!-- MIFC大Logo -->
          <svg width="80" height="48" viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-90">
            <text x="0" y="36" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="white" letter-spacing="2">MIFC</text>
            <rect x="0" y="42" width="80" height="3" rx="1.5" fill="white" fill-opacity="0.5"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 统计卡片 - 滴灌通配色 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 card-shadow border-l-4 border-[#00D29E]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">标的总数</p>
            <p class="text-3xl font-bold text-gray-800" id="stat-total">-</p>
          </div>
          <div class="w-12 h-12 bg-[#D9EDDF] rounded-xl flex items-center justify-center">
            <i class="fas fa-folder text-[#00D29E] text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 card-shadow border-l-4 border-[#629C85]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">已通过</p>
            <p class="text-3xl font-bold text-[#00D29E]" id="stat-passed">-</p>
          </div>
          <div class="w-12 h-12 bg-[#D9EDDF] rounded-xl flex items-center justify-center">
            <i class="fas fa-check-circle text-[#629C85] text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 card-shadow border-l-4 border-[#F3EED9]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">处理中</p>
            <p class="text-3xl font-bold text-amber-600" id="stat-pending">-</p>
          </div>
          <div class="w-12 h-12 bg-[#F3EED9] rounded-xl flex items-center justify-center">
            <i class="fas fa-clock text-amber-500 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 card-shadow border-l-4 border-[#49754D]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">智能体数量</p>
            <p class="text-3xl font-bold text-[#49754D]" id="stat-agents">10</p>
          </div>
          <div class="w-12 h-12 bg-[#D9EDDF] rounded-xl flex items-center justify-center">
            <i class="fas fa-robot text-[#49754D] text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作和智能体状态 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 快速操作 -->
      <div class="bg-white rounded-xl p-6 card-shadow">
        <h3 class="text-lg font-semibold mb-4 flex items-center text-[#49754D]">
          <i class="fas fa-bolt text-[#00D29E] mr-2"></i>
          快速操作
        </h3>
        <div class="space-y-3">
          <a href="/submit" class="block w-full bg-gradient-to-r from-[#00D29E] to-[#00B88A] text-white py-3 px-4 rounded-lg hover:opacity-90 transition text-center font-medium">
            <i class="fas fa-plus mr-2"></i>提交新标的
          </a>
          <a href="/demo" class="block w-full bg-[#629C85] text-white py-3 px-4 rounded-lg hover:bg-[#49754D] transition text-center font-medium">
            <i class="fas fa-play mr-2"></i>运行演示评估
          </a>
          <a href="/agents" class="block w-full border-2 border-[#D9EDDF] text-[#49754D] py-3 px-4 rounded-lg hover:bg-[#D9EDDF] transition text-center font-medium">
            <i class="fas fa-cog mr-2"></i>配置智能体
          </a>
        </div>
      </div>

      <!-- 智能体状态 -->
      <div class="lg:col-span-2 bg-white rounded-xl p-6 card-shadow">
        <h3 class="text-lg font-semibold mb-4 flex items-center text-[#49754D]">
          <i class="fas fa-robot text-[#00D29E] mr-2"></i>
          智能体状态
        </h3>
        <div id="agents-status" class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <!-- 动态加载 -->
        </div>
      </div>
    </div>

    <!-- 最近标的 -->
    <div class="bg-white rounded-xl p-6 card-shadow">
      <h3 class="text-lg font-semibold mb-4 flex items-center text-[#49754D]">
        <i class="fas fa-history text-[#00D29E] mr-2"></i>
        最近标的
      </h3>
      <div id="recent-deals" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 text-gray-600 font-medium">ID</th>
              <th class="text-left py-3 px-4 text-gray-600 font-medium">企业名称</th>
              <th class="text-left py-3 px-4 text-gray-600 font-medium">行业</th>
              <th class="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
              <th class="text-left py-3 px-4 text-gray-600 font-medium">评分</th>
              <th class="text-left py-3 px-4 text-gray-600 font-medium">操作</th>
            </tr>
          </thead>
          <tbody id="deals-tbody">
            <!-- 动态加载 -->
          </tbody>
        </table>
      </div>
    </div>

    <script>
      // 加载统计数据
      async function loadStats() {
        try {
          const { data } = await apiCall('/api/stats');
          document.getElementById('stat-total').textContent = data.totalDeals;
          document.getElementById('stat-passed').textContent = data.passedDeals;
          document.getElementById('stat-pending').textContent = data.pendingDeals;
          document.getElementById('stat-agents').textContent = data.totalAgents;
        } catch (e) {}
      }

      // 加载智能体状态
      async function loadAgentsStatus() {
        try {
          const { data } = await apiCall('/api/agents');
          const container = document.getElementById('agents-status');
          container.innerHTML = data.slice(0, 10).map(agent => {
            const shortName = agent.name.replace('智能体', '').replace('打分', '');
            return '<div class="flex items-center space-x-2 p-2 rounded-lg ' + (agent.is_enabled ? 'bg-green-50' : 'bg-gray-50') + '">' +
              '<i class="' + agent.icon + '" style="color: ' + agent.icon_color + '"></i>' +
              '<span class="text-sm truncate">' + shortName + '</span>' +
              '<span class="w-2 h-2 rounded-full ' + (agent.is_enabled ? 'bg-green-500 pulse-dot' : 'bg-gray-400') + '"></span>' +
            '</div>';
          }).join('');
        } catch (e) {}
      }

      // 加载最近标的
      async function loadRecentDeals() {
        try {
          const { data } = await apiCall('/api/deals');
          const tbody = document.getElementById('deals-tbody');
          if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-500">暂无标的数据</td></tr>';
            return;
          }
          
          const statusMap = {
            pending: { label: '待处理', cls: 'bg-gray-100 text-gray-600' },
            outer: { label: '筛子体系', cls: 'bg-blue-100 text-blue-600' },
            evaluation: { label: '评估中', cls: 'bg-yellow-100 text-yellow-600' },
            review: { label: '待审核', cls: 'bg-purple-100 text-purple-600' },
            completed: { label: '已完成', cls: 'bg-green-100 text-green-600' },
            rejected: { label: '已拒绝', cls: 'bg-red-100 text-red-600' }
          };
          
          const industryMap = {
            'light-asset': '轻资产',
            'ecommerce': '电商',
            'overseas': '海外',
            'retail': '零售'
          };
          
          tbody.innerHTML = data.slice(0, 5).map(deal => {
            const status = statusMap[deal.status] || { label: deal.status, cls: 'bg-gray-100' };
            return '<tr class="border-b hover:bg-gray-50">' +
              '<td class="py-3 px-4 font-mono text-sm">' + deal.id + '</td>' +
              '<td class="py-3 px-4">' + deal.company_name + '</td>' +
              '<td class="py-3 px-4">' + (industryMap[deal.industry] || deal.industry) + '</td>' +
              '<td class="py-3 px-4"><span class="px-2 py-1 rounded text-xs ' + status.cls + '">' + status.label + '</span></td>' +
              '<td class="py-3 px-4">' + (deal.total_score ? deal.total_score.toFixed(1) : '-') + '</td>' +
              '<td class="py-3 px-4"><a href="/deals?id=' + deal.id + '" class="text-primary-500 hover:text-primary-700"><i class="fas fa-eye"></i></a></td>' +
            '</tr>';
          }).join('');
        } catch (e) {}
      }

      // 初始化
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          loadStats();
          loadAgentsStatus();
          loadRecentDeals();
        }, 500);
      });
    </script>
  `
  return c.html(baseLayout('Dashboard', content, 'dashboard'))
})

// 智能体配置页面
pages.get('/agents', (c) => {
  return c.html(baseLayout('智能体配置', agentsPageContent, 'agents'))
})

// 工作流页面
pages.get('/workflow', (c) => {
  return c.html(baseLayout('工作流编排', workflowPageContent, 'workflow'))
})

// 标的管理页面
pages.get('/deals', (c) => {
  return c.html(baseLayout('标的管理', dealsPageContent, 'deals'))
})

// 提交申请页面
pages.get('/submit', (c) => {
  return c.html(baseLayout('提交申请', submitPageContent, 'submit'))
})

// Demo演示页面
pages.get('/demo', (c) => {
  return c.html(baseLayout('Cardi B演示', demoPageContent, 'demo'))
})

export default pages
