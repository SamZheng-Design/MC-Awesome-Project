import { Hono } from 'hono'
import { html, raw } from 'hono/html'
import { agentsPageContent } from './pages-agents'
import { demoPageContent } from './pages-demo'
import { workflowPageContent, submitPageContent, dealsPageContent } from './pages-other'
import { dealDetailPageContent } from './pages-deal-detail'
import { investorPortalPageContent } from './pages-investor'
import { investorDealDetailPageContent } from './pages-investor-deal'

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
    
    /* 滴灌投资配色方案 - 美拉德深色护眼主题 */
    /* 设计理念：墨绿/橄榄绿/苔藓绿为主，搭配焦糖棕/暖沙/驼色美拉德色调，低饱和奶茶色/米白中和 */
    :root {
      /* === 主色系 - 带灰调的墨绿/橄榄绿/苔藓绿 === */
      --dg-primary: #5A7A64;        /* 主色-苔藓绿（灰调） */
      --dg-primary-light: #6B8B73;  /* 主色浅-橄榄绿 */
      --dg-primary-dark: #4A6854;   /* 主色深-墨绿 */
      --dg-secondary: #6B7B5C;      /* 辅助色-灰橄榄 */
      --dg-accent: #7A8B6A;         /* 强调色-苔藓浅 */
      
      /* === 美拉德色调 - 焦糖棕/暖沙/驼色 === */
      --dg-caramel: #8B6B4A;        /* 焦糖棕 */
      --dg-sand: #A89A7A;           /* 暖沙色 */
      --dg-camel: #9A8A6A;          /* 驼色 */
      
      /* === 状态色 === */
      --dg-success: #5A7A5A;        /* 成功色-灰绿 */
      --dg-danger: #8B5A5A;         /* 危险色-灰红（柔和） */
      --dg-warning: #8B7A5A;        /* 警告色-焦糖 */
      --dg-info: #5A6A7A;           /* 信息色-灰蓝 */
      
      /* === 深色背景 - 深墨绿灰 === */
      --dg-dark: #2A3A2E;           /* 深色背景-墨绿灰 */
      --dg-dark-secondary: #354540; /* 次深色背景 */
      --dg-dark-tertiary: #404F45;  /* 第三层深色 */
      
      /* === 浅色背景 - 低饱和奶茶/米白 === */
      --dg-light: #EAE6DC;          /* 浅色背景-米白 */
      --dg-light-secondary: #DED8CC;/* 次浅色-暖米 */
      --dg-light-tertiary: #D5D0C5; /* 第三层浅色-奶茶米 */
      --dg-cream: #F2EEE4;          /* 奶油色 */
      
      /* === 边框与文字 === */
      --dg-border: #B8B0A0;         /* 边框色-暖灰 */
      --dg-border-light: #D0CAC0;   /* 浅边框 */
      --dg-text-primary: #3A4A3E;   /* 主文字色-墨绿灰 */
      --dg-text-secondary: #5A6A5E; /* 次要文字色 */
      --dg-text-muted: #7A8A7E;     /* 弱化文字色 */
      
      /* === 卡片背景 === */
      --dg-card-bg: #F5F2EA;        /* 卡片背景色-暖白 */
      --dg-card-hover: #EFEBE0;     /* 卡片悬停 */
    }
    
    /* 渐变效果 - 美拉德深色调 */
    .gs-gradient-primary { 
      background: linear-gradient(135deg, var(--dg-primary) 0%, var(--dg-caramel) 100%); 
    }
    .gs-gradient-dark { 
      background: linear-gradient(180deg, var(--dg-dark) 0%, var(--dg-dark-secondary) 100%); 
    }
    .gs-gradient-hero {
      background: linear-gradient(135deg, #3A4A40 0%, #2E3E34 50%, #4A5A4E 100%);
    }
    .gs-gradient-warm {
      background: linear-gradient(135deg, var(--dg-caramel) 0%, var(--dg-sand) 100%);
    }
    .gs-gradient-moss {
      background: linear-gradient(135deg, var(--dg-primary-dark) 0%, var(--dg-primary) 100%);
    }
    
    /* 背景色 */
    .gs-bg { background-color: var(--dg-light); }
    .gs-bg-dark { background-color: var(--dg-dark); }
    
    /* 卡片样式 - 暖色柔和阴影 */
    .gs-card { 
      background: var(--dg-card-bg);
      border-radius: 12px;
      border: 1px solid var(--dg-border-light);
      box-shadow: 0 2px 8px rgba(90, 80, 60, 0.06);
      transition: all 0.2s ease;
    }
    .gs-card:hover {
      background: var(--dg-card-hover);
      box-shadow: 0 4px 16px rgba(90, 80, 60, 0.1);
      transform: translateY(-1px);
    }
    .gs-card-flat {
      background: var(--dg-card-bg);
      border-radius: 12px;
      border: 1px solid var(--dg-border-light);
    }
    .gs-card-warm {
      background: linear-gradient(145deg, var(--dg-cream) 0%, var(--dg-light) 100%);
      border-radius: 12px;
      border: 1px solid var(--dg-border-light);
    }
    
    /* 按钮样式 - 美拉德色调 */
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
      box-shadow: 0 4px 12px rgba(90, 122, 100, 0.3);
    }
    .gs-btn-warm {
      background: var(--dg-caramel);
      color: white;
    }
    .gs-btn-warm:hover {
      background: #7A5B3A;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(139, 107, 74, 0.3);
    }
    .gs-btn-secondary {
      background: var(--dg-light-secondary);
      color: var(--dg-text-primary);
      border: 1px solid var(--dg-border);
    }
    .gs-btn-secondary:hover {
      background: var(--dg-light-tertiary);
    }
    .gs-btn-ghost {
      background: transparent;
      color: var(--dg-text-secondary);
    }
    .gs-btn-ghost:hover {
      background: var(--dg-light-secondary);
      color: var(--dg-primary-dark);
    }
    
    /* 输入框样式 - 暖色调 */
    .gs-input {
      border: 1px solid var(--dg-border);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 14px;
      transition: all 0.15s ease;
      background: var(--dg-cream);
    }
    .gs-input:focus {
      outline: none;
      border-color: var(--dg-primary);
      box-shadow: 0 0 0 3px rgba(90, 122, 100, 0.15);
      background: white;
    }
    
    /* 徽章样式 - 美拉德配色 */
    .gs-badge {
      font-size: 12px;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .gs-badge-primary { background: rgba(90, 122, 100, 0.15); color: var(--dg-primary-dark); }
    .gs-badge-success { background: rgba(90, 122, 90, 0.15); color: var(--dg-success); }
    .gs-badge-warning { background: rgba(139, 107, 74, 0.15); color: var(--dg-caramel); }
    .gs-badge-danger { background: rgba(139, 90, 90, 0.12); color: var(--dg-danger); }
    .gs-badge-info { background: rgba(90, 106, 122, 0.12); color: var(--dg-info); }
    .gs-badge-neutral { background: var(--dg-light-secondary); color: var(--dg-text-secondary); }
    .gs-badge-caramel { background: rgba(139, 107, 74, 0.2); color: var(--dg-caramel); }
    .gs-badge-sand { background: rgba(168, 154, 122, 0.2); color: #7A6A4A; }
    
    /* 动画效果 */
    .gs-fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    .pulse-dot { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    
    /* 表格样式 - 暖色调 */
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
      border-bottom: 1px solid var(--dg-border-light);
    }
    .gs-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--dg-border-light);
      color: var(--dg-text-primary);
    }
    .gs-table tr:hover td {
      background: var(--dg-cream);
    }
    
    /* Markdown样式 - 美拉德配色 */
    .markdown-content h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--dg-text-primary); }
    .markdown-content h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; margin-top: 1rem; color: var(--dg-primary-dark); }
    .markdown-content h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--dg-caramel); }
    .markdown-content p { margin-bottom: 0.75rem; line-height: 1.7; }
    .markdown-content ul, .markdown-content ol { margin-left: 1.5rem; margin-bottom: 0.75rem; }
    .markdown-content li { margin-bottom: 0.25rem; }
    .markdown-content code { background: var(--dg-light-tertiary); padding: 0.125rem 0.375rem; border-radius: 4px; font-size: 0.875rem; color: var(--dg-primary-dark); }
    .markdown-content pre { background: var(--dg-dark); color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1rem; }
    .markdown-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    .markdown-content th, .markdown-content td { border: 1px solid var(--dg-border-light); padding: 0.5rem; text-align: left; }
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
    
    /* 滚动条样式 - 暖色调 */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--dg-light-tertiary); }
    ::-webkit-scrollbar-thumb { background: var(--dg-border); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--dg-text-muted); }
    
    /* 兼容旧样式 + 美拉德扩展 */
    .card-shadow { box-shadow: 0 2px 8px rgba(90, 80, 60, 0.06); }
    .agent-card:hover { transform: translateY(-2px); transition: all 0.2s; }
    .progress-ring { transition: stroke-dashoffset 0.5s; }
    .mc-bg { background-color: var(--dg-light); }
    .mc-primary { color: var(--dg-primary-dark); }
    .mc-light-bg { background-color: var(--dg-light-secondary); }
    .gradient-bg { background: linear-gradient(135deg, #3A4A40 0%, #4A5A4E 100%); }
    .nav-active { background: rgba(255,255,255,0.18); }
    
    /* 美拉德专属样式 */
    .maillard-card { background: linear-gradient(145deg, var(--dg-cream) 0%, var(--dg-light) 100%); }
    .maillard-border { border-color: var(--dg-sand); }
    .maillard-text { color: var(--dg-caramel); }
    .moss-accent { background: var(--dg-primary); color: white; }
    .caramel-accent { background: var(--dg-caramel); color: white; }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { 
              50: '#F0F4F2',   /* 苔藓浅米 */
              100: '#E0E8E4',  /* 苔藓浅 */
              200: '#C5D5CC',  /* 苔藓粉 */
              300: '#9AB8A5',  /* 苔藓绿 */
              400: '#7A9A85',  /* 橄榄绿 */
              500: '#5A7A64',  /* 主色-苔藓绿（灰调） */
              600: '#4A6854',  /* 墨绿 */
              700: '#3A5544',  /* 深墨绿 */
              800: '#2A4234',  /* 深森林 */
              900: '#1A3024'   /* 极深墨绿 */
            },
            gs: {
              primary: '#5A7A64',     /* 苔藓绿 */
              secondary: '#6B7B5C',   /* 灰橄榄 */
              accent: '#7A8B6A',      /* 苔藓浅 */
              success: '#5A7A5A',     /* 灰绿 */
              danger: '#8B5A5A',      /* 灰红 */
              warning: '#8B7A5A',     /* 焦糖 */
              info: '#5A6A7A',        /* 灰蓝 */
              dark: '#2A3A2E',        /* 墨绿灰 */
              light: '#EAE6DC',       /* 米白 */
              caramel: '#8B6B4A',     /* 焦糖棕 */
              sand: '#A89A7A',        /* 暖沙 */
              camel: '#9A8A6A',       /* 驼色 */
              cream: '#F2EEE4'        /* 奶油色 */
            },
            mc: {
              primary: '#5A7A64',     /* 苔藓绿 */
              secondary: '#6B7B5C',   /* 灰橄榄 */
              accent: '#8B6B4A',      /* 焦糖棕 */
              light: '#EAE6DC',       /* 米白 */
              cream: '#F2EEE4',       /* 奶油色 */
              bg: '#F5F2EA',          /* 暖白 */
              sand: '#A89A7A',        /* 暖沙 */
              camel: '#9A8A6A'        /* 驼色 */
            },
            success: '#5A7A5A',
            danger: '#8B5A5A',
            warning: '#8B7A5A',
            caramel: '#8B6B4A',
            sand: '#A89A7A'
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
                <rect x="0" y="6" width="32" height="28" rx="6" fill="rgba(168,154,122,0.3)"/>
                <!-- 水滴图案 -->
                <path d="M16 10C16 10 22 18 22 22C22 25.3 19.3 28 16 28C12.7 28 10 25.3 10 22C10 18 16 10 16 10Z" fill="white" fill-opacity="0.95"/>
                <!-- 水滴内的增长曲线 - 美拉德色 -->
                <path d="M12 23L14 21L16 22.5L18 19L20 21" stroke="#8B6B4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- 滴灌投资文字 -->
                <text x="40" y="27" font-family="Inter, -apple-system, sans-serif" font-size="18" font-weight="700" fill="white" letter-spacing="1">滴灌投资</text>
                <!-- 副标题线 - 暖沙色 -->
                <line x1="40" y1="32" x2="120" y2="32" stroke="rgba(168,154,122,0.5)" stroke-width="1"/>
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
            <a href="/evaluation" class="nav-item ${activeNav === 'evaluation' ? 'active' : ''}">
              <i class="fas fa-clipboard-check mr-2 text-sm"></i>标的评估
            </a>
            <a href="/investor" class="nav-item ${activeNav === 'investor' ? 'active' : ''}">
              <i class="fas fa-chart-pie mr-2 text-sm"></i>投资人入口
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
            <rect x="0" y="16" width="56" height="48" rx="12" fill="rgba(168,154,122,0.25)"/>
            <!-- 水滴图案 -->
            <path d="M28 24C28 24 40 38 40 46C40 53 34 58 28 58C22 58 16 53 16 46C16 38 28 24 28 24Z" fill="white" fill-opacity="0.95"/>
            <!-- 水滴内增长曲线 - 焦糖棕 -->
            <path d="M20 48L24 44L28 47L32 42L36 46" stroke="#8B6B4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="65" y="52" font-family="Inter, -apple-system, sans-serif" font-size="24" font-weight="800" fill="white" letter-spacing="1">滴灌投资</text>
            <line x1="65" y1="60" x2="190" y2="60" stroke="rgba(168,154,122,0.5)" stroke-width="2"/>
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
          <a href="/evaluation" class="gs-btn gs-btn-warm w-full py-3">
            <i class="fas fa-clipboard-check"></i>进入标的评估
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

// 标的评估页面（原Demo页面）
pages.get('/evaluation', (c) => {
  return c.html(baseLayout('标的评估', demoPageContent, 'evaluation'))
})

// 兼容旧路由 /demo，重定向到新路由
pages.get('/demo', (c) => {
  return c.redirect('/evaluation')
})

// 投资人入口页面 - 新增
pages.get('/investor', (c) => {
  return c.html(baseLayout('投资人入口', investorPortalPageContent, 'investor'))
})

// 标的详情页面 - 新增
pages.get('/deals/:id', (c) => {
  const id = c.req.param('id')
  return c.html(baseLayout('标的详情 - ' + id, dealDetailPageContent, 'deals'))
})

// 投资人标的投后详情页面 - 新增
pages.get('/investor/deal/:id', (c) => {
  const id = c.req.param('id')
  return c.html(baseLayout('投后详情 - ' + id, investorDealDetailPageContent, 'investor'))
})

export default pages
