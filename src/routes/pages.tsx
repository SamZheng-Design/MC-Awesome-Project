import { Hono } from 'hono'
import { html, raw } from 'hono/html'
import { agentsPageContent } from './pages-agents'
import { demoPageContent } from './pages-demo'
import { workflowPageContent, submitPageContent, dealsPageContent } from './pages-other'
import { dealDetailPageContent } from './pages-deal-detail'

const pages = new Hono()

// 通用页面模板 - GenSpark专业风格设计
const baseLayout = (title: string, content: string, activeNav: string = '') => html`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - 滴灌投资智能评估系统</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap');
    body { font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif; }
    
    /* 滴灌投资配色方案 - 深色护眼主题 */
    /* 基于用户上传配色：奶油色(243,238,217)、青绿色(0,210,158)、深绿(98,156,133)、薄荷浅(217,237,223)、森林绿(73,117,77) */
    :root {
      --dg-primary: #00B386;        /* 主色-深青绿 (暗化后的青绿色) */
      --dg-primary-light: #00D29E; /* 主色浅-原青绿色 */
      --dg-primary-dark: #008A68;  /* 主色深 */
      --dg-secondary: #49754D;     /* 辅助色-森林绿 (73-117-77) */
      --dg-accent: #629C85;        /* 强调色-灰绿 (98-156-133) */
      --dg-success: #3D7A5A;       /* 成功色-深绿 */
      --dg-danger: #A85454;        /* 危险色-柔和深红 */
      --dg-warning: #9A7B4E;       /* 警告色-深棕 */
      --dg-info: #4A7896;          /* 信息色-深灰蓝 */
      --dg-dark: #1E2B1E;          /* 深色背景-深绿灰 (更深) */
      --dg-dark-secondary: #283528;/* 次深色背景 */
      --dg-dark-tertiary: #354435; /* 第三层深色 */
      --dg-light: #E8E4D4;         /* 浅色背景-暗化后的奶油色 */
      --dg-light-secondary: #DDD9C8;/* 次浅色背景 */
      --dg-light-tertiary: #C9DFD0; /* 暗化后的薄荷浅色 */
      --dg-border: #A8B8A8;        /* 边框色-深绿灰 */
      --dg-text-primary: #1E2B1E;  /* 主文字色-深绿灰 */
      --dg-text-secondary: #4A5B4A;/* 次要文字色 */
      --dg-text-muted: #6A7B6A;    /* 弱化文字色 */
      --dg-card-bg: #F0EDE0;       /* 卡片背景色-暗化的奶油色 */
    }
    
    /* 渐变效果 - 深色护眼 */
    .gs-gradient-primary { 
      background: linear-gradient(135deg, var(--dg-primary) 0%, var(--dg-secondary) 100%); 
    }
    .gs-gradient-dark { 
      background: linear-gradient(180deg, var(--dg-dark) 0%, var(--dg-dark-secondary) 100%); 
    }
    .gs-gradient-hero {
      background: linear-gradient(135deg, #2D4A38 0%, #1E3528 50%, #3A5542 100%);
    }
    
    /* 背景色 */
    .gs-bg { background-color: var(--dg-light); }
    .gs-bg-dark { background-color: var(--dg-dark); }
    
    /* 卡片样式 - 柔和阴影 */
    .gs-card { 
      background: var(--dg-card-bg);
      border-radius: 12px;
      border: 1px solid var(--dg-border);
      box-shadow: 0 2px 8px rgba(45, 59, 45, 0.06);
      transition: all 0.2s ease;
    }
    .gs-card:hover {
      box-shadow: 0 4px 16px rgba(45, 59, 45, 0.1);
      transform: translateY(-1px);
    }
    .gs-card-flat {
      background: var(--dg-card-bg);
      border-radius: 12px;
      border: 1px solid var(--dg-border);
    }
    
    /* 按钮样式 */
    .gs-btn {
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .gs-btn-primary {
      background: var(--dg-primary);
      color: white;
    }
    .gs-btn-primary:hover {
      background: var(--dg-primary-dark);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 166, 126, 0.3);
    }
    .gs-btn-secondary {
      background: var(--dg-light-secondary);
      color: var(--dg-text-primary);
      border: 1px solid var(--dg-border);
    }
    .gs-btn-secondary:hover {
      background: var(--dg-border);
    }
    .gs-btn-ghost {
      background: transparent;
      color: var(--dg-text-secondary);
    }
    .gs-btn-ghost:hover {
      background: var(--dg-light-secondary);
      color: var(--dg-primary);
    }
    
    /* 输入框样式 */
    .gs-input {
      border: 1px solid var(--dg-border);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 14px;
      transition: all 0.15s ease;
      background: var(--dg-card-bg);
    }
    .gs-input:focus {
      outline: none;
      border-color: var(--dg-primary);
      box-shadow: 0 0 0 3px rgba(0, 166, 126, 0.1);
    }
    
    /* 徽章样式 */
    .gs-badge {
      font-size: 12px;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .gs-badge-primary { background: rgba(0, 166, 126, 0.12); color: var(--dg-primary); }
    .gs-badge-success { background: rgba(61, 139, 95, 0.12); color: var(--dg-success); }
    .gs-badge-warning { background: rgba(184, 149, 110, 0.15); color: var(--dg-warning); }
    .gs-badge-danger { background: rgba(196, 92, 92, 0.12); color: var(--dg-danger); }
    .gs-badge-info { background: rgba(91, 143, 168, 0.12); color: var(--dg-info); }
    .gs-badge-neutral { background: var(--dg-light-secondary); color: var(--dg-text-secondary); }
    
    /* 动画效果 */
    .gs-fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    .pulse-dot { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    
    /* 表格样式 */
    .gs-table { width: 100%; border-collapse: collapse; }
    .gs-table th {
      text-align: left;
      padding: 12px 16px;
      font-size: 12px;
      font-weight: 600;
      color: var(--dg-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--dg-light-secondary);
      border-bottom: 1px solid var(--dg-border);
    }
    .gs-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--dg-border);
      color: var(--dg-text-primary);
    }
    .gs-table tr:hover td {
      background: var(--dg-light);
    }
    
    /* Markdown样式 */
    .markdown-content h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--dg-text-primary); }
    .markdown-content h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; margin-top: 1rem; color: var(--dg-primary); }
    .markdown-content h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
    .markdown-content p { margin-bottom: 0.75rem; line-height: 1.7; }
    .markdown-content ul, .markdown-content ol { margin-left: 1.5rem; margin-bottom: 0.75rem; }
    .markdown-content li { margin-bottom: 0.25rem; }
    .markdown-content code { background: var(--dg-light-secondary); padding: 0.125rem 0.375rem; border-radius: 4px; font-size: 0.875rem; color: var(--dg-primary); }
    .markdown-content pre { background: var(--dg-dark); color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1rem; }
    .markdown-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    .markdown-content th, .markdown-content td { border: 1px solid var(--dg-border); padding: 0.5rem; text-align: left; }
    .markdown-content th { background: var(--dg-light-secondary); font-weight: 600; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    
    /* 导航栏样式 */
    .nav-item {
      position: relative;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,0.8);
      border-radius: 8px;
      transition: all 0.15s ease;
    }
    .nav-item:hover {
      color: white;
      background: rgba(255,255,255,0.12);
    }
    .nav-item.active {
      color: white;
      background: rgba(255,255,255,0.18);
    }
    .nav-item.active::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 3px;
      background: rgba(255,255,255,0.9);
      border-radius: 2px;
    }
    
    /* 滚动条样式 */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--dg-light-secondary); }
    ::-webkit-scrollbar-thumb { background: var(--dg-border); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--dg-text-muted); }
    
    /* 兼容旧样式 */
    .card-shadow { box-shadow: 0 2px 8px rgba(45, 59, 45, 0.06); }
    .agent-card:hover { transform: translateY(-2px); transition: all 0.2s; }
    .progress-ring { transition: stroke-dashoffset 0.5s; }
    .mc-bg { background-color: var(--dg-light); }
    .mc-primary { color: var(--dg-primary); }
    .mc-light-bg { background-color: var(--dg-light-secondary); }
    .gradient-bg { background: linear-gradient(135deg, #2D4A38 0%, #3A5542 100%); }
    .nav-active { background: rgba(255,255,255,0.18); }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { 
              50: '#E8F5F0', 
              100: '#D1EBE2', 
              200: '#A3D7C5',
              300: '#75C3A8',
              400: '#47AF8B',
              500: '#00B386',  /* 主色-深青绿 */
              600: '#009A73', 
              700: '#008160',
              800: '#00684D',
              900: '#004F3A'
            },
            gs: {
              primary: '#00B386',     /* 深青绿 */
              secondary: '#49754D',   /* 森林绿 */
              accent: '#629C85',      /* 灰绿强调 */
              success: '#3D7A5A',     /* 深绿成功 */
              danger: '#A85454',      /* 柔和深红 */
              warning: '#9A7B4E',     /* 深棕警告 */
              info: '#4A7896',        /* 深灰蓝 */
              dark: '#1E2B1E',        /* 深绿灰 */
              light: '#E8E4D4'        /* 暗奶油色 */
            },
            mc: {
              primary: '#00B386',
              secondary: '#49754D',
              accent: '#629C85',
              light: '#E8E4D4',
              cream: '#DDD9C8',
              bg: '#F0EDE0'
            },
            success: '#3D7A5A',
            danger: '#A85454',
            warning: '#9A7B4E'
          }
        }
      }
    }
  </script>
</head>
<body class="gs-bg min-h-screen">
  <!-- 导航栏 - GenSpark专业风格 -->
  <nav class="gs-gradient-hero shadow-xl sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-10">
          <!-- 滴灌投资 Logo - 全新专业设计 -->
          <a href="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Logo图标 - 水滴形状代表滴灌投资 -->
                <rect x="0" y="6" width="32" height="28" rx="6" fill="white" fill-opacity="0.2"/>
                <!-- 水滴图案 -->
                <path d="M16 10C16 10 22 18 22 22C22 25.3 19.3 28 16 28C12.7 28 10 25.3 10 22C10 18 16 10 16 10Z" fill="white" fill-opacity="0.9"/>
                <!-- 水滴内的增长曲线 -->
                <path d="M12 23L14 21L16 22.5L18 19L20 21" stroke="#00B386" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- 滴灌投资文字 -->
                <text x="40" y="27" font-family="Inter, -apple-system, sans-serif" font-size="18" font-weight="700" fill="white" letter-spacing="1">滴灌投资</text>
                <!-- 副标题线 -->
                <line x1="40" y1="32" x2="120" y2="32" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
              </svg>
            </div>
            <div class="hidden lg:flex flex-col border-l border-white/20 pl-4">
              <span class="font-semibold text-white text-sm tracking-wide">智能评估平台</span>
              <span class="text-[11px] text-white/60 tracking-wider">Smart Investment AI</span>
            </div>
          </a>
          <div class="hidden md:flex items-center space-x-1">
            <a href="/" class="nav-item ${activeNav === 'dashboard' ? 'active' : ''}">
              <i class="fas fa-chart-line mr-2 text-sm"></i>工作台
            </a>
            <a href="/agents" class="nav-item ${activeNav === 'agents' ? 'active' : ''}">
              <i class="fas fa-robot mr-2 text-sm"></i>智能体
            </a>
            <a href="/workflow" class="nav-item ${activeNav === 'workflow' ? 'active' : ''}">
              <i class="fas fa-sitemap mr-2 text-sm"></i>工作流
            </a>
            <a href="/deals" class="nav-item ${activeNav === 'deals' ? 'active' : ''}">
              <i class="fas fa-briefcase mr-2 text-sm"></i>标的管理
            </a>
            <a href="/submit" class="nav-item ${activeNav === 'submit' ? 'active' : ''}">
              <i class="fas fa-file-upload mr-2 text-sm"></i>提交申请
            </a>
            <a href="/demo" class="nav-item ${activeNav === 'demo' ? 'active' : ''}">
              <i class="fas fa-play mr-2 text-sm"></i>演示
            </a>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-xs text-white/60 bg-white/10 px-3 py-1.5 rounded-full font-medium">v2.0</span>
          <button class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
            <i class="fas fa-bell text-white/75 text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- 主内容 -->
  <main class="max-w-7xl mx-auto px-4 py-6">
    ${raw(content)}
  </main>

  <!-- Toast通知 -->
  <div id="toast-container" class="fixed bottom-6 right-6 z-50 space-y-3"></div>

  <script>
    // Toast通知函数 - 专业配色
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const styles = {
        success: { bg: 'bg-emerald-500', icon: 'fa-check-circle' },
        error: { bg: 'bg-red-500', icon: 'fa-exclamation-circle' },
        info: { bg: 'bg-blue-500', icon: 'fa-info-circle' },
        warning: { bg: 'bg-amber-500', icon: 'fa-exclamation-triangle' }
      };
      const style = styles[type] || styles.success;
      
      toast.className = style.bg + ' text-white px-5 py-3 rounded-xl shadow-lg flex items-center space-x-3 transform translate-x-full transition-all duration-300 ease-out';
      toast.innerHTML = '<i class="fas ' + style.icon + ' text-lg"></i><span class="font-medium">' + message + '</span>';
      
      container.appendChild(toast);
      requestAnimationFrame(() => toast.classList.remove('translate-x-full'));
      setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
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
// Dashboard主页 - GenSpark专业风格
// ============================================
pages.get('/', (c) => {
  const content = `
    <!-- 欢迎横幅 - 专业渐变风格 -->
    <div class="gs-gradient-hero rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
      <div class="relative flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="gs-badge bg-white/20 text-white">
              <i class="fas fa-sparkles mr-1"></i>AI驱动
            </span>
          </div>
          <h1 class="text-3xl font-bold mb-3">欢迎使用滴灌投资智能评估系统</h1>
          <p class="text-white/80 text-lg max-w-xl">多智能体协作的投资标的风险评估平台，为您提供专业、高效、精准的投资决策支持</p>
        </div>
        <div class="hidden lg:block">
          <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-90">
            <rect x="0" y="16" width="56" height="48" rx="12" fill="white" fill-opacity="0.15"/>
            <!-- 水滴图案 -->
            <path d="M28 24C28 24 40 38 40 46C40 53 34 58 28 58C22 58 16 53 16 46C16 38 28 24 28 24Z" fill="white" fill-opacity="0.9"/>
            <!-- 水滴内增长曲线 -->
            <path d="M20 48L24 44L28 47L32 42L36 46" stroke="#00B386" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="65" y="52" font-family="Inter, -apple-system, sans-serif" font-size="24" font-weight="800" fill="white" letter-spacing="1">滴灌投资</text>
            <line x1="65" y1="60" x2="190" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 统计卡片 - 专业设计 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div class="gs-card p-6 group">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">标的总数</p>
            <p class="text-3xl font-bold text-slate-800" id="stat-total">-</p>
            <p class="text-xs text-slate-400 mt-2"><i class="fas fa-chart-line mr-1 text-primary-500"></i>本月新增 +12</p>
          </div>
          <div class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition">
            <i class="fas fa-briefcase text-primary-500 text-lg"></i>
          </div>
        </div>
      </div>
      <div class="gs-card p-6 group">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">已通过</p>
            <p class="text-3xl font-bold text-emerald-600" id="stat-passed">-</p>
            <p class="text-xs text-slate-400 mt-2"><i class="fas fa-arrow-up mr-1 text-emerald-500"></i>通过率 78%</p>
          </div>
          <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition">
            <i class="fas fa-check-circle text-emerald-500 text-lg"></i>
          </div>
        </div>
      </div>
      <div class="gs-card p-6 group">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">处理中</p>
            <p class="text-3xl font-bold text-amber-600" id="stat-pending">-</p>
            <p class="text-xs text-slate-400 mt-2"><i class="fas fa-clock mr-1 text-amber-500"></i>平均 2.3 天</p>
          </div>
          <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition">
            <i class="fas fa-hourglass-half text-amber-500 text-lg"></i>
          </div>
        </div>
      </div>
      <div class="gs-card p-6 group">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">智能体数量</p>
            <p class="text-3xl font-bold text-violet-600" id="stat-agents">10</p>
            <p class="text-xs text-slate-400 mt-2"><i class="fas fa-robot mr-1 text-violet-500"></i>全部在线</p>
          </div>
          <div class="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center group-hover:bg-violet-100 transition">
            <i class="fas fa-robot text-violet-500 text-lg"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作和智能体状态 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
      <!-- 快速操作 -->
      <div class="gs-card p-6">
        <h3 class="text-base font-semibold mb-5 flex items-center text-slate-800">
          <div class="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-bolt text-primary-500 text-sm"></i>
          </div>
          快速操作
        </h3>
        <div class="space-y-3">
          <a href="/submit" class="gs-btn gs-btn-primary w-full py-3">
            <i class="fas fa-plus"></i>提交新标的
          </a>
          <a href="/demo" class="gs-btn w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600">
            <i class="fas fa-play"></i>运行演示评估
          </a>
          <a href="/agents" class="gs-btn gs-btn-secondary w-full py-3">
            <i class="fas fa-cog"></i>配置智能体
          </a>
        </div>
      </div>

      <!-- 智能体状态 -->
      <div class="lg:col-span-2 gs-card p-6">
        <h3 class="text-base font-semibold mb-5 flex items-center text-slate-800">
          <div class="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-robot text-violet-500 text-sm"></i>
          </div>
          智能体状态
          <span class="ml-auto text-xs font-normal text-slate-400">全部正常运行</span>
        </h3>
        <div id="agents-status" class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <!-- 动态加载 -->
        </div>
      </div>
    </div>

    <!-- 最近标的 -->
    <div class="gs-card p-6">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-base font-semibold flex items-center text-slate-800">
          <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-history text-blue-500 text-sm"></i>
          </div>
          最近标的
        </h3>
        <a href="/deals" class="text-sm text-primary-500 hover:text-primary-600 font-medium">
          查看全部 <i class="fas fa-arrow-right ml-1 text-xs"></i>
        </a>
      </div>
      <div id="recent-deals" class="overflow-x-auto">
        <table class="gs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>企业名称</th>
              <th>行业</th>
              <th>状态</th>
              <th>评分</th>
              <th>操作</th>
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
            const bgClass = agent.is_enabled ? 'bg-slate-50 border border-slate-100' : 'bg-slate-100 border border-slate-200';
            const dotClass = agent.is_enabled ? 'bg-emerald-500 pulse-dot' : 'bg-slate-400';
            return '<div class="flex items-center space-x-2 p-3 rounded-lg transition hover:shadow-sm ' + bgClass + '">' +
              '<i class="' + agent.icon + ' text-sm" style="color: ' + agent.icon_color + '"></i>' +
              '<span class="text-sm truncate text-slate-700 font-medium">' + shortName + '</span>' +
              '<span class="w-2 h-2 rounded-full ml-auto ' + dotClass + '"></span>' +
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
            tbody.innerHTML = '<tr><td colspan="6" class="py-12 text-center text-slate-400"><i class="fas fa-inbox text-4xl mb-3 block text-slate-300"></i>暂无标的数据</td></tr>';
            return;
          }
          
          const statusMap = {
            pending: { label: '待处理', cls: 'gs-badge-neutral' },
            outer: { label: '外环筛选', cls: 'gs-badge-info' },
            evaluation: { label: '评估中', cls: 'gs-badge-warning' },
            review: { label: '待审核', cls: 'gs-badge-primary' },
            completed: { label: '已完成', cls: 'gs-badge-success' },
            rejected: { label: '已拒绝', cls: 'gs-badge-danger' }
          };
          
          const industryMap = {
            'light-asset': '轻资产',
            'ecommerce': '电商',
            'overseas': '海外',
            'retail': '零售',
            'douyin-ecommerce': '抖音投流'
          };
          
          tbody.innerHTML = data.slice(0, 5).map(deal => {
            const status = statusMap[deal.status] || { label: deal.status, cls: 'gs-badge-neutral' };
            const scoreColor = deal.total_score >= 80 ? 'text-emerald-600' : deal.total_score >= 60 ? 'text-amber-600' : 'text-slate-400';
            return '<tr>' +
              '<td><span class="font-mono text-sm text-slate-500">#' + deal.id + '</span></td>' +
              '<td><span class="font-medium text-slate-800">' + deal.company_name + '</span></td>' +
              '<td><span class="text-slate-600">' + (industryMap[deal.industry] || deal.industry) + '</span></td>' +
              '<td><span class="gs-badge ' + status.cls + '">' + status.label + '</span></td>' +
              '<td><span class="font-semibold ' + scoreColor + '">' + (deal.total_score ? deal.total_score.toFixed(1) : '-') + '</span></td>' +
              '<td><a href="/deals?id=' + deal.id + '" class="gs-btn gs-btn-ghost px-3 py-1.5 text-sm"><i class="fas fa-eye mr-1"></i>查看</a></td>' +
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

// 标的详情页面 - 新增
pages.get('/deals/:id', (c) => {
  const id = c.req.param('id')
  return c.html(baseLayout('标的详情 - ' + id, dealDetailPageContent, 'deals'))
})

export default pages
