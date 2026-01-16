// 投资人入口 - 已投资标的全部列表页面
// 显示所有已投资标的，支持筛选和排序

export const investorDealsListPageContent = `
<div class="mb-6">
  <!-- 页面标题区 -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <div class="flex items-center mb-2">
        <a href="/investor" class="text-sm text-slate-500 hover:text-[#5A7A64] mr-2">
          <i class="fas fa-arrow-left mr-1"></i>返回投资人入口
        </a>
      </div>
      <h1 class="text-2xl font-bold text-slate-800 flex items-center">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6B4A] to-[#A89A7A] flex items-center justify-center mr-3 shadow-md">
          <i class="fas fa-briefcase text-white"></i>
        </div>
        已投资标的
      </h1>
      <p class="text-slate-500 mt-1 ml-13">查看全部已投资标的的详细信息</p>
    </div>
    <div class="flex items-center space-x-3">
      <button onclick="exportDealsList()" class="gs-btn gs-btn-warm px-4 py-2">
        <i class="fas fa-download mr-2"></i>导出列表
      </button>
    </div>
  </div>

  <!-- 筛选和搜索区 -->
  <div class="gs-card p-4 mb-6">
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center space-x-2">
        <label class="text-sm text-slate-600">行业：</label>
        <select id="filter-industry" onchange="filterDeals()" class="text-sm border rounded-lg px-3 py-2 bg-white">
          <option value="">全部行业</option>
          <option value="catering">餐饮</option>
          <option value="retail">零售</option>
          <option value="ecommerce">电商</option>
          <option value="douyin-ecommerce">抖音投流</option>
          <option value="douyin-ads">抖音投流</option>
          <option value="education">教育培训</option>
          <option value="service">生活服务</option>
          <option value="entertainment">文娱</option>
          <option value="concert">演唱会票务</option>
          <option value="new-energy">新能源</option>
          <option value="tech">科技SaaS</option>
          <option value="mcn">MCN达人</option>
          <option value="esports">电竞</option>
          <option value="vtuber">虚拟偶像</option>
          <option value="music-royalty">音乐版权</option>
          <option value="media">内容传媒</option>
        </select>
      </div>
      <div class="flex items-center space-x-2">
        <label class="text-sm text-slate-600">地区：</label>
        <select id="filter-region" onchange="filterDeals()" class="text-sm border rounded-lg px-3 py-2 bg-white">
          <option value="">全部地区</option>
        </select>
      </div>
      <div class="flex items-center space-x-2">
        <label class="text-sm text-slate-600">回款周期：</label>
        <select id="filter-frequency" onchange="filterDeals()" class="text-sm border rounded-lg px-3 py-2 bg-white">
          <option value="">全部</option>
          <option value="daily">每日回款</option>
          <option value="weekly">每周回款</option>
          <option value="monthly">每月回款</option>
        </select>
      </div>
      <div class="flex items-center space-x-2 flex-1">
        <label class="text-sm text-slate-600">搜索：</label>
        <input type="text" id="search-keyword" onkeyup="filterDeals()" placeholder="输入标的名称或ID..." 
               class="text-sm border rounded-lg px-3 py-2 bg-white flex-1 min-w-[200px]">
      </div>
      <div class="flex items-center space-x-2">
        <label class="text-sm text-slate-600">排序：</label>
        <select id="sort-by" onchange="filterDeals()" class="text-sm border rounded-lg px-3 py-2 bg-white">
          <option value="invested_amount_desc">投资金额从高到低</option>
          <option value="invested_amount_asc">投资金额从低到高</option>
          <option value="total_cashflow_desc">累计回款从高到低</option>
          <option value="total_cashflow_asc">累计回款从低到高</option>
          <option value="start_date_desc">投资日期最近</option>
          <option value="start_date_asc">投资日期最早</option>
        </select>
      </div>
    </div>
  </div>

  <!-- 统计摘要 -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">筛选后标的数</p>
      <p class="text-2xl font-bold text-[#5A7A64]" id="filtered-count">0</p>
    </div>
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">总投资金额</p>
      <p class="text-2xl font-bold text-[#8B6B4A]" id="filtered-invested">¥0</p>
    </div>
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">累计回款</p>
      <p class="text-2xl font-bold text-[#5A6A7A]" id="filtered-cashflow">¥0</p>
    </div>
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">平均回报率</p>
      <p class="text-2xl font-bold text-[#6B7B5C]" id="filtered-return-rate">0%</p>
    </div>
  </div>

  <!-- 标的列表 -->
  <div class="gs-card p-6">
    <div class="overflow-x-auto">
      <table class="gs-table w-full">
        <thead>
          <tr>
            <th class="text-left">ID / 企业名称</th>
            <th class="text-left">行业</th>
            <th class="text-left">地区</th>
            <th class="text-right">投资金额</th>
            <th class="text-right">累计回款</th>
            <th class="text-right">回报率</th>
            <th class="text-center">回款周期</th>
            <th class="text-center">投资日期</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody id="deals-list">
          <!-- 动态加载 -->
        </tbody>
      </table>
    </div>
    
    <!-- 分页 -->
    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm text-slate-500" id="pagination-info">显示 0 - 0 条，共 0 条</p>
      <div class="flex items-center space-x-2" id="pagination-controls">
        <!-- 动态加载 -->
      </div>
    </div>
  </div>
</div>

<script>
  // 全局变量
  let allDeals = [];
  let filteredDeals = [];
  let currentPage = 1;
  const pageSize = 50;

  // 行业映射
  const industryMap = {
    'light-asset': { name: '文娱轻资产', color: '#8B5CF6', icon: 'fa-film' },
    'catering': { name: '餐饮', color: '#F59E0B', icon: 'fa-utensils' },
    'retail': { name: '零售', color: '#10B981', icon: 'fa-store' },
    'ecommerce': { name: '电商', color: '#3B82F6', icon: 'fa-shopping-cart' },
    'douyin-ecommerce': { name: '抖音投流', color: '#FE2C55', icon: 'fab fa-tiktok' },
    'douyin-ads': { name: '抖音投流', color: '#FE2C55', icon: 'fab fa-tiktok' },
    'education': { name: '教育培训', color: '#EC4899', icon: 'fa-graduation-cap' },
    'service': { name: '生活服务', color: '#14B8A6', icon: 'fa-concierge-bell' },
    'entertainment': { name: '文娱', color: '#A855F7', icon: 'fa-music' },
    'concert': { name: '演唱会票务', color: '#DC2626', icon: 'fa-ticket-alt' },
    'new-energy': { name: '新能源', color: '#22C55E', icon: 'fa-bolt' },
    'tech': { name: '科技SaaS', color: '#6366F1', icon: 'fa-microchip' },
    'mcn': { name: 'MCN达人', color: '#F472B6', icon: 'fa-users' },
    'esports': { name: '电竞', color: '#EAB308', icon: 'fa-gamepad' },
    'vtuber': { name: '虚拟偶像', color: '#06B6D4', icon: 'fa-robot' },
    'music-royalty': { name: '音乐版权', color: '#8B5CF6', icon: 'fa-compact-disc' },
    'media': { name: '内容传媒', color: '#F97316', icon: 'fa-play-circle' }
  };

  const frequencyMap = {
    'daily': '每日',
    'weekly': '每周',
    'monthly': '每月'
  };

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    loadDeals();
  });

  // 加载数据
  async function loadDeals() {
    try {
      const res = await apiCall('/api/investor/deals');
      allDeals = res.data || [];
      
      // 填充地区筛选选项
      const regions = [...new Set(allDeals.map(d => d.region).filter(r => r))];
      const regionSelect = document.getElementById('filter-region');
      regions.sort().forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
      });
      
      filterDeals();
    } catch (e) {
      console.error('加载数据失败:', e);
      loadDemoData();
    }
  }

  // 加载演示数据
  function loadDemoData() {
    // 复用投资人入口的演示数据
    allDeals = getDemoDeals();
    
    // 填充地区筛选选项
    const regions = [...new Set(allDeals.map(d => d.region).filter(r => r))];
    const regionSelect = document.getElementById('filter-region');
    regions.sort().forEach(region => {
      const option = document.createElement('option');
      option.value = region;
      option.textContent = region;
      regionSelect.appendChild(option);
    });
    
    filterDeals();
  }

  // 获取演示数据（与主页面共享）
  function getDemoDeals() {
    return [
      { id: 'DGT-2026-001', company_name: '蜜雪冰城（深圳南山科技园店）', industry: 'catering', invested_amount: 35, total_cashflow: 12, cashflow_frequency: 'daily', region: '广东', city: '深圳', issuer: '蜜雪冰城股份', start_date: '2025-10-15' },
      { id: 'DGT-2026-002', company_name: '老乡鸡（上海徐汇日月光店）', industry: 'catering', invested_amount: 80, total_cashflow: 28, cashflow_frequency: 'daily', region: '上海', city: '上海', issuer: '老乡鸡餐饮', start_date: '2025-09-20' },
      { id: 'DGT-2026-003', company_name: '叮咚买菜（杭州拱墅区前置仓）', industry: 'retail', invested_amount: 120, total_cashflow: 55, cashflow_frequency: 'daily', region: '浙江', city: '杭州', issuer: '叮咚买菜', start_date: '2025-08-10' },
      { id: 'DGT-2026-004', company_name: '罗森便利店（成都春熙路旗舰店）', industry: 'retail', invested_amount: 60, total_cashflow: 43, cashflow_frequency: 'daily', region: '四川', city: '成都', issuer: '罗森中国', start_date: '2025-07-25' },
      { id: 'DGT-2026-005', company_name: '新瑞鹏宠物医院（北京朝阳望京店）', industry: 'service', invested_amount: 150, total_cashflow: 46, cashflow_frequency: 'weekly', region: '北京', city: '北京', issuer: '新瑞鹏宠物医疗', start_date: '2025-06-15' },
      { id: 'DGT-2026-006', company_name: '乐刻运动（广州天河体育中心店）', industry: 'service', invested_amount: 85, total_cashflow: 15, cashflow_frequency: 'weekly', region: '广东', city: '广州', issuer: '乐刻运动', start_date: '2025-11-01' },
      { id: 'DGT-2026-007', company_name: '永琪美容美发（武汉光谷步行街店）', industry: 'service', invested_amount: 55, total_cashflow: 19, cashflow_frequency: 'weekly', region: '湖北', city: '武汉', issuer: '永琪美容美发', start_date: '2025-10-20' },
      { id: 'DGT-2026-008', company_name: '唱吧麦颂KTV（南京新街口旗舰店）', industry: 'entertainment', invested_amount: 200, total_cashflow: 44, cashflow_frequency: 'monthly', region: '江苏', city: '南京', issuer: '唱吧麦颂', start_date: '2025-09-10' },
      { id: 'DGT-2026-009', company_name: '途虎养车工场店（重庆渝北龙湖店）', industry: 'service', invested_amount: 180, total_cashflow: 51, cashflow_frequency: 'monthly', region: '重庆', city: '重庆', issuer: '途虎养车', start_date: '2025-08-25' },
      { id: 'DGT-2026-010', company_name: '海底捞（西安大雁塔店）', industry: 'catering', invested_amount: 300, total_cashflow: 135, cashflow_frequency: 'monthly', region: '陕西', city: '西安', issuer: '海底捞国际', start_date: '2025-05-20' },
      // 添加更多演示数据...
      { id: 'DGT-2026-031', company_name: '薛之谦2026巡回演唱会（华东站）', industry: 'concert', invested_amount: 500, total_cashflow: 342, cashflow_frequency: 'weekly', region: '华东', city: '上海', issuer: '大麦网', start_date: '2026-01-16' },
      { id: 'DGT-2026-032', company_name: 'UR快时尚抖音投流项目', industry: 'douyin-ads', invested_amount: 200, total_cashflow: 131, cashflow_frequency: 'weekly', region: '广东', city: '广州', issuer: 'UR品牌', start_date: '2026-01-16' },
      { id: 'DGT-2026-033', company_name: '特来电京沪高速充电站（10站）', industry: 'new-energy', invested_amount: 300, total_cashflow: 31, cashflow_frequency: 'daily', region: '华东', city: '京沪沿线', issuer: '特来电', start_date: '2026-01-16' },
      { id: 'DGT-2026-034', company_name: '有赞电商SaaS订阅收入分成', industry: 'tech', invested_amount: 400, total_cashflow: 20, cashflow_frequency: 'monthly', region: '浙江', city: '杭州', issuer: '有赞', start_date: '2026-01-16' },
      { id: 'DGT-2026-035', company_name: '无忧传媒达人孵化计划（10人）', industry: 'mcn', invested_amount: 150, total_cashflow: 72, cashflow_frequency: 'monthly', region: '浙江', city: '杭州', issuer: '无忧传媒', start_date: '2026-01-16' },
      { id: 'DGT-2026-044', company_name: 'BLG电竞战队收入分成', industry: 'esports', invested_amount: 300, total_cashflow: 200, cashflow_frequency: 'monthly', region: '上海', city: '上海', issuer: 'B站电竞', start_date: '2026-01-17' },
      { id: 'DGT-2026-050', company_name: 'A-SOUL虚拟偶像运营分成', industry: 'vtuber', invested_amount: 200, total_cashflow: 125, cashflow_frequency: 'monthly', region: '上海', city: '上海', issuer: '乐华娱乐', start_date: '2026-01-18' }
    ];
  }

  // 筛选和排序
  function filterDeals() {
    const industry = document.getElementById('filter-industry').value;
    const region = document.getElementById('filter-region').value;
    const frequency = document.getElementById('filter-frequency').value;
    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    const sortBy = document.getElementById('sort-by').value;
    
    filteredDeals = allDeals.filter(deal => {
      if (industry && deal.industry !== industry) return false;
      if (region && deal.region !== region) return false;
      if (frequency && deal.cashflow_frequency !== frequency) return false;
      if (keyword && !deal.company_name.toLowerCase().includes(keyword) && !deal.id.toLowerCase().includes(keyword)) return false;
      return true;
    });
    
    // 排序
    const [sortField, sortOrder] = sortBy.split('_');
    const orderMultiplier = sortOrder === 'desc' ? -1 : 1;
    
    if (sortField === 'invested') {
      filteredDeals.sort((a, b) => (a.invested_amount - b.invested_amount) * orderMultiplier);
    } else if (sortField === 'total') {
      filteredDeals.sort((a, b) => (a.total_cashflow - b.total_cashflow) * orderMultiplier);
    } else if (sortField === 'start') {
      filteredDeals.sort((a, b) => (new Date(a.start_date) - new Date(b.start_date)) * orderMultiplier);
    }
    
    currentPage = 1;
    updateStats();
    renderDeals();
    renderPagination();
  }

  // 更新统计
  function updateStats() {
    const totalInvested = filteredDeals.reduce((sum, d) => sum + d.invested_amount, 0);
    const totalCashflow = filteredDeals.reduce((sum, d) => sum + d.total_cashflow, 0);
    const avgReturn = totalInvested > 0 ? (totalCashflow / totalInvested * 100) : 0;
    
    document.getElementById('filtered-count').textContent = filteredDeals.length;
    document.getElementById('filtered-invested').textContent = '¥' + formatInvestmentAmount(totalInvested);
    document.getElementById('filtered-cashflow').textContent = '¥' + formatCashflowAmount(totalCashflow);
    document.getElementById('filtered-return-rate').textContent = avgReturn.toFixed(1) + '%';
  }

  // 渲染列表
  function renderDeals() {
    const container = document.getElementById('deals-list');
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, filteredDeals.length);
    const pageDeals = filteredDeals.slice(start, end);
    
    if (pageDeals.length === 0) {
      container.innerHTML = \`
        <tr>
          <td colspan="9" class="text-center py-12 text-slate-400">
            <i class="fas fa-inbox text-4xl mb-3 block"></i>
            暂无符合条件的标的
          </td>
        </tr>
      \`;
      return;
    }
    
    container.innerHTML = pageDeals.map(deal => {
      const industry = industryMap[deal.industry] || { name: deal.industry, color: '#6B7280' };
      const returnRate = deal.invested_amount > 0 ? (deal.total_cashflow / deal.invested_amount * 100).toFixed(1) : 0;
      return \`
        <tr class="hover:bg-slate-50">
          <td class="py-3">
            <div class="cursor-pointer" onclick="viewDealDetail('\${deal.id}')">
              <p class="font-mono text-xs text-slate-400">\${deal.id}</p>
              <p class="font-medium text-slate-800 hover:text-[#5A7A64] hover:underline">\${deal.company_name}</p>
            </div>
          </td>
          <td>
            <span class="px-2 py-1 rounded text-xs" style="background: \${industry.color}15; color: \${industry.color}">
              \${industry.name}
            </span>
          </td>
          <td class="text-sm text-slate-600">\${deal.region || '-'}</td>
          <td class="text-right font-medium">¥\${formatInvestmentAmount(deal.invested_amount)}</td>
          <td class="text-right text-[#5A7A64] font-medium">¥\${formatCashflowAmount(deal.total_cashflow)}</td>
          <td class="text-right text-[#8B6B4A] font-medium">\${returnRate}%</td>
          <td class="text-center">
            <span class="text-xs text-slate-500">\${frequencyMap[deal.cashflow_frequency] || deal.cashflow_frequency}</span>
          </td>
          <td class="text-center text-sm text-slate-500">\${deal.start_date || '-'}</td>
          <td class="text-center">
            <button onclick="viewDealDetail('\${deal.id}')" class="px-3 py-1 text-xs rounded-lg bg-[#5A7A64]/10 text-[#5A7A64] hover:bg-[#5A7A64]/20 transition">
              <i class="fas fa-file-alt mr-1"></i>详情
            </button>
          </td>
        </tr>
      \`;
    }).join('');
    
    // 更新分页信息
    document.getElementById('pagination-info').textContent = \`显示 \${start + 1} - \${end} 条，共 \${filteredDeals.length} 条\`;
  }

  // 渲染分页
  function renderPagination() {
    const container = document.getElementById('pagination-controls');
    const totalPages = Math.ceil(filteredDeals.length / pageSize);
    
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }
    
    let html = '';
    
    // 上一页
    html += \`<button onclick="goToPage(\${currentPage - 1})" \${currentPage === 1 ? 'disabled' : ''} class="px-3 py-1 text-sm rounded-lg \${currentPage === 1 ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
      <i class="fas fa-chevron-left"></i>
    </button>\`;
    
    // 页码
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        html += \`<button onclick="goToPage(\${i})" class="px-3 py-1 text-sm rounded-lg \${i === currentPage ? 'bg-[#5A7A64] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">\${i}</button>\`;
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        html += \`<span class="px-2 text-slate-400">...</span>\`;
      }
    }
    
    // 下一页
    html += \`<button onclick="goToPage(\${currentPage + 1})" \${currentPage === totalPages ? 'disabled' : ''} class="px-3 py-1 text-sm rounded-lg \${currentPage === totalPages ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
      <i class="fas fa-chevron-right"></i>
    </button>\`;
    
    container.innerHTML = html;
  }

  function goToPage(page) {
    const totalPages = Math.ceil(filteredDeals.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderDeals();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function viewDealDetail(dealId) {
    window.location.href = '/investor/deal/' + dealId;
  }

  function exportDealsList() {
    showToast('导出功能开发中', 'info');
  }

  // 格式化金额显示
  // 参数unit表示输入数据的单位：'yuan'=元, 'wan'=万元
  // 返回适合显示的字符串，自动选择万元或亿元
  function formatNumber(num, unit = 'yuan') {
    if (!num || num === 0) return '0';
    
    // 统一转换为元
    let valueInYuan = num;
    if (unit === 'wan') {
      valueInYuan = num * 10000; // 万元转元
    }
    
    // 转换为万元
    const valueInWan = valueInYuan / 10000;
    
    // 根据金额大小选择显示单位
    if (valueInWan >= 10000) {
      // >= 1亿，显示亿元
      return (valueInWan / 10000).toFixed(2) + '亿';
    } else if (valueInWan >= 1) {
      // >= 1万，显示万元
      return valueInWan.toFixed(2) + '万';
    } else {
      // < 1万，显示元
      return valueInYuan.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + '元';
    }
  }
  
  // 格式化投资金额（数据库存储单位为元）
  function formatInvestmentAmount(num) {
    return formatNumber(num, 'yuan');
  }
  
  // 格式化回款金额（数据库存储单位为元）
  function formatCashflowAmount(num) {
    return formatNumber(num, 'yuan');
  }
<\/script>
`
