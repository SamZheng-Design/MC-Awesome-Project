// 标的详情页面 - deal-detail.html
// 展示标的的所有信息、评估日志、支持上传新信息

export const dealDetailPageContent = `
<div id="deal-detail-container">
  <!-- 加载状态 -->
  <div id="loading-state" class="flex items-center justify-center py-20">
    <div class="text-center">
      <i class="fas fa-spinner fa-spin text-4xl text-[#00D29E] mb-4"></i>
      <p class="text-gray-500">加载标的信息...</p>
    </div>
  </div>
  
  <!-- 内容区域 -->
  <div id="deal-content" class="hidden">
    <!-- 顶部导航 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <a href="/deals" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-arrow-left mr-2"></i>返回列表
        </a>
        <span class="text-gray-300">|</span>
        <h1 id="deal-title" class="text-xl font-bold text-[#49754D]"></h1>
        <span id="deal-status-badge" class="px-3 py-1 rounded-full text-sm"></span>
      </div>
      <div class="flex items-center space-x-3">
        <button onclick="openUploadModal()" class="px-4 py-2 bg-[#629C85] text-white rounded-lg hover:bg-[#49754D] transition">
          <i class="fas fa-upload mr-2"></i>上传材料
        </button>
        <button id="btn-start-eval" onclick="startEvaluation()" class="px-4 py-2 bg-gradient-to-r from-[#00D29E] to-[#00B88A] text-white rounded-lg hover:opacity-90 transition">
          <i class="fas fa-play mr-2"></i>开始评估
        </button>
      </div>
    </div>
    
    <!-- 主要内容区 - 左右布局 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧：主要信息 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 基本信息卡片 -->
        <div class="bg-white rounded-xl card-shadow overflow-hidden">
          <div class="px-6 py-4 border-b bg-gradient-to-r from-[#D9EDDF] to-white">
            <h2 class="font-semibold text-[#49754D] flex items-center">
              <i class="fas fa-building mr-2 text-[#00D29E]"></i>企业基本信息
            </h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-sm text-gray-500">企业名称</label>
                  <p id="info-company" class="font-medium text-gray-800"></p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">统一社会信用代码</label>
                  <p id="info-credit-code" class="font-mono text-sm text-gray-600"></p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">所属行业/赛道</label>
                  <p id="info-industry" class="flex items-center"></p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">融资金额</label>
                  <p id="info-funding" class="text-lg font-bold text-[#00D29E]"></p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="text-sm text-gray-500">联系人</label>
                  <p id="info-contact" class="font-medium"></p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">联系电话</label>
                  <p id="info-phone" class="font-mono"></p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">官网/店铺链接</label>
                  <p id="info-website"></p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">提交时间</label>
                  <p id="info-submitted" class="text-sm text-gray-600"></p>
                </div>
              </div>
            </div>
            <div class="mt-6 pt-6 border-t">
              <label class="text-sm text-gray-500">主营业务描述</label>
              <p id="info-business" class="mt-2 text-gray-700 leading-relaxed"></p>
            </div>
          </div>
        </div>
        
        <!-- Tab切换区域 -->
        <div class="bg-white rounded-xl card-shadow overflow-hidden">
          <div class="border-b">
            <div class="flex">
              <button onclick="switchTab('documents')" id="tab-documents" class="tab-btn px-6 py-4 font-medium text-[#00D29E] border-b-2 border-[#00D29E]">
                <i class="fas fa-file-alt mr-2"></i>项目资料
              </button>
              <button onclick="switchTab('financial')" id="tab-financial" class="tab-btn px-6 py-4 font-medium text-gray-500 hover:text-gray-700">
                <i class="fas fa-chart-line mr-2"></i>财务数据
              </button>
              <button onclick="switchTab('materials')" id="tab-materials" class="tab-btn px-6 py-4 font-medium text-gray-500 hover:text-gray-700">
                <i class="fas fa-paperclip mr-2"></i>补充材料
                <span id="materials-count" class="ml-1 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-600 hidden">0</span>
              </button>
              <button onclick="switchTab('logs')" id="tab-logs" class="tab-btn px-6 py-4 font-medium text-gray-500 hover:text-gray-700">
                <i class="fas fa-history mr-2"></i>评估日志
                <span id="logs-count" class="ml-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 hidden">0</span>
              </button>
            </div>
          </div>
          
          <!-- Tab内容区域 -->
          <div id="tab-content" class="p-6 min-h-[400px]">
            <!-- 动态渲染 -->
          </div>
        </div>
      </div>
      
      <!-- 右侧：评估结果和快捷操作 -->
      <div class="space-y-6">
        <!-- 评估结果卡片 -->
        <div class="bg-white rounded-xl card-shadow overflow-hidden">
          <div class="px-6 py-4 border-b bg-gradient-to-r from-[#F3EED9] to-white">
            <h2 class="font-semibold text-[#49754D] flex items-center">
              <i class="fas fa-chart-pie mr-2 text-[#00D29E]"></i>评估结果
            </h2>
          </div>
          <div id="eval-result" class="p-6">
            <!-- 动态渲染 -->
          </div>
        </div>
        
        <!-- 快捷操作 -->
        <div class="bg-white rounded-xl card-shadow overflow-hidden">
          <div class="px-6 py-4 border-b">
            <h2 class="font-semibold text-[#49754D] flex items-center">
              <i class="fas fa-bolt mr-2 text-[#00D29E]"></i>快捷操作
            </h2>
          </div>
          <div class="p-6 space-y-3">
            <button onclick="openUploadModal()" class="w-full px-4 py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition text-left">
              <i class="fas fa-upload mr-2"></i>上传补充材料
            </button>
            <button onclick="exportReport()" class="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-left">
              <i class="fas fa-file-export mr-2"></i>导出评估报告
            </button>
            <button onclick="openEditModal()" class="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition text-left">
              <i class="fas fa-edit mr-2"></i>编辑基本信息
            </button>
            <a href="/demo" class="block w-full px-4 py-3 bg-[#D9EDDF] text-[#49754D] rounded-lg hover:bg-[#00D29E]/20 transition text-left">
              <i class="fas fa-play-circle mr-2"></i>查看Demo演示
            </a>
          </div>
        </div>
        
        <!-- 时间线 -->
        <div class="bg-white rounded-xl card-shadow overflow-hidden">
          <div class="px-6 py-4 border-b">
            <h2 class="font-semibold text-[#49754D] flex items-center">
              <i class="fas fa-stream mr-2 text-[#00D29E]"></i>处理进度
            </h2>
          </div>
          <div id="timeline" class="p-6">
            <!-- 动态渲染 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 上传材料模态框 -->
<div id="upload-modal" class="fixed inset-0 bg-black/50 z-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
      <div class="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
        <h2 class="text-lg font-semibold text-amber-800">
          <i class="fas fa-file-upload mr-2"></i>上传补充材料
        </h2>
        <button onclick="closeUploadModal()" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto p-6">
        <!-- 材料类型选择 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">材料类型</label>
          <select id="upload-category" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 border-gray-200">
            <option value="合同文件">合同文件</option>
            <option value="审批文件">审批文件</option>
            <option value="财务文件">财务文件</option>
            <option value="保险文件">保险文件</option>
            <option value="资质证明">资质证明</option>
            <option value="运营数据">运营数据</option>
            <option value="其他">其他</option>
          </select>
        </div>
        
        <!-- 上传方式切换 -->
        <div class="flex mb-4 border-b">
          <button onclick="switchUploadMode('file')" id="upload-mode-file" class="px-4 py-2 font-medium text-amber-600 border-b-2 border-amber-500">
            <i class="fas fa-file mr-1"></i>文件上传
          </button>
          <button onclick="switchUploadMode('text')" id="upload-mode-text" class="px-4 py-2 font-medium text-gray-500 hover:text-gray-700">
            <i class="fas fa-keyboard mr-1"></i>文本输入
          </button>
        </div>
        
        <!-- 文件上传区域 -->
        <div id="upload-file-area">
          <div id="drop-zone" 
            class="p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-dashed border-amber-300 cursor-pointer hover:border-amber-400 transition text-center"
            onclick="document.getElementById('file-input').click()"
            ondrop="handleFileDrop(event)" 
            ondragover="handleDragOver(event)" 
            ondragleave="handleDragLeave(event)">
            <i class="fas fa-cloud-upload-alt text-5xl text-amber-400 mb-4"></i>
            <p class="font-medium text-amber-700 mb-2">拖拽文件到此处或点击选择</p>
            <p class="text-sm text-gray-500">支持 TXT、PDF、DOC、DOCX、图片等格式，单文件最大10MB</p>
            <input type="file" id="file-input" class="hidden" multiple 
              accept=".txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.md,.json"
              onchange="handleFileSelect(event)">
          </div>
          
          <!-- 已选文件列表 -->
          <div id="selected-files" class="mt-4 hidden">
            <h4 class="font-medium text-sm text-gray-700 mb-2">已选择文件：</h4>
            <div id="files-list" class="space-y-2 max-h-40 overflow-y-auto"></div>
          </div>
        </div>
        
        <!-- 文本输入区域 -->
        <div id="upload-text-area" class="hidden">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">材料名称</label>
            <input type="text" id="text-material-name" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400" placeholder="例如：演出取消险保单详情">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">材料内容</label>
            <textarea id="text-material-content" rows="10" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 font-mono text-sm" placeholder="在此输入或粘贴材料内容..."></textarea>
          </div>
        </div>
      </div>
      
      <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
        <button onclick="closeUploadModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">
          取消
        </button>
        <div class="flex space-x-3">
          <button onclick="doUpload()" id="btn-upload" class="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            <i class="fas fa-upload mr-2"></i>上传材料
          </button>
          <button onclick="uploadAndStartEval()" class="px-6 py-2 bg-gradient-to-r from-[#00D29E] to-[#00B88A] text-white rounded-lg hover:opacity-90 transition">
            <i class="fas fa-play mr-2"></i>上传并评估
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 编辑基本信息模态框 -->
<div id="edit-modal" class="fixed inset-0 bg-black/50 z-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
      <div class="flex items-center justify-between px-6 py-4 border-b">
        <h2 class="text-lg font-semibold text-[#49754D]">
          <i class="fas fa-edit mr-2"></i>编辑基本信息
        </h2>
        <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto p-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">企业名称</label>
            <input type="text" id="edit-company" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00D29E]">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">统一社会信用代码</label>
            <input type="text" id="edit-credit-code" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00D29E]">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">联系人</label>
            <input type="text" id="edit-contact" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00D29E]">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
            <input type="text" id="edit-phone" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00D29E]">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">融资金额（万元）</label>
            <input type="number" id="edit-funding" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00D29E]">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">官网/店铺链接</label>
            <input type="text" id="edit-website" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00D29E]">
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">主营业务描述</label>
            <textarea id="edit-business" rows="4" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00D29E]"></textarea>
          </div>
        </div>
      </div>
      
      <div class="flex items-center justify-end px-6 py-4 border-t bg-gray-50 space-x-3">
        <button onclick="closeEditModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">
          取消
        </button>
        <button onclick="saveEdit()" class="px-6 py-2 bg-gradient-to-r from-[#00D29E] to-[#00B88A] text-white rounded-lg hover:opacity-90 transition">
          <i class="fas fa-save mr-2"></i>保存
        </button>
      </div>
    </div>
  </div>
</div>

<script>
  // ============================================
  // 全局状态
  // ============================================
  let dealId = null;
  let dealData = null;
  let evalLogs = [];
  let materials = [];
  let currentTab = 'documents';
  let uploadMode = 'file';
  let selectedFiles = [];
  
  // 行业映射
  const industryMap = {
    'light-asset': { name: '文娱轻资产', icon: 'fas fa-film', color: '#8B5CF6' },
    'ecommerce': { name: '电商', icon: 'fas fa-shopping-cart', color: '#3B82F6' },
    'retail': { name: '零售', icon: 'fas fa-store', color: '#10B981' },
    'catering': { name: '餐饮', icon: 'fas fa-utensils', color: '#F59E0B' },
    'education': { name: '教育培训', icon: 'fas fa-graduation-cap', color: '#EC4899' },
    'service': { name: '生活服务', icon: 'fas fa-concierge-bell', color: '#14B8A6' },
    'douyin-ecommerce': { name: '抖音投流', icon: 'fab fa-tiktok', color: '#FE2C55' },
    'overseas': { name: '海外', icon: 'fas fa-globe', color: '#6366F1' }
  };
  
  // 状态映射
  const statusMap = {
    pending: { label: '待处理', class: 'bg-gray-100 text-gray-600', icon: 'fas fa-clock' },
    outer: { label: '外环筛选', class: 'bg-blue-100 text-blue-600', icon: 'fas fa-filter' },
    evaluation: { label: '评估中', class: 'bg-yellow-100 text-yellow-600', icon: 'fas fa-cog fa-spin' },
    review: { label: '待审核', class: 'bg-purple-100 text-purple-600', icon: 'fas fa-user-check' },
    completed: { label: '已完成', class: 'bg-green-100 text-green-600', icon: 'fas fa-check-circle' },
    rejected: { label: '已拒绝', class: 'bg-red-100 text-red-600', icon: 'fas fa-times-circle' }
  };
  
  // ============================================
  // 初始化
  // ============================================
  async function init() {
    // 从URL获取dealId
    const pathParts = window.location.pathname.split('/');
    dealId = pathParts[pathParts.length - 1];
    
    if (!dealId || dealId === 'deals') {
      showToast('未找到标的ID', 'error');
      setTimeout(() => window.location.href = '/deals', 1500);
      return;
    }
    
    await loadDealData();
  }
  
  // ============================================
  // 数据加载
  // ============================================
  async function loadDealData() {
    try {
      // 并行加载标的数据和评估日志
      const [dealRes, logsRes, materialsRes] = await Promise.all([
        apiCall('/api/deals/' + dealId),
        apiCall('/api/evaluation-logs/' + dealId, { silent: true }).catch(() => ({ data: [] })),
        apiCall('/api/deals/' + dealId + '/materials', { silent: true }).catch(() => ({ data: [] }))
      ]);
      
      dealData = dealRes.data;
      evalLogs = logsRes.data || [];
      materials = materialsRes.data || [];
      
      // 渲染页面
      renderPage();
      
      // 显示内容
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('deal-content').classList.remove('hidden');
      
    } catch (e) {
      showToast('加载失败: ' + e.message, 'error');
      document.getElementById('loading-state').innerHTML = '<div class="text-center text-red-500"><i class="fas fa-exclamation-circle text-4xl mb-4"></i><p>加载失败</p><a href="/deals" class="text-blue-500 hover:underline mt-2 inline-block">返回列表</a></div>';
    }
  }
  
  // ============================================
  // 页面渲染
  // ============================================
  function renderPage() {
    if (!dealData) return;
    
    const industry = industryMap[dealData.industry] || { name: dealData.industry, icon: 'fas fa-industry', color: '#6B7280' };
    const status = statusMap[dealData.status] || { label: dealData.status, class: 'bg-gray-100 text-gray-600', icon: 'fas fa-question' };
    
    // 标题和状态
    document.getElementById('deal-title').textContent = dealData.company_name + ' (' + dealData.id + ')';
    document.getElementById('deal-status-badge').className = 'px-3 py-1 rounded-full text-sm ' + status.class;
    document.getElementById('deal-status-badge').innerHTML = '<i class="' + status.icon + ' mr-1"></i>' + status.label;
    
    // 基本信息
    document.getElementById('info-company').textContent = dealData.company_name;
    document.getElementById('info-credit-code').textContent = dealData.credit_code || '未填写';
    document.getElementById('info-industry').innerHTML = '<i class="' + industry.icon + ' mr-2" style="color:' + industry.color + '"></i><span class="px-2 py-0.5 rounded text-sm" style="background:' + industry.color + '20;color:' + industry.color + '">' + industry.name + '</span>';
    document.getElementById('info-funding').textContent = dealData.funding_amount ? dealData.funding_amount + ' 万元' : '未填写';
    document.getElementById('info-contact').textContent = dealData.contact_name || '未填写';
    document.getElementById('info-phone').textContent = dealData.contact_phone || '未填写';
    document.getElementById('info-website').innerHTML = dealData.website ? '<a href="' + dealData.website + '" target="_blank" class="text-blue-500 hover:underline">' + dealData.website + '</a>' : '未填写';
    document.getElementById('info-submitted').textContent = dealData.submitted_date ? new Date(dealData.submitted_date).toLocaleString('zh-CN') : '-';
    document.getElementById('info-business').textContent = dealData.main_business || '暂无描述';
    
    // 评估按钮状态
    const btnEval = document.getElementById('btn-start-eval');
    if (dealData.status === 'completed' || dealData.status === 'rejected') {
      btnEval.classList.add('hidden');
    }
    
    // 更新计数标签
    if (materials.length > 0) {
      document.getElementById('materials-count').textContent = materials.length;
      document.getElementById('materials-count').classList.remove('hidden');
    }
    if (evalLogs.length > 0) {
      document.getElementById('logs-count').textContent = evalLogs.length;
      document.getElementById('logs-count').classList.remove('hidden');
    }
    
    // 渲染评估结果
    renderEvalResult();
    
    // 渲染时间线
    renderTimeline();
    
    // 渲染当前Tab内容
    renderTabContent();
  }
  
  // 渲染评估结果
  function renderEvalResult() {
    const container = document.getElementById('eval-result');
    
    if (dealData.total_score) {
      const score = dealData.total_score;
      let grade = 'D级-不建议投资';
      let gradeColor = '#EF4444';
      if (score >= 85) { grade = 'A级-强烈推荐'; gradeColor = '#00D29E'; }
      else if (score >= 75) { grade = 'B+级-推荐投资'; gradeColor = '#629C85'; }
      else if (score >= 65) { grade = 'B级-可投资'; gradeColor = '#F59E0B'; }
      else if (score >= 60) { grade = 'C级-谨慎投资'; gradeColor = '#F97316'; }
      
      container.innerHTML = \`
        <div class="text-center mb-6">
          <div class="text-5xl font-bold" style="color: \${gradeColor}">\${score.toFixed(1)}</div>
          <div class="mt-2 px-3 py-1 rounded-full text-sm inline-block" style="background: \${gradeColor}20; color: \${gradeColor}">\${grade}</div>
        </div>
        <div class="space-y-3">
          \${renderScoreBar('财务健康', dealData.score_financial)}
          \${renderScoreBar('运营能力', dealData.score_operational)}
          \${renderScoreBar('法律合规', dealData.score_legal)}
          \${renderScoreBar('风险控制', dealData.score_risk)}
          \${renderScoreBar('利益一致', dealData.score_interest)}
          \${renderScoreBar('经济性测算', dealData.score_economic)}
        </div>
        \${dealData.final_recommendation ? \`
          <div class="mt-6 pt-6 border-t">
            <h4 class="text-sm font-medium text-gray-500 mb-2">投资建议</h4>
            <p class="text-sm text-gray-700">\${dealData.final_recommendation.substring(0, 200)}...</p>
          </div>
        \` : ''}
      \`;
    } else {
      container.innerHTML = \`
        <div class="text-center py-8 text-gray-400">
          <i class="fas fa-chart-pie text-4xl mb-4"></i>
          <p>尚未进行评估</p>
          <button onclick="startEvaluation()" class="mt-4 px-4 py-2 bg-gradient-to-r from-[#00D29E] to-[#00B88A] text-white rounded-lg hover:opacity-90 transition text-sm">
            <i class="fas fa-play mr-1"></i>开始评估
          </button>
        </div>
      \`;
    }
  }
  
  // 渲染评分条
  function renderScoreBar(label, score) {
    const value = score || 0;
    const color = value >= 80 ? '#00D29E' : value >= 60 ? '#F59E0B' : '#EF4444';
    return \`
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600 w-24">\${label}</span>
        <div class="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-500" style="width: \${value}%; background: \${color}"></div>
        </div>
        <span class="font-mono w-12 text-right" style="color: \${color}">\${value || '-'}</span>
      </div>
    \`;
  }
  
  // 渲染时间线
  function renderTimeline() {
    const container = document.getElementById('timeline');
    const steps = [
      { status: 'pending', label: '提交申请', icon: 'fas fa-paper-plane' },
      { status: 'outer', label: '外环筛选', icon: 'fas fa-filter' },
      { status: 'evaluation', label: '中环评估', icon: 'fas fa-cogs' },
      { status: 'review', label: '人工复核', icon: 'fas fa-user-check' },
      { status: 'completed', label: '完成', icon: 'fas fa-flag-checkered' }
    ];
    
    const statusOrder = ['pending', 'outer', 'evaluation', 'review', 'completed'];
    const currentIndex = statusOrder.indexOf(dealData.status);
    const isRejected = dealData.status === 'rejected';
    
    container.innerHTML = \`
      <div class="space-y-4">
        \${steps.map((step, i) => {
          let state = 'pending';
          if (isRejected && i <= currentIndex) state = 'rejected';
          else if (i < currentIndex) state = 'completed';
          else if (i === currentIndex) state = 'current';
          
          const colors = {
            completed: { bg: 'bg-[#00D29E]', text: 'text-[#00D29E]', line: 'bg-[#00D29E]' },
            current: { bg: 'bg-[#00D29E]', text: 'text-[#00D29E]', line: 'bg-gray-200' },
            pending: { bg: 'bg-gray-200', text: 'text-gray-400', line: 'bg-gray-200' },
            rejected: { bg: 'bg-red-500', text: 'text-red-500', line: 'bg-red-300' }
          };
          const c = colors[state];
          
          return \`
            <div class="flex items-start">
              <div class="flex flex-col items-center mr-4">
                <div class="w-8 h-8 rounded-full \${c.bg} flex items-center justify-center text-white text-xs">
                  <i class="\${step.icon}"></i>
                </div>
                \${i < steps.length - 1 ? '<div class="w-0.5 h-8 ' + c.line + ' mt-1"></div>' : ''}
              </div>
              <div class="flex-1 pb-4">
                <p class="font-medium \${state === 'pending' ? 'text-gray-400' : 'text-gray-700'}">\${step.label}</p>
                \${state === 'current' ? '<p class="text-xs text-[#00D29E]">当前阶段</p>' : ''}
                \${state === 'rejected' ? '<p class="text-xs text-red-500">已终止</p>' : ''}
              </div>
            </div>
          \`;
        }).join('')}
      </div>
    \`;
  }
  
  // ============================================
  // Tab切换和内容渲染
  // ============================================
  function switchTab(tab) {
    currentTab = tab;
    
    // 更新Tab样式
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.className = 'tab-btn px-6 py-4 font-medium text-gray-500 hover:text-gray-700';
    });
    document.getElementById('tab-' + tab).className = 'tab-btn px-6 py-4 font-medium text-[#00D29E] border-b-2 border-[#00D29E]';
    
    // 渲染内容
    renderTabContent();
  }
  
  function renderTabContent() {
    const container = document.getElementById('tab-content');
    
    switch (currentTab) {
      case 'documents':
        renderDocumentsTab(container);
        break;
      case 'financial':
        renderFinancialTab(container);
        break;
      case 'materials':
        renderMaterialsTab(container);
        break;
      case 'logs':
        renderLogsTab(container);
        break;
    }
  }
  
  // 渲染项目资料Tab
  function renderDocumentsTab(container) {
    const docs = dealData.project_documents || '';
    
    if (!docs) {
      container.innerHTML = '<div class="text-center py-12 text-gray-400"><i class="fas fa-file-alt text-4xl mb-4"></i><p>暂无项目资料</p></div>';
      return;
    }
    
    // 分段显示，方便阅读
    const sections = docs.split(/(?=【[^】]+】)/g).filter(s => s.trim());
    
    container.innerHTML = \`
      <div class="space-y-4">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm text-gray-500">共 \${docs.length.toLocaleString()} 字</span>
          <button onclick="copyContent()" class="text-sm text-[#629C85] hover:text-[#49754D]">
            <i class="fas fa-copy mr-1"></i>复制全文
          </button>
        </div>
        \${sections.map((section, i) => {
          const titleMatch = section.match(/【([^】]+)】/);
          const title = titleMatch ? titleMatch[1] : '段落 ' + (i + 1);
          const content = section.replace(/【[^】]+】/, '').trim();
          
          return \`
            <div class="border rounded-lg overflow-hidden">
              <div class="px-4 py-3 bg-gray-50 flex items-center justify-between cursor-pointer" onclick="toggleSection(this)">
                <span class="font-medium text-[#49754D]"><i class="fas fa-chevron-down mr-2 transition-transform"></i>\${title}</span>
                <span class="text-xs text-gray-400">\${content.length} 字</span>
              </div>
              <div class="px-4 py-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap hidden section-content">\${content}</div>
            </div>
          \`;
        }).join('')}
      </div>
    \`;
    
    // 默认展开第一个
    const firstSection = container.querySelector('.section-content');
    if (firstSection) {
      firstSection.classList.remove('hidden');
      firstSection.previousElementSibling.querySelector('i').classList.add('rotate-180');
    }
  }
  
  // 渲染财务数据Tab
  function renderFinancialTab(container) {
    let financialData = null;
    try {
      financialData = dealData.financial_data ? JSON.parse(dealData.financial_data) : null;
    } catch (e) {
      financialData = null;
    }
    
    if (!financialData) {
      container.innerHTML = '<div class="text-center py-12 text-gray-400"><i class="fas fa-chart-line text-4xl mb-4"></i><p>暂无财务数据</p></div>';
      return;
    }
    
    // 根据不同项目类型渲染
    const projectType = financialData.project_type || 'unknown';
    
    container.innerHTML = \`
      <div class="space-y-6">
        <!-- 项目概览 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-[#D9EDDF] to-white p-4 rounded-xl">
            <p class="text-sm text-gray-500">投资金额</p>
            <p class="text-2xl font-bold text-[#00D29E]">\${financialData.investment_amount || '-'}万</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl">
            <p class="text-sm text-gray-500">预期收入</p>
            <p class="text-2xl font-bold text-blue-600">\${financialData.revenue_forecast?.total || '-'}万</p>
          </div>
          <div class="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl">
            <p class="text-sm text-gray-500">预期IRR</p>
            <p class="text-2xl font-bold text-amber-600">\${financialData.profit_distribution?.investor_return?.irr_estimate ? (financialData.profit_distribution.investor_return.irr_estimate * 100).toFixed(0) + '%' : '-'}</p>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl">
            <p class="text-sm text-gray-500">回收周期</p>
            <p class="text-2xl font-bold text-purple-600">\${financialData.profit_distribution?.investor_return?.payback_months || '-'}月</p>
          </div>
        </div>
        
        <!-- 成本结构 -->
        \${financialData.cost_structure ? \`
          <div class="border rounded-lg overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 font-medium text-gray-700">
              <i class="fas fa-coins mr-2 text-amber-500"></i>成本结构
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                \${Object.entries(financialData.cost_structure.breakdown || {}).map(([key, val]) => \`
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-600">\${val.note || key}</span>
                    <span class="font-mono text-gray-800">\${val.amount || val}万</span>
                  </div>
                \`).join('')}
              </div>
              <div class="mt-4 pt-4 border-t flex justify-between">
                <span class="font-medium">总成本</span>
                <span class="font-bold text-lg">\${financialData.cost_structure.total}万</span>
              </div>
            </div>
          </div>
        \` : ''}
        
        <!-- 利益分配 -->
        \${financialData.profit_distribution ? \`
          <div class="border rounded-lg overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 font-medium text-gray-700">
              <i class="fas fa-hand-holding-usd mr-2 text-green-500"></i>利益分配机制
            </div>
            <div class="p-4">
              \${financialData.profit_distribution.distribution_waterfall ? \`
                <div class="space-y-2">
                  \${financialData.profit_distribution.distribution_waterfall.map((item, i) => \`
                    <div class="flex items-center">
                      <span class="w-6 h-6 rounded-full bg-[#00D29E] text-white text-xs flex items-center justify-center mr-3">\${i + 1}</span>
                      <span class="flex-1 text-sm">\${item.description}</span>
                      <span class="font-mono text-gray-700">\${item.amount ? item.amount + '万' : (item.rate ? (item.rate * 100) + '%' : '-')}</span>
                    </div>
                  \`).join('')}
                </div>
              \` : ''}
            </div>
          </div>
        \` : ''}
        
        <!-- 原始JSON -->
        <details class="border rounded-lg">
          <summary class="px-4 py-3 bg-gray-50 font-medium text-gray-700 cursor-pointer">
            <i class="fas fa-code mr-2 text-gray-500"></i>查看原始数据
          </summary>
          <div class="p-4">
            <pre class="text-xs bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-96">\${JSON.stringify(financialData, null, 2)}</pre>
          </div>
        </details>
      </div>
    \`;
  }
  
  // 渲染补充材料Tab
  function renderMaterialsTab(container) {
    if (materials.length === 0) {
      container.innerHTML = \`
        <div class="text-center py-12 text-gray-400">
          <i class="fas fa-folder-open text-4xl mb-4"></i>
          <p class="mb-4">暂无补充材料</p>
          <button onclick="openUploadModal()" class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            <i class="fas fa-upload mr-2"></i>上传材料
          </button>
        </div>
      \`;
      return;
    }
    
    // 按分类分组
    const grouped = {};
    materials.forEach(m => {
      const cat = m.category || '其他';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(m);
    });
    
    container.innerHTML = \`
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">共 \${materials.length} 份材料</span>
          <button onclick="openUploadModal()" class="text-sm text-amber-600 hover:text-amber-700">
            <i class="fas fa-plus mr-1"></i>上传新材料
          </button>
        </div>
        
        \${Object.entries(grouped).map(([category, items]) => \`
          <div class="border rounded-lg overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 font-medium text-gray-700 flex items-center justify-between">
              <span><i class="fas fa-folder mr-2 text-amber-500"></i>\${category}</span>
              <span class="text-xs text-gray-400">\${items.length} 份</span>
            </div>
            <div class="divide-y">
              \${items.map(m => \`
                <div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-file-alt text-gray-400"></i>
                    <div>
                      <p class="font-medium text-gray-800">\${m.name}</p>
                      <p class="text-xs text-gray-500">\${new Date(m.uploadedAt).toLocaleString('zh-CN')}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button onclick="viewMaterial('\${m.id}')" class="text-blue-500 hover:text-blue-700 text-sm">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="deleteMaterial('\${m.id}')" class="text-red-400 hover:text-red-600 text-sm">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        \`).join('')}
      </div>
    \`;
  }
  
  // 渲染评估日志Tab
  function renderLogsTab(container) {
    if (evalLogs.length === 0) {
      container.innerHTML = \`
        <div class="text-center py-12 text-gray-400">
          <i class="fas fa-history text-4xl mb-4"></i>
          <p class="mb-4">暂无评估日志</p>
          <button onclick="startEvaluation()" class="px-4 py-2 bg-gradient-to-r from-[#00D29E] to-[#00B88A] text-white rounded-lg hover:opacity-90 transition">
            <i class="fas fa-play mr-2"></i>开始评估
          </button>
        </div>
      \`;
      return;
    }
    
    // 按环类型分组
    const outerLogs = evalLogs.filter(l => l.ring_type === 'outer');
    const innerLogs = evalLogs.filter(l => l.ring_type === 'inner');
    
    container.innerHTML = \`
      <div class="space-y-6">
        <!-- 统计概览 -->
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg text-center">
            <p class="text-2xl font-bold text-gray-800">\${evalLogs.length}</p>
            <p class="text-sm text-gray-500">总评估次数</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg text-center">
            <p class="text-2xl font-bold text-green-600">\${evalLogs.filter(l => l.pass_status).length}</p>
            <p class="text-sm text-gray-500">通过</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg text-center">
            <p class="text-2xl font-bold text-red-600">\${evalLogs.filter(l => !l.pass_status).length}</p>
            <p class="text-sm text-gray-500">未通过</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg text-center">
            <p class="text-2xl font-bold text-blue-600">\${evalLogs.reduce((sum, l) => sum + (l.execution_time || 0), 0)}ms</p>
            <p class="text-sm text-gray-500">总耗时</p>
          </div>
        </div>
        
        <!-- 外环日志 -->
        \${outerLogs.length > 0 ? \`
          <div class="border rounded-lg overflow-hidden">
            <div class="px-4 py-3 bg-red-50 font-medium text-red-700">
              <i class="fas fa-filter mr-2"></i>外环漏斗体系（一票否决）
            </div>
            <div class="divide-y">
              \${outerLogs.map(log => renderLogItem(log)).join('')}
            </div>
          </div>
        \` : ''}
        
        <!-- 中环日志 -->
        \${innerLogs.length > 0 ? \`
          <div class="border rounded-lg overflow-hidden">
            <div class="px-4 py-3 bg-[#D9EDDF] font-medium text-[#49754D]">
              <i class="fas fa-cogs mr-2"></i>中环筛子体系（加权评分）
            </div>
            <div class="divide-y">
              \${innerLogs.map(log => renderLogItem(log)).join('')}
            </div>
          </div>
        \` : ''}
      </div>
    \`;
  }
  
  // 渲染单条日志
  function renderLogItem(log) {
    const passClass = log.pass_status ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    const passText = log.pass_status ? '通过' : '未通过';
    
    return \`
      <div class="px-4 py-4 hover:bg-gray-50">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-3">
            <span class="font-medium text-gray-800">\${log.agent_name}</span>
            <span class="px-2 py-0.5 rounded text-xs \${passClass}">\${passText}</span>
          </div>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span class="font-mono">得分: \${log.score || 0}</span>
            <span><i class="fas fa-clock mr-1"></i>\${log.execution_time}ms</span>
            <span>\${new Date(log.executed_at).toLocaleString('zh-CN')}</span>
          </div>
        </div>
        \${log.reasoning ? \`
          <details class="mt-2">
            <summary class="text-sm text-[#629C85] cursor-pointer hover:text-[#49754D]">
              <i class="fas fa-chevron-right mr-1"></i>查看评估详情
            </summary>
            <div class="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 leading-relaxed">\${log.reasoning}</div>
          </details>
        \` : ''}
      </div>
    \`;
  }
  
  // ============================================
  // 辅助函数
  // ============================================
  function toggleSection(el) {
    const content = el.nextElementSibling;
    const icon = el.querySelector('i');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  }
  
  function copyContent() {
    navigator.clipboard.writeText(dealData.project_documents || '');
    showToast('已复制到剪贴板', 'success');
  }
  
  function viewMaterial(id) {
    const m = materials.find(m => m.id === id);
    if (m && m.content) {
      alert('材料内容：\\n\\n' + m.content.substring(0, 1000) + (m.content.length > 1000 ? '...' : ''));
    }
  }
  
  async function deleteMaterial(id) {
    if (!confirm('确定要删除这份材料吗？')) return;
    
    try {
      await apiCall('/api/deals/' + dealId + '/materials/' + id, { method: 'DELETE' });
      showToast('删除成功', 'success');
      await loadDealData();
    } catch (e) {
      showToast('删除失败', 'error');
    }
  }
  
  function exportReport() {
    showToast('报告导出功能开发中...', 'info');
  }
  
  // ============================================
  // 上传模态框
  // ============================================
  function openUploadModal() {
    selectedFiles = [];
    updateFilesList();
    document.getElementById('upload-modal').classList.remove('hidden');
  }
  
  function closeUploadModal() {
    document.getElementById('upload-modal').classList.add('hidden');
  }
  
  function switchUploadMode(mode) {
    uploadMode = mode;
    document.getElementById('upload-mode-file').className = mode === 'file' ? 'px-4 py-2 font-medium text-amber-600 border-b-2 border-amber-500' : 'px-4 py-2 font-medium text-gray-500 hover:text-gray-700';
    document.getElementById('upload-mode-text').className = mode === 'text' ? 'px-4 py-2 font-medium text-amber-600 border-b-2 border-amber-500' : 'px-4 py-2 font-medium text-gray-500 hover:text-gray-700';
    document.getElementById('upload-file-area').classList.toggle('hidden', mode !== 'file');
    document.getElementById('upload-text-area').classList.toggle('hidden', mode !== 'text');
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('border-amber-500', 'bg-amber-100');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('border-amber-500', 'bg-amber-100');
  }
  
  function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('border-amber-500', 'bg-amber-100');
    addFiles(Array.from(e.dataTransfer.files));
  }
  
  function handleFileSelect(e) {
    addFiles(Array.from(e.target.files));
    e.target.value = '';
  }
  
  function addFiles(files) {
    const maxSize = 10 * 1024 * 1024;
    files.forEach(f => {
      if (f.size > maxSize) {
        showToast('文件过大: ' + f.name, 'error');
        return;
      }
      if (!selectedFiles.find(sf => sf.name === f.name)) {
        selectedFiles.push(f);
      }
    });
    updateFilesList();
  }
  
  function updateFilesList() {
    const container = document.getElementById('selected-files');
    const list = document.getElementById('files-list');
    
    if (selectedFiles.length > 0) {
      container.classList.remove('hidden');
      list.innerHTML = selectedFiles.map((f, i) => \`
        <div class="flex items-center justify-between p-2 bg-white rounded border">
          <div class="flex items-center space-x-2">
            <i class="fas fa-file text-gray-400"></i>
            <span class="text-sm truncate max-w-xs">\${f.name}</span>
            <span class="text-xs text-gray-400">(\${(f.size / 1024).toFixed(1)}KB)</span>
          </div>
          <button onclick="selectedFiles.splice(\${i}, 1); updateFilesList();" class="text-red-400 hover:text-red-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
      \`).join('');
    } else {
      container.classList.add('hidden');
    }
  }
  
  async function doUpload() {
    const category = document.getElementById('upload-category').value;
    let materialsList = [];
    
    if (uploadMode === 'file') {
      if (selectedFiles.length === 0) {
        showToast('请先选择文件', 'error');
        return false;
      }
      
      for (const file of selectedFiles) {
        const content = await readFileContent(file);
        materialsList.push({
          name: file.name,
          category: category,
          content: content,
          uploadedAt: new Date().toISOString()
        });
      }
    } else {
      const name = document.getElementById('text-material-name').value;
      const content = document.getElementById('text-material-content').value;
      
      if (!name || !content) {
        showToast('请填写材料名称和内容', 'error');
        return false;
      }
      
      materialsList.push({
        name: name,
        category: category,
        content: content,
        uploadedAt: new Date().toISOString()
      });
    }
    
    const btn = document.getElementById('btn-upload');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>上传中...';
    
    try {
      const response = await apiCall('/api/deals/' + dealId + '/materials', {
        method: 'POST',
        body: JSON.stringify({ materials: materialsList })
      });
      
      showToast('上传成功！', 'success');
      closeUploadModal();
      await loadDealData();
      return true;
    } catch (e) {
      showToast('上传失败', 'error');
      return false;
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-upload mr-2"></i>上传材料';
    }
  }
  
  async function readFileContent(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const ext = file.name.split('.').pop().toLowerCase();
      
      reader.onload = (e) => {
        if (['txt', 'md', 'json'].includes(ext)) {
          resolve(e.target.result);
        } else {
          resolve('[文件: ' + file.name + ', 类型: ' + ext.toUpperCase() + ', 大小: ' + (file.size / 1024).toFixed(1) + 'KB]');
        }
      };
      reader.onerror = () => resolve('[文件: ' + file.name + ']');
      
      if (['txt', 'md', 'json'].includes(ext)) {
        reader.readAsText(file);
      } else {
        resolve('[文件: ' + file.name + ', 类型: ' + ext.toUpperCase() + ', 大小: ' + (file.size / 1024).toFixed(1) + 'KB]');
      }
    });
  }
  
  async function uploadAndStartEval() {
    const uploaded = await doUpload();
    if (uploaded) {
      startEvaluation();
    }
  }
  
  // ============================================
  // 编辑模态框
  // ============================================
  function openEditModal() {
    document.getElementById('edit-company').value = dealData.company_name || '';
    document.getElementById('edit-credit-code').value = dealData.credit_code || '';
    document.getElementById('edit-contact').value = dealData.contact_name || '';
    document.getElementById('edit-phone').value = dealData.contact_phone || '';
    document.getElementById('edit-funding').value = dealData.funding_amount || '';
    document.getElementById('edit-website').value = dealData.website || '';
    document.getElementById('edit-business').value = dealData.main_business || '';
    document.getElementById('edit-modal').classList.remove('hidden');
  }
  
  function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
  }
  
  async function saveEdit() {
    const updates = {
      company_name: document.getElementById('edit-company').value,
      credit_code: document.getElementById('edit-credit-code').value,
      contact_name: document.getElementById('edit-contact').value,
      contact_phone: document.getElementById('edit-phone').value,
      funding_amount: parseFloat(document.getElementById('edit-funding').value) || null,
      website: document.getElementById('edit-website').value,
      main_business: document.getElementById('edit-business').value
    };
    
    try {
      await apiCall('/api/deals/' + dealId, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      
      showToast('保存成功', 'success');
      closeEditModal();
      await loadDealData();
    } catch (e) {
      showToast('保存失败', 'error');
    }
  }
  
  // ============================================
  // 评估功能
  // ============================================
  async function startEvaluation() {
    const btn = document.getElementById('btn-start-eval');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>评估中...';
    
    try {
      await apiCall('/api/ai/evaluate-deal', {
        method: 'POST',
        body: JSON.stringify({ dealId: dealId })
      });
      
      showToast('评估完成！', 'success');
      await loadDealData();
    } catch (e) {
      showToast('评估失败: ' + e.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-play mr-2"></i>开始评估';
    }
  }
  
  // 键盘事件
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeUploadModal();
      closeEditModal();
    }
  });
  
  // 初始化
  document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
</script>
`
