// 投资人入口 - 交易记录全部列表页面
// 显示所有交易记录，支持筛选和排序

export const investorTransactionsListPageContent = `
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
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5A6A7A] to-[#7A8A9A] flex items-center justify-center mr-3 shadow-md">
          <i class="fas fa-exchange-alt text-white"></i>
        </div>
        交易记录
      </h1>
      <p class="text-slate-500 mt-1 ml-13">查看全部投资交易记录</p>
    </div>
    <div class="flex items-center space-x-3">
      <button onclick="exportTransactionsList()" class="gs-btn gs-btn-warm px-4 py-2">
        <i class="fas fa-download mr-2"></i>导出记录
      </button>
    </div>
  </div>

  <!-- 筛选区 -->
  <div class="gs-card p-4 mb-6">
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center space-x-2">
        <label class="text-sm text-slate-600">交易类型：</label>
        <select id="filter-type" onchange="filterTransactions()" class="text-sm border rounded-lg px-3 py-2 bg-white">
          <option value="">全部类型</option>
          <option value="invest">投资</option>
          <option value="divest">退出</option>
          <option value="transfer">转让</option>
        </select>
      </div>
      <div class="flex items-center space-x-2">
        <label class="text-sm text-slate-600">时间范围：</label>
        <select id="filter-date-range" onchange="filterTransactions()" class="text-sm border rounded-lg px-3 py-2 bg-white">
          <option value="">全部时间</option>
          <option value="7">近7天</option>
          <option value="30">近30天</option>
          <option value="90">近90天</option>
          <option value="365">近一年</option>
        </select>
      </div>
      <div class="flex items-center space-x-2 flex-1">
        <label class="text-sm text-slate-600">搜索：</label>
        <input type="text" id="search-keyword" onkeyup="filterTransactions()" placeholder="输入标的名称或代码..." 
               class="text-sm border rounded-lg px-3 py-2 bg-white flex-1 min-w-[200px]">
      </div>
      <div class="flex items-center space-x-2">
        <label class="text-sm text-slate-600">排序：</label>
        <select id="sort-by" onchange="filterTransactions()" class="text-sm border rounded-lg px-3 py-2 bg-white">
          <option value="date_desc">交易日期最近</option>
          <option value="date_asc">交易日期最早</option>
          <option value="amount_desc">金额从高到低</option>
          <option value="amount_asc">金额从低到高</option>
        </select>
      </div>
    </div>
  </div>

  <!-- 统计摘要 -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">交易笔数</p>
      <p class="text-2xl font-bold text-[#5A6A7A]" id="filtered-count">0</p>
    </div>
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">投资金额</p>
      <p class="text-2xl font-bold text-[#5A7A64]" id="invest-amount">¥0</p>
    </div>
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">退出金额</p>
      <p class="text-2xl font-bold text-[#8B5A5A]" id="divest-amount">¥0</p>
    </div>
    <div class="gs-card p-4">
      <p class="text-xs text-slate-500 mb-1">净投资额</p>
      <p class="text-2xl font-bold text-[#8B6B4A]" id="net-amount">¥0</p>
    </div>
  </div>

  <!-- 交易记录列表 -->
  <div class="gs-card p-6">
    <div class="overflow-x-auto">
      <table class="gs-table w-full">
        <thead>
          <tr>
            <th class="text-left">交易ID</th>
            <th class="text-left">标的名称/代码</th>
            <th class="text-center">货币</th>
            <th class="text-center">交易日期</th>
            <th class="text-right">交易金额</th>
            <th class="text-center">类型</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody id="transactions-list">
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
  let allTransactions = [];
  let filteredTransactions = [];
  let currentPage = 1;
  const pageSize = 50;

  const typeMap = {
    'invest': { name: '投资', color: '#5A7A64' },
    'divest': { name: '退出', color: '#8B5A5A' },
    'transfer': { name: '转让', color: '#5A6A7A' }
  };

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
  });

  // 加载数据
  async function loadTransactions() {
    try {
      const res = await apiCall('/api/investor/transactions');
      allTransactions = res.data || [];
      filterTransactions();
    } catch (e) {
      console.error('加载数据失败:', e);
      loadDemoData();
    }
  }

  // 加载演示数据
  function loadDemoData() {
    allTransactions = getDemoTransactions();
    filterTransactions();
  }

  // 获取演示数据
  function getDemoTransactions() {
    const deals = [
      { name: '蜜雪冰城（深圳南山科技园店）', code: 'DGT-2026-001', amount: 35 },
      { name: '老乡鸡（上海徐汇日月光店）', code: 'DGT-2026-002', amount: 80 },
      { name: '叮咚买菜（杭州拱墅区前置仓）', code: 'DGT-2026-003', amount: 120 },
      { name: '罗森便利店（成都春熙路旗舰店）', code: 'DGT-2026-004', amount: 60 },
      { name: '新瑞鹏宠物医院（北京朝阳望京店）', code: 'DGT-2026-005', amount: 150 },
      { name: '乐刻运动（广州天河体育中心店）', code: 'DGT-2026-006', amount: 85 },
      { name: '永琪美容美发（武汉光谷步行街店）', code: 'DGT-2026-007', amount: 55 },
      { name: '唱吧麦颂KTV（南京新街口旗舰店）', code: 'DGT-2026-008', amount: 200 },
      { name: '途虎养车工场店（重庆渝北龙湖店）', code: 'DGT-2026-009', amount: 180 },
      { name: '海底捞（西安大雁塔店）', code: 'DGT-2026-010', amount: 300 },
      { name: '薛之谦2026巡回演唱会（华东站）', code: 'DGT-2026-031', amount: 500 },
      { name: 'UR快时尚抖音投流项目', code: 'DGT-2026-032', amount: 200 },
      { name: '特来电京沪高速充电站（10站）', code: 'DGT-2026-033', amount: 300 },
      { name: '有赞电商SaaS订阅收入分成', code: 'DGT-2026-034', amount: 400 },
      { name: '无忧传媒达人孵化计划（10人）', code: 'DGT-2026-035', amount: 150 },
      { name: 'BLG电竞战队收入分成', code: 'DGT-2026-044', amount: 300 },
      { name: 'A-SOUL虚拟偶像运营分成', code: 'DGT-2026-050', amount: 200 }
    ];
    
    return deals.map((deal, index) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 180));
      return {
        id: 'TRX-' + String(index + 1).padStart(4, '0'),
        deal_name: deal.name,
        deal_code: deal.code,
        currency: 'CNY',
        transaction_date: date.toISOString().split('T')[0],
        amount: deal.amount,
        type: 'invest'
      };
    });
  }

  // 筛选和排序
  function filterTransactions() {
    const type = document.getElementById('filter-type').value;
    const dateRange = document.getElementById('filter-date-range').value;
    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    const sortBy = document.getElementById('sort-by').value;
    
    const today = new Date();
    
    filteredTransactions = allTransactions.filter(txn => {
      if (type && txn.type !== type) return false;
      
      if (dateRange) {
        const txnDate = new Date(txn.transaction_date);
        const diffDays = Math.floor((today - txnDate) / (1000 * 60 * 60 * 24));
        if (diffDays > parseInt(dateRange)) return false;
      }
      
      if (keyword && !txn.deal_name.toLowerCase().includes(keyword) && !txn.deal_code.toLowerCase().includes(keyword)) return false;
      
      return true;
    });
    
    // 排序
    const [sortField, sortOrder] = sortBy.split('_');
    const orderMultiplier = sortOrder === 'desc' ? -1 : 1;
    
    if (sortField === 'date') {
      filteredTransactions.sort((a, b) => (new Date(a.transaction_date) - new Date(b.transaction_date)) * orderMultiplier);
    } else if (sortField === 'amount') {
      filteredTransactions.sort((a, b) => (a.amount - b.amount) * orderMultiplier);
    }
    
    currentPage = 1;
    updateStats();
    renderTransactions();
    renderPagination();
  }

  // 更新统计
  function updateStats() {
    const investAmount = filteredTransactions.filter(t => t.type === 'invest').reduce((sum, t) => sum + t.amount, 0);
    const divestAmount = filteredTransactions.filter(t => t.type === 'divest').reduce((sum, t) => sum + t.amount, 0);
    const netAmount = investAmount - divestAmount;
    
    document.getElementById('filtered-count').textContent = filteredTransactions.length;
    document.getElementById('invest-amount').textContent = '¥' + formatInvestmentAmount(investAmount);
    document.getElementById('divest-amount').textContent = '¥' + formatInvestmentAmount(divestAmount);
    document.getElementById('net-amount').textContent = '¥' + formatInvestmentAmount(netAmount);
  }

  // 渲染列表
  function renderTransactions() {
    const container = document.getElementById('transactions-list');
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, filteredTransactions.length);
    const pageTransactions = filteredTransactions.slice(start, end);
    
    if (pageTransactions.length === 0) {
      container.innerHTML = \`
        <tr>
          <td colspan="7" class="text-center py-12 text-slate-400">
            <i class="fas fa-inbox text-4xl mb-3 block"></i>
            暂无符合条件的交易记录
          </td>
        </tr>
      \`;
      return;
    }
    
    container.innerHTML = pageTransactions.map(txn => {
      // 兼容两种字段名：type（演示数据）和 transaction_type（数据库数据）
      const txnType = txn.type || txn.transaction_type || 'invest';
      const type = typeMap[txnType] || { name: txnType, color: '#6B7280' };
      return \`
        <tr class="hover:bg-slate-50">
          <td class="py-3">
            <span class="font-mono text-xs text-slate-500">\${txn.id}</span>
          </td>
          <td>
            <div class="cursor-pointer" onclick="viewDealDetail('\${txn.deal_code}')">
              <p class="font-medium text-slate-800 hover:text-[#5A7A64] hover:underline">\${txn.deal_name}</p>
              <p class="text-xs text-slate-400">\${txn.deal_code}</p>
            </div>
          </td>
          <td class="text-center text-sm text-slate-600">\${txn.currency}</td>
          <td class="text-center text-sm text-slate-600">\${txn.transaction_date}</td>
          <td class="text-right font-medium">¥\${formatInvestmentAmount(txn.amount)}</td>
          <td class="text-center">
            <span class="px-2 py-1 rounded text-xs" style="background: \${type.color}15; color: \${type.color}">
              \${type.name}
            </span>
          </td>
          <td class="text-center">
            <button onclick="viewDealDetail('\${txn.deal_code}')" class="px-3 py-1 text-xs rounded-lg bg-[#5A6A7A]/10 text-[#5A6A7A] hover:bg-[#5A6A7A]/20 transition">
              <i class="fas fa-eye mr-1"></i>查看
            </button>
          </td>
        </tr>
      \`;
    }).join('');
    
    // 更新分页信息
    document.getElementById('pagination-info').textContent = \`显示 \${start + 1} - \${end} 条，共 \${filteredTransactions.length} 条\`;
  }

  // 渲染分页
  function renderPagination() {
    const container = document.getElementById('pagination-controls');
    const totalPages = Math.ceil(filteredTransactions.length / pageSize);
    
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
        html += \`<button onclick="goToPage(\${i})" class="px-3 py-1 text-sm rounded-lg \${i === currentPage ? 'bg-[#5A6A7A] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">\${i}</button>\`;
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
    const totalPages = Math.ceil(filteredTransactions.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTransactions();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function viewDealDetail(dealCode) {
    window.location.href = '/investor/deal/' + dealCode;
  }

  function exportTransactionsList() {
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
<\/script>
`
