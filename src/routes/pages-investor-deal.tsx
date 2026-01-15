// 投资人 - 标的投后详情页面
// 展示单个标的的投后重要信息：累计收益分成图表、标的背景信息、行业筛子信息

export const investorDealDetailPageContent = `
<div class="mb-6">
  <!-- 顶部导航 -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-4">
      <a href="/investor" class="text-slate-500 hover:text-slate-700 flex items-center">
        <i class="fas fa-arrow-left mr-2"></i>返回投资人入口
      </a>
      <span class="text-slate-300">|</span>
      <div class="flex items-center">
        <h1 id="deal-title" class="text-xl font-bold text-slate-800">加载中...</h1>
        <span id="deal-status-badge" class="ml-3 px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">
          <i class="fas fa-check-circle mr-1"></i>活跃
        </span>
      </div>
    </div>
    <div class="flex items-center space-x-3">
      <button onclick="exportDealReport()" class="gs-btn gs-btn-secondary px-4 py-2">
        <i class="fas fa-download mr-2"></i>导出报告
      </button>
      <button onclick="refreshDealData()" class="gs-btn gs-btn-warm px-4 py-2">
        <i class="fas fa-sync-alt mr-2"></i>刷新数据
      </button>
    </div>
  </div>

  <!-- 主内容区：左右布局 -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    <!-- 左侧：标的维度收益图表 + 收益明细 -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- 标的维度累计收益分成图表 -->
      <div class="gs-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-[#5A7A64]/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-chart-area text-[#5A7A64] text-sm"></i>
            </div>
            累计收益分成 (Total Cashflow Distribution)
          </h3>
          <div class="flex items-center space-x-2">
            <button onclick="switchDealPeriod('week')" id="btn-deal-period-week" class="px-3 py-1 text-xs rounded-lg bg-[#5A7A64] text-white">近7天</button>
            <button onclick="switchDealPeriod('month')" id="btn-deal-period-month" class="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">近30天</button>
            <button onclick="switchDealPeriod('all')" id="btn-deal-period-all" class="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">全部</button>
          </div>
        </div>
        
        <!-- 图表区域 -->
        <div class="relative h-64">
          <canvas id="deal-cashflow-chart"></canvas>
        </div>
        
        <!-- 图表下方统计 -->
        <div class="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div class="text-center">
            <p class="text-xs text-slate-500">投资金额</p>
            <p class="text-lg font-bold text-[#5A6A7A]" id="deal-invested">¥0</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-500">累计回款</p>
            <p class="text-lg font-bold text-[#5A7A64]" id="deal-total-return">¥0</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-500">回报率</p>
            <p class="text-lg font-bold text-[#8B6B4A]" id="deal-return-rate">0%</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-500">投资天数</p>
            <p class="text-lg font-bold text-[#6B7B5C]" id="deal-days">0天</p>
          </div>
        </div>
      </div>
      
      <!-- 收益明细记录 -->
      <div class="gs-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-[#8B6B4A]/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-list-alt text-[#8B6B4A] text-sm"></i>
            </div>
            收益明细记录
          </h3>
          <span class="text-xs text-slate-400" id="cashflow-count">共 0 条记录</span>
        </div>
        
        <div class="overflow-x-auto max-h-64">
          <table class="gs-table w-full">
            <thead class="sticky top-0 bg-slate-50">
              <tr>
                <th class="text-left">日期</th>
                <th class="text-right">收益金额</th>
                <th class="text-right">累计收益</th>
                <th class="text-left">备注</th>
              </tr>
            </thead>
            <tbody id="cashflow-records-list">
              <!-- 动态加载 -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- 右侧：标的信息 + 行业筛子信息 -->
    <div class="space-y-6">
      
      <!-- 标的背景重要信息汇总 -->
      <div class="gs-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-building text-blue-500 text-sm"></i>
            </div>
            标的背景信息
          </h3>
          <button onclick="viewFullDealDetail()" class="text-xs text-[#5A7A64] hover:text-[#4A6854] flex items-center">
            详细 <i class="fas fa-external-link-alt ml-1"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="text-xs text-slate-500">企业名称</label>
            <p class="font-medium text-slate-800" id="info-company-name">-</p>
          </div>
          
          <div>
            <label class="text-xs text-slate-500">所属行业</label>
            <p id="info-industry" class="flex items-center mt-1">
              <span class="px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">-</span>
            </p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-slate-500">投资金额</label>
              <p class="font-bold text-[#5A7A64]" id="info-invested-amount">¥0万</p>
            </div>
            <div>
              <label class="text-xs text-slate-500">回款周期</label>
              <p class="font-medium text-slate-700" id="info-frequency">-</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-slate-500">发行方</label>
              <p class="font-medium text-slate-700" id="info-issuer">-</p>
            </div>
            <div>
              <label class="text-xs text-slate-500">所在地区</label>
              <p class="font-medium text-slate-700" id="info-region">-</p>
            </div>
          </div>
          
          <div>
            <label class="text-xs text-slate-500">项目描述</label>
            <p class="text-sm text-slate-600 mt-1 line-clamp-3" id="info-description">-</p>
          </div>
          
          <div>
            <label class="text-xs text-slate-500">投资日期</label>
            <p class="text-sm text-slate-600" id="info-start-date">-</p>
          </div>
        </div>
      </div>
      
      <!-- 行业筛子重要信息汇总 -->
      <div class="gs-card p-6 bg-gradient-to-br from-[#F5F2EA] to-[#EAE6DC]">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-800 flex items-center">
            <div class="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-robot text-violet-500 text-sm"></i>
            </div>
            行业筛子信息
          </h3>
          <button onclick="viewIndustrySieve()" class="text-xs text-[#5A7A64] hover:text-[#4A6854] flex items-center">
            详细 <i class="fas fa-external-link-alt ml-1"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-white rounded-lg">
            <div class="flex items-center">
              <i id="sieve-industry-icon" class="fas fa-store text-amber-500 mr-3"></i>
              <div>
                <p class="font-medium text-slate-800" id="sieve-industry-name">-</p>
                <p class="text-xs text-slate-500" id="sieve-industry-desc">行业赛道</p>
              </div>
            </div>
            <i class="fas fa-chevron-right text-slate-300"></i>
          </div>
          
          <div>
            <p class="text-xs text-slate-500 mb-2">核心评估指标</p>
            <div id="sieve-key-indicators" class="space-y-2">
              <!-- 动态加载 -->
            </div>
          </div>
          
          <div>
            <p class="text-xs text-slate-500 mb-2">智能体评估状态</p>
            <div id="sieve-agents-status" class="grid grid-cols-2 gap-2">
              <!-- 动态加载 -->
            </div>
          </div>
          
          <div class="pt-3 border-t border-slate-200">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">综合评分</span>
              <span class="text-xl font-bold text-[#5A7A64]" id="sieve-total-score">-</span>
            </div>
            <div class="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div id="sieve-score-bar" class="h-full bg-gradient-to-r from-[#5A7A64] to-[#8B6B4A] rounded-full" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 快捷操作 -->
      <div class="gs-card p-6">
        <h3 class="text-base font-semibold text-slate-800 mb-4 flex items-center">
          <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-bolt text-amber-500 text-sm"></i>
          </div>
          快捷操作
        </h3>
        <div class="space-y-3">
          <button onclick="viewFullDealDetail()" class="w-full px-4 py-3 bg-[#5A7A64]/10 text-[#5A7A64] rounded-lg hover:bg-[#5A7A64]/20 transition text-left flex items-center justify-between">
            <span><i class="fas fa-file-alt mr-2"></i>查看标的完整详情</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </button>
          <button onclick="viewIndustrySieve()" class="w-full px-4 py-3 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition text-left flex items-center justify-between">
            <span><i class="fas fa-robot mr-2"></i>进入行业筛子</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </button>
          <button onclick="exportDealReport()" class="w-full px-4 py-3 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition text-left flex items-center justify-between">
            <span><i class="fas fa-download mr-2"></i>导出投后报告</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  // ============================================
  // 全局变量
  // ============================================
  let currentDealId = '';
  let currentDeal = null;
  let dealCashflows = [];
  let currentDealPeriod = 'week';
  let dealCashflowChart = null;

  // 行业映射
  const industryMap = {
    'light-asset': { name: '文娱轻资产', color: '#8B5CF6', icon: 'fa-film' },
    'catering': { name: '餐饮', color: '#F59E0B', icon: 'fa-utensils' },
    'retail': { name: '零售', color: '#10B981', icon: 'fa-store' },
    'ecommerce': { name: '电商', color: '#3B82F6', icon: 'fa-shopping-cart' },
    'douyin-ecommerce': { name: '抖音投流', color: '#FE2C55', icon: 'fab fa-tiktok' },
    'education': { name: '教育培训', color: '#EC4899', icon: 'fa-graduation-cap' },
    'service': { name: '生活服务', color: '#14B8A6', icon: 'fa-concierge-bell' }
  };

  const frequencyMap = {
    'daily': '每日',
    'weekly': '每周',
    'monthly': '每月'
  };

  // ============================================
  // 初始化
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    // 从URL获取标的ID
    const pathParts = window.location.pathname.split('/');
    currentDealId = pathParts[pathParts.length - 1];
    
    setTimeout(() => {
      loadDealData();
    }, 300);
  });

  // ============================================
  // 数据加载
  // ============================================
  async function loadDealData() {
    try {
      // 尝试从API获取数据
      const dealRes = await apiCall('/api/investor/deal/' + currentDealId, { silent: true });
      currentDeal = dealRes.data;
      
      const cashflowRes = await apiCall('/api/investor/deal/' + currentDealId + '/cashflows', { silent: true });
      dealCashflows = cashflowRes.data || [];
    } catch (e) {
      console.log('使用演示数据');
      // 使用演示数据
      loadDemoData();
    }
    
    // 渲染页面
    renderDealInfo();
    renderCashflowChart();
    renderCashflowRecords();
    renderSieveInfo();
  }

  // 加载演示数据
  function loadDemoData() {
    // 演示标的数据
    const demoDeals = {
      'DGT-2026-CARDIB': { 
        id: 'DGT-2026-CARDIB', 
        company_name: 'Cardi B演唱会', 
        industry: 'light-asset', 
        invested_amount: 3000, 
        total_cashflow: 1250, 
        cashflow_frequency: 'weekly', 
        region: '北京', 
        city: '北京', 
        issuer: '华录百纳', 
        description: '国际顶级说唱巨星Cardi B中国巡演项目，覆盖北京、上海、广州等主要城市。项目采用分成模式，按票房收入进行收益分配。',
        start_date: '2025-11-01',
        total_score: 85.6
      },
      'DGT-2026-CHAYEN': { 
        id: 'DGT-2026-CHAYEN', 
        company_name: '茶颜悦色杭州旗舰店', 
        industry: 'catering', 
        invested_amount: 500, 
        total_cashflow: 185, 
        cashflow_frequency: 'monthly', 
        region: '浙江', 
        city: '杭州',
        issuer: '茶颜悦色餐饮',
        description: '新式茶饮头部品牌杭州旗舰店项目，位于西湖核心商圈，日均客流量预估超过5000人。',
        start_date: '2025-09-15',
        total_score: 78.3
      },
      'DGT-2026-QIANDA': { 
        id: 'DGT-2026-QIANDA', 
        company_name: '钱大妈社区店', 
        industry: 'retail', 
        invested_amount: 300, 
        total_cashflow: 92, 
        cashflow_frequency: 'daily', 
        region: '广东', 
        city: '深圳',
        issuer: '钱大妈生鲜',
        description: '社区生鲜零售连锁品牌，主打"不卖隔夜肉"理念，深圳南山区3家门店打包投资。',
        start_date: '2025-10-01',
        total_score: 72.1
      },
      'DGT-2026-QIANXU': { 
        id: 'DGT-2026-QIANXU', 
        company_name: '谦寻MCN主播孵化', 
        industry: 'ecommerce', 
        invested_amount: 2000, 
        total_cashflow: 680, 
        cashflow_frequency: 'monthly', 
        region: '浙江', 
        city: '杭州',
        issuer: '谦寻控股',
        description: '头部MCN机构谦寻旗下主播孵化项目，签约培养5名潜力主播，享受直播带货GMV分成。',
        start_date: '2025-08-01',
        total_score: 82.5
      },
      'DGT-2026-JINSE': { 
        id: 'DGT-2026-JINSE', 
        company_name: '锦瑟服饰抖音投流', 
        industry: 'douyin-ecommerce', 
        invested_amount: 800, 
        total_cashflow: 320, 
        cashflow_frequency: 'weekly', 
        region: '广东', 
        city: '广州',
        issuer: '锦瑟电商',
        description: '女装品牌抖音电商投流项目，投资用于抖音广告投放，按ROI进行收益分成。',
        start_date: '2025-12-01',
        total_score: 76.8
      }
    };
    
    currentDeal = demoDeals[currentDealId] || demoDeals['DGT-2026-CARDIB'];
    
    // 生成演示回款数据
    const today = new Date();
    dealCashflows = [];
    const daysInvested = Math.floor((today - new Date(currentDeal.start_date)) / (1000 * 60 * 60 * 24));
    let cumulative = 0;
    
    for (let i = Math.min(daysInvested, 60); i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dailyAmount = (currentDeal.total_cashflow / Math.min(daysInvested, 60)) * (0.7 + Math.random() * 0.6);
      cumulative += dailyAmount;
      
      dealCashflows.push({
        date: date.toISOString().split('T')[0],
        amount: dailyAmount,
        cumulative: cumulative,
        note: i === 0 ? '最新回款' : (Math.random() > 0.7 ? '特殊分红' : '')
      });
    }
  }

  // ============================================
  // 渲染函数
  // ============================================
  
  // 渲染标的基本信息
  function renderDealInfo() {
    if (!currentDeal) return;
    
    // 标题
    document.getElementById('deal-title').textContent = currentDeal.company_name;
    
    // 基本信息
    document.getElementById('info-company-name').textContent = currentDeal.company_name;
    
    const industry = industryMap[currentDeal.industry] || { name: currentDeal.industry, color: '#6B7280', icon: 'fa-building' };
    document.getElementById('info-industry').innerHTML = \`
      <span class="px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80" 
            style="background: \${industry.color}15; color: \${industry.color}"
            onclick="viewIndustrySieve()">
        <i class="fas \${industry.icon} mr-1"></i>\${industry.name}
      </span>
    \`;
    
    document.getElementById('info-invested-amount').textContent = '¥' + formatNumber(currentDeal.invested_amount) + '万';
    document.getElementById('info-frequency').textContent = frequencyMap[currentDeal.cashflow_frequency] || currentDeal.cashflow_frequency;
    document.getElementById('info-issuer').textContent = currentDeal.issuer || '-';
    document.getElementById('info-region').textContent = (currentDeal.region || '') + ' ' + (currentDeal.city || '');
    document.getElementById('info-description').textContent = currentDeal.description || '-';
    document.getElementById('info-start-date').textContent = currentDeal.start_date || '-';
    
    // 统计数据
    document.getElementById('deal-invested').textContent = '¥' + formatNumber(currentDeal.invested_amount) + '万';
    document.getElementById('deal-total-return').textContent = '¥' + formatNumber(currentDeal.total_cashflow) + '万';
    const returnRate = currentDeal.invested_amount > 0 ? ((currentDeal.total_cashflow / currentDeal.invested_amount) * 100).toFixed(1) : 0;
    document.getElementById('deal-return-rate').textContent = returnRate + '%';
    
    // 计算投资天数
    if (currentDeal.start_date) {
      const startDate = new Date(currentDeal.start_date);
      const today = new Date();
      const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      document.getElementById('deal-days').textContent = days + '天';
    }
  }
  
  // 渲染收益图表
  function renderCashflowChart() {
    const ctx = document.getElementById('deal-cashflow-chart').getContext('2d');
    
    // 根据周期筛选数据
    let data = dealCashflows;
    if (currentDealPeriod === 'week') {
      data = data.slice(-7);
    } else if (currentDealPeriod === 'month') {
      data = data.slice(-30);
    }
    
    const labels = data.map(d => {
      const date = new Date(d.date);
      return (date.getMonth() + 1) + '/' + date.getDate();
    });
    
    const amounts = data.map(d => d.amount);
    const cumulative = data.map(d => d.cumulative);
    
    if (dealCashflowChart) {
      dealCashflowChart.destroy();
    }
    
    dealCashflowChart = new Chart(ctx, {
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
  
  // 渲染收益明细记录
  function renderCashflowRecords() {
    const container = document.getElementById('cashflow-records-list');
    document.getElementById('cashflow-count').textContent = '共 ' + dealCashflows.length + ' 条记录';
    
    if (dealCashflows.length === 0) {
      container.innerHTML = \`
        <tr>
          <td colspan="4" class="text-center py-8 text-slate-400">
            <i class="fas fa-inbox text-3xl mb-2 block"></i>
            暂无收益记录
          </td>
        </tr>
      \`;
      return;
    }
    
    // 倒序显示，最新的在前面
    const sortedCashflows = [...dealCashflows].reverse();
    
    container.innerHTML = sortedCashflows.slice(0, 20).map(record => \`
      <tr class="hover:bg-slate-50">
        <td class="py-2 text-sm text-slate-600">\${record.date}</td>
        <td class="text-right text-sm font-medium text-[#5A7A64]">+¥\${record.amount.toFixed(2)}万</td>
        <td class="text-right text-sm text-slate-700">¥\${record.cumulative.toFixed(2)}万</td>
        <td class="text-sm text-slate-400">\${record.note || '-'}</td>
      </tr>
    \`).join('');
  }
  
  // 渲染行业筛子信息
  function renderSieveInfo() {
    if (!currentDeal) return;
    
    const industry = industryMap[currentDeal.industry] || { name: currentDeal.industry, color: '#6B7280', icon: 'fa-building' };
    
    // 行业信息
    document.getElementById('sieve-industry-name').textContent = industry.name;
    const iconEl = document.getElementById('sieve-industry-icon');
    iconEl.className = 'fas ' + industry.icon + ' mr-3';
    iconEl.style.color = industry.color;
    
    // 核心评估指标（根据行业显示不同指标）
    const indicatorsEl = document.getElementById('sieve-key-indicators');
    const indicators = getIndustryIndicators(currentDeal.industry);
    indicatorsEl.innerHTML = indicators.map(ind => \`
      <div class="flex items-center justify-between text-sm p-2 bg-white rounded">
        <span class="text-slate-600"><i class="fas \${ind.icon} mr-2 text-xs" style="color: \${ind.color}"></i>\${ind.name}</span>
        <span class="font-medium" style="color: \${ind.color}">\${ind.value}</span>
      </div>
    \`).join('');
    
    // 智能体状态
    const agentsEl = document.getElementById('sieve-agents-status');
    const agents = getIndustryAgents(currentDeal.industry);
    agentsEl.innerHTML = agents.slice(0, 4).map(agent => \`
      <div class="flex items-center text-xs p-2 bg-white rounded">
        <span class="w-2 h-2 rounded-full mr-2" style="background: \${agent.passed ? '#10B981' : '#EF4444'}"></span>
        <span class="text-slate-600 truncate">\${agent.name}</span>
      </div>
    \`).join('');
    
    // 综合评分
    const score = currentDeal.total_score || 75;
    document.getElementById('sieve-total-score').textContent = score.toFixed(1) + '分';
    document.getElementById('sieve-score-bar').style.width = score + '%';
  }
  
  // 获取行业核心指标
  function getIndustryIndicators(industry) {
    const indicatorsMap = {
      'light-asset': [
        { name: '预售达标率', value: '92%', icon: 'fa-ticket-alt', color: '#8B5CF6' },
        { name: '保险覆盖', value: '已投保', icon: 'fa-shield-alt', color: '#10B981' },
        { name: '场地确认', value: '已确认', icon: 'fa-map-marker', color: '#3B82F6' }
      ],
      'catering': [
        { name: '坪效', value: '¥280/㎡', icon: 'fa-chart-line', color: '#F59E0B' },
        { name: '翻台率', value: '4.2次/天', icon: 'fa-sync', color: '#10B981' },
        { name: '客单价', value: '¥68', icon: 'fa-receipt', color: '#3B82F6' }
      ],
      'retail': [
        { name: '日均客流', value: '1200人', icon: 'fa-users', color: '#10B981' },
        { name: '客单价', value: '¥45', icon: 'fa-shopping-basket', color: '#F59E0B' },
        { name: '复购率', value: '68%', icon: 'fa-redo', color: '#3B82F6' }
      ],
      'ecommerce': [
        { name: 'GMV', value: '¥2800万/月', icon: 'fa-chart-bar', color: '#3B82F6' },
        { name: '转化率', value: '3.8%', icon: 'fa-percentage', color: '#10B981' },
        { name: '粉丝量', value: '520万', icon: 'fa-heart', color: '#EC4899' }
      ],
      'douyin-ecommerce': [
        { name: 'ROI', value: '2.8', icon: 'fa-chart-line', color: '#FE2C55' },
        { name: '点击率', value: '4.5%', icon: 'fa-mouse-pointer', color: '#10B981' },
        { name: '转化成本', value: '¥35', icon: 'fa-coins', color: '#F59E0B' }
      ]
    };
    
    return indicatorsMap[industry] || indicatorsMap['retail'];
  }
  
  // 获取行业智能体
  function getIndustryAgents(industry) {
    return [
      { name: '合规审核', passed: true },
      { name: '财务分析', passed: true },
      { name: '市场评估', passed: true },
      { name: '风险评估', passed: Math.random() > 0.2 }
    ];
  }

  // ============================================
  // 事件处理
  // ============================================
  
  function switchDealPeriod(period) {
    currentDealPeriod = period;
    
    ['week', 'month', 'all'].forEach(p => {
      const btn = document.getElementById('btn-deal-period-' + p);
      if (btn) {
        btn.className = p === period 
          ? 'px-3 py-1 text-xs rounded-lg bg-[#5A7A64] text-white'
          : 'px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    });
    
    renderCashflowChart();
  }
  
  // 跳转到标的管理详情页
  function viewFullDealDetail() {
    window.location.href = '/deals/' + currentDealId;
  }
  
  // 跳转到行业筛子页面
  function viewIndustrySieve() {
    if (currentDeal && currentDeal.industry) {
      window.location.href = '/agents?track=' + currentDeal.industry;
    }
  }
  
  function exportDealReport() {
    showToast('报告导出功能开发中', 'info');
  }
  
  function refreshDealData() {
    showToast('正在刷新数据...', 'info');
    loadDealData();
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
<\/script>
`
