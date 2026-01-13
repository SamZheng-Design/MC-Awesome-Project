import { Hono } from 'hono'
import { html } from 'hono/html'
import { agentsPageContent } from './pages-agents'
import { demoPageContent } from './pages-demo'
import { workflowPageContent, submitPageContent, dealsPageContent } from './pages-other'

const pages = new Hono()

// 通用页面模板
const baseLayout = (title: string, content: string, activeNav: string = '') => html`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - 滴灌通智能体筛选系统</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
    .gradient-bg { background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); }
    .card-shadow { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .agent-card:hover { transform: translateY(-2px); transition: all 0.2s; }
    .pulse-dot { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .progress-ring { transition: stroke-dashoffset 0.5s; }
    .markdown-content h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
    .markdown-content h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; margin-top: 1rem; }
    .markdown-content h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
    .markdown-content p { margin-bottom: 0.75rem; line-height: 1.6; }
    .markdown-content ul, .markdown-content ol { margin-left: 1.5rem; margin-bottom: 0.75rem; }
    .markdown-content li { margin-bottom: 0.25rem; }
    .markdown-content code { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; }
    .markdown-content pre { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
    .markdown-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    .markdown-content th, .markdown-content td { border: 1px solid #e5e7eb; padding: 0.5rem; text-align: left; }
    .markdown-content th { background: #f9fafb; font-weight: 600; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { 50: '#eef2ff', 100: '#e0e7ff', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
            success: '#10B981',
            danger: '#EF4444',
            warning: '#F59E0B'
          }
        }
      }
    }
  </script>
</head>
<body class="bg-gray-50 min-h-screen">
  <!-- 导航栏 -->
  <nav class="gradient-bg text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <a href="/" class="flex items-center space-x-2">
            <i class="fas fa-robot text-2xl"></i>
            <span class="font-bold text-lg">DGT Intelligence</span>
          </a>
          <div class="hidden md:flex space-x-1">
            <a href="/" class="px-4 py-2 rounded-lg hover:bg-white/10 transition ${activeNav === 'dashboard' ? 'bg-white/20' : ''}">
              <i class="fas fa-chart-pie mr-2"></i>Dashboard
            </a>
            <a href="/agents" class="px-4 py-2 rounded-lg hover:bg-white/10 transition ${activeNav === 'agents' ? 'bg-white/20' : ''}">
              <i class="fas fa-robot mr-2"></i>智能体
            </a>
            <a href="/workflow" class="px-4 py-2 rounded-lg hover:bg-white/10 transition ${activeNav === 'workflow' ? 'bg-white/20' : ''}">
              <i class="fas fa-project-diagram mr-2"></i>工作流
            </a>
            <a href="/deals" class="px-4 py-2 rounded-lg hover:bg-white/10 transition ${activeNav === 'deals' ? 'bg-white/20' : ''}">
              <i class="fas fa-folder-open mr-2"></i>标的管理
            </a>
            <a href="/submit" class="px-4 py-2 rounded-lg hover:bg-white/10 transition ${activeNav === 'submit' ? 'bg-white/20' : ''}">
              <i class="fas fa-plus-circle mr-2"></i>提交申请
            </a>
            <a href="/demo" class="px-4 py-2 rounded-lg hover:bg-white/10 transition ${activeNav === 'demo' ? 'bg-white/20' : ''}">
              <i class="fas fa-play-circle mr-2"></i>演示
            </a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-sm opacity-75">v1.0.0</span>
        </div>
      </div>
    </div>
  </nav>

  <!-- 主内容 -->
  <main class="max-w-7xl mx-auto px-4 py-6">
    ${content}
  </main>

  <!-- Toast通知 -->
  <div id="toast-container" class="fixed bottom-4 right-4 z-50 space-y-2"></div>

  <script>
    // Toast通知函数
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';
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
        if (!data.success) throw new Error(data.error || '请求失败');
        return data;
      } catch (error) {
        showToast(error.message, 'error');
        throw error;
      }
    }

    // 初始化数据库
    async function initDB() {
      try {
        const result = await apiCall('/api/init-db', { method: 'POST' });
        console.log('数据库初始化:', result);
      } catch (e) {
        console.log('数据库可能已初始化');
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
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 card-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">标的总数</p>
            <p class="text-3xl font-bold text-gray-800" id="stat-total">-</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="fas fa-folder text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 card-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">已通过</p>
            <p class="text-3xl font-bold text-green-600" id="stat-passed">-</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="fas fa-check-circle text-green-500 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 card-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">处理中</p>
            <p class="text-3xl font-bold text-yellow-600" id="stat-pending">-</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <i class="fas fa-clock text-yellow-500 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 card-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">智能体数量</p>
            <p class="text-3xl font-bold text-purple-600" id="stat-agents">10</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <i class="fas fa-robot text-purple-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作和智能体状态 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 快速操作 -->
      <div class="bg-white rounded-xl p-6 card-shadow">
        <h3 class="text-lg font-semibold mb-4 flex items-center">
          <i class="fas fa-bolt text-yellow-500 mr-2"></i>
          快速操作
        </h3>
        <div class="space-y-3">
          <a href="/submit" class="block w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition text-center">
            <i class="fas fa-plus mr-2"></i>提交新标的
          </a>
          <a href="/demo" class="block w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition text-center">
            <i class="fas fa-play mr-2"></i>运行Cardi B演示
          </a>
          <a href="/agents" class="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition text-center">
            <i class="fas fa-cog mr-2"></i>配置智能体
          </a>
        </div>
      </div>

      <!-- 智能体状态 -->
      <div class="lg:col-span-2 bg-white rounded-xl p-6 card-shadow">
        <h3 class="text-lg font-semibold mb-4 flex items-center">
          <i class="fas fa-robot text-purple-500 mr-2"></i>
          智能体状态
        </h3>
        <div id="agents-status" class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <!-- 动态加载 -->
        </div>
      </div>
    </div>

    <!-- 最近标的 -->
    <div class="bg-white rounded-xl p-6 card-shadow">
      <h3 class="text-lg font-semibold mb-4 flex items-center">
        <i class="fas fa-history text-blue-500 mr-2"></i>
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
            outer: { label: '外环筛选', cls: 'bg-blue-100 text-blue-600' },
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
