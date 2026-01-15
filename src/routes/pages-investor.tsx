// 投资人入口页面 - Investor Portal
// 投资人可以在这里查看已投资标的的信息、历史回款、收益分析等

export const investorPortalPageContent = `
<div class="mb-6">
  <!-- 页面标题区 -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800 flex items-center">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5A7A64] to-[#8B6B4A] flex items-center justify-center mr-3 shadow-md">
          <i class="fas fa-chart-pie text-white"></i>
        </div>
        投资人入口
      </h1>
      <p class="text-slate-500 mt-1 ml-13">查看已投资标的、收益分成、投后表现分析</p>
    </div>
    <div class="flex items-center space-x-3">
      <button onclick="refreshInvestorData()" class="gs-btn gs-btn-secondary px-4 py-2">
        <i class="fas fa-sync-alt mr-2"></i>刷新数据
      </button>
      <button onclick="exportInvestorReport()" class="gs-btn gs-btn-warm px-4 py-2">
        <i class="fas fa-download mr-2"></i>导出报告
      </button>
    </div>
  </div>

  <!-- 统计概览卡片 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
    <div class="gs-card p-6 group">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500 mb-1">累计收益分成</p>
          <p class="text-3xl font-bold text-[#5A7A64]" id="stat-total-cashflow">¥0</p>
          <p class="text-xs text-slate-400 mt-2" id="stat-yesterday-cashflow">
            <i class="fas fa-calendar-day mr-1"></i>昨日 +¥0
          </p>
        </div>
        <div class="w-12 h-12 bg-[#5A7A64]/10 rounded-xl flex items-center justify-center group-hover:bg-[#5A7A64]/20 transition">
          <i class="fas fa-coins text-[#5A7A64] text-lg"></i>
        </div>
      </div>
    </div>
    
    <div class="gs-card p-6 group">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500 mb-1">已投资标的数</p>
          <p class="text-3xl font-bold text-[#8B6B4A]" id="stat-invested-deals">0</p>
          <p class="text-xs text-slate-400 mt-2" id="stat-active-deals">
            <i class="fas fa-check-circle mr-1 text-emerald-500"></i>活跃 <span id="stat-active-count">0</span> 个
          </p>
        </div>
        <div class="w-12 h-12 bg-[#8B6B4A]/10 rounded-xl flex items-center justify-center group-hover:bg-[#8B6B4A]/20 transition">
          <i class="fas fa-briefcase text-[#8B6B4A] text-lg"></i>
        </div>
      </div>
    </div>
    
    <div class="gs-card p-6 group">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500 mb-1">总投资金额</p>
          <p class="text-3xl font-bold text-[#5A6A7A]" id="stat-total-invested">¥0</p>
          <p class="text-xs text-slate-400 mt-2">
            <i class="fas fa-percentage mr-1"></i>平均回报率 <span id="stat-avg-return" class="text-emerald-500">0%</span>
          </p>
        </div>
        <div class="w-12 h-12 bg-[#5A6A7A]/10 rounded-xl flex items-center justify-center group-hover:bg-[#5A6A7A]/20 transition">
          <i class="fas fa-wallet text-[#5A6A7A] text-lg"></i>
        </div>
      </div>
    </div>
    
    <div class="gs-card p-6 group">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500 mb-1">覆盖地区/城市</p>
          <p class="text-3xl font-bold text-[#6B7B5C]" id="stat-regions">0</p>
          <p class="text-xs text-slate-400 mt-2" id="stat-issuers">
            <i class="fas fa-building mr-1"></i>发行方 <span id="stat-issuer-count">0</span> 家
          </p>
        </div>
        <div class="w-12 h-12 bg-[#6B7B5C]/10 rounded-xl flex items-center justify-center group-hover:bg-[#6B7B5C]/20 transition">
          <i class="fas fa-map-marker-alt text-[#6B7B5C] text-lg"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- 主内容区：左右布局 -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    <!-- 左侧：全行业汇总图表 + 已投资标的列表 -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- 全行业汇总 - 累计收益分成图表 -->
      <div class="gs-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-[#5A7A64]/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-chart-area text-[#5A7A64] text-sm"></i>
            </div>
            全行业投后汇总 (Total Portfolio Overview)
          </h3>
          <div class="flex items-center space-x-2">
            <button onclick="switchCashflowPeriod('week')" id="btn-period-week" class="px-3 py-1 text-xs rounded-lg bg-[#5A7A64] text-white">近7天</button>
            <button onclick="switchCashflowPeriod('month')" id="btn-period-month" class="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">近30天</button>
            <button onclick="switchCashflowPeriod('year')" id="btn-period-year" class="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">近1年</button>
          </div>
        </div>
        
        <!-- 图表和统计维度并排布局 -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <!-- 左侧：图表区域 -->
          <div class="lg:col-span-3">
            <div class="relative h-64">
              <canvas id="cashflow-chart"></canvas>
            </div>
            
            <!-- 图表下方统计 -->
            <div class="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
              <div class="text-center">
                <p class="text-xs text-slate-500">投资总额</p>
                <p class="text-lg font-bold text-[#5A6A7A]" id="chart-total-invested">¥0</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-slate-500">历史累计收益</p>
                <p class="text-lg font-bold text-[#5A7A64]" id="chart-total-return">¥0</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-slate-500">昨日收益分成</p>
                <p class="text-lg font-bold text-[#8B6B4A]" id="chart-yesterday-return">¥0</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-slate-500">本月预估</p>
                <p class="text-lg font-bold text-[#6B7B5C]" id="chart-estimated-return">¥0</p>
              </div>
            </div>
          </div>
          
          <!-- 右侧：基础统计维度筛选 -->
          <div class="lg:col-span-1 border-l border-slate-100 pl-4">
            <p class="text-xs font-medium text-slate-600 mb-3">按维度查看</p>
            <div class="space-y-2">
              <button onclick="switchChartDimension('industry')" id="btn-dim-industry" class="w-full px-3 py-2 text-xs rounded-lg bg-[#5A7A64]/10 text-[#5A7A64] text-left flex items-center justify-between hover:bg-[#5A7A64]/20 transition">
                <span><i class="fas fa-industry mr-2"></i>按行业</span>
                <i class="fas fa-chevron-right text-xs"></i>
              </button>
              <button onclick="switchChartDimension('region')" id="btn-dim-region" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 text-slate-600 text-left flex items-center justify-between hover:bg-slate-100 transition">
                <span><i class="fas fa-map-marker-alt mr-2"></i>按地区</span>
                <i class="fas fa-chevron-right text-xs"></i>
              </button>
              <button onclick="switchChartDimension('issuer')" id="btn-dim-issuer" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 text-slate-600 text-left flex items-center justify-between hover:bg-slate-100 transition">
                <span><i class="fas fa-building mr-2"></i>按发行方</span>
                <i class="fas fa-chevron-right text-xs"></i>
              </button>
              <button onclick="switchChartDimension('frequency')" id="btn-dim-frequency" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 text-slate-600 text-left flex items-center justify-between hover:bg-slate-100 transition">
                <span><i class="fas fa-clock mr-2"></i>按回款周期</span>
                <i class="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
            
            <!-- 当前维度详情 -->
            <div class="mt-4 pt-4 border-t border-slate-100">
              <p class="text-xs font-medium text-slate-600 mb-2" id="dimension-detail-title">行业分布</p>
              <div id="dimension-detail-content" class="space-y-2 max-h-32 overflow-y-auto">
                <!-- 动态加载 -->
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 已投资标的列表 -->
      <div class="gs-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-[#8B6B4A]/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-briefcase text-[#8B6B4A] text-sm"></i>
            </div>
            已投资标的
          </h3>
          <div class="flex items-center space-x-2">
            <select id="filter-deal-industry" onchange="filterInvestedDeals()" class="text-xs border rounded-lg px-3 py-1.5 bg-slate-50">
              <option value="">全部行业</option>
              <option value="catering">餐饮</option>
              <option value="retail">零售</option>
              <option value="ecommerce">电商</option>
              <option value="douyin-ecommerce">抖音投流</option>
              <option value="education">教育培训</option>
              <option value="service">生活服务</option>
              <option value="light-asset">文娱轻资产</option>
            </select>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="gs-table w-full">
            <thead>
              <tr>
                <th class="text-left">ID / 企业名称</th>
                <th class="text-left">行业</th>
                <th class="text-right">投资金额</th>
                <th class="text-right">累计回款</th>
                <th class="text-center">回款周期</th>
                <th class="text-center">操作</th>
              </tr>
            </thead>
            <tbody id="invested-deals-list">
              <!-- 动态加载 -->
            </tbody>
          </table>
        </div>
        
        <div class="mt-4 text-center">
          <button onclick="loadMoreDeals()" class="text-sm text-[#5A7A64] hover:text-[#4A6854]">
            查看更多 <i class="fas fa-chevron-down ml-1"></i>
          </button>
        </div>
      </div>
      
      <!-- 交易记录与排名 -->
      <div class="gs-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-[#5A6A7A]/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-exchange-alt text-[#5A6A7A] text-sm"></i>
            </div>
            交易记录与排名
          </h3>
          <div class="flex items-center space-x-2">
            <button onclick="switchRankingTab('transactions')" id="btn-tab-transactions" class="px-3 py-1 text-xs rounded-lg bg-[#5A6A7A] text-white">交易记录</button>
            <button onclick="switchRankingTab('return')" id="btn-tab-return" class="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">总回报排名</button>
            <button onclick="switchRankingTab('volume')" id="btn-tab-volume" class="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">交易量排名</button>
          </div>
        </div>
        
        <!-- 交易记录表格 -->
        <div id="ranking-content-transactions" class="ranking-content">
          <table class="gs-table w-full">
            <thead>
              <tr>
                <th>名称/代码</th>
                <th>货币</th>
                <th>交易日期</th>
                <th class="text-right">交易金额</th>
                <th>类型</th>
              </tr>
            </thead>
            <tbody id="transactions-list">
              <!-- 动态加载 -->
            </tbody>
          </table>
        </div>
        
        <!-- 总回报排名 -->
        <div id="ranking-content-return" class="ranking-content hidden">
          <div id="return-ranking-list" class="space-y-3">
            <!-- 动态加载 -->
          </div>
        </div>
        
        <!-- 交易量排名 -->
        <div id="ranking-content-volume" class="ranking-content hidden">
          <div id="volume-ranking-list" class="space-y-3">
            <!-- 动态加载 -->
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右侧：基础统计 + 主题分布 + 公告 -->
    <div class="space-y-6">
      
      <!-- 基础统计维度 -->
      <div class="gs-card p-6">
        <h3 class="text-base font-semibold text-slate-800 mb-4 flex items-center">
          <div class="w-8 h-8 bg-[#6B7B5C]/10 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-chart-bar text-[#6B7B5C] text-sm"></i>
          </div>
          基础统计维度
        </h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div class="flex items-center">
              <i class="fas fa-building text-[#5A7A64] mr-3"></i>
              <span class="text-sm text-slate-600">发行方数量</span>
            </div>
            <span class="font-bold text-[#5A7A64]" id="stat-detail-issuers">0</span>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div class="flex items-center">
              <i class="fas fa-boxes text-[#8B6B4A] mr-3"></i>
              <span class="text-sm text-slate-600">上市资产数量</span>
            </div>
            <span class="font-bold text-[#8B6B4A]" id="stat-detail-assets">0</span>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div class="flex items-center">
              <i class="fas fa-globe text-[#5A6A7A] mr-3"></i>
              <span class="text-sm text-slate-600">覆盖国家/地区</span>
            </div>
            <span class="font-bold text-[#5A6A7A]" id="stat-detail-countries">0</span>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div class="flex items-center">
              <i class="fas fa-city text-[#6B7B5C] mr-3"></i>
              <span class="text-sm text-slate-600">中国内地省份/城市</span>
            </div>
            <span class="font-bold text-[#6B7B5C]" id="stat-detail-cities">0</span>
          </div>
        </div>
        
        <!-- 地区分布迷你图表 -->
        <div class="mt-4 pt-4 border-t border-slate-100">
          <p class="text-xs text-slate-500 mb-2">地区分布</p>
          <div id="region-distribution" class="space-y-2">
            <!-- 动态加载 -->
          </div>
        </div>
      </div>
      
      <!-- 资产主题分布 -->
      <div class="gs-card p-6">
        <h3 class="text-base font-semibold text-slate-800 mb-4 flex items-center">
          <div class="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-tags text-violet-500 text-sm"></i>
          </div>
          资产主题分布
        </h3>
        
        <div class="relative h-48">
          <canvas id="theme-distribution-chart"></canvas>
        </div>
        
        <div id="theme-legend" class="mt-4 space-y-2">
          <!-- 动态加载 -->
        </div>
      </div>
      
      <!-- 平台公告 -->
      <div class="gs-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-bullhorn text-amber-500 text-sm"></i>
            </div>
            平台公告
          </h3>
          <a href="#" onclick="viewAllAnnouncements()" class="text-xs text-[#5A7A64] hover:text-[#4A6854]">
            查看全部 <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
        
        <div id="announcements-list" class="space-y-3">
          <!-- 动态加载 -->
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  // ============================================
  // 全局变量和状态
  // ============================================
  let investorData = {
    deals: [],
    cashflows: [],
    transactions: [],
    announcements: [],
    stats: {}
  };
  let currentCashflowPeriod = 'week';
  let currentChartDimension = 'industry';
  let currentRankingTab = 'transactions';
  let cashflowChart = null;
  let themeChart = null;

  // 行业映射
  const industryMap = {
    'light-asset': { name: '文娱轻资产', color: '#8B5CF6', icon: 'fa-film' },
    'catering': { name: '餐饮', color: '#F59E0B', icon: 'fa-utensils' },
    'retail': { name: '零售', color: '#10B981', icon: 'fa-store' },
    'ecommerce': { name: '电商', color: '#3B82F6', icon: 'fa-shopping-cart' },
    'douyin-ecommerce': { name: '抖音投流', color: '#FE2C55', icon: 'fab fa-tiktok' },
    'education': { name: '教育培训', color: '#EC4899', icon: 'fa-graduation-cap' },
    'service': { name: '生活服务', color: '#14B8A6', icon: 'fa-concierge-bell' },
    'entertainment': { name: '文娱', color: '#A855F7', icon: 'fa-music' }
  };

  // ============================================
  // 初始化
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      loadInvestorData();
    }, 500);
  });

  // ============================================
  // 数据加载
  // ============================================
  async function loadInvestorData() {
    try {
      // 加载已投资标的
      const dealsRes = await apiCall('/api/investor/deals');
      investorData.deals = dealsRes.data || [];
      
      // 加载统计数据
      const statsRes = await apiCall('/api/investor/stats');
      investorData.stats = statsRes.data || {};
      
      // 加载回款记录
      const cashflowsRes = await apiCall('/api/investor/cashflows');
      investorData.cashflows = cashflowsRes.data || [];
      
      // 加载交易记录
      const transactionsRes = await apiCall('/api/investor/transactions');
      investorData.transactions = transactionsRes.data || [];
      
      // 加载公告
      const announcementsRes = await apiCall('/api/investor/announcements');
      investorData.announcements = announcementsRes.data || [];
      
      // 渲染所有组件
      renderStats();
      renderDeals();
      renderCashflowChart();
      renderDimensionDetail();
      renderTransactions();
      renderRankings();
      renderThemeDistribution();
      renderAnnouncements();
      
    } catch (e) {
      console.error('加载投资人数据失败:', e);
      // 使用演示数据
      loadDemoData();
    }
  }
  
  // 加载演示数据（当API不可用时）- 基于新的10个DRO标的
  function loadDemoData() {
    // 演示数据 - 10个DRO收入分成标的，覆盖不同行业、地区、分成频率
    investorData.deals = [
      { id: 'DGT-2026-001', company_name: '蜜雪冰城（深圳南山科技园店）', industry: 'catering', invested_amount: 35, total_cashflow: 6.3, cashflow_frequency: 'daily', region: '广东', city: '深圳', issuer: '蜜雪冰城股份', description: '新式茶饮头部品牌深圳高人流量科技园店，日均销售额稳定', start_date: '2025-10-15' },
      { id: 'DGT-2026-002', company_name: '老乡鸡（上海徐汇日月光店）', industry: 'catering', invested_amount: 80, total_cashflow: 17.6, cashflow_frequency: 'daily', region: '上海', city: '上海', issuer: '老乡鸡餐饮', description: '中式快餐头部品牌上海核心商圈店，稳定客流', start_date: '2025-09-20' },
      { id: 'DGT-2026-003', company_name: '叮咚买菜（杭州拱墅区前置仓）', industry: 'retail', invested_amount: 120, total_cashflow: 25.2, cashflow_frequency: 'daily', region: '浙江', city: '杭州', issuer: '叮咚买菜', description: '生鲜电商前置仓模式，覆盖3公里高密度社区', start_date: '2025-08-10' },
      { id: 'DGT-2026-004', company_name: '罗森便利店（成都春熙路旗舰店）', industry: 'retail', invested_amount: 60, total_cashflow: 21, cashflow_frequency: 'daily', region: '四川', city: '成都', issuer: '罗森中国', description: '日系便利店头部品牌成都核心商圈24H旗舰店', start_date: '2025-07-25' },
      { id: 'DGT-2026-005', company_name: '新瑞鹏宠物医院（北京朝阳望京店）', industry: 'service', invested_amount: 150, total_cashflow: 30, cashflow_frequency: 'weekly', region: '北京', city: '北京', issuer: '新瑞鹏宠物医疗', description: '宠物医疗头部品牌，覆盖望京及周边高端社区', start_date: '2025-06-15' },
      { id: 'DGT-2026-006', company_name: '乐刻运动（广州天河体育中心店）', industry: 'service', invested_amount: 85, total_cashflow: 12.75, cashflow_frequency: 'weekly', region: '广东', city: '广州', issuer: '乐刻运动', description: '24H智能健身房，会员模式+按次付费双轮驱动', start_date: '2025-11-01' },
      { id: 'DGT-2026-007', company_name: '永琪美容美发（武汉光谷步行街店）', industry: 'service', invested_amount: 55, total_cashflow: 9.9, cashflow_frequency: 'weekly', region: '湖北', city: '武汉', issuer: '永琪美容美发', description: '美发连锁头部品牌，覆盖光谷白领与学生群体', start_date: '2025-10-20' },
      { id: 'DGT-2026-008', company_name: '唱吧麦颂KTV（南京新街口旗舰店）', industry: 'entertainment', invested_amount: 200, total_cashflow: 30, cashflow_frequency: 'monthly', region: '江苏', city: '南京', issuer: '唱吧麦颂', description: '互联网KTV头部品牌，线上引流+线下体验模式', start_date: '2025-09-10' },
      { id: 'DGT-2026-009', company_name: '途虎养车工场店（重庆渝北龙湖店）', industry: 'service', invested_amount: 180, total_cashflow: 32.4, cashflow_frequency: 'monthly', region: '重庆', city: '重庆', issuer: '途虎养车', description: '汽车后市场头部品牌，线上线下一体化服务', start_date: '2025-08-25' },
      { id: 'DGT-2026-010', company_name: '海底捞（西安大雁塔店）', industry: 'catering', invested_amount: 300, total_cashflow: 75, cashflow_frequency: 'monthly', region: '陕西', city: '西安', issuer: '海底捞国际', description: '火锅头部品牌西安核心景区旗舰店，旅游+本地双客流', start_date: '2025-05-20' }
    ];
    
    // 基于10个标的计算统计数据
    const totalInvested = investorData.deals.reduce((sum, d) => sum + d.invested_amount, 0);
    const totalCashflow = investorData.deals.reduce((sum, d) => sum + d.total_cashflow, 0);
    const cities = [...new Set(investorData.deals.map(d => d.city))];
    const issuers = [...new Set(investorData.deals.map(d => d.issuer))];
    
    // 地区分布计算
    const regionStats = {};
    investorData.deals.forEach(d => {
      regionStats[d.region] = (regionStats[d.region] || 0) + d.invested_amount;
    });
    const regionPercent = {};
    Object.entries(regionStats).forEach(([k, v]) => {
      regionPercent[k] = Math.round((v / totalInvested) * 100);
    });
    
    investorData.stats = {
      totalCashflow: totalCashflow,
      yesterdayCashflow: 12.5,  // 模拟昨日收益
      totalInvested: totalInvested,
      investedDeals: 10,
      activeDeals: 10,
      avgReturnRate: parseFloat(((totalCashflow / totalInvested) * 100).toFixed(1)),
      issuers: issuers.length,
      assets: 10,
      countries: 1,
      cities: cities.length,
      regions: regionPercent
    };
    
    // 演示回款数据（模拟每日收益）
    const today = new Date();
    investorData.cashflows = [];
    let cumulative = 0;
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dailyAmount = Math.random() * 15 + 5;  // 每日5-20万
      cumulative += dailyAmount;
      investorData.cashflows.push({
        date: date.toISOString().split('T')[0],
        amount: parseFloat(dailyAmount.toFixed(2)),
        cumulative: parseFloat(cumulative.toFixed(2))
      });
    }
    
    // 基于10个标的生成交易记录
    investorData.transactions = [
      { id: 'TRX-001', deal_name: '蜜雪冰城深圳店', deal_code: 'DGT-2026-001', currency: 'CNY', transaction_date: '2025-10-15', amount: 35, type: 'invest' },
      { id: 'TRX-002', deal_name: '老乡鸡上海店', deal_code: 'DGT-2026-002', currency: 'CNY', transaction_date: '2025-09-20', amount: 80, type: 'invest' },
      { id: 'TRX-003', deal_name: '叮咚买菜杭州仓', deal_code: 'DGT-2026-003', currency: 'CNY', transaction_date: '2025-08-10', amount: 120, type: 'invest' },
      { id: 'TRX-004', deal_name: '罗森便利店成都', deal_code: 'DGT-2026-004', currency: 'CNY', transaction_date: '2025-07-25', amount: 60, type: 'invest' },
      { id: 'TRX-005', deal_name: '新瑞鹏宠物医院北京', deal_code: 'DGT-2026-005', currency: 'CNY', transaction_date: '2025-06-15', amount: 150, type: 'invest' },
      { id: 'TRX-006', deal_name: '乐刻运动广州店', deal_code: 'DGT-2026-006', currency: 'CNY', transaction_date: '2025-11-01', amount: 85, type: 'invest' },
      { id: 'TRX-007', deal_name: '永琪美发武汉店', deal_code: 'DGT-2026-007', currency: 'CNY', transaction_date: '2025-10-20', amount: 55, type: 'invest' },
      { id: 'TRX-008', deal_name: '唱吧麦颂KTV南京', deal_code: 'DGT-2026-008', currency: 'CNY', transaction_date: '2025-09-10', amount: 200, type: 'invest' },
      { id: 'TRX-009', deal_name: '途虎养车重庆店', deal_code: 'DGT-2026-009', currency: 'CNY', transaction_date: '2025-08-25', amount: 180, type: 'invest' },
      { id: 'TRX-010', deal_name: '海底捞西安店', deal_code: 'DGT-2026-010', currency: 'CNY', transaction_date: '2025-05-20', amount: 300, type: 'invest' }
    ];
    
    // 演示公告（更新为与新标的相关）
    investorData.announcements = [
      { id: 'ANN-001', title: '2026年1月收益分配公告', category: 'distribution', priority: 'high', publish_date: '2026-01-15', content: '本月收益分配将于1月20日完成，请投资人关注账户变动。所有每日分成标的将按T+1结算，每周/每月分成标的将统一结算。' },
      { id: 'ANN-002', title: '海底捞西安店运营报告', category: 'asset', priority: 'high', publish_date: '2026-01-12', content: '海底捞西安大雁塔店12月营收超预期15%，得益于元旦假期旅游高峰，预计本月分成将有所提升。' },
      { id: 'ANN-003', title: '新标的上线 - 途虎养车工场店', category: 'asset', priority: 'normal', publish_date: '2026-01-10', content: '汽车后市场赛道新标的已上线，途虎养车重庆渝北龙湖店，月度分成模式。' },
      { id: 'ANN-004', title: '平台规则更新说明', category: 'platform', priority: 'normal', publish_date: '2026-01-08', content: '关于每日/每周/每月三种分成频率的结算规则已更新，请查阅最新版本。' },
      { id: 'ANN-005', title: '春节假期分成安排', category: 'distribution', priority: 'urgent', publish_date: '2026-01-05', content: '春节期间（1月28日-2月4日）每日分成将顺延至2月5日统一结算，每周/每月分成不受影响。' }
    ];
    
    // 渲染所有组件
    renderStats();
    renderDeals();
    renderCashflowChart();
    renderDimensionDetail();
    renderTransactions();
    renderRankings();
    renderThemeDistribution();
    renderAnnouncements();
  }

  // ============================================
  // 渲染函数
  // ============================================
  
  // 渲染统计数据
  function renderStats() {
    const stats = investorData.stats;
    
    document.getElementById('stat-total-cashflow').textContent = '¥' + formatNumber(stats.totalCashflow || 0);
    document.getElementById('stat-yesterday-cashflow').innerHTML = '<i class="fas fa-calendar-day mr-1"></i>昨日 +¥' + formatNumber(stats.yesterdayCashflow || 0);
    document.getElementById('stat-invested-deals').textContent = stats.investedDeals || 0;
    document.getElementById('stat-active-count').textContent = stats.activeDeals || 0;
    document.getElementById('stat-total-invested').textContent = '¥' + formatNumber(stats.totalInvested || 0);
    document.getElementById('stat-avg-return').textContent = (stats.avgReturnRate || 0).toFixed(1) + '%';
    document.getElementById('stat-regions').textContent = stats.cities || 0;
    document.getElementById('stat-issuer-count').textContent = stats.issuers || 0;
    
    // 详细统计
    document.getElementById('stat-detail-issuers').textContent = stats.issuers || 0;
    document.getElementById('stat-detail-assets').textContent = stats.assets || 0;
    document.getElementById('stat-detail-countries').textContent = stats.countries || 0;
    document.getElementById('stat-detail-cities').textContent = stats.cities || 0;
    
    // 图表统计
    document.getElementById('chart-total-invested').textContent = '¥' + formatNumber(stats.totalInvested || 0);
    document.getElementById('chart-total-return').textContent = '¥' + formatNumber(stats.totalCashflow || 0);
    document.getElementById('chart-yesterday-return').textContent = '¥' + formatNumber(stats.yesterdayCashflow || 0);
    document.getElementById('chart-estimated-return').textContent = '¥' + formatNumber((stats.totalCashflow || 0) * 0.12);
    
    // 地区分布
    if (stats.regions) {
      const regionContainer = document.getElementById('region-distribution');
      regionContainer.innerHTML = Object.entries(stats.regions).map(([region, percent]) => \`
        <div class="flex items-center">
          <span class="text-xs text-slate-600 w-16">\${region}</span>
          <div class="flex-1 h-2 bg-slate-100 rounded-full mx-2">
            <div class="h-2 bg-gradient-to-r from-[#5A7A64] to-[#8B6B4A] rounded-full" style="width: \${percent}%"></div>
          </div>
          <span class="text-xs font-medium text-slate-700">\${percent}%</span>
        </div>
      \`).join('');
    }
  }
  
  // 渲染已投资标的列表
  function renderDeals() {
    const container = document.getElementById('invested-deals-list');
    const industryFilter = document.getElementById('filter-deal-industry').value;
    
    let deals = investorData.deals;
    if (industryFilter) {
      deals = deals.filter(d => d.industry === industryFilter);
    }
    
    const frequencyMap = {
      'daily': '每日',
      'weekly': '每周',
      'monthly': '每月'
    };
    
    if (deals.length === 0) {
      container.innerHTML = \`
        <tr>
          <td colspan="6" class="text-center py-12 text-slate-400">
            <i class="fas fa-inbox text-4xl mb-3 block"></i>
            暂无已投资标的
          </td>
        </tr>
      \`;
      return;
    }
    
    container.innerHTML = deals.map(deal => {
      const industry = industryMap[deal.industry] || { name: deal.industry, color: '#6B7280' };
      return \`
        <tr class="hover:bg-slate-50">
          <td class="py-3">
            <div class="cursor-pointer" onclick="viewInvestmentDetail('\${deal.id}')">
              <p class="font-mono text-xs text-slate-400 hover:text-[#5A7A64]">\${deal.id}</p>
              <p class="font-medium text-slate-800 hover:text-[#5A7A64] hover:underline">\${deal.company_name}</p>
            </div>
          </td>
          <td>
            <span class="px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition" 
                  style="background: \${industry.color}15; color: \${industry.color}"
                  onclick="goToIndustrySieve('\${deal.industry}')">
              \${industry.name}
              <i class="fas fa-external-link-alt ml-1 text-xs opacity-60"></i>
            </span>
          </td>
          <td class="text-right font-medium">¥\${formatNumber(deal.invested_amount)}万</td>
          <td class="text-right text-[#5A7A64] font-medium">¥\${formatNumber(deal.total_cashflow)}万</td>
          <td class="text-center">
            <span class="text-xs text-slate-500">\${frequencyMap[deal.cashflow_frequency] || deal.cashflow_frequency}</span>
          </td>
          <td class="text-center">
            <button onclick="viewDealManagement('\${deal.id}')" class="px-3 py-1 text-xs rounded-lg bg-[#5A7A64]/10 text-[#5A7A64] hover:bg-[#5A7A64]/20 transition">
              <i class="fas fa-file-alt mr-1"></i>标的详情
            </button>
          </td>
        </tr>
      \`;
    }).join('');
  }
  
  function filterInvestedDeals() {
    renderDeals();
  }
  
  // 渲染累计收益图表（全行业汇总）
  function renderCashflowChart() {
    const ctx = document.getElementById('cashflow-chart').getContext('2d');
    
    // 根据周期筛选数据
    let data = investorData.cashflows;
    if (currentCashflowPeriod === 'week') {
      data = data.slice(-7);
    } else if (currentCashflowPeriod === 'month') {
      data = data.slice(-30);
    }
    
    const labels = data.map(d => {
      const date = new Date(d.date);
      return (date.getMonth() + 1) + '/' + date.getDate();
    });
    
    const amounts = data.map(d => d.amount);
    const cumulative = data.map(d => d.cumulative);
    
    if (cashflowChart) {
      cashflowChart.destroy();
    }
    
    cashflowChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '每日收益',
            data: amounts,
            backgroundColor: 'rgba(90, 122, 100, 0.6)',
            borderColor: 'rgba(90, 122, 100, 1)',
            borderWidth: 1,
            yAxisID: 'y',
            order: 2
          },
          {
            label: '累计收益',
            data: cumulative,
            type: 'line',
            borderColor: '#8B6B4A',
            backgroundColor: 'rgba(139, 107, 74, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'y1',
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { size: 11 }
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: '每日收益 (万元)',
              font: { size: 10 }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: '累计收益 (万元)',
              font: { size: 10 }
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
  }
  
  function switchCashflowPeriod(period) {
    currentCashflowPeriod = period;
    
    // 更新按钮样式
    ['week', 'month', 'year'].forEach(p => {
      const btn = document.getElementById('btn-period-' + p);
      if (btn) {
        btn.className = p === period 
          ? 'px-3 py-1 text-xs rounded-lg bg-[#5A7A64] text-white'
          : 'px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    });
    
    renderCashflowChart();
  }
  
  // 切换统计维度
  function switchChartDimension(dimension) {
    currentChartDimension = dimension;
    
    // 更新按钮样式
    ['industry', 'region', 'issuer', 'frequency'].forEach(d => {
      const btn = document.getElementById('btn-dim-' + d);
      if (btn) {
        btn.className = d === dimension 
          ? 'w-full px-3 py-2 text-xs rounded-lg bg-[#5A7A64]/10 text-[#5A7A64] text-left flex items-center justify-between hover:bg-[#5A7A64]/20 transition'
          : 'w-full px-3 py-2 text-xs rounded-lg bg-slate-50 text-slate-600 text-left flex items-center justify-between hover:bg-slate-100 transition';
      }
    });
    
    renderDimensionDetail();
  }
  
  // 渲染维度详情
  function renderDimensionDetail() {
    const titleEl = document.getElementById('dimension-detail-title');
    const contentEl = document.getElementById('dimension-detail-content');
    
    const dimensionTitles = {
      'industry': '行业分布',
      'region': '地区分布',
      'issuer': '发行方分布',
      'frequency': '回款周期分布'
    };
    
    titleEl.textContent = dimensionTitles[currentChartDimension] || '分布详情';
    
    // 统计各维度数据
    let dimensionData = {};
    
    if (currentChartDimension === 'industry') {
      investorData.deals.forEach(deal => {
        const key = deal.industry;
        if (!dimensionData[key]) {
          dimensionData[key] = { count: 0, invested: 0, cashflow: 0, name: industryMap[key]?.name || key, color: industryMap[key]?.color || '#6B7280' };
        }
        dimensionData[key].count++;
        dimensionData[key].invested += deal.invested_amount;
        dimensionData[key].cashflow += deal.total_cashflow;
      });
    } else if (currentChartDimension === 'region') {
      investorData.deals.forEach(deal => {
        const key = deal.region || '未知';
        if (!dimensionData[key]) {
          dimensionData[key] = { count: 0, invested: 0, cashflow: 0, name: key, color: '#5A7A64' };
        }
        dimensionData[key].count++;
        dimensionData[key].invested += deal.invested_amount;
        dimensionData[key].cashflow += deal.total_cashflow;
      });
    } else if (currentChartDimension === 'issuer') {
      investorData.deals.forEach(deal => {
        const key = deal.issuer || '未知';
        if (!dimensionData[key]) {
          dimensionData[key] = { count: 0, invested: 0, cashflow: 0, name: key, color: '#8B6B4A' };
        }
        dimensionData[key].count++;
        dimensionData[key].invested += deal.invested_amount;
        dimensionData[key].cashflow += deal.total_cashflow;
      });
    } else if (currentChartDimension === 'frequency') {
      const frequencyNames = { 'daily': '每日', 'weekly': '每周', 'monthly': '每月' };
      investorData.deals.forEach(deal => {
        const key = deal.cashflow_frequency;
        if (!dimensionData[key]) {
          dimensionData[key] = { count: 0, invested: 0, cashflow: 0, name: frequencyNames[key] || key, color: '#5A6A7A' };
        }
        dimensionData[key].count++;
        dimensionData[key].invested += deal.invested_amount;
        dimensionData[key].cashflow += deal.total_cashflow;
      });
    }
    
    // 渲染详情
    const totalInvested = Object.values(dimensionData).reduce((sum, d) => sum + d.invested, 0);
    contentEl.innerHTML = Object.entries(dimensionData).map(([key, data]) => {
      const percent = totalInvested > 0 ? ((data.invested / totalInvested) * 100).toFixed(0) : 0;
      return \`
        <div class="flex items-center text-xs">
          <span class="w-2 h-2 rounded-full mr-2" style="background: \${data.color}"></span>
          <span class="flex-1 text-slate-600 truncate" title="\${data.name}">\${data.name}</span>
          <span class="font-medium text-slate-700">\${percent}%</span>
        </div>
      \`;
    }).join('');
  }
  
  // 渲染交易记录
  function renderTransactions() {
    const container = document.getElementById('transactions-list');
    
    const typeMap = {
      'invest': { name: '投资', color: '#5A7A64' },
      'divest': { name: '退出', color: '#8B5A5A' },
      'transfer': { name: '转让', color: '#5A6A7A' }
    };
    
    container.innerHTML = investorData.transactions.map(txn => {
      const type = typeMap[txn.type] || { name: txn.type, color: '#6B7280' };
      return \`
        <tr class="hover:bg-slate-50">
          <td class="py-3">
            <div>
              <p class="font-medium text-slate-800">\${txn.deal_name}</p>
              <p class="text-xs text-slate-400">\${txn.deal_code}</p>
            </div>
          </td>
          <td>\${txn.currency}</td>
          <td>\${txn.transaction_date}</td>
          <td class="text-right font-medium">¥\${formatNumber(txn.amount)}万</td>
          <td>
            <span class="px-2 py-1 rounded text-xs" style="background: \${type.color}15; color: \${type.color}">
              \${type.name}
            </span>
          </td>
        </tr>
      \`;
    }).join('');
  }
  
  // 渲染排名
  function renderRankings() {
    // 总回报排名
    const returnRankingContainer = document.getElementById('return-ranking-list');
    const sortedByReturn = [...investorData.deals].sort((a, b) => b.total_cashflow - a.total_cashflow);
    
    returnRankingContainer.innerHTML = sortedByReturn.slice(0, 5).map((deal, index) => \`
      <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
        <div class="flex items-center">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 \${index < 3 ? 'bg-gradient-to-br from-[#8B6B4A] to-[#A89A7A] text-white' : 'bg-slate-200 text-slate-600'}">\${index + 1}</span>
          <div>
            <p class="font-medium text-slate-800">\${deal.company_name}</p>
            <p class="text-xs text-slate-400">\${deal.id}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-[#5A7A64]">¥\${formatNumber(deal.total_cashflow)}万</p>
          <p class="text-xs text-slate-400">回报率 \${((deal.total_cashflow / deal.invested_amount) * 100).toFixed(1)}%</p>
        </div>
      </div>
    \`).join('');
    
    // 交易量排名（按投资金额）
    const volumeRankingContainer = document.getElementById('volume-ranking-list');
    const sortedByVolume = [...investorData.deals].sort((a, b) => b.invested_amount - a.invested_amount);
    
    volumeRankingContainer.innerHTML = sortedByVolume.slice(0, 5).map((deal, index) => \`
      <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
        <div class="flex items-center">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 \${index < 3 ? 'bg-gradient-to-br from-[#5A6A7A] to-[#7A8A9A] text-white' : 'bg-slate-200 text-slate-600'}">\${index + 1}</span>
          <div>
            <p class="font-medium text-slate-800">\${deal.company_name}</p>
            <p class="text-xs text-slate-400">\${deal.id}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-[#5A6A7A]">¥\${formatNumber(deal.invested_amount)}万</p>
        </div>
      </div>
    \`).join('');
  }
  
  function switchRankingTab(tab) {
    currentRankingTab = tab;
    
    // 更新按钮样式
    ['transactions', 'return', 'volume'].forEach(t => {
      const btn = document.getElementById('btn-tab-' + t);
      if (btn) {
        btn.className = t === tab 
          ? 'px-3 py-1 text-xs rounded-lg bg-[#5A6A7A] text-white'
          : 'px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
      
      const content = document.getElementById('ranking-content-' + t);
      if (content) {
        content.classList.toggle('hidden', t !== tab);
      }
    });
  }
  
  // 渲染主题分布图表
  function renderThemeDistribution() {
    const ctx = document.getElementById('theme-distribution-chart').getContext('2d');
    
    // 统计行业分布
    const industryCount = {};
    investorData.deals.forEach(deal => {
      industryCount[deal.industry] = (industryCount[deal.industry] || 0) + 1;
    });
    
    const labels = Object.keys(industryCount).map(k => industryMap[k]?.name || k);
    const data = Object.values(industryCount);
    const colors = Object.keys(industryCount).map(k => industryMap[k]?.color || '#6B7280');
    
    if (themeChart) {
      themeChart.destroy();
    }
    
    themeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        cutout: '65%'
      }
    });
    
    // 渲染图例
    const legendContainer = document.getElementById('theme-legend');
    legendContainer.innerHTML = Object.entries(industryCount).map(([key, count]) => {
      const industry = industryMap[key] || { name: key, color: '#6B7280' };
      return \`
        <div class="flex items-center justify-between text-sm cursor-pointer hover:bg-slate-50 p-1 rounded" onclick="goToIndustrySieve('\${key}')">
          <div class="flex items-center">
            <span class="w-3 h-3 rounded-full mr-2" style="background: \${industry.color}"></span>
            <span class="text-slate-600">\${industry.name}</span>
          </div>
          <span class="font-medium">\${count}个</span>
        </div>
      \`;
    }).join('');
  }
  
  // 渲染公告
  function renderAnnouncements() {
    const container = document.getElementById('announcements-list');
    
    const categoryMap = {
      'platform': { name: '平台公告', icon: 'fa-building', color: '#5A6A7A' },
      'asset': { name: '资产通知', icon: 'fa-boxes', color: '#5A7A64' },
      'distribution': { name: '收益分配', icon: 'fa-coins', color: '#8B6B4A' },
      'policy': { name: '规则更新', icon: 'fa-gavel', color: '#8B5CF6' }
    };
    
    const priorityMap = {
      'urgent': { name: '紧急', color: '#EF4444' },
      'high': { name: '重要', color: '#F59E0B' },
      'normal': { name: '普通', color: '#6B7280' }
    };
    
    container.innerHTML = investorData.announcements.slice(0, 5).map(ann => {
      const category = categoryMap[ann.category] || { name: ann.category, icon: 'fa-bell', color: '#6B7280' };
      const priority = priorityMap[ann.priority] || priorityMap.normal;
      
      return \`
        <div class="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-pointer" onclick="viewAnnouncement('\${ann.id}')">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center">
              <i class="fas \${category.icon} text-sm mr-2" style="color: \${category.color}"></i>
              <span class="text-xs px-2 py-0.5 rounded" style="background: \${category.color}15; color: \${category.color}">\${category.name}</span>
            </div>
            \${ann.priority !== 'normal' ? \`<span class="text-xs px-2 py-0.5 rounded" style="background: \${priority.color}15; color: \${priority.color}">\${priority.name}</span>\` : ''}
          </div>
          <h4 class="font-medium text-slate-800 mb-1">\${ann.title}</h4>
          <p class="text-xs text-slate-500">\${ann.publish_date}</p>
        </div>
      \`;
    }).join('');
  }

  // ============================================
  // 导航函数
  // ============================================
  
  // 跳转到标的投后详情页面（新页面）
  function viewInvestmentDetail(dealId) {
    window.location.href = '/investor/deal/' + dealId;
  }
  
  // 跳转到标的管理详情页面
  function viewDealManagement(dealId) {
    window.location.href = '/deals/' + dealId;
  }
  
  // 跳转到行业筛子页面
  function goToIndustrySieve(industryId) {
    window.location.href = '/agents?track=' + industryId;
  }

  // ============================================
  // 辅助函数
  // ============================================
  
  function formatNumber(num) {
    if (num >= 10000) {
      return (num / 10000).toFixed(2) + '亿';
    }
    return num.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  
  function refreshInvestorData() {
    showToast('正在刷新数据...', 'info');
    loadInvestorData();
  }
  
  function exportInvestorReport() {
    showToast('报告导出功能开发中', 'info');
  }
  
  function loadMoreDeals() {
    showToast('加载更多功能开发中', 'info');
  }
  
  function viewAnnouncement(annId) {
    const ann = investorData.announcements.find(a => a.id === annId);
    if (ann) {
      alert(\`【\${ann.title}】\\n\\n\${ann.content}\\n\\n发布时间: \${ann.publish_date}\`);
    }
  }
  
  function viewAllAnnouncements() {
    showToast('全部公告页面开发中', 'info');
  }
<\/script>
`
