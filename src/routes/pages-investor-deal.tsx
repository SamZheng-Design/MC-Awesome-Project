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
    'service': { name: '生活服务', color: '#14B8A6', icon: 'fa-concierge-bell' },
    'entertainment': { name: '文娱', color: '#A855F7', icon: 'fa-music' }
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
    // 演示标的数据 - 全部50个DRO标的（实体门店30个 + 创新领域20个）
    const demoDeals = {
      // ========== 实体门店标的（30个）==========
      // 基础10个标的
      'DGT-2026-001': { id: 'DGT-2026-001', company_name: '蜜雪冰城（深圳南山科技园店）', industry: 'catering', invested_amount: 35, total_cashflow: 12, cashflow_frequency: 'daily', region: '广东', city: '深圳', issuer: '蜜雪冰城股份', description: '新式茶饮头部品牌深圳高人流量科技园店，日均销售额稳定，主打高性价比产品，目标客群为科技园白领与周边居民。', start_date: '2025-10-15', total_score: 78.5 },
      'DGT-2026-002': { id: 'DGT-2026-002', company_name: '老乡鸡（上海徐汇日月光店）', industry: 'catering', invested_amount: 80, total_cashflow: 28, cashflow_frequency: 'daily', region: '上海', city: '上海', issuer: '老乡鸡餐饮', description: '中式快餐头部品牌，上海核心商圈店，午间及晚间高峰客流稳定，单店月均营收约45万。', start_date: '2025-09-20', total_score: 82.3 },
      'DGT-2026-003': { id: 'DGT-2026-003', company_name: '叮咚买菜（杭州拱墅区前置仓）', industry: 'retail', invested_amount: 120, total_cashflow: 55, cashflow_frequency: 'daily', region: '浙江', city: '杭州', issuer: '叮咚买菜', description: '生鲜电商前置仓模式，覆盖3公里范围内高密度社区，日均订单量800+单，29分钟达标率98%。', start_date: '2025-08-10', total_score: 79.8 },
      'DGT-2026-004': { id: 'DGT-2026-004', company_name: '罗森便利店（成都春熙路旗舰店）', industry: 'retail', invested_amount: 60, total_cashflow: 43, cashflow_frequency: 'daily', region: '四川', city: '成都', issuer: '罗森中国', description: '日系便利店头部品牌成都核心商圈24H旗舰店，日均客流量1500+，鲜食销售占比35%。', start_date: '2025-07-25', total_score: 85.2 },
      'DGT-2026-005': { id: 'DGT-2026-005', company_name: '新瑞鹏宠物医院（北京朝阳望京店）', industry: 'service', invested_amount: 150, total_cashflow: 46, cashflow_frequency: 'weekly', region: '北京', city: '北京', issuer: '新瑞鹏宠物医疗', description: '宠物医疗头部品牌，覆盖望京及周边高端社区，配备专业设备与资深兽医团队，月均就诊量400+只。', start_date: '2025-06-15', total_score: 76.5 },
      'DGT-2026-006': { id: 'DGT-2026-006', company_name: '乐刻运动（广州天河体育中心店）', industry: 'service', invested_amount: 85, total_cashflow: 15, cashflow_frequency: 'weekly', region: '广东', city: '广州', issuer: '乐刻运动', description: '24H智能健身房，会员模式+按次付费双轮驱动，月活会员2000+，器械更新率行业领先。', start_date: '2025-11-01', total_score: 74.8 },
      'DGT-2026-007': { id: 'DGT-2026-007', company_name: '永琪美容美发（武汉光谷步行街店）', industry: 'service', invested_amount: 55, total_cashflow: 19, cashflow_frequency: 'weekly', region: '湖北', city: '武汉', issuer: '永琪美容美发', description: '美发连锁头部品牌，覆盖光谷白领与高校学生群体，月均服务客户3000+人次，复购率72%。', start_date: '2025-10-20', total_score: 73.2 },
      'DGT-2026-008': { id: 'DGT-2026-008', company_name: '唱吧麦颂KTV（南京新街口旗舰店）', industry: 'entertainment', invested_amount: 200, total_cashflow: 44, cashflow_frequency: 'monthly', region: '江苏', city: '南京', issuer: '唱吧麦颂', description: '互联网KTV头部品牌，线上引流+线下体验模式，30个包厢，周末及节假日出租率95%以上。', start_date: '2025-09-10', total_score: 71.5 },
      'DGT-2026-009': { id: 'DGT-2026-009', company_name: '途虎养车工场店（重庆渝北龙湖店）', industry: 'service', invested_amount: 180, total_cashflow: 51, cashflow_frequency: 'monthly', region: '重庆', city: '重庆', issuer: '途虎养车', description: '汽车后市场头部品牌，线上线下一体化服务，月均服务车辆1200+台次，客单价580元。', start_date: '2025-08-25', total_score: 77.9 },
      'DGT-2026-010': { id: 'DGT-2026-010', company_name: '海底捞（西安大雁塔店）', industry: 'catering', invested_amount: 300, total_cashflow: 135, cashflow_frequency: 'monthly', region: '陕西', city: '西安', issuer: '海底捞国际', description: '火锅头部品牌西安核心景区旗舰店，旅游+本地双客流叠加，月均翻台率4.5次，节假日排队平均2小时。', start_date: '2025-05-20', total_score: 88.6 },
      // 扩展20个门店标的
      'DGT-2026-011': { id: 'DGT-2026-011', company_name: '鲍师傅糕点（苏州观前街店）', industry: 'catering', invested_amount: 45, total_cashflow: 22, cashflow_frequency: 'daily', region: '江苏', city: '苏州', issuer: '鲍师傅糕点', description: '中式糕点头部品牌，以肉松小贝为爆款产品，常年排队，日均销售1.5-2万元。', start_date: '2026-01-11', total_score: 81.2 },
      'DGT-2026-012': { id: 'DGT-2026-012', company_name: '孩子王（郑州正弘城店）', industry: 'retail', invested_amount: 150, total_cashflow: 61, cashflow_frequency: 'daily', region: '河南', city: '郑州', issuer: '孩子王', description: '母婴零售龙头品牌A股上市公司，800平米区域旗舰店，会员消费占比90%以上。', start_date: '2026-01-11', total_score: 79.5 },
      'DGT-2026-013': { id: 'DGT-2026-013', company_name: '通策医疗口腔（长沙五一广场店）', industry: 'service', invested_amount: 200, total_cashflow: 72, cashflow_frequency: 'weekly', region: '湖南', city: '长沙', issuer: '通策医疗', description: '口腔医疗上市公司旗下门诊，配备进口牙椅12台，专业口腔医师8人，日均接诊40-60人次。', start_date: '2026-01-12', total_score: 83.7 },
      'DGT-2026-014': { id: 'DGT-2026-014', company_name: '宝岛眼镜（青岛万象城店）', industry: 'service', invested_amount: 65, total_cashflow: 32, cashflow_frequency: 'weekly', region: '山东', city: '青岛', issuer: '宝岛眼镜', description: '眼镜零售连锁头部品牌，提供专业验光与配镜服务，客单价450元，月均服务800+人次。', start_date: '2026-01-13', total_score: 75.8 },
      'DGT-2026-015': { id: 'DGT-2026-015', company_name: '福奈特洗衣（天津滨江道店）', industry: 'service', invested_amount: 40, total_cashflow: 11, cashflow_frequency: 'weekly', region: '天津', city: '天津', issuer: '福奈特洗衣', description: '干洗连锁品牌核心商圈店，主打高端洗护服务，日均收件量120件，会员复购率85%。', start_date: '2026-01-13', total_score: 72.3 },
      'DGT-2026-016': { id: 'DGT-2026-016', company_name: '瑞幸咖啡（厦门中山路店）', industry: 'catering', invested_amount: 50, total_cashflow: 16, cashflow_frequency: 'daily', region: '福建', city: '厦门', issuer: '瑞幸咖啡', description: '国产咖啡头部品牌景区旗舰店，日均杯量800+杯，旅游旺季可达1200杯以上。', start_date: '2026-01-14', total_score: 80.1 },
      'DGT-2026-017': { id: 'DGT-2026-017', company_name: '大参林药店（合肥政务区店）', industry: 'retail', invested_amount: 80, total_cashflow: 19, cashflow_frequency: 'daily', region: '安徽', city: '合肥', issuer: '大参林', description: '连锁药店头部品牌上市公司，社区旗舰店，日均客流500+人次，医保定点药房。', start_date: '2026-01-14', total_score: 76.4 },
      'DGT-2026-018': { id: 'DGT-2026-018', company_name: '金宝贝早教（济南恒隆广场店）', industry: 'education', invested_amount: 120, total_cashflow: 41, cashflow_frequency: 'monthly', region: '山东', city: '济南', issuer: '金宝贝早教', description: '国际早教品牌商场旗舰店，在册学员300+名，续费率75%，客单价1.8万元/年。', start_date: '2026-01-15', total_score: 74.9 },
      'DGT-2026-019': { id: 'DGT-2026-019', company_name: '木屋烧烤（沈阳中街店）', industry: 'catering', invested_amount: 100, total_cashflow: 32, cashflow_frequency: 'monthly', region: '辽宁', city: '沈阳', issuer: '木屋烧烤', description: '连锁烧烤品牌核心商圈店，180座位，月均营收约80万元，夜间经济主力业态。', start_date: '2026-01-15', total_score: 77.6 },
      'DGT-2026-020': { id: 'DGT-2026-020', company_name: '百果园（昆明南屏街店）', industry: 'retail', invested_amount: 55, total_cashflow: 13, cashflow_frequency: 'daily', region: '云南', city: '昆明', issuer: '百果园', description: '水果零售连锁头部品牌上市公司，云南本地水果供应优势明显，日均销售额1.2万元。', start_date: '2026-01-15', total_score: 78.2 },
      'DGT-2026-021': { id: 'DGT-2026-021', company_name: '驰加汽车服务（石家庄万达店）', industry: 'service', invested_amount: 75, total_cashflow: 32, cashflow_frequency: 'weekly', region: '河北', city: '石家庄', issuer: '驰加汽服', description: '米其林旗下汽车养护品牌，8个工位，月均服务车辆800+台次，客单价320元。', start_date: '2026-01-15', total_score: 75.1 },
      'DGT-2026-022': { id: 'DGT-2026-022', company_name: '马子禄牛肉面（兰州正宁路店）', industry: 'catering', invested_amount: 30, total_cashflow: 43, cashflow_frequency: 'daily', region: '甘肃', city: '兰州', issuer: '马子禄', description: '兰州拉面百年老字号，日均销售1200+碗，本地人与游客双客流，客单价18元。', start_date: '2026-01-15', total_score: 86.5 },
      'DGT-2026-023': { id: 'DGT-2026-023', company_name: '良品铺子（长春欧亚卖场店）', industry: 'retail', invested_amount: 48, total_cashflow: 16, cashflow_frequency: 'daily', region: '吉林', city: '长春', issuer: '良品铺子', description: '零食连锁上市公司门店，日均销售额1.5万元，会员占比70%，礼盒销售占比高。', start_date: '2026-01-15', total_score: 77.8 },
      'DGT-2026-024': { id: 'DGT-2026-024', company_name: '爱帝宫月子中心（无锡太湖新城店）', industry: 'service', invested_amount: 250, total_cashflow: 65, cashflow_frequency: 'monthly', region: '江苏', city: '无锡', issuer: '爱帝宫', description: '高端月子中心上市公司，30间月子房，入住率85%+，客单价5-15万元/月。', start_date: '2026-01-15', total_score: 82.4 },
      'DGT-2026-025': { id: 'DGT-2026-025', company_name: '太兴餐厅（东莞松山湖店）', industry: 'catering', invested_amount: 90, total_cashflow: 14, cashflow_frequency: 'daily', region: '广东', city: '东莞', issuer: '太兴餐饮', description: '港式茶餐厅连锁品牌上市公司，科技园商务客流为主，日均营收约2万元。', start_date: '2026-01-15', total_score: 74.2 },
      'DGT-2026-026': { id: 'DGT-2026-026', company_name: '梵音瑜伽（佛山千灯湖店）', industry: 'service', invested_amount: 70, total_cashflow: 30, cashflow_frequency: 'weekly', region: '广东', city: '佛山', issuer: '梵音瑜伽', description: '高端瑜伽连锁品牌，会员1500+人，年卡均价8000元，私教课客单价350元。', start_date: '2026-01-15', total_score: 76.9 },
      'DGT-2026-027': { id: 'DGT-2026-027', company_name: '名创优品（南宁万象城店）', industry: 'retail', invested_amount: 60, total_cashflow: 13, cashflow_frequency: 'daily', region: '广西', city: '南宁', issuer: '名创优品', description: '生活好物零售上市公司，日均客流2000+人次，客单价35元，IP联名产品畅销。', start_date: '2026-01-15', total_score: 78.6 },
      'DGT-2026-028': { id: 'DGT-2026-028', company_name: '宠物家（哈尔滨中央大街店）', industry: 'service', invested_amount: 50, total_cashflow: 15, cashflow_frequency: 'weekly', region: '黑龙江', city: '哈尔滨', issuer: '宠物家', description: '宠物服务连锁品牌，提供宠物洗护、寄养、用品销售，月均服务宠物600+只。', start_date: '2026-01-15', total_score: 73.5 },
      'DGT-2026-029': { id: 'DGT-2026-029', company_name: '巴奴毛肚火锅（贵阳花果园店）', industry: 'catering', invested_amount: 180, total_cashflow: 45, cashflow_frequency: 'monthly', region: '贵州', city: '贵阳', issuer: '巴奴火锅', description: '毛肚火锅头部品牌，以产品主义著称，200座位，月均翻台率3.8次，客单价130元。', start_date: '2026-01-15', total_score: 81.7 },
      'DGT-2026-030': { id: 'DGT-2026-030', company_name: '谜探剧本杀（武汉楚河汉街店）', industry: 'entertainment', invested_amount: 85, total_cashflow: 26, cashflow_frequency: 'monthly', region: '湖北', city: '武汉', issuer: '谜探文娱', description: '沉浸式剧本杀连锁品牌，12个主题房间，周末出租率95%+，客单价150元/人。', start_date: '2026-01-15', total_score: 72.8 },
      // ========== 创新领域标的（20个）==========
      // 票务/演出
      'DGT-2026-031': { id: 'DGT-2026-031', company_name: '薛之谦2026巡回演唱会（华东站）', industry: 'concert', invested_amount: 500, total_cashflow: 342, cashflow_frequency: 'weekly', region: '华东', city: '上海', issuer: '大麦网', description: '顶流歌手华东三城（上海、杭州、南京）巡演，预计6场演出，单场票房3800万+，大麦网实时结算。', start_date: '2026-01-16', total_score: 85.5 },
      'DGT-2026-041': { id: 'DGT-2026-041', company_name: '草莓音乐节2026成都站', industry: 'concert', invested_amount: 200, total_cashflow: 111, cashflow_frequency: 'weekly', region: '四川', city: '成都', issuer: '摩登天空', description: '中国最大户外音乐节品牌，3天10万人次，票房+赞助+周边多元收入。', start_date: '2026-01-17', total_score: 82.3 },
      // 抖音投流
      'DGT-2026-032': { id: 'DGT-2026-032', company_name: 'UR快时尚抖音投流项目', industry: 'douyin-ads', invested_amount: 200, total_cashflow: 131, cashflow_frequency: 'weekly', region: '广东', city: '广州', issuer: 'UR品牌', description: '本土快时尚头部品牌2026春夏系列抖音投流，巨量引擎数据监控，目标ROI 3.5+。', start_date: '2026-01-16', total_score: 79.8 },
      'DGT-2026-042': { id: 'DGT-2026-042', company_name: '三只松鼠抖音年货节投流', industry: 'douyin-ads', invested_amount: 120, total_cashflow: 58, cashflow_frequency: 'weekly', region: '安徽', city: '芜湖', issuer: '三只松鼠', description: '休闲零食A股头部品牌，年货节千川投放，目标ROI 4.0+。', start_date: '2026-01-17', total_score: 84.2 },
      // 充电桩/新能源
      'DGT-2026-033': { id: 'DGT-2026-033', company_name: '特来电京沪高速充电站（10站）', industry: 'new-energy', invested_amount: 300, total_cashflow: 31, cashflow_frequency: 'daily', region: '华东', city: '京沪沿线', issuer: '特来电', description: '充电桩运营龙头A股上市，京沪高速10个服务区充电站打包，80个快充桩，国网实时结算。', start_date: '2026-01-16', total_score: 77.5 },
      'DGT-2026-039': { id: 'DGT-2026-039', company_name: '正泰分布式光伏（浙江10厂房）', industry: 'new-energy', invested_amount: 350, total_cashflow: 49, cashflow_frequency: 'monthly', region: '浙江', city: '嘉兴', issuer: '正泰新能源', description: '光伏龙头A股上市企业，浙江10个工业厂房屋顶5MW装机，自发自用+余电上网。', start_date: '2026-01-16', total_score: 76.8 },
      'DGT-2026-043': { id: 'DGT-2026-043', company_name: '宁德时代工商业储能（苏州3站）', industry: 'new-energy', invested_amount: 280, total_cashflow: 17, cashflow_frequency: 'daily', region: '江苏', city: '苏州', issuer: '宁德时代', description: '动力电池全球龙头，苏州3个工业园区储能电站3MWh，峰谷套利+需量管理。', start_date: '2026-01-17', total_score: 75.2 },
      'DGT-2026-045': { id: 'DGT-2026-045', company_name: '哈啰两轮车换电站（20站）', industry: 'new-energy', invested_amount: 160, total_cashflow: 27, cashflow_frequency: 'daily', region: '浙江', city: '杭州', issuer: '哈啰出行', description: '两轮车换电龙头，杭州宁波20个骑手聚集社区换电站，刚需场景稳定收益。', start_date: '2026-01-17', total_score: 78.9 },
      'DGT-2026-047': { id: 'DGT-2026-047', company_name: '星星充电目的地充电桩（北京20酒店）', industry: 'new-energy', invested_amount: 120, total_cashflow: 16, cashflow_frequency: 'weekly', region: '北京', city: '北京', issuer: '星星充电', description: '民营充电龙头，北京20家高端酒店目的地充电桩80个，服务高端车主。', start_date: '2026-01-17', total_score: 74.5 },
      // SaaS/科技
      'DGT-2026-034': { id: 'DGT-2026-034', company_name: '有赞电商SaaS订阅收入分成', industry: 'tech', invested_amount: 400, total_cashflow: 20, cashflow_frequency: 'monthly', region: '浙江', city: '杭州', issuer: '有赞', description: '电商SaaS港股上市公司，按500家新签约商户ARR分成，参考国际Pipe模式。', start_date: '2026-01-16', total_score: 71.3 },
      'DGT-2026-040': { id: 'DGT-2026-040', company_name: '三七互娱小程序游戏联运', industry: 'tech', invested_amount: 180, total_cashflow: 30, cashflow_frequency: 'weekly', region: '广东', city: '深圳', issuer: '三七互娱', description: '游戏发行A股头部公司，3款微信小程序游戏联运买量投放，按游戏流水分成。', start_date: '2026-01-17', total_score: 79.6 },
      // MCN/娱乐
      'DGT-2026-035': { id: 'DGT-2026-035', company_name: '无忧传媒达人孵化计划（10人）', industry: 'mcn', invested_amount: 150, total_cashflow: 72, cashflow_frequency: 'monthly', region: '浙江', city: '杭州', issuer: '无忧传媒', description: '头部MCN机构，10名潜力达人孵化计划，按直播带货GMV+广告收入分成。', start_date: '2026-01-16', total_score: 77.2 },
      'DGT-2026-044': { id: 'DGT-2026-044', company_name: 'BLG电竞战队收入分成', industry: 'esports', invested_amount: 300, total_cashflow: 200, cashflow_frequency: 'monthly', region: '上海', city: '上海', issuer: 'B站电竞', description: 'LPL顶级战队（2024 MSI冠军），联盟分成+赞助+直播+周边多元收入。', start_date: '2026-01-17', total_score: 80.8 },
      'DGT-2026-050': { id: 'DGT-2026-050', company_name: 'A-SOUL虚拟偶像运营分成', industry: 'vtuber', invested_amount: 200, total_cashflow: 125, cashflow_frequency: 'monthly', region: '上海', city: '上海', issuer: '乐华娱乐', description: '中国最成功虚拟偶像团体，B站粉丝400万+，直播打赏+演出+周边分成。', start_date: '2026-01-18', total_score: 78.4 },
      // 知识付费/内容
      'DGT-2026-036': { id: 'DGT-2026-036', company_name: '得到App《商业洞察力》课程', industry: 'education', invested_amount: 80, total_cashflow: 75, cashflow_frequency: 'monthly', region: '北京', city: '北京', issuer: '得到', description: '知识付费头部平台5000万用户，知名商业导师专栏课程199元，预期5万份销量。', start_date: '2026-01-16', total_score: 83.6 },
      'DGT-2026-037': { id: 'DGT-2026-037', company_name: '华语经典金曲版税分成基金', industry: 'music-royalty', invested_amount: 600, total_cashflow: 30, cashflow_frequency: 'monthly', region: '全国', city: '北京', issuer: '音著协', description: '参考国际Royalty Exchange，50首2000-2015年经典金曲版税权益，音著协统一结算。', start_date: '2026-01-16', total_score: 70.5 },
      'DGT-2026-046': { id: 'DGT-2026-046', company_name: '爱奇艺分账剧《重生之都市修仙》', industry: 'media', invested_amount: 180, total_cashflow: 160, cashflow_frequency: 'monthly', region: '浙江', city: '横店', issuer: '爱奇艺', description: '都市玄幻网剧24集，爱奇艺A级分账，按有效播放量2元/次分成，预期800万播放。', start_date: '2026-01-17', total_score: 81.9 },
      'DGT-2026-048': { id: 'DGT-2026-048', company_name: '小宇宙播客广告分成（10档）', industry: 'media', invested_amount: 100, total_cashflow: 60, cashflow_frequency: 'monthly', region: '北京', city: '北京', issuer: '小宇宙', description: '中国最大播客平台1500万月活，10档头部播客（含《随机波动》《忽左忽右》）广告分成。', start_date: '2026-01-18', total_score: 76.3 },
      // 电商
      'DGT-2026-038': { id: 'DGT-2026-038', company_name: '宝尊电商代运营（3品牌）', industry: 'ecommerce', invested_amount: 250, total_cashflow: 200, cashflow_frequency: 'monthly', region: '上海', city: '上海', issuer: '宝尊电商', description: '品牌电商代运营美股龙头，3个国际美妆品牌天猫旗舰店代运营，按GMV分成。', start_date: '2026-01-16', total_score: 84.7 },
      'DGT-2026-049': { id: 'DGT-2026-049', company_name: '完美日记私域小程序GMV分成', industry: 'ecommerce', invested_amount: 150, total_cashflow: 90, cashflow_frequency: 'weekly', region: '广东', city: '广州', issuer: '逸仙电商', description: '新锐美妆美股上市品牌，私域用户3000万+，微信小程序商城复购率40%。', start_date: '2026-01-18', total_score: 77.8 }
    };
    
    currentDeal = demoDeals[currentDealId] || demoDeals['DGT-2026-001'];
    
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
    
    document.getElementById('info-invested-amount').textContent = '¥' + formatInvestmentAmount(currentDeal.invested_amount);
    document.getElementById('info-frequency').textContent = frequencyMap[currentDeal.cashflow_frequency] || currentDeal.cashflow_frequency;
    document.getElementById('info-issuer').textContent = currentDeal.issuer || '-';
    document.getElementById('info-region').textContent = (currentDeal.region || '') + ' ' + (currentDeal.city || '');
    document.getElementById('info-description').textContent = currentDeal.description || '-';
    document.getElementById('info-start-date').textContent = currentDeal.start_date || '-';
    
    // 统计数据
    document.getElementById('deal-invested').textContent = '¥' + formatInvestmentAmount(currentDeal.invested_amount);
    document.getElementById('deal-total-return').textContent = '¥' + formatCashflowAmount(currentDeal.total_cashflow);
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
      ],
      'service': [
        { name: '月活用户', value: '2000+', icon: 'fa-users', color: '#10B981' },
        { name: '客单价', value: '¥280', icon: 'fa-receipt', color: '#3B82F6' },
        { name: '复购率', value: '65%', icon: 'fa-redo', color: '#F59E0B' }
      ],
      'entertainment': [
        { name: '包厢数', value: '30间', icon: 'fa-door-open', color: '#8B5CF6' },
        { name: '周末出租率', value: '95%', icon: 'fa-calendar-check', color: '#10B981' },
        { name: '客单价', value: '¥180', icon: 'fa-receipt', color: '#3B82F6' }
      ]
    };
    
    return indicatorsMap[industry] || indicatorsMap['service'];
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
