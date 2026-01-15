// Demo演示页面 - 支持多标的选择评估
export const demoPageContent = `
<!-- 页面标题 -->
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-[slate-800]">标的评估演示</h1>
    <p class="text-gray-500">选择标的项目，完整展示多智能体评估流程（含详细推理过程）</p>
  </div>
  <div class="flex space-x-2">
    <button onclick="toggleAllDetails()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-eye mr-2"></i><span id="toggle-all-text">展开全部</span>
    </button>
    <button onclick="resetDemo()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-redo mr-2"></i>重置
    </button>
    <button onclick="startDemo()" id="btn-start" class="px-6 py-2 bg-gradient-to-r from-[primary-500] to-[violet-500] text-white rounded-lg hover:opacity-90 transition">
      <i class="fas fa-play mr-2"></i>开始评估
    </button>
  </div>
</div>

<!-- 标的选择器 -->
<div class="bg-white rounded-xl p-6 card-shadow mb-6">
  <div class="flex items-center justify-between mb-4">
    <h3 class="font-semibold text-lg flex items-center">
      <i class="fas fa-list-check text-[primary-500] mr-2"></i>
      选择评估标的
    </h3>
    <div class="flex items-center space-x-2 text-sm text-gray-500">
      <span id="deals-count">加载中...</span>
    </div>
  </div>
  
  <!-- 赛道过滤器 -->
  <div class="flex flex-wrap gap-2 mb-4">
    <button onclick="filterDeals('all')" class="track-filter-btn active px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="all">
      <i class="fas fa-globe mr-1"></i>全部
    </button>
    <button onclick="filterDeals('light-asset')" class="track-filter-btn px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="light-asset">
      <i class="fas fa-star mr-1"></i>文娱轻资产
    </button>
    <button onclick="filterDeals('douyin-ecommerce')" class="track-filter-btn px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="douyin-ecommerce">
      <i class="fas fa-video mr-1"></i>抖音投流
    </button>
    <button onclick="filterDeals('catering')" class="track-filter-btn px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="catering">
      <i class="fas fa-utensils mr-1"></i>餐饮
    </button>
    <button onclick="filterDeals('retail')" class="track-filter-btn px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="retail">
      <i class="fas fa-shopping-cart mr-1"></i>零售
    </button>
    <button onclick="filterDeals('ecommerce')" class="track-filter-btn px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="ecommerce">
      <i class="fas fa-shopping-bag mr-1"></i>电商
    </button>
    <button onclick="filterDeals('service')" class="track-filter-btn px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="service">
      <i class="fas fa-concierge-bell mr-1"></i>生活服务
    </button>
    <button onclick="filterDeals('education')" class="track-filter-btn px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-[primary-500] transition" data-track="education">
      <i class="fas fa-graduation-cap mr-1"></i>教育培训
    </button>
  </div>
  
  <!-- 标的列表 -->
  <div id="deals-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
    <div class="text-center py-8 text-gray-400">
      <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
      <p>加载标的列表中...</p>
    </div>
  </div>
</div>

<!-- 步骤指示器 -->
<div class="bg-white rounded-xl p-6 card-shadow mb-6">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div id="step-1" class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full bg-[primary-500] text-white flex items-center justify-center font-bold">1</div>
        <span class="font-medium text-[primary-500]">项目材料</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-1"></div>
      <div id="step-2" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">2</div>
        <span class="font-medium text-gray-600">外环漏斗体系</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-2"></div>
      <div id="step-3" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">3</div>
        <span class="font-medium text-gray-600">中环筛子体系</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-3"></div>
      <div id="step-4" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">4</div>
        <span class="font-medium text-gray-600">综合评分</span>
      </div>
    </div>
    <div id="overall-status" class="text-sm text-gray-500">
      准备就绪
    </div>
  </div>
</div>

<!-- 主内容区 -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <!-- 左侧：项目信息 -->
  <div class="lg:col-span-1">
    <div class="bg-white rounded-xl card-shadow overflow-hidden sticky top-24">
      <div id="deal-header" class="gradient-bg p-4 text-white">
        <div class="flex items-center space-x-3">
          <div id="deal-avatar" class="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-white/20 text-2xl">
            <i class="fas fa-building text-white/80"></i>
          </div>
          <div>
            <h3 id="deal-name" class="font-bold">请选择标的</h3>
            <p id="deal-sub" class="text-sm opacity-80">从上方列表选择要评估的项目</p>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div id="deal-info" class="space-y-3 text-sm">
          <div class="text-center py-8 text-gray-400">
            <i class="fas fa-hand-pointer text-4xl mb-2"></i>
            <p>请先选择一个标的项目</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 右侧：评估过程 -->
  <div class="lg:col-span-2 space-y-6">
    <!-- 外环漏斗体系 -->
    <div id="outer-section" class="bg-white rounded-xl card-shadow p-6 border-2 border-dashed border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-funnel-dollar text-red-500 mr-2"></i>
          外环漏斗体系
          <span class="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">一票否决</span>
          <span id="outer-step-badge" class="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">第1步</span>
        </h3>
        <span id="outer-status" class="text-sm text-gray-500 flex items-center">
          <i class="fas fa-clock mr-1"></i>等待开始
        </span>
      </div>
      
      <!-- 外环漏斗体系说明 -->
      <div class="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-800">
        <i class="fas fa-info-circle mr-2"></i>
        外环漏斗体系采用<strong>串行执行</strong>，每个智能体必须通过才能进入下一步，任何一个不通过则<strong>一票否决</strong>
      </div>
      
      <div id="outer-agents" class="space-y-4">
        <!-- 智能体卡片将动态加载 -->
      </div>
    </div>

    <!-- 中环筛子体系 -->
    <div id="inner-section" class="bg-white rounded-xl card-shadow p-6 opacity-40 border-2 border-dashed border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-filter text-[violet-500] mr-2"></i>
          中环筛子体系
          <span id="inner-track-badge" class="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">待选择赛道</span>
          <span id="inner-agent-count" class="ml-2 text-xs bg-[slate-100] text-[slate-800] px-2 py-0.5 rounded">加权评分</span>
          <span id="inner-step-badge" class="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">第2步</span>
        </h3>
        <span id="inner-status" class="text-sm text-gray-400 flex items-center">
          <i class="fas fa-lock mr-1"></i>等待外环漏斗体系完成
        </span>
      </div>
      
      <!-- 中环筛子体系说明 -->
      <div class="mb-4 p-3 bg-[slate-100] rounded-lg text-sm text-[slate-800]">
        <i class="fas fa-info-circle mr-2"></i>
        中环筛子体系采用<strong>并行执行</strong>，仅调用<strong>本赛道相关</strong>的智能体进行评估
      </div>
      
      <div id="inner-agents" class="space-y-4">
        <!-- 智能体卡片将动态加载（仅显示与项目赛道相关的智能体） -->
      </div>
    </div>

    <!-- 综合评分 -->
    <div id="final-section" class="bg-white rounded-xl card-shadow p-6 opacity-40 border-2 border-dashed border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-ranking-star text-[primary-500] mr-2"></i>
          综合评分
          <span id="final-step-badge" class="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">第3步</span>
        </h3>
        <span id="final-status" class="text-sm text-gray-400 flex items-center">
          <i class="fas fa-lock mr-1"></i>等待评估完成
        </span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 雷达图 -->
        <div>
          <canvas id="radar-chart" width="300" height="300"></canvas>
        </div>
        
        <!-- 评分详情 -->
        <div id="final-details" class="space-y-4">
          <div class="text-center py-8 text-gray-400">
            <i class="fas fa-chart-pie text-4xl mb-2"></i>
            <p>评估完成后显示结果</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 投资建议 -->
    <div id="recommendation-section" class="hidden">
      <div class="bg-gradient-to-r from-[primary-500] to-[violet-500] rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold mb-2" id="rec-title">投资建议</h3>
            <p id="rec-detail" class="opacity-90"></p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold" id="rec-score">--</div>
            <div class="text-sm opacity-80" id="rec-grade">评级</div>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-white/20">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium mb-2">核心优势</h4>
              <ul id="rec-strengths" class="text-sm space-y-1 opacity-90"></ul>
            </div>
            <div>
              <h4 class="font-medium mb-2">关注风险</h4>
              <ul id="rec-risks" class="text-sm space-y-1 opacity-90"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 综合改进建议 -->
    <div id="improvement-section" class="hidden">
      <div class="bg-white rounded-xl card-shadow overflow-hidden">
        <div class="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b">
          <h3 class="font-semibold text-lg flex items-center text-gray-800">
            <i class="fas fa-clipboard-check text-orange-500 mr-2"></i>
            综合改进建议
            <span class="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">智能汇总</span>
          </h3>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- 待补充材料卡片 -->
            <div class="bg-amber-50 rounded-xl border border-amber-100 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-3 bg-amber-100/50 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('missing')">
                <h4 class="font-medium text-amber-800 flex items-center text-sm">
                  <i class="fas fa-file-circle-plus mr-2 text-amber-500"></i>
                  待补充材料
                  <span id="missing-count" class="ml-2 bg-amber-200 text-amber-700 text-xs px-1.5 py-0.5 rounded-full">0</span>
                </h4>
                <i id="missing-expand-icon" class="fas fa-chevron-down text-amber-400 text-xs transition-transform"></i>
              </div>
              <div id="missing-content" class="p-3">
                <ul id="missing-materials" class="space-y-2 text-sm text-amber-900">
                  <li class="text-gray-400 text-xs">加载中...</li>
                </ul>
                <button onclick="showImprovementPopup('missing')" class="mt-3 w-full text-xs text-amber-600 hover:text-amber-700 flex items-center justify-center py-1.5 bg-amber-100/50 rounded-lg hover:bg-amber-100 transition">
                  <i class="fas fa-expand-alt mr-1"></i>查看全部
                </button>
              </div>
            </div>
            
            <!-- 项目改进建议卡片 -->
            <div class="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-3 bg-blue-100/50 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('improvement')">
                <h4 class="font-medium text-blue-800 flex items-center text-sm">
                  <i class="fas fa-lightbulb mr-2 text-blue-500"></i>
                  改进建议
                  <span id="improvement-count" class="ml-2 bg-blue-200 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">0</span>
                </h4>
                <i id="improvement-expand-icon" class="fas fa-chevron-down text-blue-400 text-xs transition-transform"></i>
              </div>
              <div id="improvement-content" class="p-3">
                <ul id="improvement-suggestions" class="space-y-2 text-sm text-blue-900">
                  <li class="text-gray-400 text-xs">加载中...</li>
                </ul>
                <button onclick="showImprovementPopup('improvement')" class="mt-3 w-full text-xs text-blue-600 hover:text-blue-700 flex items-center justify-center py-1.5 bg-blue-100/50 rounded-lg hover:bg-blue-100 transition">
                  <i class="fas fa-expand-alt mr-1"></i>查看全部
                </button>
              </div>
            </div>
            
            <!-- 下一步行动卡片 -->
            <div class="bg-green-50 rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-3 bg-green-100/50 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('actions')">
                <h4 class="font-medium text-green-800 flex items-center text-sm">
                  <i class="fas fa-tasks mr-2 text-green-500"></i>
                  下一步行动
                  <span id="actions-count" class="ml-2 bg-green-200 text-green-700 text-xs px-1.5 py-0.5 rounded-full">0</span>
                </h4>
                <i id="actions-expand-icon" class="fas fa-chevron-down text-green-400 text-xs transition-transform"></i>
              </div>
              <div id="actions-content" class="p-3">
                <div id="next-actions" class="space-y-2 text-sm">
                  <div class="text-gray-400 text-xs">加载中...</div>
                </div>
                <button onclick="showImprovementPopup('actions')" class="mt-3 w-full text-xs text-green-600 hover:text-green-700 flex items-center justify-center py-1.5 bg-green-100/50 rounded-lg hover:bg-green-100 transition">
                  <i class="fas fa-expand-alt mr-1"></i>查看全部
                </button>
              </div>
            </div>
          </div>
          
          <!-- 风险建议专区 -->
          <div id="risk-recommendation-section" class="mt-4 hidden">
            <div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 overflow-hidden">
              <div class="p-3 bg-red-100/30 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('risk-rec')">
                <h4 class="font-medium text-red-800 flex items-center text-sm">
                  <i class="fas fa-shield-halved mr-2 text-red-500"></i>
                  风险管理建议
                  <span class="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">来自风险控制智能体</span>
                </h4>
                <i id="risk-rec-expand-icon" class="fas fa-chevron-down text-red-400 text-xs transition-transform"></i>
              </div>
              <div id="risk-rec-content" class="p-4">
                <div id="risk-recommendation-preview" class="text-sm text-gray-700 line-clamp-3">
                  加载中...
                </div>
                <button onclick="showImprovementPopup('risk-rec')" class="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center transition">
                  <i class="fas fa-external-link-alt mr-1"></i>查看完整风险管理建议
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 改进建议详情浮窗 -->
    <div id="improvement-popup" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target === this) closeImprovementPopup()">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div id="improvement-popup-header" class="p-4 border-b flex items-center justify-between">
          <h3 id="improvement-popup-title" class="font-bold text-lg flex items-center">
            <i class="fas fa-lightbulb mr-2"></i>
            <span>详情</span>
          </h3>
          <button onclick="closeImprovementPopup()" class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <i class="fas fa-times text-gray-500"></i>
          </button>
        </div>
        <div id="improvement-popup-content" class="p-6 overflow-y-auto max-h-[70vh]">
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 评估详情弹窗 -->
<div id="detail-modal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target === this) closeDetailModal()">
  <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
    <div class="p-4 border-b flex items-center justify-between bg-gradient-to-r from-[primary-500] to-[violet-500] text-white">
      <h3 id="modal-title" class="font-bold text-lg">评估详情</h3>
      <button onclick="closeDetailModal()" class="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div id="modal-content" class="p-6 overflow-y-auto max-h-[80vh]">
    </div>
  </div>
</div>

<!-- AI推理内容浮窗 -->
<div id="reasoning-popup" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target === this) closeReasoningPopup()">
  <div class="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
    <div class="p-4 border-b flex items-center justify-between bg-[slate-100]">
      <h3 class="font-bold text-[slate-800] flex items-center">
        <i class="fas fa-brain mr-2"></i>
        <span id="popup-title">AI推理过程</span>
      </h3>
      <button onclick="closeReasoningPopup()" class="w-8 h-8 rounded-full hover:bg-[#c5e6ce] flex items-center justify-center transition">
        <i class="fas fa-times text-[slate-800]"></i>
      </button>
    </div>
    <div id="popup-content" class="p-6 overflow-y-auto max-h-[70vh]">
    </div>
  </div>
</div>

<style>
  /* 标的选择器样式 */
  .deal-card {
    cursor: pointer;
    transition: all 0.2s;
  }
  .deal-card:hover {
    transform: translateY(-2px);
  }
  .deal-card.selected {
    border-color: primary-500 !important;
    background: linear-gradient(to right, slate-100, #fff);
  }
  .deal-card.selected .deal-check {
    display: flex !important;
  }
  
  /* 赛道过滤器样式 */
  .track-filter-btn.active {
    background: slate-100;
    border-color: primary-500;
    color: slate-800;
  }
  
  /* 自定义滚动条 */
  #deals-list::-webkit-scrollbar,
  #modal-content::-webkit-scrollbar,
  #popup-content::-webkit-scrollbar {
    width: 6px;
  }
  #deals-list::-webkit-scrollbar-track,
  #modal-content::-webkit-scrollbar-track,
  #popup-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  #deals-list::-webkit-scrollbar-thumb,
  #modal-content::-webkit-scrollbar-thumb,
  #popup-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  #deals-list::-webkit-scrollbar-thumb:hover,
  #modal-content::-webkit-scrollbar-thumb:hover,
  #popup-content::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
  
  /* 推理内容格式化 */
  .reasoning-text {
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.8;
  }
  .reasoning-text p {
    margin-bottom: 0.75rem;
  }
  
  /* 文本截断 */
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<script>
  // ============================================
  // 全局状态
  // ============================================
  let allDeals = [];              // 所有标的数据
  let filteredDeals = [];         // 过滤后的标的
  let selectedDeal = null;        // 当前选中的标的
  let demoAgents = [];            // 所有智能体
  let radarChart = null;          // 雷达图实例
  let isRunning = false;          // 评估是否进行中
  let allExpanded = false;        // 是否展开全部
  let evaluationResults = {};     // 存储所有评估结果
  let currentDealIndustry = null; // 当前标的的赛道
  let filteredOuterAgents = [];   // 筛选后的外环智能体
  let filteredInnerAgents = [];   // 筛选后的中环智能体
  let currentFilter = 'all';      // 当前过滤器

  // 赛道名称映射
  const trackNameMap = {
    'all': '通用',
    'catering': '餐饮',
    'retail': '零售',
    'ecommerce': '电商',
    'douyin-ecommerce': '抖音投流',
    'education': '教育培训',
    'service': '生活服务',
    'light-asset': '文娱轻资产'
  };
  
  // 赛道图标映射
  const trackIconMap = {
    'catering': 'fas fa-utensils',
    'retail': 'fas fa-shopping-cart',
    'ecommerce': 'fas fa-shopping-bag',
    'douyin-ecommerce': 'fas fa-video',
    'education': 'fas fa-graduation-cap',
    'service': 'fas fa-concierge-bell',
    'light-asset': 'fas fa-star'
  };
  
  // 赛道颜色映射
  const trackColorMap = {
    'catering': '#F59E0B',
    'retail': '#10B981',
    'ecommerce': '#8B5CF6',
    'douyin-ecommerce': '#EC4899',
    'education': '#3B82F6',
    'service': '#06B6D4',
    'light-asset': '#F97316'
  };

  // ============================================
  // 标的管理
  // ============================================
  
  // 加载所有标的
  async function loadAllDeals() {
    try {
      const { data } = await apiCall('/api/deals');
      allDeals = data || [];
      filteredDeals = [...allDeals];
      renderDealsList();
      updateDealsCount();
    } catch (e) {
      console.error('加载标的失败:', e);
      document.getElementById('deals-list').innerHTML = \`
        <div class="text-center py-8 text-red-400 col-span-3">
          <i class="fas fa-exclamation-circle text-2xl mb-2"></i>
          <p>加载失败，请刷新页面重试</p>
        </div>
      \`;
    }
  }
  
  // 过滤标的
  function filterDeals(track) {
    currentFilter = track;
    
    // 更新过滤器按钮状态
    document.querySelectorAll('.track-filter-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.track === track) {
        btn.classList.add('active');
      }
    });
    
    // 过滤数据
    if (track === 'all') {
      filteredDeals = [...allDeals];
    } else {
      filteredDeals = allDeals.filter(d => d.industry === track);
    }
    
    renderDealsList();
    updateDealsCount();
  }
  
  // 更新标的数量显示
  function updateDealsCount() {
    const countEl = document.getElementById('deals-count');
    if (countEl) {
      const total = allDeals.length;
      const filtered = filteredDeals.length;
      countEl.textContent = currentFilter === 'all' 
        ? \`共 \${total} 个标的\` 
        : \`显示 \${filtered} / \${total} 个标的\`;
    }
  }
  
  // 渲染标的列表
  function renderDealsList() {
    const listEl = document.getElementById('deals-list');
    if (!listEl) return;
    
    if (filteredDeals.length === 0) {
      listEl.innerHTML = \`
        <div class="text-center py-8 text-gray-400 col-span-3">
          <i class="fas fa-inbox text-2xl mb-2"></i>
          <p>暂无符合条件的标的</p>
        </div>
      \`;
      return;
    }
    
    listEl.innerHTML = filteredDeals.map(deal => {
      const trackColor = trackColorMap[deal.industry] || '#6B7280';
      const trackIcon = trackIconMap[deal.industry] || 'fas fa-building';
      const trackName = trackNameMap[deal.industry] || deal.industry;
      const isSelected = selectedDeal?.id === deal.id;
      
      // 解析财务数据获取关键指标
      let financialHighlights = {};
      try {
        const fd = typeof deal.financial_data === 'string' ? JSON.parse(deal.financial_data) : deal.financial_data;
        if (fd) {
          financialHighlights = {
            roi: fd.profit_distribution?.investor_return?.roi || fd.investor_return?.roi,
            irr: fd.profit_distribution?.investor_return?.irr_estimate || fd.investor_return?.irr_estimate,
            payback: fd.profit_distribution?.investor_return?.payback_months || fd.investor_return?.payback_months
          };
        }
      } catch (e) {}
      
      return \`
        <div class="deal-card p-3 border rounded-lg hover:shadow-md \${isSelected ? 'selected border-[primary-500]' : 'border-gray-200'}" 
             onclick="selectDeal('\${deal.id}')">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background: \${trackColor}20">
                <i class="\${trackIcon} text-sm" style="color: \${trackColor}"></i>
              </div>
              <div>
                <h4 class="font-medium text-sm text-gray-800 line-clamp-1">\${deal.company_name}</h4>
                <p class="text-xs text-gray-500">\${deal.id}</p>
              </div>
            </div>
            <div class="deal-check hidden w-5 h-5 rounded-full bg-[primary-500] items-center justify-center flex-shrink-0">
              <i class="fas fa-check text-white text-xs"></i>
            </div>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="px-2 py-0.5 rounded-full" style="background: \${trackColor}20; color: \${trackColor}">\${trackName}</span>
            <span class="text-gray-500">\${deal.funding_amount}万</span>
          </div>
          \${financialHighlights.roi ? \`
          <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>ROI: \${(financialHighlights.roi * 100).toFixed(0)}%</span>
            \${financialHighlights.payback ? \`<span>回收期: \${financialHighlights.payback}月</span>\` : ''}
          </div>
          \` : ''}
        </div>
      \`;
    }).join('');
  }
  
  // 选择标的
  function selectDeal(dealId) {
    selectedDeal = allDeals.find(d => d.id === dealId);
    if (!selectedDeal) return;
    
    currentDealIndustry = selectedDeal.industry;
    
    // 更新UI
    renderDealsList();
    updateDealInfo();
    loadDemoAgents();
    
    // 重置评估状态
    if (!isRunning) {
      resetEvaluationState();
    }
    
    showToast(\`已选择: \${selectedDeal.company_name}\`, 'success');
  }
  
  // 更新标的详情显示
  function updateDealInfo() {
    if (!selectedDeal) return;
    
    const trackColor = trackColorMap[selectedDeal.industry] || '#6B7280';
    const trackIcon = trackIconMap[selectedDeal.industry] || 'fas fa-building';
    const trackName = trackNameMap[selectedDeal.industry] || selectedDeal.industry;
    
    // 更新头部
    document.getElementById('deal-name').textContent = selectedDeal.company_name;
    document.getElementById('deal-sub').textContent = trackName + ' · ' + selectedDeal.id;
    
    // 更新头像
    const avatarEl = document.getElementById('deal-avatar');
    avatarEl.innerHTML = \`<i class="\${trackIcon} text-white"></i>\`;
    
    // 解析财务数据
    let financialData = {};
    try {
      financialData = typeof selectedDeal.financial_data === 'string' 
        ? JSON.parse(selectedDeal.financial_data) 
        : selectedDeal.financial_data || {};
    } catch (e) {}
    
    // 获取关键指标
    const investorReturn = financialData.profit_distribution?.investor_return || financialData.investor_return || {};
    const revenue = financialData.revenue_forecast?.total || financialData.revenue_forecast || 0;
    
    // 抖音投流特殊字段
    const partnerEval = financialData.partner_evaluation || {};
    const investmentMetrics = financialData.investment_metrics || {};
    const brandEval = financialData.brand_evaluation || {};
    
    // 更新详情区域
    const infoEl = document.getElementById('deal-info');
    
    // 根据赛道显示不同的信息
    if (selectedDeal.industry === 'douyin-ecommerce') {
      // 抖音投流标的显示特殊字段
      infoEl.innerHTML = \`
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">投资金额</span>
            <span class="font-medium text-[primary-500]">\${selectedDeal.funding_amount}万</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">品类</span>
            <span class="font-medium">\${partnerEval.category || '抖音电商'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">合作时长</span>
            <span class="font-medium">\${partnerEval.cooperation_duration_months || '-'}个月</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">累计投流金额</span>
            <span class="font-medium">\${partnerEval.historical_investment || '-'}万</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">整体ROI</span>
            <span class="font-medium text-green-600">\${investmentMetrics.overall_roi || '-'}</span>
          </div>
          
          <div class="mt-4 pt-4 border-t">
            <h4 class="font-medium mb-2">投流效果指标</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">累计GMV</span>
                <span>\${investmentMetrics.cumulative_gmv ? (investmentMetrics.cumulative_gmv / 10000).toFixed(1) + '亿' : '-'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">平均CTR</span>
                <span>\${investmentMetrics.avg_ctr ? (investmentMetrics.avg_ctr * 100).toFixed(1) + '%' : '-'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">自然流量增幅</span>
                <span class="text-green-600">\${investmentMetrics.organic_traffic_growth ? '+' + (investmentMetrics.organic_traffic_growth * 100).toFixed(0) + '%' : '-'}</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t">
            <h4 class="font-medium mb-2">店铺/品牌评估</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">店铺评分</span>
                <span>\${brandEval.shop_rating || brandEval.service_rating || '-'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">抖音收入占比</span>
                <span>\${brandEval.douyin_revenue_ratio ? (brandEval.douyin_revenue_ratio * 100).toFixed(0) + '%' : '-'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">年增长率</span>
                <span class="text-green-600">\${brandEval.annual_growth_rate ? '+' + (brandEval.annual_growth_rate * 100).toFixed(0) + '%' : '-'}</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t">
            <h4 class="font-medium mb-2">投资回报</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">预期ROI</span>
                <span>\${investorReturn.roi ? (investorReturn.roi * 100).toFixed(0) + '%' : '-'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">预期IRR</span>
                <span>\${investorReturn.irr_estimate ? (investorReturn.irr_estimate * 100).toFixed(0) + '%' : '-'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">回收期</span>
                <span>\${investorReturn.payback_months || '-'}个月</span>
              </div>
            </div>
          </div>
        </div>
      \`;
    } else {
      // 通用标的显示
      infoEl.innerHTML = \`
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">公司名称</span>
            <span class="font-medium">\${selectedDeal.company_name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">行业赛道</span>
            <span class="font-medium">\${trackName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">投资金额</span>
            <span class="font-medium text-[primary-500]">\${selectedDeal.funding_amount}万</span>
          </div>
          \${investorReturn.irr_estimate ? \`
          <div class="flex justify-between">
            <span class="text-gray-500">预期IRR</span>
            <span class="font-medium text-green-600">\${(investorReturn.irr_estimate * 100).toFixed(0)}%</span>
          </div>
          \` : ''}
          
          <div class="mt-4 pt-4 border-t">
            <h4 class="font-medium mb-2">财务预测</h4>
            <div class="space-y-2 text-sm">
              \${revenue ? \`
              <div class="flex justify-between">
                <span class="text-gray-500">预计收入</span>
                <span>\${revenue}万</span>
              </div>
              \` : ''}
              \${financialData.cost_structure?.total ? \`
              <div class="flex justify-between">
                <span class="text-gray-500">预计成本</span>
                <span>\${financialData.cost_structure.total}万</span>
              </div>
              \` : ''}
              \${investorReturn.roi ? \`
              <div class="flex justify-between">
                <span class="text-gray-500">预期ROI</span>
                <span>\${(investorReturn.roi * 100).toFixed(0)}%</span>
              </div>
              \` : ''}
              \${investorReturn.payback_months ? \`
              <div class="flex justify-between">
                <span class="text-gray-500">回收期</span>
                <span>\${investorReturn.payback_months}个月</span>
              </div>
              \` : ''}
            </div>
          </div>
        </div>
      \`;
    }
    
    // 更新中环赛道标签
    const trackBadge = document.getElementById('inner-track-badge');
    if (trackBadge) {
      trackBadge.textContent = trackName;
      trackBadge.style.background = trackColor + '20';
      trackBadge.style.color = trackColor;
    }
  }

  // ============================================
  // 智能体管理
  // ============================================
  
  // 加载智能体（根据项目赛道筛选）
  async function loadDemoAgents() {
    try {
      const { data } = await apiCall('/api/agents');
      demoAgents = data;
      
      // 筛选外环智能体（外环不分赛道，所有项目共用）
      filteredOuterAgents = demoAgents.filter(a => a.ring_type === 'outer');
      
      // 筛选中环智能体（只显示该赛道专属 + 通用智能体）
      filteredInnerAgents = demoAgents.filter(a => 
        a.ring_type === 'inner' && 
        a.id !== 'comprehensive-scoring-agent' &&
        (a.industry === currentDealIndustry || a.industry === 'all')
      );
      
      console.log('当前项目赛道:', currentDealIndustry);
      console.log('已筛选外环智能体:', filteredOuterAgents.map(a => a.name));
      console.log('已筛选中环智能体:', filteredInnerAgents.map(a => a.name));
      
      renderAgentCards();
      updateInnerAgentCount();
    } catch (e) {
      console.error('加载智能体失败:', e);
    }
  }
  
  // 更新中环智能体数量显示
  function updateInnerAgentCount() {
    const innerCountEl = document.getElementById('inner-agent-count');
    if (innerCountEl && filteredInnerAgents.length > 0) {
      const generalCount = filteredInnerAgents.filter(a => a.industry === 'all').length;
      const trackCount = filteredInnerAgents.filter(a => a.industry !== 'all').length;
      innerCountEl.innerHTML = '<i class="fas fa-robot mr-1"></i> 通用 ' + generalCount + ' + 专属 ' + trackCount;
    }
  }

  // 渲染智能体卡片
  function renderAgentCards() {
    const outerAgents = filteredOuterAgents;
    const innerAgents = filteredInnerAgents;
    
    // 外环智能体
    document.getElementById('outer-agents').innerHTML = outerAgents.map((agent, index) => \`
      <div id="agent-\${agent.id}" class="border rounded-lg overflow-hidden transition-all duration-300">
        <div class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100" onclick="toggleAgentDetail('\${agent.id}')">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-medium">\${agent.name}</h4>
              <p class="text-xs text-gray-500">\${agent.dimension} · 阈值 \${agent.pass_threshold}分</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div id="progress-\${agent.id}" class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden hidden">
              <div class="h-full bg-primary-500 transition-all duration-1000" style="width: 0%"></div>
            </div>
            <span id="score-\${agent.id}" class="font-mono text-lg font-bold text-gray-400">--</span>
            <span id="status-\${agent.id}" class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-minus text-gray-400 text-xs"></i>
            </span>
            <i id="expand-icon-\${agent.id}" class="fas fa-chevron-down text-gray-400 text-sm transition-transform"></i>
          </div>
        </div>
        <div id="detail-\${agent.id}" class="hidden border-t bg-white">
          <div class="p-4 space-y-4">
            <div id="steps-\${agent.id}" class="space-y-2">
              <div class="flex items-center space-x-2 text-gray-400 text-sm">
                <i class="fas fa-hourglass-start"></i>
                <span>等待执行...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`).join('');

    // 中环智能体
    document.getElementById('inner-agents').innerHTML = innerAgents.map(agent => {
      const isGeneral = agent.industry === 'all';
      const tagClass = isGeneral ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600';
      const tagText = isGeneral ? '通用' : '专属';
      return \`
      <div id="agent-\${agent.id}" class="border rounded-lg overflow-hidden transition-all duration-300">
        <div class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100" onclick="toggleAgentDetail('\${agent.id}')">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon} text-sm" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h4 class="font-medium text-sm">\${agent.name.replace('智能体', '')}</h4>
                <span class="text-xs px-1.5 py-0.5 rounded \${tagClass}">\${tagText}</span>
              </div>
              <p class="text-xs text-gray-500">权重 \${agent.weight}%</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span id="score-\${agent.id}" class="font-mono font-bold text-gray-400">--</span>
            <span id="status-\${agent.id}" class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-minus text-gray-400 text-xs"></i>
            </span>
            <i id="expand-icon-\${agent.id}" class="fas fa-chevron-down text-gray-400 text-xs transition-transform"></i>
          </div>
        </div>
        <div id="detail-\${agent.id}" class="hidden border-t bg-white">
          <div class="p-3 space-y-3">
            <div id="steps-\${agent.id}" class="space-y-2">
              <div class="flex items-center space-x-2 text-gray-400 text-sm">
                <i class="fas fa-hourglass-start"></i>
                <span>等待执行...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`}).join('');
  }

  // ============================================
  // 评估流程
  // ============================================
  
  // 开始评估
  async function startDemo() {
    // 检查是否选择了标的
    if (!selectedDeal) {
      showToast('请先选择要评估的标的项目', 'error');
      return;
    }
    
    if (isRunning) return;
    isRunning = true;
    evaluationResults = {};
    
    const currentDealId = selectedDeal.id;
    
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-start').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>评估中...';
    document.getElementById('overall-status').textContent = '正在评估 ' + selectedDeal.company_name + '...';
    document.getElementById('recommendation-section').classList.add('hidden');
    document.getElementById('improvement-section').classList.add('hidden');

    try {
      // 步骤2：外环漏斗体系
      updateStep(2, 'active');
      const outerSection = document.getElementById('outer-section');
      outerSection.classList.remove('opacity-40', 'border-dashed', 'border-gray-200');
      outerSection.classList.add('border-solid', 'border-red-300', 'ring-2', 'ring-red-100');
      document.getElementById('outer-step-badge').className = 'ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded animate-pulse';
      document.getElementById('outer-step-badge').textContent = '执行中';
      document.getElementById('outer-status').innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>串行执行中...';
      document.getElementById('outer-status').className = 'text-sm text-red-600 font-medium';

      // 使用筛选后的外环智能体ID列表
      const outerAgentIds = filteredOuterAgents.map(a => a.id);
      
      for (const agentId of outerAgentIds) {
        updateAgentStatus(agentId, 'running');
        
        const response = await apiCall('/api/ai/evaluate', {
          method: 'POST',
          body: JSON.stringify({ agentId, dealId: currentDealId })
        });
        
        await sleep(500);
        
        const pass = response.data.pass;
        const score = response.data.result?.score || 0;
        evaluationResults[agentId] = response.data;
        updateAgentStatus(agentId, pass ? 'pass' : 'fail', score, response.data.result);
        
        if (!pass) {
          document.getElementById('outer-status').innerHTML = '<i class="fas fa-times-circle mr-1"></i>未通过';
          document.getElementById('outer-status').className = 'text-sm text-red-600 font-medium';
          document.getElementById('outer-step-badge').className = 'ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded';
          document.getElementById('outer-step-badge').textContent = '已否决';
          outerSection.classList.remove('ring-2', 'ring-red-100');
          outerSection.classList.add('border-red-500');
          updateStep(2, 'error');
          document.getElementById('overall-status').textContent = '外环漏斗体系未通过 - 一票否决';
          showToast('外环漏斗体系未通过，项目被否决', 'error');
          generateImprovementSuggestions();
          return;
        }
      }

      document.getElementById('outer-status').innerHTML = '<i class="fas fa-check-circle mr-1"></i>全部通过';
      document.getElementById('outer-status').className = 'text-sm text-green-600 font-medium';
      document.getElementById('outer-step-badge').className = 'ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded';
      document.getElementById('outer-step-badge').textContent = '已完成';
      outerSection.classList.remove('ring-2', 'ring-red-100', 'border-red-300');
      outerSection.classList.add('border-green-300');
      updateStep(2, 'complete');

      // 步骤3：中环筛子体系
      updateStep(3, 'active');
      const innerSection = document.getElementById('inner-section');
      innerSection.classList.remove('opacity-40', 'border-dashed', 'border-gray-200');
      innerSection.classList.add('border-solid', 'border-[violet-500]', 'ring-2', 'ring-green-100');
      document.getElementById('inner-step-badge').className = 'ml-2 text-xs bg-[violet-500] text-white px-2 py-0.5 rounded animate-pulse';
      document.getElementById('inner-step-badge').textContent = '执行中';
      document.getElementById('inner-status').innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>并行评估中...';
      document.getElementById('inner-status').className = 'text-sm text-[violet-500] font-medium';

      // 使用筛选后的中环智能体ID列表
      const innerAgentIds = filteredInnerAgents.map(a => a.id);
      
      innerAgentIds.forEach(id => updateAgentStatus(id, 'running'));

      const innerResults = await Promise.all(innerAgentIds.map(async agentId => {
        const response = await apiCall('/api/ai/evaluate', {
          method: 'POST',
          body: JSON.stringify({ agentId, dealId: currentDealId })
        });
        return { agentId, ...response.data };
      }));

      const scores = {};
      innerResults.forEach(r => {
        const score = r.result?.score || 0;
        scores[r.agentId] = score;
        evaluationResults[r.agentId] = r;
        updateAgentStatus(r.agentId, r.pass ? 'pass' : 'fail', score, r.result);
      });

      document.getElementById('inner-status').innerHTML = '<i class="fas fa-check-circle mr-1"></i>评估完成';
      document.getElementById('inner-status').className = 'text-sm text-green-600 font-medium';
      document.getElementById('inner-step-badge').className = 'ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded';
      document.getElementById('inner-step-badge').textContent = '已完成';
      innerSection.classList.remove('ring-2', 'ring-green-100', 'border-[violet-500]');
      innerSection.classList.add('border-green-300');
      updateStep(3, 'complete');

      // 步骤4：综合评分
      updateStep(4, 'active');
      const finalSection = document.getElementById('final-section');
      finalSection.classList.remove('opacity-40', 'border-dashed', 'border-gray-200');
      finalSection.classList.add('border-solid', 'border-[primary-500]', 'ring-2', 'ring-emerald-100');
      document.getElementById('final-step-badge').className = 'ml-2 text-xs bg-[primary-500] text-white px-2 py-0.5 rounded animate-pulse';
      document.getElementById('final-step-badge').textContent = '计算中';
      document.getElementById('final-status').innerHTML = '<i class="fas fa-calculator fa-spin mr-1"></i>计算综合评分...';
      document.getElementById('final-status').className = 'text-sm text-[primary-500] font-medium';

      // 动态构建权重
      const weights = {};
      filteredInnerAgents.forEach(agent => {
        weights[agent.id] = agent.weight || 10;
      });

      let weightedSum = 0;
      let totalWeight = 0;
      Object.keys(weights).forEach(id => {
        weightedSum += (scores[id] || 0) * weights[id];
        totalWeight += weights[id];
      });

      const finalScore = Math.round(weightedSum / totalWeight * 10) / 10;
      
      let grade = 'D', gradeColor = 'red';
      if (finalScore >= 85) { grade = 'A'; gradeColor = 'green'; }
      else if (finalScore >= 75) { grade = 'B+'; gradeColor = 'emerald'; }
      else if (finalScore >= 65) { grade = 'B'; gradeColor = 'blue'; }
      else if (finalScore >= 60) { grade = 'C'; gradeColor = 'yellow'; }

      updateRadarChart(scores);

      document.getElementById('final-details').innerHTML = \`
        <div class="text-center">
          <div class="text-5xl font-bold text-\${gradeColor}-600 mb-2">\${finalScore}</div>
          <div class="text-2xl font-bold text-\${gradeColor}-500">\${grade}级</div>
          <p class="text-gray-500 mt-2">\${grade === 'A' ? '强烈推荐投资' : grade === 'B+' ? '推荐投资' : grade === 'B' ? '可以投资' : '谨慎投资'}</p>
        </div>
        <div class="space-y-2 mt-4">
          \${Object.entries(scores).map(([id, score]) => {
            const agent = demoAgents.find(a => a.id === id);
            return \`<div class="flex justify-between text-sm"><span class="text-gray-600">\${agent?.dimension || id}</span><span class="font-mono font-medium">\${score}</span></div>\`;
          }).join('')}
        </div>
        <div class="mt-4 pt-4 border-t">
          <p class="text-xs text-gray-500 mb-2"><i class="fas fa-calculator mr-1"></i>加权计算</p>
          <div class="text-xs text-gray-400 space-y-1">
            \${Object.entries(weights).map(([id, weight]) => {
              const agent = demoAgents.find(a => a.id === id);
              return \`<div>\${agent?.dimension || id}: \${scores[id] || 0} × \${weight}%</div>\`;
            }).join('')}
            <div class="font-medium text-gray-600 mt-2">= \${finalScore} 分</div>
          </div>
        </div>
      \`;

      document.getElementById('final-status').innerHTML = '<i class="fas fa-check-circle mr-1"></i>评分完成';
      document.getElementById('final-status').className = 'text-sm text-green-600 font-medium';
      document.getElementById('final-step-badge').className = 'ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded';
      document.getElementById('final-step-badge').textContent = '已完成';
      finalSection.classList.remove('ring-2', 'ring-emerald-100', 'border-[primary-500]');
      finalSection.classList.add('border-green-300');
      updateStep(4, 'complete');

      // 显示投资建议
      const recSection = document.getElementById('recommendation-section');
      recSection.classList.remove('hidden');
      
      document.getElementById('rec-title').textContent = grade === 'A' || grade === 'B+' ? '✅ 建议投资' : grade === 'B' ? '⚠️ 可考虑投资' : '❌ 建议谨慎';
      document.getElementById('rec-detail').textContent = selectedDeal.company_name + ' 整体评估' + (finalScore >= 65 ? '良好' : '存在风险') + '。';
      document.getElementById('rec-score').textContent = finalScore;
      document.getElementById('rec-grade').textContent = grade + '级';
      
      // 提取优势和风险
      const strengths = [], risks = [];
      Object.values(evaluationResults).forEach(r => {
        if (r.result?.findings) {
          r.result.findings.forEach(f => {
            const findingText = formatFinding(f);
            if (findingText.includes('优') || findingText.includes('强') || findingText.includes('好') || findingText.includes('完善') || findingText.includes('齐全') || findingText.includes('丰富') || findingText.includes('pass')) {
              if (strengths.length < 4) strengths.push(findingText);
            } else if (findingText.includes('风险') || findingText.includes('缺') || findingText.includes('不足') || findingText.includes('需要') || findingText.includes('关注')) {
              if (risks.length < 4) risks.push(findingText);
            }
          });
        }
      });
      
      document.getElementById('rec-strengths').innerHTML = (strengths.length > 0 ? strengths : ['数据完整', '团队经验丰富', '模式清晰']).slice(0, 3).map(s => {
        const text = typeof s === 'string' ? s : formatFinding(s);
        return \`<li>• \${text.length > 40 ? text.substring(0, 40) + '...' : text}</li>\`;
      }).join('');
      
      document.getElementById('rec-risks').innerHTML = (risks.length > 0 ? risks : ['需持续关注运营数据', '市场竞争风险', '政策变动风险']).slice(0, 3).map(r => {
        const text = typeof r === 'string' ? r : formatFinding(r);
        return \`<li>• \${text.length > 40 ? text.substring(0, 40) + '...' : text}</li>\`;
      }).join('');

      // 生成综合改进建议
      generateImprovementSuggestions();

      document.getElementById('overall-status').textContent = '评估完成';
      showToast('评估完成！综合评分：' + finalScore + '分', 'success');

    } catch (error) {
      showToast('评估出错：' + error.message, 'error');
      document.getElementById('overall-status').textContent = '评估出错';
    } finally {
      isRunning = false;
      document.getElementById('btn-start').disabled = false;
      document.getElementById('btn-start').innerHTML = '<i class="fas fa-play mr-2"></i>重新评估';
    }
  }

  // 重置评估状态
  function resetEvaluationState() {
    evaluationResults = {};
    
    // 重置步骤指示器
    for (let i = 2; i <= 4; i++) {
      const stepEl = document.getElementById(\`step-\${i}\`);
      if (stepEl) {
        stepEl.classList.add('opacity-50');
        const div = stepEl.querySelector('div');
        if (div) {
          div.className = 'w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold';
          div.textContent = i;
        }
      }
    }
    
    // 重置区域
    const sections = ['outer-section', 'inner-section', 'final-section'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('opacity-40', 'border-dashed', 'border-gray-200');
        el.classList.remove('border-solid', 'border-red-300', 'border-[violet-500]', 'border-[primary-500]', 
          'ring-2', 'ring-red-100', 'ring-green-100', 'ring-emerald-100', 'border-green-300', 'border-red-500');
      }
    });
    
    document.getElementById('outer-status').innerHTML = '<i class="fas fa-clock mr-1"></i>等待开始';
    document.getElementById('outer-status').className = 'text-sm text-gray-500 flex items-center';
    document.getElementById('inner-status').innerHTML = '<i class="fas fa-lock mr-1"></i>等待外环漏斗体系完成';
    document.getElementById('inner-status').className = 'text-sm text-gray-400 flex items-center';
    document.getElementById('final-status').innerHTML = '<i class="fas fa-lock mr-1"></i>等待评估完成';
    document.getElementById('final-status').className = 'text-sm text-gray-400 flex items-center';
    
    document.getElementById('outer-step-badge').className = 'ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded';
    document.getElementById('outer-step-badge').textContent = '第1步';
    document.getElementById('inner-step-badge').className = 'ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded';
    document.getElementById('inner-step-badge').textContent = '第2步';
    document.getElementById('final-step-badge').className = 'ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded';
    document.getElementById('final-step-badge').textContent = '第3步';
    
    document.getElementById('recommendation-section').classList.add('hidden');
    document.getElementById('improvement-section').classList.add('hidden');
    
    document.getElementById('final-details').innerHTML = '<div class="text-center py-8 text-gray-400"><i class="fas fa-chart-pie text-4xl mb-2"></i><p>评估完成后显示结果</p></div>';
    
    if (radarChart) {
      radarChart.destroy();
      radarChart = null;
    }
    
    document.getElementById('overall-status').textContent = '准备就绪';
  }

  // ============================================
  // UI辅助函数
  // ============================================

  function toggleAgentDetail(agentId) {
    const detailEl = document.getElementById(\`detail-\${agentId}\`);
    const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
    if (detailEl.classList.contains('hidden')) {
      detailEl.classList.remove('hidden');
      expandIcon.classList.add('rotate-180');
    } else {
      detailEl.classList.add('hidden');
      expandIcon.classList.remove('rotate-180');
    }
  }

  function toggleAllDetails() {
    allExpanded = !allExpanded;
    document.querySelectorAll('[id^="detail-"]').forEach(el => {
      if (el.id.startsWith('detail-') && !el.id.includes('modal')) {
        el.classList.toggle('hidden', !allExpanded);
      }
    });
    document.querySelectorAll('[id^="expand-icon-"]').forEach(icon => {
      icon.classList.toggle('rotate-180', allExpanded);
    });
    document.getElementById('toggle-all-text').textContent = allExpanded ? '收起全部' : '展开全部';
  }

  function updateStep(step, status) {
    const stepEl = document.getElementById(\`step-\${step}\`);
    const lineEl = document.getElementById(\`line-\${step - 1}\`);
    
    if (status === 'active') {
      stepEl.classList.remove('opacity-50');
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold';
      if (lineEl) lineEl.className = 'w-16 h-0.5 bg-primary-500';
    } else if (status === 'complete') {
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold';
      stepEl.querySelector('div').innerHTML = '<i class="fas fa-check"></i>';
    } else if (status === 'error') {
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold';
      stepEl.querySelector('div').innerHTML = '<i class="fas fa-times"></i>';
    }
  }

  function updateAgentStatus(agentId, status, score = null, result = null) {
    const statusEl = document.getElementById(\`status-\${agentId}\`);
    const scoreEl = document.getElementById(\`score-\${agentId}\`);
    const progressEl = document.getElementById(\`progress-\${agentId}\`);
    const cardEl = document.getElementById(\`agent-\${agentId}\`);

    if (status === 'running') {
      statusEl.innerHTML = '<i class="fas fa-spinner fa-spin text-primary-500 text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center';
      cardEl?.classList.add('ring-2', 'ring-primary-300');
      if (progressEl) {
        progressEl.classList.remove('hidden');
        progressEl.querySelector('div').style.width = '30%';
        setTimeout(() => progressEl.querySelector('div').style.width = '70%', 500);
      }
      updateAgentSteps(agentId, 'running');
    } else if (status === 'pass') {
      statusEl.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-green-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      cardEl?.classList.add('border-green-300');
      if (progressEl) progressEl.querySelector('div').style.width = '100%';
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-green-600';
      }
      updateAgentSteps(agentId, 'pass', result);
      // 自动展开
      const detailEl = document.getElementById(\`detail-\${agentId}\`);
      const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
      if (detailEl) {
        detailEl.classList.remove('hidden');
        expandIcon?.classList.add('rotate-180');
      }
    } else if (status === 'fail') {
      statusEl.innerHTML = '<i class="fas fa-times text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-red-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      cardEl?.classList.add('border-red-300');
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-red-600';
      }
      updateAgentSteps(agentId, 'fail', result);
      const detailEl = document.getElementById(\`detail-\${agentId}\`);
      const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
      if (detailEl) {
        detailEl.classList.remove('hidden');
        expandIcon?.classList.add('rotate-180');
      }
    }
  }

  function updateAgentSteps(agentId, status, result = null) {
    const stepsEl = document.getElementById(\`steps-\${agentId}\`);
    if (!stepsEl) return;

    const agentInfo = demoAgents.find(a => a.id === agentId);
    
    if (status === 'running') {
      stepsEl.innerHTML = \`
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fas fa-spinner fa-spin text-primary-500 text-xs"></i>
            </div>
            <div>
              <p class="font-medium text-primary-700">正在执行评估...</p>
              <p class="text-sm text-gray-500 mt-1">AI智能体正在分析项目材料</p>
            </div>
          </div>
        </div>
      \`;
    } else if (status === 'pass' || status === 'fail') {
      const isPassed = status === 'pass';
      const reasoning = getFullReasoning(result);
      const recommendation = getFullRecommendation(result);
      const findings = result?.findings || [];
      const riskLevel = result?.risk_level || 'medium';
      const score = result?.score || 0;
      
      const riskLevelMap = {
        low: { text: '低风险', color: 'green', icon: 'shield-alt' },
        medium: { text: '中风险', color: 'yellow', icon: 'exclamation-triangle' },
        high: { text: '高风险', color: 'red', icon: 'exclamation-circle' }
      };
      const riskInfo = riskLevelMap[riskLevel] || riskLevelMap.medium;
      
      const reasoningPreview = reasoning.length > 200 ? reasoning.substring(0, 200) + '...' : reasoning;
      const recommendationPreview = recommendation && recommendation.length > 150 ? recommendation.substring(0, 150) + '...' : recommendation;
      
      stepsEl.innerHTML = \`
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full \${isPassed ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fas \${isPassed ? 'fa-check text-green-500' : 'fa-times text-red-500'} text-xs"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="font-medium \${isPassed ? 'text-green-700' : 'text-red-700'}">
                  \${isPassed ? '✓ 评估通过' : '✗ 评估未通过'}
                </p>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-0.5 rounded text-xs bg-\${riskInfo.color}-100 text-\${riskInfo.color}-700">
                    <i class="fas fa-\${riskInfo.icon} mr-1"></i>\${riskInfo.text}
                  </span>
                  <span class="font-mono font-bold \${isPassed ? 'text-green-600' : 'text-red-600'}">\${score}分</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="ml-9 space-y-3">
            <div class="bg-purple-50 rounded-lg p-3 cursor-pointer hover:bg-purple-100 transition" onclick="showReasoningPopup('\${agentId}', 'reasoning')">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-sm text-purple-700 flex items-center">
                  <i class="fas fa-brain mr-2"></i>AI推理过程
                </span>
                <span class="text-xs text-purple-500 flex items-center">
                  点击查看完整内容 <i class="fas fa-external-link-alt ml-1"></i>
                </span>
              </div>
              <div class="text-sm text-gray-600 line-clamp-3">\${reasoningPreview}</div>
            </div>
            
            \${findings.length > 0 ? \`
            <div class="bg-amber-50 rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <i class="fas fa-search text-amber-500"></i>
                <span class="font-medium text-sm text-gray-700">检查发现</span>
              </div>
              <ul class="space-y-1 text-sm">
                \${findings.slice(0, 3).map(f => \`
                  <li class="flex items-start space-x-2">
                    <i class="fas \${getFindingIcon(f)} mt-0.5 text-xs"></i>
                    <span class="text-gray-600">\${formatFinding(f)}</span>
                  </li>
                \`).join('')}
                \${findings.length > 3 ? \`<li class="text-gray-400 text-xs ml-4">...还有 \${findings.length - 3} 项</li>\` : ''}
              </ul>
            </div>
            \` : ''}
            
            \${recommendation ? \`
            <div class="bg-blue-50 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition" onclick="showReasoningPopup('\${agentId}', 'recommendation')">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-sm text-blue-700 flex items-center">
                  <i class="fas fa-lightbulb mr-2"></i>评估建议
                </span>
                <span class="text-xs text-blue-500 flex items-center">
                  点击查看完整内容 <i class="fas fa-external-link-alt ml-1"></i>
                </span>
              </div>
              <div class="text-sm text-gray-600 line-clamp-2">\${recommendationPreview}</div>
            </div>
            \` : ''}
          </div>
          
          <div class="ml-9 pt-2 flex space-x-3">
            <button onclick="showFullReport('\${agentId}')" class="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
              <i class="fas fa-file-alt"></i>
              <span>完整报告</span>
            </button>
            <button onclick="showReasoningPopup('\${agentId}', 'raw')" class="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
              <i class="fas fa-code"></i>
              <span>原始数据</span>
            </button>
          </div>
        </div>
      \`;
    }
  }

  // 更新雷达图
  function updateRadarChart(scores) {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    if (radarChart) radarChart.destroy();

    const labels = filteredInnerAgents.map(a => a.dimension || a.name.replace('智能体', ''));
    const data = filteredInnerAgents.map(a => scores[a.id] || 0);

    radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '评分',
          data: data,
          fill: true,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)',
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff'
        }]
      },
      options: {
        scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  // ============================================
  // 辅助函数
  // ============================================

  function getFullReasoning(result) {
    if (result?._raw_response) {
      const raw = result._raw_response;
      const reasoningMatch = raw.match(/"reasoning"\\s*:\\s*"([\\s\\S]*?)(?:"\\s*[,}]|"$)/);
      if (reasoningMatch && reasoningMatch[1] && reasoningMatch[1].length > 50) {
        return reasoningMatch[1]
          .replace(/\\\\n/g, '\\n')
          .replace(/\\\\"/g, '"')
          .replace(/\\\\\\\\/g, '\\\\');
      }
    }
    return result?.reasoning || result?.rationale || result?.assessment || '暂无详细推理内容';
  }

  function getFullRecommendation(result) {
    if (result?._raw_response) {
      const raw = result._raw_response;
      const recMatch = raw.match(/"recommendation"\\s*:\\s*"([\\s\\S]*?)(?:"\\s*[,}]|"$)/);
      if (recMatch && recMatch[1] && recMatch[1].length > 10) {
        return recMatch[1]
          .replace(/\\\\n/g, '\\n')
          .replace(/\\\\"/g, '"')
          .replace(/\\\\\\\\/g, '\\\\');
      }
    }
    return result?.recommendation || '';
  }

  function formatFinding(f) {
    if (typeof f === 'string') return f;
    if (typeof f === 'object' && f !== null) {
      if (f.item && f.detail) return \`【\${f.item}】\${f.detail}\`;
      if (f.detail) return f.detail;
      if (f.item) return f.item;
      if (f.message) return f.message;
      if (f.content) return f.content;
      return Object.values(f).filter(v => typeof v === 'string').join(' - ') || JSON.stringify(f);
    }
    return String(f);
  }

  function getFindingIcon(f) {
    if (typeof f === 'object' && f !== null && f.status) {
      if (f.status === 'pass' || f.status === 'ok' || f.status === 'success') {
        return 'fa-check-circle text-green-500';
      } else if (f.status === 'fail' || f.status === 'error') {
        return 'fa-times-circle text-red-500';
      } else if (f.status === 'warning' || f.status === 'warn') {
        return 'fa-exclamation-circle text-yellow-500';
      }
    }
    return 'fa-check-circle text-amber-500';
  }

  function formatReasoningText(text) {
    if (!text) return '';
    return text
      .replace(/\\n\\n/g, '</p><p class="mt-3">')
      .replace(/\\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
      .replace(/- /g, '• ');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ============================================
  // 弹窗函数
  // ============================================

  function showReasoningPopup(agentId, type = 'reasoning') {
    const result = evaluationResults[agentId];
    const agent = demoAgents.find(a => a.id === agentId);
    if (!result || !agent) return;
    
    const popup = document.getElementById('reasoning-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');
    
    let content = '';
    let title = '';
    
    if (type === 'reasoning') {
      title = 'AI推理过程 - ' + agent.name;
      const reasoning = getFullReasoning(result.result);
      content = \`
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-2">
              <span class="font-medium">评估得分:</span>
              <span class="text-2xl font-bold \${result.pass ? 'text-green-600' : 'text-red-600'}">\${result.result?.score || 0}</span>
            </div>
            <span class="px-3 py-1 rounded-full text-sm \${result.pass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
              \${result.pass ? '✓ 通过' : '✗ 未通过'}
            </span>
          </div>
          <div class="prose max-w-none">
            <h4 class="text-gray-700 font-medium mb-2">详细推理分析</h4>
            <div class="bg-purple-50 rounded-lg p-4 reasoning-text text-gray-700">
              \${formatReasoningText(reasoning)}
            </div>
          </div>
        </div>
      \`;
    } else if (type === 'recommendation') {
      title = '评估建议 - ' + agent.name;
      const recommendation = getFullRecommendation(result.result);
      content = \`
        <div class="space-y-4">
          <div class="prose max-w-none">
            <div class="bg-blue-50 rounded-lg p-4 reasoning-text text-gray-700">
              \${formatReasoningText(recommendation || '暂无具体建议')}
            </div>
          </div>
        </div>
      \`;
    } else if (type === 'raw') {
      title = '原始响应数据 - ' + agent.name;
      const rawData = result.result?._raw_response || JSON.stringify(result.result, null, 2);
      content = \`
        <div class="space-y-4">
          <p class="text-sm text-gray-500">以下是AI返回的原始数据：</p>
          <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">\${escapeHtml(rawData)}</pre>
        </div>
      \`;
    }
    
    popupTitle.textContent = title;
    popupContent.innerHTML = content;
    popup.classList.remove('hidden');
  }

  function closeReasoningPopup() {
    document.getElementById('reasoning-popup').classList.add('hidden');
  }

  function showFullReport(agentId) {
    const result = evaluationResults[agentId];
    const agent = demoAgents.find(a => a.id === agentId);
    if (!result || !agent) {
      showToast('暂无评估结果', 'error');
      return;
    }
    
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const isPassed = result.pass;
    const score = result.result?.score || 0;
    const reasoning = getFullReasoning(result.result);
    const recommendation = getFullRecommendation(result.result);
    const findings = result.result?.findings || [];
    const executionTime = result.executionTime || 0;
    
    modalTitle.innerHTML = \`<div class="flex items-center space-x-2"><i class="\${agent.icon}" style="color: \${agent.icon_color}"></i><span>\${agent.name} - 完整评估报告</span></div>\`;
    
    modalContent.innerHTML = \`
      <div class="space-y-6">
        <div class="flex items-center justify-between p-4 rounded-xl \${isPassed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 rounded-full \${isPassed ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center">
              <i class="fas \${isPassed ? 'fa-check' : 'fa-times'} text-2xl \${isPassed ? 'text-green-500' : 'text-red-500'}"></i>
            </div>
            <div>
              <p class="font-bold text-xl \${isPassed ? 'text-green-700' : 'text-red-700'}">\${isPassed ? '评估通过' : '评估未通过'}</p>
              <p class="text-sm text-gray-500">执行耗时: \${(executionTime / 1000).toFixed(1)}秒</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold \${isPassed ? 'text-green-600' : 'text-red-600'}">\${score}</div>
            <div class="text-sm text-gray-500">阈值: \${agent.pass_threshold}分</div>
          </div>
        </div>
        
        <div class="bg-purple-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-purple-700"><i class="fas fa-brain mr-2"></i>AI推理过程</h4>
          <div class="bg-white rounded-lg p-4 text-sm text-gray-700 reasoning-text max-h-64 overflow-y-auto">\${formatReasoningText(reasoning)}</div>
        </div>
        
        \${findings.length > 0 ? \`
        <div class="bg-amber-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-amber-700"><i class="fas fa-search mr-2"></i>检查发现</h4>
          <div class="grid gap-2">
            \${findings.map((f, i) => \`
              <div class="flex items-start space-x-3 bg-white p-3 rounded-lg">
                <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">\${i + 1}</span>
                <span class="text-sm text-gray-700">\${formatFinding(f)}</span>
              </div>
            \`).join('')}
          </div>
        </div>
        \` : ''}
        
        \${recommendation ? \`
        <div class="bg-blue-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-blue-700"><i class="fas fa-lightbulb mr-2"></i>评估建议</h4>
          <div class="bg-white rounded-lg p-4 text-sm text-gray-700 reasoning-text">\${formatReasoningText(recommendation)}</div>
        </div>
        \` : ''}
      </div>
    \`;
    
    modal.classList.remove('hidden');
  }

  function closeDetailModal() {
    document.getElementById('detail-modal').classList.add('hidden');
  }

  // ============================================
  // 改进建议
  // ============================================

  let improvementData = { missing: [], improvement: [], actions: [], riskRecommendation: '' };

  function generateImprovementSuggestions() {
    const missingMaterials = new Set();
    const improvements = new Set();
    const nextActions = [];
    let riskRecommendation = '';
    
    Object.values(evaluationResults).forEach((r) => {
      if (r.result?.missing_materials) {
        r.result.missing_materials.forEach(m => missingMaterials.add(m));
      }
      if (r.result?.improvements) {
        r.result.improvements.forEach(i => improvements.add(i));
      }
      if (r.result?.findings) {
        r.result.findings.forEach(f => {
          const findingText = formatFinding(f);
          if (findingText.includes('缺') || findingText.includes('不足') || findingText.includes('需要') || findingText.includes('建议')) {
            improvements.add(findingText);
          }
        });
      }
      if (r.agentId === 'risk-control-agent' && r.result?.recommendation) {
        riskRecommendation = r.result.recommendation;
      }
    });
    
    if (missingMaterials.size === 0) {
      missingMaterials.add('详细的合同条款');
      missingMaterials.add('财务审计报告');
      missingMaterials.add('运营数据明细');
    }
    
    if (improvements.size === 0) {
      improvements.add('完善财务预测模型');
      improvements.add('补充运营团队资料');
      improvements.add('明确风险应对措施');
    }
    
    nextActions.push({ priority: '紧急', action: '提交缺失材料', deadline: '本周内' });
    nextActions.push({ priority: '重要', action: '确认运营进度', deadline: '3日内' });
    nextActions.push({ priority: '常规', action: '更新项目计划', deadline: '2周内' });
    
    improvementData = {
      missing: Array.from(missingMaterials),
      improvement: Array.from(improvements),
      actions: nextActions,
      riskRecommendation
    };
    
    // 更新UI
    const missingEl = document.getElementById('missing-materials');
    missingEl.innerHTML = improvementData.missing.slice(0, 3).map(m => \`
      <li class="flex items-start space-x-2 p-1.5 bg-white/50 rounded-lg">
        <i class="fas fa-file-circle-exclamation text-amber-500 mt-0.5 text-xs"></i>
        <span class="text-xs line-clamp-1">\${m.length > 30 ? m.substring(0, 30) + '...' : m}</span>
      </li>
    \`).join('');
    document.getElementById('missing-count').textContent = improvementData.missing.length;
    
    const improvementEl = document.getElementById('improvement-suggestions');
    improvementEl.innerHTML = improvementData.improvement.slice(0, 3).map(i => \`
      <li class="flex items-start space-x-2 p-1.5 bg-white/50 rounded-lg">
        <i class="fas fa-arrow-up-right-dots text-blue-500 mt-0.5 text-xs"></i>
        <span class="text-xs line-clamp-1">\${i.length > 30 ? i.substring(0, 30) + '...' : i}</span>
      </li>
    \`).join('');
    document.getElementById('improvement-count').textContent = improvementData.improvement.length;
    
    const actionsEl = document.getElementById('next-actions');
    actionsEl.innerHTML = nextActions.slice(0, 3).map((a, i) => \`
      <div class="flex items-center space-x-2 p-1.5 bg-white/50 rounded-lg">
        <span class="w-5 h-5 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0">\${i + 1}</span>
        <span class="text-xs text-gray-700 line-clamp-1">\${a.action}</span>
      </div>
    \`).join('');
    document.getElementById('actions-count').textContent = nextActions.length;
    
    if (riskRecommendation) {
      document.getElementById('risk-recommendation-section').classList.remove('hidden');
      document.getElementById('risk-recommendation-preview').textContent = riskRecommendation.replace(/\\n/g, ' ').substring(0, 150) + '...';
    }
    
    document.getElementById('improvement-section').classList.remove('hidden');
  }

  function toggleImprovementCard(type) {
    const contentEl = document.getElementById(\`\${type}-content\`);
    const iconEl = document.getElementById(\`\${type}-expand-icon\`);
    if (contentEl && iconEl) {
      contentEl.classList.toggle('hidden');
      iconEl.classList.toggle('rotate-180');
    }
  }

  function showImprovementPopup(type) {
    const popup = document.getElementById('improvement-popup');
    const header = document.getElementById('improvement-popup-header');
    const title = document.getElementById('improvement-popup-title');
    const content = document.getElementById('improvement-popup-content');
    
    let headerClass = 'p-4 border-b flex items-center justify-between ';
    let titleHtml = '';
    let contentHtml = '';
    
    if (type === 'missing') {
      headerClass += 'bg-amber-50';
      titleHtml = '<i class="fas fa-file-circle-plus mr-2 text-amber-500"></i><span class="text-amber-800">待补充材料清单</span>';
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">以下材料需要补充完善：</p>
        <div class="space-y-3">
          \${improvementData.missing.map((m, i) => \`
            <div class="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <span class="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">\${i + 1}</span>
              <p class="text-sm text-gray-800">\${m}</p>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (type === 'improvement') {
      headerClass += 'bg-blue-50';
      titleHtml = '<i class="fas fa-lightbulb mr-2 text-blue-500"></i><span class="text-blue-800">项目改进建议</span>';
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">基于AI评估结果，建议改进以下方面：</p>
        <div class="space-y-3">
          \${improvementData.improvement.map((item, i) => \`
            <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div class="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-arrow-up text-xs"></i>
              </div>
              <p class="text-sm text-gray-800">\${item}</p>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (type === 'actions') {
      headerClass += 'bg-green-50';
      titleHtml = '<i class="fas fa-tasks mr-2 text-green-500"></i><span class="text-green-800">建议下一步行动</span>';
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">按优先级排序的行动计划：</p>
        <div class="space-y-3">
          \${improvementData.actions.map((a, i) => \`
            <div class="flex items-center space-x-3 p-3 bg-white rounded-lg border shadow-sm">
              <span class="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">\${i + 1}</span>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">\${a.action}</p>
                <p class="text-xs text-gray-500 mt-0.5">建议完成时间：\${a.deadline}</p>
              </div>
              <span class="text-xs px-2 py-1 rounded border \${a.priority === '紧急' ? 'bg-red-100 text-red-700' : a.priority === '重要' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}">\${a.priority}</span>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (type === 'risk-rec') {
      headerClass += 'bg-red-50';
      titleHtml = '<i class="fas fa-shield-halved mr-2 text-red-500"></i><span class="text-red-800">风险管理建议</span>';
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">来自风险控制智能体的专业建议：</p>
        <div class="bg-red-50 rounded-lg p-4 border border-red-100">
          <div class="prose prose-sm max-w-none text-gray-700">\${formatReasoningText(improvementData.riskRecommendation)}</div>
        </div>
      \`;
    }
    
    header.className = headerClass;
    title.innerHTML = titleHtml;
    content.innerHTML = contentHtml;
    popup.classList.remove('hidden');
  }

  function closeImprovementPopup() {
    document.getElementById('improvement-popup').classList.add('hidden');
  }

  // ============================================
  // 其他辅助函数
  // ============================================

  function resetDemo() { location.reload(); }
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  // 键盘事件
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeReasoningPopup();
      closeImprovementPopup();
    }
  });

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadAllDeals, 300);
    setTimeout(loadDemoAgents, 500);
  });
</script>
`
